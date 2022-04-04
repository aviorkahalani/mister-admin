<template>
  <div v-if="leads" class="home">
    <order-overview :leads="leads" />
    <mini-stats :stats="stats" />
  </div>
</template>

<script>
import { leadService } from '@/services/lead-service'
import OrderOverview from '../components/order-overview.vue'
import MiniStats from '../components/mini-stats.vue'

export default {
  name: 'Home',
  data() {
    return {
      leads: null,
      stats: null,
    }
  },
  async created() {
    this.leads = await leadService.query()
    this.stats = await leadService.getPerStatusStats()
  },
  components: { OrderOverview, MiniStats },
}
</script>
