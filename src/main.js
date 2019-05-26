import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import MuseUI from 'muse-ui'
import App from './App.vue'
import store from './store/store'
import { deviceRem } from './utils/utils'
import wxsdk from './utils/wxsdk'
import toastMessage from './components/plugin/Toast'
import confirmContent from './components/plugin/Confirm'
import { Picker, Popup } from 'mint-ui'
import './assets/css/base.css'
import 'muse-ui/dist/muse-ui.css'
import 'mint-ui/lib/style.css'
import router from './router/router'
deviceRem(750)

// Axios.defaults.baseURL = 'http://wx.feng360.com:9999'
Vue.use(VueAxios, Axios)
Vue.use(MuseUI)
Vue.use(toastMessage)
Vue.use(confirmContent)
Vue.prototype.wxsdk = wxsdk

Vue.config.productionTip = false
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
