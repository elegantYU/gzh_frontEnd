<template>
  <div class="confirm_wrappper" v-show="show">
    <div class="confirm_mask" @click="cancle"></div>
    <div class="confirm_content">
      <div class="confirm_body">
        <h6>{{ title }}</h6>
        <p>{{ content }}</p>
      </div>
      <div class="confirm_footer clearfix">
        <span @click="cancle">取消</span>
        <span @click="success">确认</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  data () {
    return {
      title: '',
      content: '',
      show: false
    }
  },
  methods: {
    cancle () {
      this.show = false
    },
    success () {
      this.show = false
    }
  }
}
</script>

<style lang='scss' scoped>
.confirm_wrappper{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .confirm_mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .confirm_content{
    position: absolute;
    top: 40%;
    left: 50%;
    width: 5.4rem;
    height: auto;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 0.1rem;
    .confirm_body{
      border-radius: 0.1rem 0.1rem 0 0;
      h6{
        text-align: center;
        font-size: 0.32rem;
        padding: 0.2rem;
        color: #111;
      }
      p{
        display: block;
        text-align: center;
        font-size: 0.28rem;
        color: #666;
        padding: 0.2rem 0.3rem 0.3rem;
      }
    }
    .confirm_footer{
      border-top: 1px solid #ccc;
      span{
        float: left;
        width: 50%;
        text-align: center;
        font-size: 0.3rem;
        padding: 0.2rem 0;
        color: #111;
        border-right: 1px solid #ccc;
        border-radius: 0 0 0 0.1rem;
        &:last-of-type{
          border: none;
          color: #f73476;
          border-radius: 0 0 0.1rem 0;
        }
      }
    }
  }
}
</style>
