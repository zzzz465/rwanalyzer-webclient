import Vue from 'vue'
import index from './Index.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(index)
}).$mount('#app')
