<template>
  <section id="dashboard-analytics">
    <template v-if="isSupportChainId">
      <statistic-card :items="statisticsItems" />
      <b-card no-body class="card-company-table">
        <b-card-header> <h4>Token Allowance</h4> </b-card-header>
        <section v-if="isLoading">
          <div class="view-state loading">
            <div class="text-center text-danger">
              <b-spinner class="align-middle mr-1"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </div>
        </section>
        <section v-else>
          <transaction v-if="allowances.length > 0" :txs="allowances" />
          <b-card v-else>
            <div class="view-state empty">
              <p>No transaction.</p>
            </div>
          </b-card>
        </section>
      </b-card>
    </template>
    <template v-else>
      <section>
        <b-card>
          <div class="view-state empty">
            <div class="d-flex align-items-center">
              <b-avatar
                size="40"
                :src="mapChainLogo(chainId)"
                variant="light-primary"
                badge
                class="badge-minimal"
                badge-variant="danger"
              >
              </b-avatar>
              <div class="d-flex flex-column pl-1">
                <p class="user-name font-weight-bolder mb-0">
                  Revoke feature doesn't support
                </p>
                <p class="user-name font-weight-bolder mb-0">
                  {{ mapChainName(chainId) }}
                </p>
                <span class="user-status">Chain ID: {{ chainId }}</span>
              </div>
            </div>
          </div>
        </b-card>
      </section>
    </template>
  </section>
</template>
<script lang="ts">
import { BCard, BTable, BSpinner, BAvatar, BImg } from 'bootstrap-vue'
import { Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import {
  mapChainLogo,
  mapChainName,
  supportChainID,
  mapChainNativeCoin
} from '@/utils/chainInfo'
import StatisticCard from '@/components/cards/StatisticCard.vue'
import Transaction from '@/components/list/Transaction.vue'
import Web3 from 'web3'
@Component({
  components: {
    BCard,
    BTable,
    BAvatar,
    BSpinner,
    BImg,
    Transaction,
    StatisticCard
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

  get successTx() {
    return this.rawTx.reduce((sum, next) => {
      if (next.isError === '0') {
        return sum + 1
      } else {
        return sum
      }
    }, 0)
  }
  get failedTx() {
    return this.rawTx.reduce((sum, next) => {
      if (next.isError === '1') {
        return sum + 1
      } else {
        return sum
      }
    }, 0)
  }
  get totalGasUse() {
    console.log(this.rawTx)
    const totalGasUse = this.rawTx.reduce((sum, next) => {
      return sum + parseInt(next.gasUsed)
    }, 0)
    const wei = Web3.utils.toWei(`${totalGasUse}`, 'gwei')
    return Web3.utils.fromWei(`${wei}`, 'ether')
  }

  get isLoading() {
    return this.$store.getters['service/isLoading']('blockScan/getTransactions')
  }
  get statisticsItems() {
    return [
      {
        icon: 'TrendingUpIcon',
        color: 'light-primary',
        title: this.rawTx.length,
        subtitle: 'Total Transaction',
        customClass: 'mb-2 mb-xl-0'
      },
      {
        icon: 'CheckCircleIcon',
        color: 'light-success',
        title: this.successTx,
        subtitle: 'Total success tx',
        customClass: 'mb-2 mb-xl-0'
      },
      {
        icon: 'InfoIcon',
        color: 'light-danger',
        title: this.failedTx,
        subtitle: 'Total failed tx',
        customClass: 'mb-2 mb-sm-0'
      },
      {
        icon: 'DollarSignIcon',
        color: 'light-warning',
        title: `${this.totalGasUse}`,
        subtitle: `Total ${mapChainNativeCoin[this.chainId]} used in GAS`,
        customClass: 'mb-2 mb-sm-0'
      }
    ]
  }

  get isSupportChainId() {
    console.log(this.chainId)
    return supportChainID.includes(this.chainId)
  }

  private async mounted() {
    if (this.address && this.isSupportChainId) {
      await this.getTransactions({
        address: this.address,
        provider: this.provider,
        chainId: this.chainId
      })
    }
  }

  private mapChainLogo(chainId) {
    return mapChainLogo[chainId]
  }
  private mapChainName(chainId) {
    return mapChainName[chainId]
  }

  @Watch('address')
  private async addressChange() {
    if (this.isSupportChainId) {
      await this.getTransactions({
        address: this.address,
        provider: this.provider
      })
    }
  }
  @Watch('chainId')
  private async chainIdChange() {
    if (this.isSupportChainId) {
      await this.getTransactions({
        address: this.address,
        provider: this.provider,
        chainId: this.chainId
      })
    }
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
