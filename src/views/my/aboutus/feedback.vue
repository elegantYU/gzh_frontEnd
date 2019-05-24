<template>
  <div class="wp">
    <div class="wr_feedback">
      <div class="wr_input">
        <textarea placeholder="请输入您的反馈" maxlength="200" v-model="content"></textarea>
      </div>
    </div>
    <div class="wr_form">
      <div class="wr_input">
        <input type="text" v-model="email" placeholder="邮箱（选填）">
      </div>
    </div>
    <div class="wr_submit" @click="f_submit">
      提交反馈
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'feedback',
  data () {
    return {
      content: '',
      email: ''
    }
  },
  methods: {
    f_submit () {
      // let params = {
      //   content: this.content,
      //   email: this.email,
      //   createUserId: this.user.id,
      //   createName: this.user.name,
      //   type: 2
      // }
      let params = {
        content: '11111',
        email: '255636@163.com',
        createUserId: 1,
        createName: '高伟',
        type: 2
      }
      console.log(this.user, params, 111)
      if (this.content) {
        if (this.email) {
          if ((/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email))) {
            this.f_post(params)
          } else {
            this.$toast('请填写正确的邮箱')
          }
        } else {
          this.f_post(params)
        }
      } else {
        this.$toast('请填写完整')
      }
    },
    f_post (params) {
      this.$http
        .post('/admin/complaint/addComOrSugg', params)
        .then(res => {
          if (res.data.data) {
            this.$toast('反馈成功')
            this.$router.push({ name: 'aboutus' })
          } else {
            this.$toast('反馈失败')
          }
        })
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  }
}
</script>
<style lang="scss" scoped>
.wp {
  padding-top: 0.18rem;
  height: 100%;
  background-color: #efeff4;
}
.wr_feedback{
  height: 4rem;
  padding: 0.3rem;
  background-color: #fff;
  margin-bottom: 0.18rem;
  textarea{
    width: 100%;
    height: 100%;
    resize: none;
    font-size: 0.32rem;
  }
}
.wr_form {
  margin-bottom: 1rem;
  .wr_input{
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
    text-align: left;
    padding: 0 0.3rem;
  }
}
.wr_submit {
  width: 6.9rem;
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.34rem;
  color: #fff;
  background: #f73476;
  margin: 0 auto;
  border-radius: 0.415rem;
  cursor: pointer;
}
</style>
