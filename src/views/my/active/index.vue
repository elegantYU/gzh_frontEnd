<template>
  <div class="ac_wrapper">
    <div class="ac_container">
      <div class="ac_tab">
        <span :class="v_class ? 'active' : ''" @click="f_move('My')">我参加的活动</span>
        <span :class="v_class ? '' : 'active'" @click="f_move('Collect')">我收藏的活动</span>
      </div>
      <div class="ac_component">
        <component :is="v_component"></component>
      </div>
    </div>
  </div>
</template>

<script>
import My from './my.vue'
import Collect from './collect.vue'

export default {
  name: 'Active',
  data () {
    return {
      v_class: true,
      v_component: 'My'
    }
  },
  components: {
    My,
    Collect
  },
  methods: {
    f_move (name) {
      name === 'My'
        ? this.v_class = true
        : this.v_class = false

      this.v_component = name
    }
  }
}
</script>

<style lang='scss' scoped>
.ac_wrapper{
  height: 100%;
  background-color: #efeff4;
  .ac_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    position: relative;
    .ac_tab{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 0.8rem;
      display: flex;
      justify-content: space-around;
      span{
        display: block;
        width: 2.4rem;
        height: 100%;
        border-bottom: 0.1rem solid transparent;
        font-size: 0.34rem;
        line-height: 0.8rem;
        &.active{
          color: #f64682;
          border-bottom: 0.1rem solid #f64682;
        }
      }
    }
    .ac_component{
      position: absolute;
      top: 1rem;
      left: 0;
      width: 100%;
    }
  }
}
</style>
