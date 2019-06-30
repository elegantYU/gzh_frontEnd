module.exports = {
  // publicPath: '/wx/',
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://zjphtech.com',
        ws: true,
        changeOrigin: true
      },
      '/obtain': {
        target: 'http://zjphtech.com',
        ws: true,
        changeOrigin: true
      },
      '/collection': {
        target: 'http://zjphtech.com',
        ws: true,
        changeOrigin: true
      },
      '/notice': {
        target: 'http://zjphtech.com',
        ws: true,
        changeOrigin: true
      },
      '/marker': {
        target: 'https://uri.amap.com',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 高德地图配置
    }
  }

}
