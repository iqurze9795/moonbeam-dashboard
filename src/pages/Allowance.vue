<template>
  <section id="dashboard-analytics">
    <b-card no-body class="card-company-table">
      <b-card-header> <h4>Token Allowance</h4> </b-card-header>
      <transaction :txs="allowances" />
    </b-card>
  </section>
</template>
<script lang="ts">
import { BCard, BTable, BSpinner, BAvatar, BImg } from 'bootstrap-vue'
import { isEmpty } from 'lodash'
import { Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import Transaction from '@/components/list/Transaction.vue'
import Web3 from 'web3'
@Component({
  components: {
    BCard,
    BTable,
    BAvatar,
    BSpinner,
    BImg,
    Transaction
  }
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
        const contract = web3.utils.toChecksumAddress(
          '0x' + input.substring(34, 74)
        )
        const tokenApproved = web3.utils.toChecksumAddress(item.to)
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

  get isLoading() {
    return this.$store.getters['service/isLoading']('classA/getUserBalance')
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
<style lang="scss" scoped>
.img-container {
  width: 35px !important;
  height: 35px !important;
  display: inline-block;
  border-radius: 100%;
  overflow: hidden;
  &:not(:first-child) {
    margin-left: -15px;
  }

  > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
.view-state {
  display: flex;
  align-items: center;
  justify-content: center;

  &.loading,
  &.empty {
    height: 300px;
  }
}
</style>
