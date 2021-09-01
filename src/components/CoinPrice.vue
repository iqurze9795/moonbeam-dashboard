<template>
  <b-card no-body>
    <b-card-body class="pb-0">
      <b-avatar class="mb-1" :variant="`light-${color}`" size="45">
        <feather-icon size="21" :icon="icon" />
      </b-avatar>
      <div class="truncate">
        <h2 class="mb-25 font-weight-bolder">
          {{ statistic }}
        </h2>
        <span>{{ statisticTitle }}</span>
      </div>
    </b-card-body>

    <vue-apex-charts
      type="area"
      height="100"
      width="100%"
      :options="chartOptionsComputed"
      :series="chartData"
    />
  </b-card>
</template>

<script>
import { BCard, BCardBody, BAvatar } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
export default {
  components: {
    VueApexCharts,
    BCard,
    BCardBody,
    BAvatar
  },
  props: {
    chartColor: {
      type: String,
      required: true,
      default: () => '#FF0B97'
    },
    icon: {
      type: String,
      required: true,
      default: () => 'PackageIcon'
    },
    statistic: {
      type: [Number, String],
      required: true
    },
    statisticTitle: {
      type: String,
      default: '38400'
    },
    color: {
      type: String,
      default: 'primary'
    },
    chartData: {
      type: Array,
      default: () => [
        {
          name: 'Orders',
          data: [10, 15, 8, 15, 7, 12, 8]
        }
      ]
    },
    chartOptions: {
      type: Object,
      default: null
    }
  },
  computed: {
    chartOptionsComputed() {
      if (this.chartOptions === null) {
        const options = JSON.parse(
          JSON.stringify({
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0
              }
            },
            chart: {
              toolbar: {
                show: false
              },
              sparkline: {
                enabled: true
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth',
              width: 2.5
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 0.9,
                opacityFrom: 0.5,
                opacityTo: 0.2,
                stops: [0, 80, 100]
              }
            },
            xaxis: {
              type: 'numeric',
              lines: {
                show: false
              },
              axisBorder: {
                show: false
              },
              labels: { show: false }
            },
            yaxis: [
              {
                y: 0,
                offsetX: 0,
                offsetY: 0,
                padding: {
                  left: 0,
                  right: 0
                }
              }
            ],
            tooltip: {
              x: { show: false }
            },
            theme: {
              monochrome: {
                enabled: true,
                color: this.chartColor,
                shadeTo: 'light',
                shadeIntensity: 0.65
              }
            }
          })
        )
        return options
      }
      return this.chartOptions
    }
  }
}
</script>
