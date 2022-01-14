<template>
  <section id="dashboard-analytics">
    <b-row class="match-height">
      <b-col lg="4" md="12">
        <b-row class="match-height">
          <b-col lg="12" md="6">
            <coin-price
              chartColor="#F2B705"
              :name="`Moonriver`"
              :icon="require('@/assets/images/icons/moonriver-logo.png')"
              :chartData="coinMovrPriceHistory"
              :change="movrPriceChange"
              :price="movrPrice"
              :priceRange="movrPriceRange"
              :changePercent="movrChangePercent"
              symbol="MOVR"
            />
          </b-col>
          <b-col lg="12" md="6">
            <coin-price
              :name="`Glimmer`"
              :icon="require('@/assets/images/icons/moonbeam-logo.png')"
              :chartData="coinGlmrPriceHistory"
              :change="glmrPriceChange"
              :price="glmrPrice"
              :priceRange="glmrPriceRange"
              :changePercent="glmrChangePercent"
              symbol="GLMR"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="8" md="12">
        <coin-allocation />
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
import CoinPrice from '@/components/cards/CoinPrice.vue'
import ProfitLoss from '@/components/ProfitLoss.vue'
import CoinHolding from '@/components/list/CoinHoldingList.vue'
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
    TrendingCoin,
  },
})
export default class Home extends Vue {
  @Action('coinGecko/getCoinPriceHistory')
  private getCoinPriceHistory
  @Action('coinGecko/getCoinPrice')
  private getCoinPrice
  get coinMovrPriceHistory() {
    return [
      {
        name: 'Moonriver',
        data: this.$store.getters['coinGecko/coinPriceHistory']('moonriver'),
      },
    ]
  }
  get movrPriceChange() {
    const priceHistory = this.$store.getters['coinGecko/coinPriceHistory'](
      'moonriver',
    )
    if (priceHistory.length > 0) {
      return bigNumber(priceHistory[priceHistory.length - 1] - priceHistory[0])
    }
    return 0
  }
  get movrPrice() {
    return this.$store.getters['coinGecko/coinPrice']('moonriver')
  }
  get movrPriceRange() {
    const priceHistory = this.$store.getters['coinGecko/coinPriceHistory'](
      'moonriver',
    )
    const maxPrice = Math.max(...priceHistory)
    const minPrice = Math.min(...priceHistory)
    return [minPrice, maxPrice]
  }
  get movrChangePercent() {
    return bigNumber(((this.movrPriceChange as any) / this.movrPrice) * 100)
  }
  //---
    get coinGlmrPriceHistory() {
    return [
      {
        name: 'Moonbeam',
        data: this.$store.getters['coinGecko/coinPriceHistory']('moonbeam'),
      },
    ]
  }
  get glmrPriceChange() {
    const priceHistory = this.$store.getters['coinGecko/coinPriceHistory'](
      'moonbeam',
    )
    if (priceHistory.length > 0) {
      return bigNumber(priceHistory[priceHistory.length - 1] - priceHistory[0])
    }
    return 0
  }
  get glmrPrice() {
    return this.$store.getters['coinGecko/coinPrice']('moonbeam')
  }
  get glmrPriceRange() {
    const priceHistory = this.$store.getters['coinGecko/coinPriceHistory'](
      'moonbeam',
    )
    const maxPrice = Math.max(...priceHistory)
    const minPrice = Math.min(...priceHistory)
    return [minPrice, maxPrice]
  }
  get glmrChangePercent() {
    return bigNumber(((this.glmrPriceChange as any) / this.glmrPrice) * 100)
  }

  async mounted() {
    await Promise.all([
      this.getCoinPriceHistory({ coin: 'moonriver' }),
      this.getCoinPrice({ coin: 'moonriver' }),
      this.getCoinPriceHistory({ coin: 'moonbeam' }),
      this.getCoinPrice({ coin: 'moonbeam' }),
    ])
  }
}
</script>

<style scoped></style>
