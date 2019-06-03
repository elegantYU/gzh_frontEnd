// rem转换
const deviceRem = size => {
  const docEl = document.documentElement
  const clientWidth = docEl.clientWidth
  const reSize = () => docEl.style.fontSize = clientWidth >= size
    ? '100px'
    : 100 * (clientWidth / size) + 'px'

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

// 滑动限制
const stop = () => {
  document.body.style.overflow = 'hidden'
}
// 取消滑动限制
const move = () => {
  document.body.style.overflow = ''
}

export { deviceRem, dateFormat, stop, move }
