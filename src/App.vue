<template>
  <v-app>
    <app-header />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from './components/app-header.vue'

export default {
  name: 'App',

  data: () => ({}),
  components: {
    AppHeader,
  },
}
</script>
