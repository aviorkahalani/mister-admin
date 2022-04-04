<template>
  <div v-if="leads && statusStats && srcStats" class="home">
    <order-overview :leads="leads" />
    <mini-stats :stats="statusStats" />
    <src-chart :srcStats="srcStats" />
    <status-chart :statusStats="statusStats" />
  </div>
</template>

<script>
import { leadService } from '@/services/lead-service'
import OrderOverview from '@/components/order-overview.vue'
import MiniStats from '@/components/mini-stats.vue'
import StatusChart from '@/components/status-chart.vue'
import SrcChart from '@/components/src-chart.vue'

export default {
  name: 'Home',
  data() {
    return {
      leads: null,
      statusStats: null,
      srcStats: null,
    }
  },
  async created() {
    this.leads = await leadService.query()
    this.statusStats = await leadService.getPerStatusStats()
    this.srcStats = await leadService.getPerSrcStats()
  },
  components: { OrderOverview, MiniStats, StatusChart, SrcChart },
}
</script>
