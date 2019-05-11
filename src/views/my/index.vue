<template>
  <div class="wp">
    <div class="hd">
      <img class="avatar" :src="user.avatar" alt="">
      <p class="name">{{user.name}}</p>
    </div>
    <section>
      <mybtn @myclick = "myclick"></mybtn>
      <mybtn :data = "{img: 'icon2', txt: '我的车辆'}" @myclick = "myclick"></mybtn>
      <mybtn :data = "{img: 'icon3', txt: '我的车位'}" @myclick = "myclick"></mybtn>
    </section>
    <section>
      <mybtn :data = "{img: 'icon4', txt: '我的订单'}" @myclick = "myclick"></mybtn>
      <mybtn :data = "{img: 'icon5', txt: '我的活动'}" @myclick = "myclick"></mybtn>
      <mybtn :data = "{img: 'icon6', txt: '我的访客'}" @myclick = "myclick"></mybtn>
    </section>
    <section>
      <mybtn :data = "{img: 'icon7', txt: '帮助中心'}" @myclick = "myclick"></mybtn>
      <mybtn :data = "{img: 'icon8', txt: '关于我们'}" @myclick = "myclick"></mybtn>
    </section>
    <section>
      <mybtn :data = "{img: 'icon9', txt: '切换账号'}" @myclick = "myclick"></mybtn>
    </section>
  </div>
</template>
<script>
import mybtn from '../../components/Mybtn'
import { all } from 'q';
export default {
  name: 'myidex',
  data () {
    return {
      user: {
        avatar: require('@/assets/images/my/avatar.png'),
        name: '仰天长叹'
      }
    }
  },
  components: {
    mybtn
  },
  methods: {
    myclick (txt) {
      console.log(txt)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/my/index.scss';
</style>
