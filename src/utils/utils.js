import prov from '@/data/provinces'
import city from '@/data/cities'
import area from '@/data/areas'
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

// 滑动限制
const stop = () => {
  document.body.style.overflow = 'hidden'
}
// 取消滑动限制
const move = () => {
  document.body.style.overflow = ''
}

const formateProv = (prov, city) => {
  prov.map(p => {
    p.children = city.filter(c => c.provinceCode === p.code)
  })
  return prov
}

const formateCity = (city, area) => {
  city.map(c => {
    c.children = area.filter(a => c.code === a.cityCode)
  })
  return city
}
// 省市区数据
const threeLevelAddress = (prov, city, area) => {
  return formateProv(prov, formateCity(city, area))
}

const data = threeLevelAddress(prov, city, area)

export { deviceRem, dateFormat, stop, move, threeLevelAddress, data }
