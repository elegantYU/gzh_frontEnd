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
import toastMessage from './components/plugin/Toast'
import confirmContent from './components/plugin/Confirm'
import { Picker, Popup } from 'mint-ui'

import 'mint-ui/lib/style.css'

Axios.defaults.baseURL = 'http://118.126.66.195:8081'
Vue.use(VueAxios, Axios)
Vue.use(MuseUI)
Vue.use(toastMessage)
Vue.use(confirmContent)
Vue.prototype.wxsdk = wxsdk

Vue.config.productionTip = false
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)

deviceRem(750)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
