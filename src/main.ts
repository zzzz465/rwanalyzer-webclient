import Vue from 'vue'
import index from './Index.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(ElementUI)

const vuetifyOptions = {}

new Vue({
  vuetify: new Vuetify(vuetifyOptions),
  render: h => h(index)
}).$mount('#app')
