import Vue from 'vue'
import App from './App.vue'
import axios from './utils/axios'
import store from './store/store'
import Muse from 'muse-ui'
import { deviceRem } from './utils/utils'
import toastMessage from './components/plugin/Toast'
import touch from 'vue-directive-touch'
import './assets/css/base.css'
import 'muse-ui/dist/muse-ui.css'
import router from './router/router'
deviceRem(750)

Vue.prototype.$http = axios
Vue.use(Muse)
Vue.use(toastMessage)
Vue.use(touch)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
