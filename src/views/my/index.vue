<template>
  <div class="wp">
    <div class="contain">
      <div class="hd">
        <img class="avatar" :src="user.avatar" alt="">
        <p class="name">{{user.name}}</p>
      </div>
      <section>
        <mybtn @myclick = "myclick"></mybtn>
        <mybtn :data = "{img: 'icon2', txt: '我的车辆', path: 'car'}" @myclick = "myclick"></mybtn>
        <mybtn :data = "{img: 'icon3', txt: '我的车位', path: 'park'}" @myclick = "myclick"></mybtn>
      </section>
      <section>
        <mybtn :data = "{img: 'icon4', txt: '我的订单', path: 'myOrder'}" @myclick = "myclick"></mybtn>
        <mybtn :data = "{img: 'icon5', txt: '我的活动', path: 'active'}" @myclick = "myclick"></mybtn>
        <mybtn :data = "{img: 'icon6', txt: '我的访客'}" @myclick = "myclick"></mybtn>
      </section>
      <section>
        <mybtn :data = "{img: 'icon7', txt: '帮助中心'}" @myclick = "myclick"></mybtn>
        <mybtn :data = "{img: 'icon8', txt: '关于我们', path: 'aboutus'}" @myclick = "myclick"></mybtn>
      </section>
      <section>
        <mybtn :data = "{img: 'icon9', txt: '退出登录'}" @myclick = "loginOut"></mybtn>
      </section>
    </div>
  </div>
</template>
<script>
import mybtn from '../../components/Mybtn'
export default {
  name: 'myidex',
  data () {
    return {
      user: {
        avatar: '',
        name: ''
      }
    }
  },
  components: {
    mybtn
  },
  mounted () {
    this.user.avatar = this.$store.state.user.headIcon
    this.user.name = this.$store.state.user.name
  },
  methods: {
    myclick (path) {
      this.$router.push({ name: path })
    },
    loginOut () {
      window.document.cookie = "userPhone=;path=/;expires="
      window.document.cookie = "userPsd=;path=/;expires="
    }
  }
}
</script>
<style lang="scss" scoped>
.wp {
  width: 100%;
  height: 100%;
  background: #efeff4;
  .contain{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
  }
}
.hd {
  width: 100%;
  padding-top: 0.38rem;
  padding-bottom: 0.87rem;
  background: url('../../assets/images/my/hdbg.png');
  margin-bottom: 0.2rem;
  .avatar {
    width: 1.5rem;
    height: 1.5rem;
    margin-bottom: 0.22rem;
    border: 0.04rem solid #fff;
    border-radius: 50%;
  }
  .name {
    font-size: 0.36rem;
    color: #fff;
  }
}
section {
  margin-bottom: 0.2rem;
}
</style>
