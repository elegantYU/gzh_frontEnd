<template>
  <div class="login_wrapper">
    <img src="../../assets/images/start_logo.png" alt="">
    <div class="login_content">
      <div class="login_input">
        <span></span>
        <input type="text" placeholder="请输入手机号" v-model="v_phone">
      </div>
      <div class="login_input">
        <span></span>
        <input :type="v_switch ? 'text' : 'password'" placeholder="请输入密码" v-model="v_password">
        <i></i>
      </div>
      <div class="login_submit">
        登录
      </div>
    </div>
    <div class="login_detail">
      <span>忘记密码</span>
      <span>没有账号？<i>立即注册</i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      v_phone: '',
      v_password: '',
      v_switch: false
    }
  },
  mounted () {
    try {
      document.body.removeChild(document.getElementById('start_wrapper'))
      setTimeout(() => {
        document.getElementById('app').style.display = 'block'
      }, 500)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scope>
.login_wrapper{
  padding: 0.55rem 0.35rem;
  img{
    width: 2.3rem;
    height: 2rem;
    margin: 0 auto 1.5rem;
  }
  .login_content{
    .login_input{
      height: 0.84rem;
      margin-bottom: 0.25rem;
      box-sizing: border-box;
      border-bottom: 1px solid #d2d2d2;
      span{
        display: inline-block;
        width: 0.25rem;
        height: 100%;
        margin: 0 1rem 0 0.2rem;
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
      }
      &:nth-of-type(1){
        span{
          background-image: url('../../assets/images/login/login_icon_phone.png');
        }
      }
      &:nth-of-type(2){
        span{
          background-image: url('../../assets/images/login/login_icon_lock.png');
        }
      }
      input{
        vertical-align: top;
        width: 4.9rem;
        height: 100%;
        font-size: 0.28rem;
      }
    }
  }
}
</style>
