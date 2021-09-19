import { isEmpty } from "lodash"
import Web3 from 'web3'
import { ethers } from 'ethers'
import ABI from '@/utils/api.json'
const approvalHash = '0x095ea7b3'
const unlimitedAllowance =
  'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

const getConntractInfo = async ({ provider, address }) => {
  const web3Provider = new ethers.providers.Web3Provider(provider)
  try {
    const contract = new ethers.Contract(
      address,
      ABI.ERC_TOKEN,
      web3Provider
    )
    const name = await contract.symbol()
    return name
  } catch (e) {
    return "Unknown"
  }

}
const getApproveTransaction = async (txs) => {
  type ApprovedObject = {
    contract: string
    tokenApproved: string
    allowance: string
    input: string
    key: string
    timeStamp: number
    check: number
    symbol: string
  }
  const approveTxs = txs.filter((item) => {
    const { input } = item
    return String(input).includes(approvalHash)
  })
  const revokedList: string[] = []
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
        check: 999,
        symbol: "Unknow"
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
      // return [...pre, next]
      if (next.check === 0) {
        revokedList.push(next.key)
        return [...pre]
      }
      else if (isEmpty(records) && !revokedList.includes(next.key)) {
        return [...pre, next]
      } else {
        return [...pre]
      }
    }, [])
  // console.log("",approveTransactions)
  return approveTransactions
}

export { getApproveTransaction, getConntractInfo }