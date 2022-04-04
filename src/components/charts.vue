<template>
  <section class="charts">
    <Doughnut :chart-options="chartOptions" :chart-data="chartData" />
  </section>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'charts',
  props: {
    statusStats: Object,
  },
  data() {
    return {
      chartData: {
        labels: null,
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
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
  components: {
    Doughnut,
  },
}
</script>

<style></style>
