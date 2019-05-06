// rem转换
const deviceRem = size => {
  let docEl = document.documentElement
  let clientWidth = docEl.clientWidth
  const reSize = () => {
    if (clientWidth >= size) {
      docEl.style.fontSize = '100px'
    } else {
      docEl.style.fontSize = 100 * (clientWidth / size) + 'px'
    }
  }
  document.addEventListener('DOMContentLoaded', reSize, false)
}

export { deviceRem }
