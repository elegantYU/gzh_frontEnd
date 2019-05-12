import Vue from 'vue'
import Confirm from './index.vue'

function merge (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}    
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}

let instance
let ConfirmTem = Vue.extend(Confirm)
let initInstance = () => {
  instance = new ConfirmTem({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

let confirmContent = (options = {}) => {
  initInstance()
  merge(instance.$data, options)
  return new Promise((resolve, reject) => {
    instance.show = true
    let success = instance.success
    let cancle = instance.cancle

    instance.success = () => {
      success()
      resolve()
    }
    instance.cancle = () => {
      cancle()
      reject()
    }
  })
}

confirmContent.install = Vue => {
  Vue.prototype.$confirm = confirmContent
}

export default confirmContent