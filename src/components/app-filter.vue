<template>
  <section class="app-filter pb-3">
    <v-container>
      <v-row class="align-center">
        <v-col>
          <v-text-field @input="setFilter" v-model="filterBy.txt" label="Search by txt" />
        </v-col>
        <v-col>
          <v-select
            @change="setFilter"
            v-model="filterBy.countries"
            :items="countries"
            label="Select Coutnries"
            multiple
            chips
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { utilService } from '../services/util-service'

export default {
  name: 'app-filter',
  props: {
    countries: Array,
  },
  data() {
    return {
      filterBy: {
        txt: '',
        countries: [],
      },
    }
  },
  created() {
    this.setFilter = utilService.debounce(this.setFilter)
  },
  methods: {
    setFilter() {
      this.$emit('setFilter', this.filterBy)
    },
  },
}
</script>
