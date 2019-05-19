<template>
  <div class="tab_wrapper">
    <div class="tab_side tab_home" :class="v_home ? 'tab_active' : ''" @click="f_gohome">
      <i></i>
      <span>首页</span>
    </div>
    <div class="tab_side tab_my" :class="v_home ? '' : 'tab_active'" @click="f_gomy">
      <i></i>
      <span>我的</span>
    </div>
    <div class="tab_add"></div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data () {
    return {
      v_home: true
    }
  },
  methods: {
    f_gohome () {
      this.$router.replace({ name: 'index' })
      this.v_home = true
    },
    f_gomy () {
      // 先验证登录状态
      this.$router.replace({ name: 'my' })
      this.v_home = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tab_wrapper{
  z-index: 1000;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background-color: #fff;
  box-sizing: border-box;
  border-top: 1px solid #bfbfc3;
  padding-top: 0.11rem;
  .tab_side{
    width: 2.5rem;
    height: 100%;
    text-align: center;
    i{
      display: block;
      margin: 0 auto 0.08rem;
      width: 0.52rem;
      height: 0.52rem;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
    span{
      display: inherit;
      font-size: 0.2rem;
    }
    &.tab_home{
      float: left;
      i{
        background-image: url('../assets/images/tabs/tab_home.png');
      }
      &.tab_active{
        i{
          background-image: url('../assets/images/tabs/tab_home_active.png');
        }
      }
    }
    &.tab_my{
      float: right;
      i{
        background-image: url('../assets/images/tabs/tab_my.png');
      }
      &.tab_active{
        i{
          background-image: url('../assets/images/tabs/tab_my_active.png');
        }
      }
    }
  }
  .tab_add{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 1.15rem;
    height: 1.15rem;
    border-radius: 50%;
    box-sizing: border-box;
    border: 8px solid #fff;
    background-color: #f73476;
    background-image: url('../assets/images/tabs/tab_add.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 0.5rem 0.5rem;
  }
}
</style>
