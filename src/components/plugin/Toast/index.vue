<template>
  <div class="toastMessageBox" v-show="show">{{ msg }}</div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      msg: '',
      show: false
    }
  }
}
</script>

<style lang="scss" scoped>
.toastMessageBox{
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 0.24rem;
  color: #fff;
  border-radius: 0.08rem;
  text-align: center;
  padding: 0.2rem 0.4rem 0.15rem;
  line-height: 1.4em;
}
</style>
