import axios from 'axios'
// 微信sdk的jsapi
export default {
  init: (url, cb) => {
    axios.get(`http://zjphtech.com/admin/wx/getWxConfig?url=${url}`).then(({ data: { data } }) => {
      // 获取config
      wx.config({
        debug: true,
        appId: data.appId,
        nonceStr: data.nonceStr,
        timestamp: data.timestamp,
        signature: data.signature,
        jsApiList: [
          'chooseImage',      // 选择图片
          'previewImage',     // 预览
          'getLocalImgData'   // 获取本地图片
        ]
      })
      if (cb) cb()
    })
  },
  chooseImage: (num) => {
    // num 限制图片数量
    return new Promise (resolve => {
      wx.ready(() => {
        wx.chooseImage({
          count: num,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: res => {
            // 获得所有图片的localid数组
            resolve(res)
          }
        })
      })
    })
  },
  getLocalImgData: (data) => {
    // 遍历 localid 获取对应的base64
    return new Promise(resolve => {
      wx.ready(() => {
        wx.getLocalImgData({
          localId: '',
          success: res => {
            resolve(res)
          }
        })
     })
    })
  }
}