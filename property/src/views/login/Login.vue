<template>
  <div class="login_wrapper">
    <img src="../../assets/images/start_logo.png" alt="">
    <div class="login_content">
      <div class="login_input">
        <span></span>
        <input type="text" placeholder="请输入用户名" v-model="v_name">
      </div>
      <div class="login_input">
        <span></span>
        <input :type="v_switch ? 'text' : 'password'" placeholder="请输入密码" v-model="v_password">
        <i @click="f_switch" :class="{'active': v_open}"></i>
      </div>
      <div class="login_submit" @click="f_login">
        登录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      v_name: '',
      v_password: '',
      v_switch: false,
      v_open: false
    }
  },
  mounted () {
    this.f_getCookie()
  },
  methods: {
    f_login () {
      const params = {
            name: this.v_name,
            password: this.v_password
          }

      this.$http
        .get('/admin/user/wy/login', { params })
        .then(res => {
          if (res.data.success) {
            this.f_setCookie(this.v_name, this.v_password, 1)
            this.$toast('登录成功')
            this.$store.dispatch('setUser', res.data.data)
            // this.$store.commit('setVillage', res.data.data.village)
            this.$store.dispatch('setVillageCode', res.data.data.villageCode)
            this.f_getVillage(res.data.data.villageCode)
            this.$router.replace({ name: 'index' })
            localStorage.clear()
          } else {
            this.$toast(res.data.msg)
          }
        })
      // 下次进入重新授权
      localStorage.clear()
    },
    f_forget () {
      console.log('忘记密码')
    },
    f_getVillage (code) {
      const params = {
        villageCode: code
      }
      this.$http
        .get('/obtain/config/getVillageName', { params })
        .then(res => {
          this.$store.dispatch('setVillage', res.data.data)
        })

    },
    f_register () {
      this.$nextTick(x => {
        const count = localStorage.getItem('wx-auth-count')
        if (count == 1) {
          return
        }
        localStorage.setItem('wx-auth-count', 1)
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3ec96b7fb94e38fa&redirect_uri=${encodeURIComponent('http://zjphtech.com/admin/wx/person')}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
      })
      this.$router.push({ name: 'register' })
    },
    f_switch () {
      this.v_switch = !this.v_switch
      this.v_open = !this.v_open
    },
    f_setCookie (phone, pwd, exdays = 1) {
      let exdate = new Date()
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
      window.document.cookie = "userName" + "=" + unescape(phone) + ";path=/;expires=" + exdate.toGMTString()
      window.document.cookie = "userPwd" + "=" + unescape(pwd) + ";path=/;expires=" + exdate.toGMTString()
    },
    f_getCookie () {
      if (document.cookie.length > 0) {
        const arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
          const arr2 = arr[i].split('=')
          if (arr2[0] == 'userName') {
              this.v_name = escape(arr2[1])
          } else if (arr2[0] == 'userPwd') {
              this.v_password = escape(arr2[1])
          }
        }
      }
      if (this.v_name && this.v_password) {
        this.f_login()
      }
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
    margin-bottom: 0.42rem;
    .login_input{
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
        margin-bottom: 0.95rem;
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
      i{
        display: inline-block;
        width: 0.35rem;
        height: 100%;
        background-image: url('../../assets/images/login/login_eye.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        cursor: pointer;
        &.active{
          background-image: url('../../assets/images/login/login_icon_eye.png');
        }
      }
    }
    .login_submit{
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
  .login_detail{
    font-size: 0.26rem;
    line-height: 1.5em;
    padding: 0 0.3rem;
    span{
      color: #a0a0a0;
      &:nth-of-type(1) {
        float: left;
      }
      &:nth-of-type(2) {
        float: right;
      }
      i{
        font-style: normal;
        color: #f73476;
        cursor: pointer;
      }
    }
  }
}
</style>
