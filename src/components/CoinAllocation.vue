<template>
  <section>
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
          <section v-if="topHolds.length > 0">
            <b-row>
              <b-col md="12" lg="12">
                <vue-apex-charts
                  type="donut"
                  height="250"
                  class="my-1"
                  :options="chartOptions"
                  :series="series"
                />
              </b-col>
            </b-row>
          </section>
          <template v-else>
            <div class="view-state empty">
              There's no balances in your wallet.
            </div>
          </template>
        </div>
      </b-card-body>
    </b-card>
    <b-card class="p-2">
      <template v-if="isLoading">
        <div class="view-networth-state loading">
          <div class="text-center text-danger">
            <b-spinner class="align-middle mr-1"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </div>
      </template>
      <section v-else>
        <b-row
          v-if="topHolds.length > 0"
          class="min-height d-flex justify-content-center"
        >
          <b-col md="6" class="pb-2">
            <div class="pb-1">
              <h4>NET WORTH</h4>
            </div>
            <b-media no-body>
              <b-media-aside class="mr-2">
                <b-avatar size="74" variant="light-success">
                  <feather-icon size="34" icon="DollarSignIcon" />
                </b-avatar>
              </b-media-aside>
              <b-media-body class="my-auto">
                <h2 class="font-weight-bolder mb-0">{{ networth }}</h2>
                <b-card-text class="font-small-3 mb-0">
                  Holding {{ balances.length }} Assets
                </b-card-text>
              </b-media-body>
            </b-media>
          </b-col>
          <b-col class="pl-3">
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
                  >{{ data.name }} ({{ data.percent }}%)</span
                >
              </div>
            </div>
          </b-col>
        </b-row>
        <template v-else>
          <div class="view-networth-state empty">
            There's no balances in your wallet.
          </div>
        </template>
      </section>
    </b-card>
  </section>
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
  BImg,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import Component from 'vue-class-component'
import Vue from 'vue'
import { Getter } from 'vuex-class'
import { bigNumber, convertToHumanUnit } from '@/utils/helpers'

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
    BSpinner,
    BMedia,
    BMediaAside,
    BAvatar,
    BMediaBody
  }
})
export default class CoinAllocation extends Vue {
  @Getter('debank/topHolds')
  private topHolds

  @Getter('debank/userBalances')
  private balances

  get isLoading() {
    return this.$store.getters['service/isLoading']('debank/getUserBalance')
  }
  get chartLabels() {
    return this.topHolds.map((item) => {
      return item.name
    })
  }
  get series() {
    return this.topHolds.map((item) => {
      return item.value
    })
  }
  get networth() {
    const sum = this.balances.reduce((sum, next) => sum + next.value, 0)
    return bigNumber(sum)
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
      colors: ['#64C9CF', '#FDE49C', '#FFB740', '#DF711B']
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
    height: 258px;
  }
}
.view-networth-state {
  display: flex;
  align-items: center;
  justify-content: center;

  &.loading,
  &.empty {
    min-height: 176.1px;
  }
}
.min-height {
  min-height: 176.1px;
}
</style>
