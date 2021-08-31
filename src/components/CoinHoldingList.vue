<template>
  <b-card no-body class="card-browser-states">
    <b-card-header>
      <div>
        <b-card-title>Coin holding</b-card-title>
        <b-card-text class="font-small-2"> Counter August 2020 </b-card-text>
      </div>

      <b-dropdown
        variant="link"
        no-caret
        class="chart-dropdown"
        toggle-class="p-0"
      >
        <template #button-content>
          <feather-icon
            icon="MoreVerticalIcon"
            size="18"
            class="text-body cursor-pointer"
          />
        </template>
        <b-dropdown-item href="#"> Last 28 Days </b-dropdown-item>
        <b-dropdown-item href="#"> Last Month </b-dropdown-item>
        <b-dropdown-item href="#"> Last Year </b-dropdown-item>
      </b-dropdown>
    </b-card-header>

    <!-- body -->
    <b-card-body>
      <div
        v-for="(browser, index) in browserData"
        :key="index"
        class="browser-states"
      >
        <b-media no-body>
          <b-media-aside class="mr-1">
            <b-img class="img" :src="browser.logo_url" alt="browser img" />
          </b-media-aside>
          <b-media-body>
            <h6 class="align-self-center my-auto">
              {{ browser.contract_name }}
            </h6>
          </b-media-body>
        </b-media>
        <div class="d-flex align-items-center">
          <span class="font-weight-bold text-body-heading mr-1"
            >{{ format(browser.balance, browser.contract_decimals) }}
            {{ browser.contract_ticker_symbol }}</span
          >
          <vue-apex-charts
            type="radialBar"
            height="30"
            width="30"
            :options="chartData[index].options"
            :series="chartData[index].series"
          />
        </div>
      </div>
    </b-card-body>
    <!--/ body -->
  </b-card>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BMedia,
  BMediaAside,
  BMediaBody,
  BImg,
  BDropdown,
  BDropdownItem
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import { convertToHumanUnit } from '@/utils/helpers'
/* eslint-disable global-require */
const $trackBgColor = '#e9ecef'
export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BMediaAside,
    BMediaBody,
    BImg,
    BDropdown,
    BDropdownItem,
    VueApexCharts
  },
  data() {
    return {
      chartData: [],
      chartClone: {},
      chartColor: [
        $themeColors.primary,
        $themeColors.warning,
        $themeColors.secondary,
        $themeColors.info,
        $themeColors.danger
      ],
      chartSeries: [54.4, 6.1, 14.6, 4.2, 8],
      browserData: [
        {
          contract_decimals: 18,
          contract_name: 'Ether',
          contract_ticker_symbol: 'ETH',
          contract_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          supports_erc: null,
          logo_url:
            'https://logos.covalenthq.com/tokens/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
          type: 'cryptocurrency',
          balance: '1238668755776277796',
          balance_24h: '1238668755776277796',
          quote_rate: 3203.5034,
          quote_rate_24h: 3191.3103,
          quote: 3968.0796,
          quote_24h: 3952.9763,
          nft_data: null
        },
        {
          contract_decimals: 6,
          contract_name: 'USD Coin',
          contract_ticker_symbol: 'USDC',
          contract_address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
          type: 'stablecoin',
          balance: '3860028142',
          balance_24h: '3860028142',
          quote_rate: 0.9960836,
          quote_rate_24h: 0.9827241,
          quote: 3844.911,
          quote_24h: 3793.3425,
          nft_data: null
        },
        {
          contract_decimals: 6,
          contract_name: 'Aave interest bearing USDC',
          contract_ticker_symbol: 'aUSDC',
          contract_address: '0xbcca60bb61934080951369a648fb03df4f96263c',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xbcca60bb61934080951369a648fb03df4f96263c.png',
          type: 'cryptocurrency',
          balance: '810250919',
          balance_24h: '810132656',
          quote_rate: 0.9909886,
          quote_rate_24h: 1.009223,
          quote: 802.94946,
          quote_24h: 817.6045,
          nft_data: null
        },
        {
          contract_decimals: 18,
          contract_name: 'Dai Stablecoin',
          contract_ticker_symbol: 'DAI',
          contract_address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x6b175474e89094c44da98b954eedeac495271d0f.png',
          type: 'stablecoin',
          balance: '56291163153274816780',
          balance_24h: '56291163153274816780',
          quote_rate: 0.99293077,
          quote_rate_24h: 1.0017753,
          quote: 55.893227,
          quote_24h: 56.391094,
          nft_data: null
        },
        {
          contract_decimals: 18,
          contract_name: 'Matic Token',
          contract_ticker_symbol: 'MATIC',
          contract_address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png',
          type: 'dust',
          balance: '0',
          balance_24h: '0',
          quote_rate: null,
          quote_rate_24h: 1.3983256,
          quote: 0.0,
          quote_24h: 0.0,
          nft_data: null
        }
      ],
      chart: {
        series: [65],
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [$themeColors.primary],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: $trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    }
  },
  created() {
    for (let i = 0; i < this.browserData.length; i += 1) {
      const chartClone = JSON.parse(JSON.stringify(this.chart))
      chartClone.options.colors[0] = this.chartColor[i]
      chartClone.series[0] = this.chartSeries[i]
      this.chartData.push(chartClone)
    }
  },
  methods: {
    format(value, digit) {
      return convertToHumanUnit(value, digit)
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  max-width: 24px;
}
</style>
