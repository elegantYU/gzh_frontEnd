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
      setTimeout(() => {
        document.body.removeChild(document.getElementById('start_wrapper'))
        document.getElementById('app').style.display = 'block'
      }, 50000)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
