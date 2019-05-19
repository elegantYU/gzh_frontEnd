<template>
  <div class="help_wrapper">
    <ul>
      <li
        v-for="(v, i) in v_list"
        :key="i"
        @click="f_move(v.route)"
      >
        <img :src="v.img" alt="">
        <p>{{ v.text }}</p>
        <span></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Help',
  data () {
    return {
      v_list: [
        { img: require('../../../assets/images/help/icon1.png'), text: '常见问题', route: 'helpQues' },
        { img: require('../../../assets/images/help/icon2.png'), text: '新手指引', route: 'helpGuide' }
      ]
    }
  },
  methods: {
    f_move (n) {
      this.$router.push({ name: n })
    }
  }
}
</script>

<style lang='scss' scoped>
.help_wrapper{
  background-color: #efeff4;
  height: 100%;
  padding: 0.2rem 0;
  ul{
    li{
      padding: 0 0.4rem;
      height: 1rem;
      border-bottom: 1px solid #dddddd;
      background-color: #fff;
      line-height: 1rem;
      font-size: 0.32rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      img{
        width: 0.36rem;
        height: 0.36rem;
        margin-right: 0.2rem;
      }
      p{
        flex: 1;
        text-align: left;
      }
      span{
        width: 0.24rem;
        height: 0.43rem;
        background-image: url('../../../assets/images/my/arrow.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
}
</style>
