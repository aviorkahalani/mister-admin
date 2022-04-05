<template>
  <Doughnut
    v-if="statusStats"
    :chart-id="chartId"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :width="200"
    :height="200"
  />
</template>

<script>
import { Doughnut } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'charts',
  props: {
    statusStats: Object,
  },
  computed: {
    chartId() {
      return Math.random() + ''
    },
    chartData() {
      return {
        labels: Object.keys(this.statusStats),
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: Object.values(this.statusStats),
          },
        ],
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Leads Per Status',
          },
        },
      }
    },
  },
  components: {
    Doughnut,
  },
}
</script>
