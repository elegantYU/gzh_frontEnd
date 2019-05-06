import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import baseCss from './assets/css/base.css'
import { deviceRem } from './utils/utils'

Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

deviceRem(750)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
