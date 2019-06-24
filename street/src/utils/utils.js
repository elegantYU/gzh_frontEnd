// rem转换
const deviceRem = size => {
  const docEl = document.documentElement
  const clientWidth = docEl.clientWidth
  const reSize = () => (docEl.style.fontSize = clientWidth >= size
    ? '100px'
    : 100 * (clientWidth / size) + 'px'
  )

  document.addEventListener('DOMContentLoaded', reSize, false)
}

// Date转换 输出 yyyy-mm-dd
const dateFormat = date => {
  let now = new Date(date)
  let year = now.getFullYear()
  let month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
  let day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()

  return `${year}-${month}-${day}`
}

const throttle = (fn, timer = 300, lock) => {
  return (...args) => {
    if (!lock) {
      lock = setTimeout(() => {
        fn(null, ...args)
        lock = false
      }, timer)
    }
  }
}

// 滑动限制
const stop = () => {
  document.body.style.overflow = 'hidden'
}
// 取消滑动限制
const move = () => {
  document.body.style.overflow = ''
}

// 获取url参数
const getQueryString = () => {
  const search = window.location.search
  const query = search.replace('?', '').split('&')
  let res = {}
  for (let i = 0; i < query.length; i++) {
    const temp = query[i].split('=')
    res[temp[0]] = temp[1]
  }
  return res
}

const baseToBlob = (dataurl) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  const n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], 'image', { type: mime })
}

function isIos () {
  const u = navigator.userAgent
  return u.indexOf('iPhone') > -1 || u.indexOf('Mac OS') > -1
}

export { deviceRem, dateFormat, stop, move, throttle, getQueryString, baseToBlob, isIos }
