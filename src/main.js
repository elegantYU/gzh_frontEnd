import Vue from 'vue'
import App from './App.vue'
import axios from './utils/axios'
import store from './store/store'
import Muse from 'muse-ui'
import { deviceRem } from './utils/utils'
import wxsdk from './utils/wxsdk'
import toastMessage from './components/plugin/Toast'
import touch from 'vue-directive-touch'
import './assets/css/base.css'
import 'muse-ui/dist/muse-ui.css'
import router from './router/router'
import Vconsole from 'vconsole'
import moment from 'moment'
deviceRem(750)
// const vConsole = new Vconsole()

Vue.prototype.$http = axios
Vue.prototype.$wxsdk = wxsdk
Vue.use(Muse)
Vue.use(toastMessage)
Vue.use(touch)
Vue.prototype.$moment = moment

Date.prototype.Format = function(format) {
  const o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o)
    if (new RegExp('(' + k + ')').test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return format
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
