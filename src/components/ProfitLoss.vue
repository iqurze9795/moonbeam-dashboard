<template>
  <b-card no-body>
    <b-card-header class="align-items-baseline">
      <div>
        <b-card-title class="mb-25">Portfolio Value</b-card-title>
        <b-card-text class="mb-0"> Balance: 12,840$ </b-card-text>
      </div>
      <feather-icon
        icon="SettingsIcon"
        size="18"
        class="text-muted cursor-pointer"
      />
    </b-card-header>

    <b-card-body class="pb-0">
      <!-- apex chart -->
      <vue-apex-charts
        type="line"
        height="340"
        :options="salesLine.chartOptions"
        :series="salesLine.series"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BCardText
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BCardText,
    BCardTitle,
    BCardBody
  },
  data() {
    return {
      salesLine: {
        series: [
          {
            name: 'Sales',
            data: [
              140,
              180,
              150,
              205,
              160,
              295,
              125,
              255,
              205,
              305,
              240,
              0,
              140,
              180,
              150,
              205,
              160,
              295,
              125,
              255,
              205,
              305,
              240,
              110,
              255,
              205,
              305,
              240,
              255
            ]
          }
        ],
        chartOptions: {
          chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            type: 'line',
            dropShadow: {
              enabled: true,
              top: 18,
              left: 2,
              blur: 5,
              opacity: 0.2
            },
            offsetX: -10
          },
          stroke: {
            curve: 'smooth',
            width: 4
          },
          grid: {
            borderColor: '#ebe9f1',
            padding: {
              top: -20,
              bottom: 5,
              left: 20
            }
          },
          legend: {
            show: false
          },
          colors: ['#df87f2'],
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              inverseColors: false,
              gradientToColors: [$themeColors.primary],
              shadeIntensity: 1,
              type: 'horizontal',
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100]
            }
          },
          markers: {
            size: 0,
            hover: {
              size: 5
            }
          },
          xaxis: {
            labels: {
              offsetY: 5,
              style: {
                colors: '#b9b9c3',
                fontSize: '0.857rem'
              }
            },
            axisTicks: {
              show: false
            },
            categories: [
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26',
              '27',
              '28',
              '29',
              '30'
            ],
            axisBorder: {
              show: false
            },
            tickPlacement: 'on'
          },
          yaxis: {
            tickAmount: 5,
            labels: {
              style: {
                colors: '#b9b9c3',
                fontSize: '0.857rem'
              },
              formatter(val) {
                return val > 999 ? `${(val / 1000).toFixed(1)}k` : val
              }
            }
          },
          tooltip: {
            x: { show: false }
          }
        }
      }
    }
  }
}
</script>
