import Vue from 'vue'
import Toast from './index.vue'

let ToastTem = Vue.extend(Toast)
let instance
let timer = null
let toastMessage = options => {
  if (!instance) {
    instance = new ToastTem
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
  }
  if (!timer) {
    clearTimeout(timer)
    timer = null
    instance.show = false
    instance.msg = ''
  }

  let times = 2000
  if (typeof options === 'string') {
    instance.msg = options
  } else if (typeof options === 'object') {
    let { msg, time } = options
    instance.msg = msg
    times = time || 2000
  } else {
    return
  }
  instance.show = true
  timer = setTimeout(() => {
    clearTimeout(timer)
    timer = null
    instance.show = false
    instance.msg = ''
  }, times)
}

toastMessage.close = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
    instance.show = false
    instance.msg = ''
  }
}

toastMessage.install = Vue => {
  Vue.prototype.$toast = toastMessage
}

export default toastMessage