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
          <input type="text" placeholder="0元" readonly v-model="price">
          <span>收费标准{{ v_payInfo.price.price }}元/月</span>
        </div>
      </div>
      <div class="pa_input">
        <label>选择时间</label>
        <div class="pa_input_box pa_date">
          <mu-date-input container="bottomSheet" v-model="v_start" solo placeholder="开始" type="month" :should-disable-date="f_startTimeRules" no-display></mu-date-input>
          <i>-</i>
          <mu-date-input container="bottomSheet" v-model="v_end" solo placeholder="结束" type="month" no-display></mu-date-input>
        </div>
      </div>
      <div class="pa_input" v-if="v_payInfo.zfb">
        <label>支付宝账号</label>
        <div class="pa_input_box">
          <input type="text" v-model="v_payInfo.zfb.paymentCode" placeholder='支付宝账号' readonly>
        </div>
      </div>
      <div class="pa_input" v-if="v_payInfo.yhk">
        <label>银行卡号</label>
        <div class="pa_input_box">
          <input type="text" v-model="cardNum" placeholder="个人银行卡号" readonly>
        </div>
      </div>
      <div class="pa_input pa_wechat" v-if="v_payInfo.wx">
        <label>微信收款码</label>
        <div class="pa_qrcode">
          <img :src="v_qrcode" alt="">
        </div>
      </div>
    </div>
    <a  class="pa_submit" @click="f_applyPark">我已缴费</a>
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
      v_carNum: [],
      v_qrcode: '',
      v_start: '',
      v_end: ''
    }
  },
  computed: {
    price () {
      const date = new Date()
      const nowDate = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
      const start = new Date(this.v_start).getTime()
      const end = new Date(this.v_end).getTime()
      let result
      if (start && end) {
        if (start >= nowDate && end >= nowDate) {
          if (end > start) {
            this.v_form.startTime = new Date(start).toLocaleString('chinese', { hour12: false }).replace(/(\d{4}).(\d{1,2}).(\d{1,2}).*/mg, '$1-$2-$3')
            this.v_form.endTime = new Date(end).toLocaleString('chinese', { hour12: false }).replace(/(\d{4}).(\d{1,2}).(\d{1,2}).*/mg, '$1-$2-$3')
          } else {
            this.v_form.startTime = new Date(end).toLocaleString('chinese', { hour12: false }).replace(/(\d{4}).(\d{1,2}).(\d{1,2}).*/mg, '$1-$2-$3')
            this.v_form.endTime = new Date(start).toLocaleString('chinese', { hour12: false }).replace(/(\d{4}).(\d{1,2}).(\d{1,2}).*/mg, '$1-$2-$3')
            // 交换
            const temp = this.v_end
            this.v_end = this.v_start
            this.v_start = temp
          }
          result = (Math.abs(end - start) / (1000*60*60*24*28)).toFixed()
          this.v_form.price = result * this.v_payInfo.price.price
          return this.v_form.price + '元'
        } else {
          if (start < nowDate && end < nowDate) {
            this.v_form.startTime = new Date(nowDate).toLocaleString('chinese', { hour12: false }).replace(/(\d{4}).(\d{1,2}).(\d{1,2}).*/mg, '$1-$2-$3')
            this.v_form.endTime = new Date(nowDate).toLocaleString('chinese', { hour12: false }).replace(/(\d{4}).(\d{1,2}).(\d{1,2}).*/mg, '$1-$2-$3')
            result = 0
          } else if (start < nowDate) {
            this.v_form.startTime = new Date(nowDate).toLocaleString('chinese', { hour12: false }).replace(/(\d{4}).(\d{1,2}).(\d{1,2}).*/mg, '$1-$2-$3')
            this.v_form.endTime = new Date(end).toLocaleString('chinese', { hour12: false }).replace(/(\d{4}).(\d{1,2}).(\d{1,2}).*/mg, '$1-$2-$3')
            result = (Math.abs(end - nowDate) / (1000*60*60*24*28)).toFixed()
          } else {
            this.v_form.startTime = new Date(start).toLocaleString('chinese', { hour12: false }).replace(/(\d{4}).(\d{1,2}).(\d{1,2}).*/mg, '$1-$2-$3')
            this.v_form.endTime = new Date(nowDate).toLocaleString('chinese', { hour12: false }).replace(/(\d{4}).(\d{1,2}).(\d{1,2}).*/mg, '$1-$2-$3')
            result = (Math.abs(start - nowDate) / (1000*60*60*24*28)).toFixed()
          }
          this.v_form.price = result * this.v_payInfo.price.price
          return this.v_form.price + '元'
        }
      }
    },
    cardNum () {
      if (this.v_payInfo.yhk !== null) {
        return this.v_payInfo.yhk.bankName + this.v_payInfo.yhk.paymentCode
      }
    }
  },
  mounted () {
    this.f_getPayInfo()
    this.f_getCarNum()
  },
  methods: {
    async f_getPayInfo () {
      const params ={
        villageCode: this.$store.state.villageCode
      }

      const { data: { data: { wx, price, zfb, yhk }}} = await this.$http
        .get('/admin/parking/getPayment', { params })
      
      this.v_payInfo = { wx, price, zfb, yhk }
      if (wx !== null) {
        this.v_qrcode = JSON.parse(wx.qrCode)[0]
      }
    },
    async f_getCarNum () {
      const params = {
        phone: this.$store.state.user.phoneNum
      }

      const { data: { data }} = await this.$http
        .get('/obtain/config/carSpinner', { params })

      if (data.length) {
        this.v_carNum = data.map(v => v.carNo)
      }
    },
    f_startTimeRules (date) {
      let today = new Date().getTime()
      return new Date(date).getTime() < today
    },
    async f_applyPark () {
      if (!this.v_form.carNum) {
        this.$toast('请选择车牌号')
        return
      }
      if (!this.v_form.price) {
        this.$toast('请选择正确时间')
        return
      }
      const params = {
        carNum: this.v_form.carNum,
        price: this.v_form.price,
        startTime: this.v_form.startTime,
        endTime: this.v_form.endTime,
        createUserId: this.$store.state.user.id,
        createUserName: this.$store.state.user.name,
        villageCode: this.$store.state.villageCode
      }

      const { data: { success }} = await this.$http
        .post('/admin/parking/addParking', params)
      
      if (success)
        this.$toast('申请成功')
        this.$router.go(-1)
    }
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
            height: 0.9rem;
            min-height: 0;
            padding: 0;
            float: left;
          }
          i{
            float: left;
            font-size: 0.3rem;
            transform: translateY(0.3rem);
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
    display: block;
    margin: 0.4rem auto 0;
    width: 6.5rem;
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
