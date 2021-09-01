<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Coin Allocation</b-card-title>
    </b-card-header>

    <b-card-body>
      <!-- apex chart -->
      <vue-apex-charts
        type="donut"
        height="300"
        class="my-1"
        :options="chartOptions"
        :series="series"
      />

      <!-- chart info -->
      <div
        v-for="(data, index) in chartData.chartInfo"
        :key="data.name"
        class="d-flex justify-content-between"
        :class="index === chartData.chartInfo.length - 1 ? 'mb-0' : 'mb-1'"
      >
        <div class="series-info d-flex align-items-center">
          <b-img class="img" :src="data.icon" />
          <span class="font-weight-bolder ml-75 mr-25">{{ data.name }}</span
          ><span>- {{ data.usage }}%</span>
        </div>
        <div>
          <span>{{ data.upDown }}%</span>
          <feather-icon
            :icon="data.upDown > 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'"
            :class="data.upDown > 0 ? 'text-success' : 'text-danger'"
            class="mb-25 ml-25"
          />
        </div>
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
  BImg
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    BCardBody,
    VueApexCharts,
    BImg
  }
})
export default class CoinAllocation extends Vue {
  private series = [58.6, 34.9, 6.5]
  private chartOptions = {
    chart: {
      toolbar: {
        show: false
      }
    },
    labels: ['ETH', 'Moonbeam', 'Moonriver'],
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    comparedResult: [2, -3, 8],
    stroke: { width: 0 },
    colors: [$themeColors.primary, $themeColors.warning, $themeColors.danger]
  }
  private chartData = {
    lastDays: ['Last 28 Days', 'Last Month', 'Last Year'],
    chartInfo: [
      {
        icon:
          'https://logos.covalenthq.com/tokens/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
        name: 'ETH',
        iconColor: 'text-primary',
        usage: 58.6,
        upDown: 2
      },
      {
        icon:
          'https://logos.covalenthq.com/tokens/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
        name: 'USD Coin',
        iconColor: 'text-warning',
        usage: 34.9,
        upDown: 8
      },
      {
        icon:
          'https://logos.covalenthq.com/tokens/0xbcca60bb61934080951369a648fb03df4f96263c.png',
        name: 'Aave',
        iconColor: 'text-danger',
        usage: 6.5,
        upDown: -5
      }
    ]
  }
}
</script>
<style lang="scss" scoped>
.img {
  max-width: 24px;
}
</style>
