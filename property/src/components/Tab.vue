<template>
  <div class="tab_wrapper">
    <div class="tab_add_mask"></div>
    <div class="tab_content">
      <div class="tab_side tab_home" :class="v_home ? 'tab_active' : ''" @click="f_gohome">
        <i></i>
        <span>首页</span>
      </div>
      <div class="tab_side tab_my" :class="v_home ? '' : 'tab_active'" @click="f_gomy">
        <i></i>
        <span>值班表</span>
      </div>
      <div class="tab_add" @click="f_publish"></div>
    </div>
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
      this.$router.replace({ name: 'contact' })
      this.v_home = false
    },
    f_publish () {
      this.$router.replace({ name: 'publish' })
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
  border-top: 1px solid #e5e5e5;
  .tab_add_mask{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 1.16rem;
    height: 1.16rem;
    border-radius: 50%;
    background-color: #e5e5e5;
    z-index: 1;
  }
  .tab_content{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: #fff;
    .tab_side{
      width: 2.5rem;
      height: 100%;
      box-sizing: border-box;
      padding-top: 0.11rem;
      text-align: center;
      i{
        display: block;
        margin: 0 auto 0.08rem;
        width: 0.52rem;
        height: 0.52rem;
        background-size: contain;
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
          background-size: 0.5rem 0.5rem;
        }
        &.tab_active{
          span{
            color: #1aad19;
          }
        }
      }
      &.tab_my{
        float: right;
        i{
          background-image: url('../assets/images/tabs/tab_my.png');
          background-size: 0.5rem 0.5rem;
        }
        &.tab_active{
          i{
            background-image: url('../assets/images/tabs/tab_my_active.png');
            background-size: 0.5rem 0.5rem;
          }
          span{
            color: #1aad19;
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
      background-image: url('../assets/images/tabs/tab_add.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 0.6rem 0.6rem;
    }
  }
}
</style>
