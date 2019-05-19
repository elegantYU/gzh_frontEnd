<template>
  <div class="mybtn clearfix" @click="myclick">
    <img :src="require(`@/assets/images/my/${data.img}.png`)" alt="" class="icon">
    {{data.txt}}
    <i class="arrow"></i>
  </div>
</template>
<script>
export default {
  name: 'mybtn',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          img: 'icon1',
          txt: '我的房屋'
        }
      }
    }
  },
  methods: {
    myclick () {
      this.$emit('myclick', this.data.txt)
    }
  }
}
</script>
<style lang="scss" scoped>
.mybtn {
  width: 100%;
  height: 0.96rem;
  line-height: 0.96rem;
  color: #333;
  font-size: 0.32rem;
  border-bottom: 0.01rem solid #ddd;
  text-align: left;
  background: #fff;
  .arrow {
    width: 0.24rem;
    height: 0.43rem;
    background:  url('../assets/images/my/arrow.png') no-repeat;
    float: right;
    margin-right: 0.4rem;
    background-size: cover;
    position: relative;
    top: 0.32rem;
  }
  .icon {
    width: 0.37rem;
    vertical-align: middle;
    margin-left: 0.4rem;
    margin-right: 0.24rem;
  }
}
</style>
