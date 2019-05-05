<template>
  <div class="index_wrapper">
    这是首页
  </div>
</template>

<script>
export default {
  name: 'Index',
  mounted () {
    try {
      document.body.removeChild(document.getElementById('start_wrapper'))
      setTimeout(() => {
        document.getElementById('app').style.display = 'block'
      }, 500)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
