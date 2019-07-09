<template>
  <div class="li_wrapper">
    <div class="li_nav">
      <div class="li_nav_bar">
        <div 
          v-for="(v, i) in v_nav"
          :key="i"
          class="li_nav_bar_item"
          :class="v.active ? 'active' : ''"
          @click="f_moveNav(i)"
        >
          {{ v.name }}
        </div>
        <div class="n_nav_filter" :class="v_filterFlag ? 'active' : ''" @click="f_filter"></div>
      </div>
      <div class="li_nav_filter" v-if="v_filterFlag" :class="{'active': v_filterFlag}">
        <div class="li_nav_filter_list" v-for="(v, i) in v_now" :key="i" @click="f_startFilter(i)" :class="v.active ? 'active' : ''">
          {{ v.name }}
        </div>
      </div>
    </div>
    <!-- 路由 -->
    <div class="li_router_wrapper" :class="v_filterFlag ? 'active' : ''">
      <component :is="v_component" :type="v_filterProp"></component>
    </div>
  </div>
</template>

<script>
import Public from './public.vue'
import Mine from './mine.vue'

export default {
  data () {
    return {
      v_nav: [
        { name: '失物招领大厅', component: 'Public', active: true, router: null },
        { name: '我的发布', component: 'Mine', active: false, router: null },
        { name: '我要发布', component: null, active: false, router: 'lfPublish' }
      ],
      v_filterFlag: false,
      v_filterList: {
        'Public': [
          { name: '全部', active: true },
          { name: '失物', active: false },
          { name: '招领', active: false },
        ],
        'Mine': [
          { name: '全部', active: true },
          { name: '失物', active: false },
          { name: '招领', active: false },
        ]
      },
      v_now: [],
      v_component: 'Public',
      v_filterProp: 0
    }
  },
  components: {
    Public,
    Mine
  },
  methods: {
    f_filter () {
      this.v_filterFlag = !this.v_filterFlag
      this.v_now = this.v_filterList[this.v_component].slice()
    },
    f_moveNav (i) {
      this.v_nav.map(v => v.active = false)
      this.v_filterFlag = false
      // 
      if (i === 2) {
        this.v_nav.map(v => v.router === this.$store.state.neighbor.router ? v.active = true : '')
        this.$router.push({ name: this.v_nav[i].router })
      } else {
        this.v_nav[i].active = true
        this.$store.commit('lostFoundRouter', this.v_nav[i].router)
        this.v_component = this.v_nav[i].component
        document.title = this.v_nav[i].name
      }
    },
    f_startFilter (i) {
      this.v_filterProp = i
      this.v_now.map(v => v.active = false)
      this.v_now[i].active = true
    }
  }
}
</script>

<style lang='scss' scoped>
.li_wrapper{
  background-color: #efeff4;
  height: 100%;
  .li_nav{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.9rem;
    z-index: 100;
    .li_nav_bar{
      height: 100%;
      background-color: #fff;
      padding: 0.2rem 0.3rem 0.1rem;
      display: flex;
      .li_nav_bar_item{
        flex: 1;
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
      .n_nav_filter{
        float: left;
        width: 0.5rem;
        height: 100%;
        padding-bottom: 0.1rem;
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
    .li_nav_filter{
      width: 100%;
      padding: 0 0.3rem;
      background-color: #efeff4;
      text-align: left;
      overflow-x: auto;
      display: flex;
      align-items: center;
      height: 1rem;
      position: absolute;
      top: -0.1rem;
      left: 0;
      &.active{
        top: 0.9rem;
      }
      .li_nav_filter_list{
        display: inline-block;
        border-radius: 0.1rem;
        background-color: #fff;
        height: 0.6rem;
        box-sizing: border-box;
        padding: 0.2rem 0.14rem;
        font-size: 0.26rem;
        margin-right: 0.2rem;
        &.active{
          color:#3072f6;
        }
        &:last-of-type{
          margin-right: 0;
        }
      }
    }
  }
  .li_router_wrapper{
    position: absolute;
    top: 1rem;
    left: 0;
    width: 100%;
    &.active{
      top: 1.9rem;
    }
  }
}
</style>
