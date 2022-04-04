<template>
  <Pie :chart-id="chartId" :chart-options="chartOptions" :chart-data="chartData" />
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
  data() {
    return {
      chartId: Math.random() + '',
      chartData: {
        labels: null,
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: null,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  created() {
    console.log('srcStats')
    this.chartData.labels = Object.keys(this.srcStats)
    this.chartData.datasets[0].data = Object.values(this.srcStats)
  },
  components: {
    Pie,
  },
}
</script>
