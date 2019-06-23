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
      }
    }
  }
}
