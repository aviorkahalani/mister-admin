import Vue from 'vue'
import app from './app.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: (h) => h(app)
}).$mount('#app')
