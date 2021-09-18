import { isEmpty } from "lodash"
import Web3 from 'web3'
const approvalHash = '0x095ea7b3'
const unlimitedAllowance =
  'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
const getApproveTransaction = (txs) => {
  type ApprovedObject = {
    contract: string
    tokenApproved: string
    allowance: string
    input: string
    key: string
    timeStamp: number
    check: number
  }
  const approveTxs = txs.filter((item) => {
    const { input } = item
    return String(input).includes(approvalHash)
  })
  const approveTransactions = approveTxs
    .reverse()
    .map((item) => {
      const { input } = item
      const approvedObj: ApprovedObject = {
        contract: '',
        tokenApproved: '',
        allowance: '',
        input: '',
        key: '',
        timeStamp: new Date().getTime(),
        check: 999
      }
      const contract = Web3.utils.toChecksumAddress(
        '0x' + input.substring(34, 74)
      )
      const tokenApproved = Web3.utils.toChecksumAddress(item.to)
      approvedObj.input = input
      approvedObj.contract = contract
      approvedObj.tokenApproved = tokenApproved
      approvedObj.key = contract + tokenApproved
      approvedObj.timeStamp = item.timeStamp

      const allowance = input.substring(74)
      approvedObj.check = parseInt(allowance, 16)
      if (allowance.includes(unlimitedAllowance)) {
        approvedObj.allowance = 'Unlimited'
      } else {
        approvedObj.allowance = 'Limited'
      }
      return approvedObj
    })
    .reduce((pre, next) => {
      const records = pre.find((item) => {
        return next.key == item.key
      })
      if (isEmpty(records) && next.check > 0) {
        return [...pre, next]
      } else {
        return [...pre]
      }
    }, [])
  console.log(approveTransactions)
  return approveTransactions
}

export { getApproveTransaction }