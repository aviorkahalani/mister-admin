<template>
  <section v-if="items" class="order-overview ma-4 rounded">
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      item-key="id"
      class="order-overview__table"
    ></v-data-table>
  </section>
</template>

<script>
import { leadService } from '../services/lead-service'

export default {
  name: 'order-overview',
  props: {
    leads: Array,
  },
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Lead', value: 'fullname' },
        { text: 'From', value: 'from' },
        { text: 'Price', value: 'price' },
        { text: 'Status', value: 'status' },
      ],
    }
  },
  computed: {
    items() {
      return this.leads.map(({ id, fullname, countries, price, status }) => {
        const formatedLead = {
          id,
          fullname,
          from: this.getFormattedCountries(countries),
          price,
          status: leadService.getStatusName(status),
        }
        return formatedLead
      })
    },
  },
  methods: {
    getFormattedCountries(countries) {
      return countries.map((c) => c.name).join(', ')
    },
  },
}
</script>

<style></style>
