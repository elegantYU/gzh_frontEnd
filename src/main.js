import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import MuseUI from 'muse-ui'
import App from './App.vue'
import store from './store/store'
import { deviceRem } from './utils/utils'
import wxsdk from './utils/wxsdk'
import toastMessage from './components/plugin/Toast'
import touch from 'vue-directive-touch'
import { Picker, Popup } from 'mint-ui'
import './assets/css/base.css'
import 'muse-ui/dist/muse-ui.css'
import router from './router/router'
deviceRem(750)

// Axios.defaults.baseURL = 'http://wx.feng360.com:9999'
Vue.use(VueAxios, Axios)
Vue.use(MuseUI)
Vue.use(toastMessage)
Vue.use(touch)
Vue.prototype.wxsdk = wxsdk

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
