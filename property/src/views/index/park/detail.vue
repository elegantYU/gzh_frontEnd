<template>
  <div class="pd_wrapper">
    <div class="pd_form">
      <div class="pd_item">
        <label>车牌号</label>
        <input type="text" readonly :value="v_form.carNum">
      </div>
      <div class="pd_item">
        <label>状态</label>
        <input type="text" readonly :value="v_form.sts">
      </div>
      <div class="pd_item">
        <label>费用</label>
        <input type="text" readonly :value="v_form.price">
      </div>
      <div class="pd_item">
        <label>有效期</label>
        <input type="text" readonly :value="validate">
      </div>
      <div class="pd_item">
        <label>提交时间</label>
        <input type="text" readonly :value="v_form.createTime">
      </div>
    </div>
    <div class="pd_btns">
      <button @click="f_getCheck(2)">未缴费</button>
      <button @click="f_getCheck(1)">已缴费</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_form: {}
    }
  },
  computed: {
    validate () {
      const s = this.v_form.startTime.replace(/(\d{4}).(\d{2}).(\d{2}).*/g, '$1-$2-$3')
      const e = this.v_form.endTime.replace(/(\d{4}).(\d{2}).(\d{2}).*/g, '$1-$2-$3')
      
      return `${s}至${e}`
    }
  },
  mounted () {
    this.v_form = this.$store.state.currentPark
  },
  methods: {
    async f_getCheck (t) {
      if (this.v_form.sts !== '待处理') {
        return
      }
      const params = {
        id: this.v_form.id,
        type: t,
        userId: this.$store.state.user.id,
        userName: this.$store.state.user.name
      }

      const { data: { success }} = await this.$http
        .get('/admin/parking/system/wx/update', { params })
      
      success ? this.$toast('缴费成功') : this.$toast('缴费失败')
    }
  }
}
</script>

<style lang='scss' scoped>
.pd_wrapper{
  background-color: #efeff4;
  height: 100%;
  .pd_form{
    border-top: 1px solid #e5e5e5;
    .pd_item{
      width: 100%;
      height: 0.9rem;
      line-height: 0.9rem;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e5e5;
      background-color: #fff;
      text-align: left;
      padding: 0 0.3rem;
      display: flex;
      label{
        display: block;
        font-size: 0.34rem;
        line-height: 0.9rem;
        width: 2rem;
        height: 100%;
      }
      input{
        flex: 1;
        height: 100%;
        font-size: 0.3rem;
        background-color: transparent;
      }
    }
  }
  .pd_btns{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    button{
      flex: 1;
      display: block;
      height: 100%;
      background-color: #f64682;
      color: #fff;
      line-height: 0.8rem;
      cursor: pointer;
      &:first-of-type{
        border-radius: 0.1rem 0 0 0.1rem;
      }
      &:last-of-type{
        border-left: 1px solid #fff;
        border-radius: 0 0.1rem 0.1rem 0 0;
      }
    }
  }
}
</style>
