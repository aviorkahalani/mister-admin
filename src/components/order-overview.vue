<template>
  <section v-if="items" class="order-overview">
    <v-data-table
      dense
      :headers="headers"
      :items="items"
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
          from: countries[0].name,
          price,
          status: leadService.getStatusName(status),
        }
        return formatedLead
      })
    },
  },
}
</script>

<style></style>
