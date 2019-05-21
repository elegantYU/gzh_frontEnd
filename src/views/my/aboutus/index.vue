<template>
  <div class="wp">
    <div class="ct">
      <img :src="require('@/assets/images/my/logo.png')" alt="" class="logo">
      <p class="cue">仆汇未来社区</p>
      <p class="vision">版本号 1.0.0</p>
      <section>
        <mybtn :data = "{img: 'function', txt: '功能介绍', path: 'function'}"  @myclick = "myclick"></mybtn>
        <mybtn :data = "{img: 'feedback', txt: '意见反馈', path: 'feedback'}"  @myclick = "myclick"></mybtn>
      </section>
    </div>
  </div>
</template>
<script>
import mybtn from '../../../components/Mybtn'
export default {
  name: 'aboutus',
  data () {
    return {}
  },
  components: {
    mybtn
  },
  methods: {
    myclick (path) {
      this.$router.push({ name: path })
    }
  }
}
</script>
<style lang="scss" scoped>
.wp {
  width: 100%;
  height: 100%;
  background: #efeff4;
}
.ct {
  padding-top: 0.9rem;
  .logo {
    width: 2rem;
    margin: 0 auto 0.4rem;
  }
  .cue {
    font-size: 0.56rem;
    margin-bottom: 0.24rem;
  }
  .vision {
    font-size: 0.34rem;
    color: #b1b1b2;
    margin-bottom: 0.8rem;
  }
}
</style>
