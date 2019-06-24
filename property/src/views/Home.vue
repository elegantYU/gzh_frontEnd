<template>
  <div class="home_wrapper">
    <router-view></router-view>
    <Tabs></Tabs>
    <!-- <div class="index_judge_mask" v-if="v_noHouse" @click="f_moveAddHouse"></div> -->
  </div>
</template>

<script>
import Tabs from '../components/Tab.vue'
import { setTimeout } from 'timers';

export default {
  name: 'Home',
  data () {
    return {
      v_noHouse: false
    }
  },
  components: {
    Tabs
  },
  mounted () {
    setTimeout(() => {
      this.$store.state.house.length > 0
        ? this.v_noHouse = false
        : this.v_noHouse = true
    }, 500)
  },
  methods: {
    f_moveAddHouse () {
      this.$router.push({ name: 'no' })
    }
  }
}
</script>

<style lang="scss" scoped>
.home_wrapper{
  height: 100%;
  .index_judge_mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    cursor: pointer;
    z-index: 2000;
  }
}
</style>
