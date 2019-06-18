import Axios from 'axios'
function filterBool (data) {
  return Object.keys(data).reduce((acc, cur) => {
    acc[cur] = data[cur] === null ? '' : data[cur]
    return acc
  }, {})
}
Axios.interceptors.response.use(res => {
  const { data = {} } = res || {}
  let temp

  if (data.constructor === Object) {
    temp = filterBool(data)
  }
  if (Array.isArray(data)) {
    temp = data.some(v => ['string', 'number'].includes(typeof v))
      ? data.filter(v => v !== null)
      : data.map(v => filterBool(v))
  }

  res.data = temp

  return res
})

// Axios.defaults.baseURL = 'http://zjphtech.com'

export default Axios
