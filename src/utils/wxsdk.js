import axios from 'axios'
// 微信sdk的jsapi
export default {
  init: (url, cb) => {
    axios.get('', { url }).then(res => {
      // 获取config
      wx.config({
        appId,
        nonceStr,
        timestamp,
        signature,
        jsApiList: [
          'chooseImage',      // 选择图片
          'previewImage',     // 预览
          'getLocalImgData'   // 获取本地图片
        ]
      })
      if (cd) cd()
    })
  },
  chooseImage: (num, cb) => {
    // num 限制图片数量
    wx.chooseImage({
      count: num,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        res.localIds  // 获得所有图片的localid数组
      }
    })
  },
  getLocalImgData: (data, cb) => {
    // 遍历 localid 获取对应的base64
    wx.getLocalImgData({
      localId: '',
      success: res => {
        res.localData
      }
    })
  }
}