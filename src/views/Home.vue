<template>
  <div class="home_wrapper">
    <router-view></router-view>
    <Tabs></Tabs>
  </div>
</template>

<script>
import Tabs from '../components/Tab.vue'

export default {
  name: 'Home',
  components: {
    Tabs
  }
}
</script>

<style lang="scss" scoped>
.home_wrapper{
  height: 100%;
}
</style>
