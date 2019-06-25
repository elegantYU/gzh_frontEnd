<template>
  <div class="earlyCont">
    <div class="earlyCont-tab">
      <div class="earlyCont-tab_item" v-for="(v, i) in v_tabs" :key="i" :class="v.active ? 'active' : ''" @click="f_changeTabs(v)">
        {{ v.name }}
      </div>
    </div>
    <div class="earlyCont_router_wrapper">
      <component :is="v_component" :sts="v_status"></component>
    </div>
  </div>
</template>

<script>
  import earlylist from './earlylist.vue'

  export default {
    data () {
      return {
        v_tabs: [
          { name: '全部', active: true, status: 0 },
          { name: '待确认', active: false, status: 1 },
          { name: '待处理', active: false, status: 2 },
          { name: '已完成', active: false, status: 3 },
        ],
        v_component: 'earlylist',
        v_status: 0
      }
    },
    components: {
      earlylist
    },
    methods: {
      f_changeTabs (v) {
        this.v_tabs.map(v => v.active = false)
        v.active = true
        this.v_status = v.status
      }
    }
  }
</script>

<style scoped lang="scss">
  .earlyCont{
    height: 100%;
    background-color: #efeff4;
    position: relative;
    .earlyCont-tab{
      display: flex;
      width: 90%;
      margin: auto;
      .earlyCont-tab_item{
        width: 1.2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.28rem;
        border-radius: 0.1rem;
        border: 0.02rem solid white;
        background-color: white;
        margin: 0.2rem auto;
        &.active{
          color: #58c3fb;
        }
      }
    }
    .earlyCont_router_wrapper{
      height: 100%;
    }
  }
</style>

