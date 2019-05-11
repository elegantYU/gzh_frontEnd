<template>
  <div class="n_wrapper">
    <div class="n_content">
      <div class="n_nav_fix">
        <div class="n_nav clearfix">
          <div class="n_nav_bar clearfix">
            <div
              class="n_nav_item"
              v-for="(v, i) in v_nav"
              :key="i"
              :class="v.active ? 'active' : ''"
              @click="f_moveNav(i)"
            >
              {{ v.name }}
            </div>
          </div>
          <div class="n_nav_filter" :class="v_filterFlag ? 'active' : ''" @click="f_filter"></div>
        </div>
        <div class="n_filter clearfix" v-if="v_filterFlag">
          <div class="n_filter_list" v-for="(v, i) in v_now" :key="i" @click="f_startFilter(v.name)"  :class="v.active ? 'active' : ''">
            {{ v.name }}
          </div>
        </div>
      </div>
      <!-- 路由 -->
      <div class="n_router_wrapper" :class="v_filterFlag ? 'active' : ''">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Neighbor',
  data () {
    return {
      v_nav: [
        { name: '共享大厅', router: 'neighborPublic', active: true },
        { name: '我的共享', router: 'neighborMine', active: false },
        { name: '我要共享', router: 'neighborSelf', active: false },
        { name: '我的预约', router: 'neighborOrder', active: false },
      ],
      v_filterFlag: false,
      v_filterList: {
        'neighborPublic': [
          { name: '全部', active: true },
          { name: '拼车', active: false },
          { name: '车位共享', active: false },
          { name: '时间互换', active: false },
          { name: '资源共享', active: false },
        ],
        'neighborMine': [
          { name: '全部', active: true },
          { name: '拼车', active: false },
          { name: '车位共享', active: false },
          { name: '时间互换', active: false },
          { name: '资源共享', active: false },
        ],
        'neighborSelf': [],
        'neighborOrder': [
          { name: '全部', active: true },
          { name: '预约成功', active: false },
          { name: '预约失败', active: false }
        ]
      },
      v_now: []
    }
  },
  mounted () {
    this.$router.push({ name: 'neighborPublic' })
  },
  methods: {
    f_moveNav (i) {
      this.$router.push({ name: this.v_nav[i].router })
      this.v_nav.map(v => v.active = false)
      this.v_filterFlag = false
      // 
      if (i === 2) {
        this.v_nav.map(v => v.router === this.$store.state.neighbor.router ? v.active = true : '')
      } else {
        this.v_nav[i].active = true
        this.$store.commit('neighborRouter', this.v_nav[i].router)
      }
    },
    f_filter () {
      this.v_filterFlag = !this.v_filterFlag
      this.v_now = this.v_filterList[this.$route.name].slice()
    },
    f_startFilter (n) {
      console.log('点击筛选', n)
    }
  }
}
</script>

<style lang='scss' scoped>
.n_wrapper{
  height: 100%;
  background-color: #efeff4;
  .n_content{
    padding-bottom: 1.2rem;
    background-color: #efeff4;
    .n_nav_fix{
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      .n_nav{
        height: 0.9rem;
        background-color: #fff;
        box-sizing: border-box;
        padding: 0.2rem 0.3rem 0.1rem;
        margin-bottom: 0.2rem;
        .n_nav_bar{
          width: calc(100% - 0.5rem);
          height: 100%;
          display: flex;
          float: left;
          .n_nav_item{
            float: left;
            flex-grow: 1;
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
      .n_filter{
        margin-bottom: 0.2rem;
        padding: 0 0.3rem;
        text-align: left;
        overflow-x: auto;
        .n_filter_list{
          display: inline-block;
          border-radius: 0.1rem;
          background-color: #fff;
          height: 100%;
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
    .n_router_wrapper{
      position: absolute;
      top: 1rem;
      left: 0;
      &.active{
        top: 1.96rem;
      }
    }
  }
}
</style>
