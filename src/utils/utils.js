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

const baseToBlob = base => {
  const bytes = window.atob(base.split(','[1]))

  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)    
  }

  return new Blob([ab], { type: 'image/png' })
}

export { deviceRem, dateFormat, stop, move, throttle, getQueryString, baseToBlob }
