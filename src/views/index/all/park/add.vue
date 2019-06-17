<template>
  <div class="pa_wrapper">
    <div class="pa_form">
      <div class="pa_input">
        <label>车牌号</label>
        <div class="pa_input_box">
          <mu-select v-model="v_form.carNum" :solo="true" full-width placeholder="请选择车位">
            <mu-option v-for="(v,i) in v_parkNum" :key="i" :label="v" :value="v"></mu-option>
          </mu-select>
        </div>
        <i></i>
      </div>
      <div class="pa_input">
        <label>费用</label>
        <div class="pa_input_box">
          <input type="text">
        </div>
        <span></span>
      </div>
      <div class="pa_input">
        <label>选择时间</label>
        <div class="pa_input_box">
          <input type="text">
        </div>
      </div>
      <div class="pa_input">
        <label>支付宝账号</label>
        <div class="pa_input_box">
          <input type="text">
        </div>
      </div>
      <div class="pa_input">
        <label>银行卡号</label>
        <div class="pa_input_box">
          <input type="text">
        </div>
      </div>
    </div>
    <div class="pa_submit">我已缴费</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_form: {
        carNum: '',
        price: '',
        startTime: '',
        endTime: '',
        createUserId: '',
        createUserName: '',
        villageCode: ''
      },
      v_carNum: []
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
