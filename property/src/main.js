import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from './utils/axios'
import Muse from 'muse-ui'
import './assets/css/base.css'
import touch from 'vue-directive-touch'
import 'muse-ui/dist/muse-ui.css'
import { deviceRem } from './utils/utils'
import wxsdk from './utils/wxsdk'
import toastMessage from './components/plugin/Toast'
import Vconsole from 'vconsole'

deviceRem(750)
const clg = new Vconsole()

Vue.prototype.$http = axios
Vue.prototype.$wxsdk = wxsdk
Vue.use(Muse)
Vue.use(toastMessage)
Vue.use(touch)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
