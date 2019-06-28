<template>
  <div class="early">
    <div class="early-tab">
      <div
          class="early-tab_item"
          v-for="(v, i) in v_tabs"
          :key="i" :class="v.active ? 'active' : ''"
          @click="f_changeTabs(i)"
      >
        {{ v.name }}
      </div>
      <div class="v_tabs_filter" :class="v_filterFlag ? 'active' : ''" @click="f_filter"></div>
    </div>
    <div class="early-tab-last" v-if="v_filterFlag" :class="{'active': v_filterFlag}">
      <div
          class="early-tab-lastitem"
          v-for="(v, i) in v_tablast"
          :key="i" :class="v.active ? 'active' : ''"
          @click="f_changeTablast(i)"
      >
        {{v.name}}
      </div>
    </div>
    <div class="early_router_wrapper" :class="v_filterFlag ? 'active' : ''">
      <component :is="v_component"></component>
    </div>
  </div>
</template>

<script>
import Earlylist from './earlylist.vue'
import Comprehensive from './comprehensive.vue'

export default {
  data () {
    return {
      v_tabs: [
        { name: '设备预警', active: true, component: 'Earlylist' },
        { name: '综合预警', active: false, component: 'Comprehensive' }
      ],
      v_handle: {
        'Earlylist': [
          { name: '全部', active: true },
          { name: '待处理', active: false },
          { name: '处理中', active: false },
          { name: '已完成', active: false }
        ],
        'Comprehensive': [
          { name: '全部', active: true },
          { name: '待处理', active: false },
          { name: '处理中', active: false },
          { name: '已完成', active: false }
        ]
      },
      v_tablast: [],
      v_component: 'Earlylist',
      v_filterProp: 0,
      v_filterFlag: false
    }
  },
  components: {
    Earlylist,
    Comprehensive,
  },
  methods: {
    f_filter () {
      this.v_filterFlag = !this.v_filterFlag
      this.v_tablast = this.v_handle[this.v_component].slice()
    },
    f_changeTabs (i) {
      this.v_filterFlag = false
      this.v_tabs.map(v => v.active = false)
      this.v_tabs[i].active = true
      this.v_component = this.v_tabs[i].component
    },
    f_changeTablast (i) {
      this.v_filterProp = i
      this.v_tablast.map(v => v.active = false)
      this.v_tablast[i].active = true
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
      .v_tabs_filter{
        float: left;
        width: 0.5rem;
        height: 100%;
        padding-bottom: 1rem;
        box-sizing: border-box;
        background-image: url('../../../assets/images/neighbor/neighbor_filter.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 0.3rem 0.36rem;
        cursor: pointer;
        &.active{
          background-image: url('../../../assets/images/neighbor/neighbor_filtered.png');
        }
      }
    }
    .early-tab-last{
      display: flex;
      width: 90%;
      margin: auto;
      &.active{
        top: 0.9rem;
      }
      .early-tab-lastitem {
        width: 1.2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.28rem;
        border-radius: 0.1rem;
        border: 0.02rem solid white;
        background-color: white;
        margin: 0.2rem auto;
        &.active {
          color: #58c3fb;
        }
      }
    }
    .early_router_wrapper{
      height: 100%;
      &.active{
        top: 1.9rem;
      }
    }
  }
</style>
