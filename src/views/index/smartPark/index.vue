<template>
  <div class="si_wrapper">
    <div class="si_nav">
      <div
        class="si_nav_item"
        v-for="(v ,i) in v_nav"
        :key="i"
        :class="{'active': v.active}"
        @click="f_moveNav(i)"
      >
        {{ v.name }}
      </div>
    </div>
    <div class="si_router_wrapper">
      <component :is="v_component"></component>
    </div>
  </div>
</template>

<script>
import Apply from './apply.vue'
import Surplus from './surplus.vue'

export default {
  data () {
    return {
      v_nav: [
        { name: '剩余车位', component: 'Surplus', active: true },
        { name: '车位预约', component: 'Apply', active: false }
      ],
      v_component: 'Surplus'
    }
  },
  components: {
    Apply,
    Surplus
  },
  methods: {
    f_moveNav (i) {
      this.v_nav.map(v => v.active = false)
      this.v_nav[i].active = true
      this.v_component = this.v_nav[i].component
    }
  }
}
</script>

<style lang='scss' scoped>
.si_wrapper{
  background-color: #efeff4;
  height: 100%;
  .si_nav{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.9rem;
    z-index: 100;
    padding: 0.2rem 0.3rem 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    .si_nav_item{
      border-bottom-color: transparent;
      border-bottom-style: solid;
      border-bottom-width: 0.1rem;
      height: 100%;
      padding-top: 0.1rem;
      font-size: 0.3rem;
      cursor: pointer;
      &.active{
        border-bottom-color: #f64682;
        color: #f64682;
      }
    }
  }
  .si_router_wrapper{
    position: absolute;
    top: 0.9rem;
    left: 0;
    width: 100%;
  }
}
</style>
