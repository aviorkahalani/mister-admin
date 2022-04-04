<template>
  <section v-if="leads && statusStats && srcStats && revenueStats" class="home">
    <v-container>
      <v-row>
        <v-col class="d-flex">
          <sparkline :revenueStats="revenueStats" />
        </v-col>
        <v-col>
          <v-container>
            <v-row>
              <v-col class="mb-6">
                <src-chart :srcStats="srcStats" />
              </v-col>
              <v-col class="mb-6">
                <status-chart :statusStats="statusStats" />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <mini-stats :stats="statusStats" />
    <order-overview :leads="leads" />
  </section>
</template>

<script>
import { leadService } from '@/services/lead-service'
import OrderOverview from '@/components/order-overview.vue'
import MiniStats from '@/components/mini-stats.vue'
import StatusChart from '@/components/status-chart.vue'
import SrcChart from '@/components/src-chart.vue'
import Sparkline from '../components/sparkline.vue'

export default {
  name: 'Home',
  data() {
    return {
      leads: null,
      statusStats: null,
      srcStats: null,
      revenueStats: null,
    }
  },
  async created() {
    this.leads = await leadService.query()
    this.statusStats = await leadService.getPerStatusStats()
    this.srcStats = await leadService.getPerSrcStats()
    this.revenueStats = await leadService.getRevenue()
  },
  components: { OrderOverview, MiniStats, StatusChart, SrcChart, Sparkline },
}
</script>
