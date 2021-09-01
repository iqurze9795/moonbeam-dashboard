<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Portfolio Exposure</b-card-title>
    </b-card-header>

    <b-card-body>
      <!-- apex chart -->
      <template v-if="isLoading">
        <div class="view-state loading">
          <div class="text-center text-danger">
            <b-spinner class="align-middle mr-1"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </div>
      </template>
      <div v-else>
        <b-row v-if="topHolds.length > 0">
          <b-col md="8" lg="8">
            <vue-apex-charts
              type="donut"
              height="330"
              class="my-1"
              :options="chartOptions"
              :series="series"
            />
          </b-col>

          <b-col class="pt-4">
            <!-- chart info -->
            <div
              v-for="(data, index) in topHolds"
              :key="index"
              class="d-flex justify-content-between"
              :class="index === topHolds.length - 1 ? 'mb-0' : 'mb-1'"
            >
              <div class="series-info d-flex align-items-center">
                <div class="img-container">
                  <img :src="data.logoUrl" />
                </div>
                <span class="font-weight-bolder ml-75 mr-25"
                  >{{ data.label.symbol }} ({{ data.percent }}%)</span
                >
              </div>
            </div>
          </b-col>
        </b-row>
        <template v-else>
          <div class="view-state empty">No data found.</div>
        </template>
      </div>
    </b-card-body>
  </b-card>
</template>

<script lang="ts">
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BDropdown,
  BDropdownItem,
  BCardBody,
  BSpinner,
  BImg
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import Component from 'vue-class-component'
import Vue from 'vue'
import { Getter } from 'vuex-class'

@Component({
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    BCardBody,
    VueApexCharts,
    BImg,
    BSpinner
  }
})
export default class CoinAllocation extends Vue {
  @Getter('classA/topHolds')
  private topHolds

  get isLoading() {
    return this.$store.getters['service/isLoading']('classA/getUserBalance')
  }
  get chartLabels() {
    return this.topHolds.map((item) => {
      return item.label
    })
  }
  get series() {
    return this.topHolds.map((item) => {
      return parseInt(item.percent)
    })
  }
  get chartOptions() {
    return {
      chart: {
        toolbar: {
          show: false
        }
      },
      // labels: [ "WOO", "ETH", "USDC", "aUSDC" ],
      labels: this.chartLabels,
      dataLabels: {
        enabled: false
      },
      legend: { show: false },
      comparedResult: [2, -3, 8],
      stroke: { width: 0 },
      colors: [$themeColors.primary, $themeColors.warning, $themeColors.danger]
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
</style>

<style lang="scss" scoped>
.view-state {
  display: flex;
  align-items: center;
  justify-content: center;

  &.loading,
  &.empty {
    height: 380px;
  }
}
</style>
