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

// Date转换 输出 yyyy-mm-dd
const dateFormat = date => {
  let now = new Date(date)
  let year = now.getFullYear()
  let month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
  let day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()

  return `${year}-${month}-${day}`
}

export { deviceRem, dateFormat }
