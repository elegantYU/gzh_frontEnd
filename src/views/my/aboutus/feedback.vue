<template>
  <div class="wp">
    <div class="wr_feedback">
      <div class="wr_input">
        <textarea placeholder="请输入您的反馈" maxlength="200" v-model="v_form.content"></textarea>
      </div>
    </div>
    <div class="wr_form">
      <div class="wr_input">
        <input type="text" v-model="v_form.email" placeholder="邮箱（选填）">
      </div>
    </div>
    <div class="wr_submit" @click="f_submit">
      提交反馈
    </div>
  </div>
</template>
<script>
export default {
  name: 'feedback',
  data () {
    return {
      v_form: {
        content: '',
        email: ''
      }
    }
  },
  methods: {
    f_submit () {

    }
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
