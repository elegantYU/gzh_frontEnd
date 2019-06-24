<template>
  <div class="topic_wrapper">
    <div class="topic_tab">
      <div class="topic_tab_item" v-for="(v, i) in v_tabs" :key="i" :class="v.active ? 'active' : ''" @click="f_changeTabs(v)">
        {{ v.name }}
      </div>
    </div>
    <div class="topic_router_wrapper">
      <component :is="v_component"></component>
    </div>
  </div>
</template>

<script>
  import Hot from './hotStreet.vue'
  import Notice from './noticeStreet.vue'
  import Rules from './rulesStreet.vue'

  export default {
    name: 'Topic',
    data () {
      return {
        v_tabs: [
          { name: '热门活动', component: 'Hot', active: true },
          { name: '通知通告', component: 'Notice', active: false },
          { name: '政策法规', component: 'Rules', active: false }
        ],
        v_component: 'Hot'
      }
    },
    components: {
      Hot,
      Notice,
      Rules
    },
    methods: {
      f_changeTabs (v) {
        this.v_tabs.map(v => v.active = false)
        this.v_component = v.component
        v.active = true
      }
    }
  }
</script>

<style lang='scss' scoped>
  .topic_wrapper{
    background-color: #efeff4;
    height: 100%;
    position: relative;
    .topic_tab{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 0.8rem;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      .topic_tab_item{
        width: 2rem;
        height: 100%;
        border-bottom-style: solid;
        border-bottom-color: transparent;
        border-bottom-width: 0.1rem;
        line-height: 0.8rem;
        font-size: 0.34rem;
        cursor: pointer;
        &.active{
          border-bottom-color: #f64682;
          color: #f64682;
        }
      }
    }
    .topic_router_wrapper{
      position: absolute;
      top: 0.8rem;
      left: 0;
      width: 100%;
    }
  }
</style>

