module.exports = {
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://118.126.66.195:8081',
        ws: true,
        changeOrigin: true
      }
    }
  },
}