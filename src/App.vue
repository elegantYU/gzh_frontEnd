<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
        this.$router.push({ name: 'index' })
      }, 500)
    } catch (e) {
      console.log(e)
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
