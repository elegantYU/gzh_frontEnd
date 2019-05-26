<template>
  <div class="wp">
    <div class="ct">
      <img class="success-icon" :src="require('@/assets/images/all/success.png')" alt="">
      <p class="cue">反馈成功</p>
      <p class="txt">感谢你对仆汇未来社区的关注与支持，我们会认真<br>处理你的反馈，尽快修复和完善相关功能</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'success',
  data () {
    return {}
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
  padding-top: 1.42rem;
  .success-icon {
    width: 1.74rem;
    margin-bottom: 0.52rem;
  }
  .cue {
    font-size: 0.38rem;
    color: #000;
    margin-bottom: 0.2rem;
  }
  .txt {
    font-size: 0.28rem;
    color: #9f9fa1;
    line-height: 0.4rem;
  }
}
</style>
