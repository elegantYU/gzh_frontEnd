import axios from 'axios'

const wxsdk = {
  init (url) {
    const params = {
      url: url
    }
    axios
      .get('/admin/wx/getWxConfig', { params })
      .then(({ data: { data: res }}) => {
        wx.config({
          debug: true,
          appId: res.appId,
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: [
            'chooseImage', 'uploadImage', 'getLocalImgData'
          ]
        })
      })
  },
  chooseImage () {
    return new Promise(resolve => {
      wx.ready(() => {
        wx.chooseImage({
          count: 3,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: res => {
            console.log('选取的图片', res)
            resolve(res)
          }
        })
      })
    })
  },
  getLocalImgData (ids) {
    return new Promise(resolve => {
      wx.ready(() => {
        wx.getLocalImgData({
          localId: '',
          success: res => {
            console.log('获取本地图片', res)
          }
        })
      })
    })
  }
}

export default wxsdk