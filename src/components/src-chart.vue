<template>
  <Pie
    v-if="srcStats"
    :chart-id="chartId"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :width="200"
    :height="200"
  />
</template>

<script>
import { Pie } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'charts',
  props: {
    srcStats: Object,
  },
  computed: {
    chartId() {
      return Math.random() + ''
    },
    chartData() {
      return {
        labels: Object.keys(this.srcStats),
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: Object.values(this.srcStats),
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
            text: 'Leads Per Source',
          },
        },
      }
    },
  },
  components: {
    Pie,
  },
}
</script>
