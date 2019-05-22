<template>
  <div class="appeal-wp">
    <p class="title">{{village}}</p>
  </div>
</template>
<script>
export default {
  name: 'appwalAdvice',
  data () {
    return {
      village: '康馨苑小区'
    }
  }
}
</script>
<style lang="scss" scoped>
.appeal-wp {
  width: 100%;
  height: 100%;
  background: #efeff4;
  .title {
    height: 0.85rem;
    line-height: 0.85rem;
    font-size: 0.36rem;
  }
}
</style>
