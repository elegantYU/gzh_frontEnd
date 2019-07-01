module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/wy/' : '/',
  outputDir: 'wy',
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
      '/event': {
        target: 'http://112.17.164.97:8856',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
