import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import MuseUI from 'muse-ui'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import { deviceRem } from './utils/utils'
import wxsdk from './utils/wxsdk'
import './assets/css/base.css'
import 'muse-ui/dist/muse-ui.css'
import toastMessage  from './components/plugin/Toast'

Vue.use(VueAxios, Axios)
Vue.use(MuseUI)
Vue.use(toastMessage)
Vue.prototype.wxsdk = wxsdk

Vue.config.productionTip = false

deviceRem(750)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
