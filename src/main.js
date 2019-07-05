import Vue from 'vue'
import App from './App.vue'
import axios from './utils/axios'
import store from './store/store'
import Muse from 'muse-ui'
import { deviceRem, initConfirm } from './utils/utils'
import wxsdk from './utils/wxsdk'
import toastMessage from './components/plugin/Toast'
import touch from 'vue-directive-touch'
import './assets/css/base.css'
import 'muse-ui/dist/muse-ui.css'
import router from './router/router'
import Vconsole from 'vconsole'
deviceRem(750)
// initConfirm()
const vConsole = new Vconsole()

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
