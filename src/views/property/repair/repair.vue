<template>
    <div class="repair">
      <div class="repair-tab">
        <div class="repair-tab_item" v-for="(v, i) in v_tabs" :key="i" :class="v.active ? 'active' : ''" @click="f_changeTabs(v)">
          {{ v.name }}
        </div>
      </div>
      <div class="repair_router_wrapper">
        <component :is="v_component"></component>
      </div>
    </div>
</template>

<script>
import Whole from './Whole.vue'
import Confirmed from './Confirmed.vue'
import Processed from './Processed.vue'
import Evaluated from './Evaluated.vue'
import Completed from './Completed.vue'

export default {
  data () {
    return {
      v_tabs: [
        { name: '全部', component: 'Whole', active: true },
        { name: '待确认', component: 'Confirmed', active: false },
        { name: '待处理', component: 'Processed', active: false },
        { name: '待评价', component: 'Evaluated', active: false },
        { name: '已完成', component: 'Completed', active: false }
      ],
      v_component: 'Whole'
    }
  },
  components: {
    Whole,
    Confirmed,
    Processed,
    Evaluated,
    Completed
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

<style scoped lang="scss">
.repair{
  height: 100%;
  position: relative;
  .repair-tab{
    display: flex;
    width: 90%;
    margin: 0.3rem auto 0.2rem;
    .repair-tab_item{
      width: 1.2rem;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.25rem;
      border: 0.02rem solid black;
      border-radius: 0.3rem;
      margin: auto;
      &.active{
        background-color: #58c3fb;
        color: #ffffff;
      }
    }
  }
}
</style>
