<template>
  <section id="dashboard-analytics">
    <b-row class="match-height">
      <b-col lg="8" md="12">
        <coin-allocation />
      </b-col>
      <b-col lg="4" sm="12">
        <b-row>
          <coin-price />
        </b-row>
        <b-row>
          <coin-price />
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
export default class Home extends Vue {}
</script>

<style scoped></style>
