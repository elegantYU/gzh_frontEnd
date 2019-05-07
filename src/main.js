import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import { Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './assets/css/base.css'
import { deviceRem } from './utils/utils'

Vue.use(VueAxios, Axios)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

Vue.config.productionTip = false

deviceRem(750)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
