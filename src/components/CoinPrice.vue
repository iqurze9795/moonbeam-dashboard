<template>
  <b-card no-body>
    <b-card-body class="pb-0">
      <b-row>
        <b-col>
          <div class="img-container pr-2">
            <img :src="icon" />
          </div>
        </b-col>
      </b-row>
      <b-row class="pl-1">
        <b-col class="d-flex justify-content-end">
          <div class="d-flex flex-column">
            <p
              class="mb-25 font-weight-bolder price"
              :class="change < 0 ? 'text-danger' : 'text-success'"
            >
              ${{ price }}
            </p>
            <p
              class="mb-25 font-weight-bolder d-flex justify-content-end"
              :class="change < 0 ? 'text-danger' : 'text-success'"
            >
              {{ changePercent }} %
            </p>
          </div>
          <feather-icon
            v-if="price !== 'N/A'"
            size="1.5x"
            :icon="change < 0 ? 'ChevronsDownIcon' : 'ChevronsUpIcon'"
            :class="change < 0 ? 'text-danger ml-1' : 'text-success ml-1'"
          />
        </b-col>
      </b-row>

      <div class="truncate">
        <h2 class="mb-25 font-weight-bolder">{{ name }}</h2>
        <span>{{ symbol }}</span>
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
import { BCard, BCardBody } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    VueApexCharts,
    BCard,
    BCardBody
  },
  props: {
    chartColor: {
      type: String,
      default: () => '#FF0B97'
    },
    icon: {
      type: String,
      required: true,
      default: () => ''
    },
    name: {
      type: [Number, String],
      required: true
    },
    price: {
      type: [Number, String],
      default: 'N/A'
    },
    color: {
      type: String,
      default: 'primary'
    },
    symbol: {
      type: String,
      default: '-'
    },
    change: {
      type: [Number, String]
    },
    changePercent: {
      type: [Number, String],
      default: '-'
    },
    chartData: {
      type: Array,
      default: () => [
        {
          name: 'N/A',
          data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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

<style lang="scss" scoped>
.img-container {
  width: 60px !important;
  height: 60px !important;
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
.price {
  font-size: 30px;
}
</style>
