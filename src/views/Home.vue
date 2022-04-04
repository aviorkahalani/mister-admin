<template>
  <div v-if="leads" class="home">
    <order-overview :leads="leads" />
    <mini-stats :stats="stats" />
    <!-- <charts :charts="" /> -->
  </div>
</template>

<script>
import { leadService } from '@/services/lead-service'
import OrderOverview from '../components/order-overview.vue'
import MiniStats from '../components/mini-stats.vue'
import Charts from '../components/charts.vue'

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
  components: { OrderOverview, MiniStats, Charts },
}
</script>
