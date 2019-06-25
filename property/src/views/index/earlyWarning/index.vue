<template>
  <div class="early">
    <div class="early-tab">
      <div class="early-tab_item" v-for="(v, i) in v_tabs" :key="i" :class="v.active ? 'active' : ''" @click="f_changeTabs(v)">
        {{ v.name }}
      </div>
    </div>
    <div class="early_router_wrapper">
      <component :is="v_component" :sts="v_status"></component>
    </div>
  </div>
</template>

<script>
  import earlyCont from './earlyCont.vue'

  export default {
    data () {
      return {
        v_tabs: [
          { name: '人员预警', active: true, status: 0 },
          { name: '设备预警', active: false, status: 1 },
          { name: '综合预警', active: false, status: 2 },
        ],
        v_component: 'earlyCont',
        v_status: 0
      }
    },
    components: {
      earlyCont
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
  .early{
    height: 100%;
    background-color: #efeff4;
    position: relative;
    .early-tab{
      display: flex;
      width: 90%;
      margin: auto;
      .early-tab_item{
        width: 1.2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.3rem;
        margin: 0.2rem auto;
        &.active{
          color: #f64682;
          border-bottom: 0.1rem solid #f64682;
        }
      }
    }
    .early_router_wrapper{
      height: 100%;
    }
  }
</style>

