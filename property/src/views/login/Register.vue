<template>
  <div class="reg_wrapper">
    <img src="../../assets/images/start_logo.png" alt="">
    <div class="reg_content">
      <!-- <div class="reg_input">
        <span></span>
        <input type="text" placeholder="请输入用户名" v-model="v_name">
      </div> -->
      <div class="reg_input">
        <span></span>
        <input type="text" placeholder="请输入手机号" maxlength="11" v-model="v_phone">
      </div>
      <div class="reg_input">
        <span></span>
        <input type="text" placeholder="验证码" v-model="v_code">
        <i @click="f_getCode" :class="v_flag ? '' : 'reg_not'">{{ v_flag ? '发送验证码' : `${v_time} s` }}</i>
      </div>
      <div class="reg_input">
        <span></span>
        <input type="password" placeholder="请输入6到12位密码" v-model="v_password">
      </div>
      <div class="reg_input">
        <span></span>
        <input type="password" placeholder="确认密码" v-model="v_again">
      </div>
      <div class="reg_submit" @click="f_submit">
        注册
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';
export default {
  name: 'Register',
  data () {
    return {
      v_name: '',
      v_phone: '',
      v_code: '',
      v_password: '',
      v_again: '',
      v_flag: true,
      v_time: 60
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.user.id) {
        vm.$router.push({ name: 'index' })
      }
    })
  },
  mounted () {
    try {
      document.body.removeChild(document.getElementById('start_wrapper'))
      setTimeout(() => {
        document.getElementById('app').style.display = 'block'
      }, 500)
    } catch (e) {
      // console.log(e)
    }
  },
  methods: {
    f_submit () {
      let params = {
        phoneNum: this.v_phone,
        password: this.v_password,
        smsCode: this.v_code,
        userName: this.$store.state.wxInfo.nickname,
        headIcon: this.$store.state.wxInfo.headimgurl
      }

      if (this.v_phone && this.v_code && this.v_password && this.v_again) {
        // 密码是否一致
        if (this.v_password !== this.v_again) {
          this.$toast('密码不一致')
          return
        }
        this.$http
          .post('/admin/user/register', params)
          .then(res => {
            console.log('注册', res)
            if (res.data.success) {
              this.$toast('注册成功')
              this.$router.push({ name: 'login' })
            } else {
              this.$toast(res.data.msg)
            }
          })
      } else {
        this.$toast('请填写完整')
        return 
      }
    },
    f_getCode () {
      if (!(/^1[345678]\d{9}$/.test(this.v_phone))) {
        this.$toast('手机号错误')
        return
      }
      let params = {
        phoneNum: this.v_phone
      }

      this.v_flag = false
      this.f_countDown()
      this.$http
        .get('/admin/sms/code', { params })
        .then(res => {
          this.$toast('已发送')
        })
    },
    f_countDown () {
      let t = setTimeout(() => {
        if (this.v_time === 0) {
          clearTimeout(t)
          this.v_flag = true
          this.v_time = 60
          return
        }
        this.v_time--
        this.f_countDown()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scope>
.reg_wrapper{
  padding: 0.55rem 0.35rem;
  img{
    width: 2.3rem;
    height: 2rem;
    margin: 0 auto 1.5rem;
  }
  .reg_content{
    .reg_input{
      height: 0.84rem;
      margin-bottom: 0.25rem;
      box-sizing: border-box;
      border-bottom: 1px solid #d2d2d2;
      text-align: left;
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
          background-image: url('../../assets/images/login/login_icon_phone.png');
        }
      }
      &:nth-of-type(3){
        span{
          background-image: url('../../assets/images/login/reg_shell.png');
        }
      }
      &:nth-of-type(4){
        span{
          background-image: url('../../assets/images/login/login_icon_lock.png');
        }
      }
      &:nth-of-type(5){
        margin-bottom: 0.95rem;
        span{
          background-image: url('../../assets/images/login/login_icon_lock.png');
        }
      }
      input{
        width: 3.55rem;
        height: 100%;
        font-size: 0.28rem;
        vertical-align: top;
      }
      i{
        display: inline-block;
        width: 1.42rem;
        height: 0.56rem;
        line-height: 0.56rem;
        font-size: 0.2rem;
        font-style: normal;
        text-align: center;
        color: #fff;
        background: #f73476;
        border-radius: 0.08rem;
        vertical-align: top;
        cursor: pointer;
        &.reg_not{
          pointer-events: none;
          background-color: #d2d2d2;
          color: #999;
        }
      }
    }
    .reg_submit{
      width: 100%;
      height :0.9rem;
      border-radius: 0.41rem;
      background-color: #f73476;
      color: #fff;
      font-size: 0.34rem;
      line-height: 0.9rem;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
