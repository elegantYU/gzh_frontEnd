<template>
  <div class="pa_wrapper">
    <div class="pa_form">
      <div class="pa_input">
        <label>车牌号</label>
        <div class="pa_input_box">
          <mu-select v-model="v_form.carNum" :solo="true" full-width placeholder="请选择车牌号">
            <mu-option v-for="(v,i) in v_carNum" :key="i" :label="v" :value="v"></mu-option>
          </mu-select>
        </div>
        <i></i>
      </div>
      <div class="pa_input">
        <label>费用</label>
        <div class="pa_input_box">
          <input type="text" placeholder="200元">
          <span>收费标准{{  }}元/月</span>
        </div>
      </div>
      <div class="pa_input">
        <label>选择时间</label>
        <div class="pa_input_box pa_date">
          <mu-date-input container="bottomSheet" v-model="v_form.startTime" solo placeholder="开始" type="month" :should-disable-date="f_startTimeRules" no-display></mu-date-input>
          <i>-</i>
          <mu-date-input container="bottomSheet" v-model="v_form.endTime" solo placeholder="结束" type="month" no-display></mu-date-input>
        </div>
      </div>
      <div class="pa_input">
        <label>支付宝账号</label>
        <div class="pa_input_box">
          <input type="text" placeholder='个人支付宝账号'>
        </div>
      </div>
      <div class="pa_input">
        <label>银行卡号</label>
        <div class="pa_input_box">
          <input type="text" placeholder="个人银行卡号">
        </div>
      </div>
      <div class="pa_input pa_wechat" v-if="v_payInfo.wx">
        <label>微信收款码</label>
        <div class="pa_qrcode">
          <img :src="qrcode" alt="">
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
      v_payInfo: {
        wx: {},
        price: {},
        zfb: {},
        yhk: {}
      },
      v_carNum: []
    }
  },
  computed: {
    qrcode () {
      if (this.v_payInfo.wx) {
        return JSON.parse(this.v_payInfo.wx.qrCode)[0]
      }
    }
  },
  mounted () {
    this.f_getPayInfo()
  },
  methods: {
    async f_getPayInfo () {
      const params ={
        villageCode: this.$store.state.villageCode
      }

      const { data: { data: { wx, price, zfb, yhk }}} = await this.$http
        .get('/admin/parking/getPayment', { params })
      
      this.v_payInfo = { wx, price, zfb, yhk }
      console.log(this.v_payInfo)
    },
    async f_getCarNum () {
      const params = {
        phone: this.$store.state.user.phoneNum
      }

      const { data: { data }} = await this.$http
        .get('/obtain/config/carSpinner', { params })

      this.v_carNum = data.map(v => v.carNo)
    },
    f_startTimeRules (date) {
      let today = new Date().getTime()
      return new Date(date).getTime() < today
    },
  }
}
</script>

<style lang='scss' scoped>
.pa_wrapper{
  background-color: #efeff4;
  min-height: 100%;
  .pa_form{
    .pa_input{
      padding: 0 0.3rem;
      background-color: #fff;
      display: flex;
      align-items: center;
      height: 0.9rem;;
      line-height: 0.9rem;
      border-bottom: 1px solid #e5e5e5;
      &:last-of-type{
        border: none;
      }
      label{
        width: 1.8rem;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.34rem;
        text-align: left;
      }
      .pa_input_box{
        flex: 1;
        position: relative;
        .mu-input{
          display: block;
          font-size: 0.3rem;
        }
        input{
          display: block;
          font-size: 0.3rem;
          width: 100%;
          height: 100%;
          font-size: 0.3rem;
        }
        span{
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          color: #e90016;
          font-size: 0.2rem;
        }
        &.pa_date{
          .mu-input{
            width: 45%;
            min-height: 0;
            padding: 0;
            float: left;
          }
          i{
            float: left;
            transform: translateY(50%);
          }
        }
      }
      &>i{
        width: 0.25rem;
        height: 100%;
        background-image: url('../../../../assets/images/repair/repair_arrow.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        vertical-align: middle;
      }
      &.pa_wechat{
        height: 300px;
        .pa_qrcode{
          width: 200px;
          height: 200px;
          img{
            max-width: 100%;
          }
        }
      }
    }
  }
  .pa_submit{
    margin: 0.4rem 0.3rem 0;
    height: 0.9rem;
    background-color: #f73476;
    text-align: center;
    font-size: 0.34rem;
    color: #fff;
    line-height: 0.9rem;
    border-radius: 0.415rem;
    cursor: pointer;
  }
}
</style>
