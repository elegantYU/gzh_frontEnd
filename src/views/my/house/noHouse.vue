<template>
  <div class="nh_wapper">
    <p>您还没有房屋认证哦~</p>
    <div @click="f_move">立即认证</div>
  </div>
</template>

<script>
export default {
  name: 'No',
  beforeRouteEnter (to, from, next) {
    // 若用户信息完善 则进入 我的 页面
    next(vm => {
      if (vm.$store.state.house.length) {
        vm.$router.push({ name: 'index' })
      }
    })
  },
  methods: {
    f_move () {
      this.$router.push({ name: 'house' })
    }
  }
}
</script>

<style lang='scss' scoped>
.nh_wapper{
  background-color: #efeff4;
  height: 100%;
  padding-top: 3rem;
  p{
    font-size: 0.26rem;
    color: #666;
    margin-bottom: 0.4rem;
  }
  div{
    width: 3.6rem;
    height: 0.7rem;
    box-sizing: border-box;
    border: 1px solid #f73476;
    border-radius: 0.1rem;
    color: #f73476;
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.7rem;
    margin: 0 auto;
    cursor: pointer;
  }
}
</style>
