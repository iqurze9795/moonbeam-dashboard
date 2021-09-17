<template>
  <section id="dashboard-analytics">
    <b-card no-body class="card-company-table">
      <b-card-header> <h4>Token Allowance</h4> </b-card-header>
      <transaction :txs="allowances" />
      {{ totalGasUse }}
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
  @Getter('blockScan/rawTx')
  private rawTx
  @Getter('blockScan/allowances')
  private allowances
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
  

  get totalGasUse() {
    const totalGasUse = this.rawTx.reduce((sum, next) => {
      console.log(next.gasUsed)
      return sum + parseInt(next.gasUsed)
    }, 0)
    return totalGasUse
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
