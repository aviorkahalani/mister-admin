<template>
  <div v-if="leads" class="home">
    <order-overview :leads="leads" />
    <!-- <charts :charts="" /> -->
  </div>
</template>

<script>
import { leadService } from '@/services/lead-service'
import OrderOverview from '../components/order-overview.vue'
import Charts from '../components/charts.vue'

export default {
  name: 'Home',
  data() {
    return {
      leads: null,
    }
  },
  async created() {
    this.leads = await leadService.query()
  },
  components: { OrderOverview, Charts },
}
</script>
