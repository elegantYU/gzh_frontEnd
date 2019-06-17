<template>
  <div id="app">
    <router-view v-touch:right='f_moveRight'></router-view>
  </div>
</template>

<script>
export default {
  mounted () {
    this.f_getWxInfo()
    try {
      document.body.removeChild(document.getElementById('start_wrapper'))
      setTimeout(() => {
        document.getElementById('app').style.display = 'block'
        this.$router.push({ name: 'login' })
      }, 500)
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async f_getWxInfo () {
      const params = { code: this.$route.query.code }
      const { data: { data: userInfo }} = await this.$http
        .get('/admin/wx/person', { params })
      
      this.$store.commit('setWxInfo', userInfo)
    },
    f_moveRight (e, start, end) {
      const xLength = end.X - start.X
      const yLength = Math.abs(end.Y - start.Y)
      const len = xLength - yLength
      if (len > 100) {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  display: none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  max-width: 750px;
  width: 100%;
  height: 100%;
  background: #fff;
  margin: 0 auto;
}
</style>
