<template>
  <section id="dashboard-analytics">
    <b-row class="match-height">
      <b-col lg="8" md="12">
        <coin-allocation />
      </b-col>
      <b-col lg="4" md="12">
        <b-row>
          <coin-price
            chartColor="#F2B705"
            :name="`Moonriver`"
            :icon="require('@/assets/images/icons/moonriver-logo.png')"
            :chartData="coinPriceHistory"
            :change="change"
            :price="price"
            symbol="MOVR"
          />
        </b-row>
        <b-row>
          <coin-price
            :name="`Moonbeam`"
            :icon="require('@/assets/images/icons/moonbeam-logo.png')"
            symbol="GLEM"
          />
        </b-row>
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="12">
        <trending-coin />
      </b-col>
    </b-row>
    <!-- <b-row class="match-height">
      <b-col lg="12">
        <profit-loss />
      </b-col>
    </b-row> -->
    <pre>Price::{{ price }}</pre>
    <b-row class="match-height">
      <b-col lg="12">
        <coin-holding />
      </b-col>
    </b-row>
  </section>
</template>

<script lang="ts">
import { BRow, BCol } from 'bootstrap-vue'
import { Component, Vue } from 'vue-property-decorator'
import CoinPrice from '@/components/CoinPrice.vue'
import ProfitLoss from '@/components/ProfitLoss.vue'
import CoinHolding from '@/components/CoinHoldingList.vue'
import CoinAllocation from '@/components/CoinAllocation.vue'
import TrendingCoin from '@/components/TrendingCoin.vue'
import { Action } from 'vuex-class'
import { bigNumber } from '@/utils/helpers'

@Component({
  components: {
    BCol,
    BRow,
    CoinPrice,
    ProfitLoss,
    CoinHolding,
    CoinAllocation,
    TrendingCoin
  }
})
export default class Home extends Vue {
  @Action('coinGecko/getCoinPriceHistory')
  private getCoinPriceHistory
  @Action('coinGecko/getCoinPrice')
  private getCoinPrice
  get coinPriceHistory() {
    return [
      {
        name: 'Moonriver',
        data: this.$store.getters['coinGecko/coinPriceHistory']('moonriver')
      }
    ]
  }
  get change() {
    const priceHistory = this.$store.getters['coinGecko/coinPriceHistory'](
      'moonriver'
    )
    if (priceHistory.length > 0) {
      return bigNumber(priceHistory[priceHistory.length - 1] - priceHistory[0])
    }
    return 0
  }
  get price() {
    return this.$store.getters['coinGecko/coinPrice']('moonriver')
  }
  async mounted() {
    await this.getCoinPriceHistory({ coin: 'moonriver' })
    await this.getCoinPrice({ coin: 'moonriver' })
  }
}
</script>

<style scoped></style>
