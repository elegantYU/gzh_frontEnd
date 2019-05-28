<template>
  <div id="app">
    <router-view v-touch:right.capture='f_globalMove' v-touch:down.capture='f_moveTop'></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
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
    f_globalMove () {
      this.$router.go(-1)
    },
    f_moveTop () {
      return false
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
