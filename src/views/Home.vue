<template>
  <div v-if="leads" class="home">
    <order-overview :leads="leads" />
  </div>
</template>

<script>
import { leadService } from '@/services/lead-service'
import OrderOverview from '../components/order-overview.vue'

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
  components: { OrderOverview },
}
</script>
