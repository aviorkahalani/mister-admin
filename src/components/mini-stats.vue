<template>
  <v-container class="mini-stats">
    <v-row>
      <v-col class="card" v-for="(status, key, idx) in stats" :key="idx">
        <v-card class="card__content fill-height pa-8 text-center" :class="bgColors[key]">
          There are <span class="font-weight-bold text-h6">{{ status }}</span> leads with
          status <span class="font-weight-black">{{ key }}</span>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'mini-stats',
  props: {
    stats: Object,
  },
  data() {
    return {
      bgColors: {
        done: 'green lighten-3',
        open: 'cyan accent-1',
        hold: 'orange accent-1',
        process: 'indigo accent-1',
      },
    }
  },
}
</script>
