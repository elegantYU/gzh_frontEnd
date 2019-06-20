import axios from 'axios'

// 可惜了 到最后还是没有用上
// 图片上传使用的原生input file，之后的地图定位需要使用jssdk
const wxsdk = {
  init (url) {
    const params = {
      url: url
    }
    axios
      .get('/admin/wx/getWxConfig', { params })
      .then(({ data: { data: res }}) => {
        wx.config({
          debug: false,
          appId: res.appId,
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: [
            'chooseImage', 'uploadImage', 'getLocalImgData', 'getLocation'
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
          sourceType: ['album'],
          success: res => {
            console.log('选取的图片', res)
            resolve(res)
          }
        })
      })
    })
  },
  uploadImage (id) {
    return new Promise(resolve => {
      wx.uploadImage({
        localId: id,
        isShowProgressTips: 1,
        success: res => {
          // 返回图片的serverid
          console.log('serverid', res)
          resolve(res)
        }
      })
    })
  },
  getLocalImgData (ids) {
    return new Promise(resolve => {
      wx.ready(() => {
        wx.getLocalImgData({
          localId: ids,
          success: res => {
            resolve(res)
          }
        })
      })
    })
  },
  getLocation () {
    return new Promise(resolve => {
      wx.getLocation({
        type: 'wgs84',
        success: res => {
          /**
           * latitude  纬度
           * longitude 经度
           * speed 速度 
           * accuracy 位置精度 
           */
          resolve(res)
        }
      })
    })
  }
}

export default wxsdk