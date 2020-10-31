import Vue from 'vue'
import index from './Index.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


Vue.config.productionTip = false

Vue.use(Vuetify)

const vuetifyOptions = {}

new Vue({
  vuetify: new Vuetify(vuetifyOptions),
  render: h => h(index)
}).$mount('#app')
