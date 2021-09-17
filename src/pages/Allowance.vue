<template>
  <section>
    <pre>{{ address }}</pre>
    <pre>{{ allowances }}</pre>
  </section>
</template>
<script lang="ts">
import { isEmpty } from 'lodash'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Web3 from 'web3'
@Component({
  components: {}
})
export default class Allowance extends Vue {
  @Action('blockScan/getTransactions')
  private getTransactions
  @Getter('preference/provider')
  private provider
  @Getter('preference/address')
  private address
  @Getter('preference/chainId')
  private chainId
  @Getter('blockScan/tx')
  private tx

  private approvalHash = '0x095ea7b3'
  private unlimitedAllowance =
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
  private approvalABI = [
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'tokens',
          type: 'uint256'
        }
      ],
      name: 'approve',
      outputs: [
        {
          internalType: 'bool',
          name: 'success',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]

  private getApproveTransaction(txs) {
    type ApprovedObject = {
      contract: string
      tokenApproved: string
      allowance: string
      input: string
      key: string
    }
    const web3 = new Web3(this.provider)
    const approveTxs = txs.filter((item) => {
      const { input } = item
      return String(input).includes(this.approvalHash)
    })
    //https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/0xe9e7cea3dedca5984780bafc599bd69add087d56
    const approveTransactions = approveTxs
      .map((item) => {
        const { input } = item
        let approvedObj: ApprovedObject = {
          contract: '',
          tokenApproved: '',
          allowance: '',
          input: '',
          key: ''
        }
        const contract = web3.utils.toChecksumAddress(item.to)
        const tokenApproved = web3.utils.toChecksumAddress(
          '0x' + input.substring(34, 74)
        )
        approvedObj.input = input
        approvedObj.contract = contract
        approvedObj.tokenApproved = tokenApproved
        approvedObj.key = contract + tokenApproved

        let allowance = input.substring(74)

        if (allowance.includes(this.unlimitedAllowance)) {
          approvedObj.allowance = 'unlimited'
        } else {
          approvedObj.allowance = 'limited'
        }
        return approvedObj
      })
      .reduce((pre, next) => {
        const records = pre.find((item) => {
          return next.key == item.key
        })
        if (isEmpty(records)) {
          return [...pre, next]
        } else {
          return [...pre]
        }
      }, [])

    return approveTransactions
  }

  get allowances() {
    return this.getApproveTransaction(this.tx)
  }
  private async mounted() {
    if (this.address) {
      await this.getTransactions({ address: this.address })
    }
  }

  @Watch('address')
  private async addressChange() {
    await this.getTransactions({ address: this.address })
  }
}
</script>
