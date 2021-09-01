<template>
  <section id="dashboard-analytics">
    <b-row class="match-height">
      <b-col lg="6" md="12">
        <coin-allocation />
      </b-col>
      <b-col lg="6" sm="12">
        <transition />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="12">
        <trending-coin />
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col lg="12">
        <profit-loss />
      </b-col>
    </b-row>

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
import Transition from '@/components/Transaction.vue'
import ProfitLoss from '@/components/ProfitLoss.vue'
import CoinHolding from '@/components/CoinHoldingList.vue'
import CoinAllocation from '@/components/CoinAllocation.vue'
import TrendingCoin from '@/components/TrendingCoin.vue'

@Component({
  components: {
    BCol,
    BRow,
    Transition,
    ProfitLoss,
    CoinHolding,
    CoinAllocation,
    TrendingCoin
  }
})
export default class Home extends Vue {}
</script>

<style scoped></style>
