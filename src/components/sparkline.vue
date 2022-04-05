<template>
  <v-sparkline
    v-if="revenueStats"
    :value="value"
    :labels="labels"
    :gradient="gradient"
    :smooth="radius || false"
    :padding="padding"
    :line-width="width"
    :stroke-linecap="lineCap"
    :gradient-direction="gradientDirection"
    :fill="fill"
    :type="type"
    :auto-line-width="autoLineWidth"
    auto-draw
  ></v-sparkline>
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

export default {
  props: {
    revenueStats: Object,
  },
  data: () => ({
    width: 4,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    gradient: gradients[5],
    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false,
  }),
  computed: {
    value() {
      return Object.values(this.revenueStats)
    },
    labels() {
      return Object.keys(this.revenueStats)
    },
  },
}
</script>
