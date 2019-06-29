<template>
  <div class="pop_wrapper">
    <div class="pop_mask" @click="f_close"></div>
    <div class="pop_content">
      <h6>{{ title }}</h6>
      <div class="pop_form">
        <div class="pop_item">
          <label>姓名</label>
          <div class="pop_box">
            <input type="text" placeholder="请输入姓名" v-model="v_form.name">
          </div>
        </div>
        <div class="pop_item">
          <label>联系方式</label>
          <div class="pop_box">
            <input type="text" placeholder="请输入联系方式" v-model="v_form.phone">
          </div>
        </div>
        <div class="pop_item">
          <label>车牌号</label>
          <div class="pop_box">
            <mu-select v-model="v_form.carNum" full-width  placeholder="请选择车牌号">
              <mu-option v-for="(v,i) in v_carNums" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <!-- <i></i> -->
        </div>
        <div class="pop_item">
          <label>住户房屋</label>
          <div class="pop_box">
            <mu-select v-model="v_form.houseId" full-width  placeholder="请选择房屋">
              <mu-option v-for="(v,i) in v_house" :key="i" :label="v.name" :value="v.houseId"></mu-option>
            </mu-select>
          </div>
          <!-- <i></i> -->
        </div>
        <div class="pop_item" v-if="parkInfo.type === 'B'">
          <label>访客身份</label>
          <div class="pop_box">
            <mu-select v-model="v_form.type" full-width  placeholder="请选择与住户的关系">
              <mu-option v-for="(v,i) in v_visitorType" :key="i" :label="v.name" :value="v.value"></mu-option>
            </mu-select>
          </div>
          <!-- <i></i> -->
        </div>
        <div class="pop_item" v-else>
          <label>访客身份</label>
          <div class="pop_box">
            <input type="text" readonly value="子女">
          </div>
          <!-- <i></i> -->
        </div>
        <div class="pop_item">
          <label>预约时间</label>
          <div class="pop_box">
            <mu-date-input container="bottomSheet" placeholder="请选择预约时间" :should-disable-date="f_startTimeRules" full-width clock-type='24hr' view-type='list' v-model="v_form.orderTime" type="dateTime" landscape></mu-date-input>
          </div>
          <!-- <i></i> -->
        </div>
      </div>
      <div class="pop_btn" @click="f_submit">立即预约</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_visitorType: [
        { name: '亲戚', value: '1' },
        { name: '子女', value: '2' },
        { name: '朋友', value: '3' },
        { name: '其他', value: '4' },
      ],
      v_house: [], // name houseId
      v_carNums: [],
      v_form: {
        parkingLotId: '',
        name: '',
        phone: '',
        carNum: '',
        type: '',
        houseId: '',
        relationship: '',
        orderTime: '',
        wechatUserId: '',
        orgCode: ''
      }
    }
  },
  computed: {
    title () {
      if (this.parkInfo.type === 'B') {
        return '访客车位预约'
      } else {
        return '孝心车位预约'
      }
    }
  },
  props: {
    parkInfo: {
      type: Object
    }
  },
  mounted () {
    this.v_form.type = this.parkInfo.type
    this.v_house = this.$store.state.house
    this.f_getCarNum()
  },
  methods: {
    async f_getCarNum () {
      const params = {
        phone: this.$store.state.user.phoneNum
      }

      const { data: { data }} = await this.$http
        .get('/obtain/config/carSpinner', { params })
        
      this.v_carNums.push(...data)
    },
    f_startTimeRules (date) {
      const today = new Date().getTime()
      return new Date(date).getTime() < today
    },
    f_submit () {
      this.v_form.parkingLotId = this.parkInfo.id
      this.v_form.wechatUserId = this.$store.state.user.id
      this.v_form.orgCode = this.$store.state.villageCode
      this.v_form.relationship = this.parkInfo.type === 'B'
        ? this.v_form.relationship
        : '2'

      const orderTime = new Date(this.v_form.orderTime).toLocaleString('chinese', {hour12: false}).replace(/\//g, '-')
      const params = {
        ...this.v_form,
        orderTime: orderTime
      }

      this.$http
        .post('/admin/member/parking/lot/applyParkingLot', params)
        .then(({ data: { success }}) => {
          success ? this.$toast('预约成功') : this.$toast('预约失败')
          this.$emit('order')
        })
        .catch(err => {
          this.$toast('预约失败')
        })
    },
    f_close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang='scss' scoped>
.pop_wrapper{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  .pop_mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .pop_content{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 6.9rem;
    background-color: #fff;
    border-radius: 0.1rem;
    padding: 0.4rem 0.2rem;
    h6{
      font-size: 0.48rem;
      margin-bottom: 0.4rem;
    }
    .pop_form{
      margin-bottom: 0.3rem;
      .pop_item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.7rem;
        label{
          display: block;
          width: 1.2rem;
          font-size: 0.28rem;
          text-align:justify;
          text-justify:distribute-all-lines;/*ie6-8*/
          text-align-last:justify;
        }
        .pop_box{
          width: 4.6rem;
          height: 100%;
          input{
            display: block;
            width: 100%;
            height: 100%;
            font-size: 0.28rem;
            border-bottom: 1px solid #999999;
          }
          .mu-input{
            padding: 0;
          }
        }
        // &>i{
        //   width: 0.25rem;
        //   height: 100%;
        //   background-image: url('../../../assets/images/repair/repair_arrow.png');
        //   background-repeat: no-repeat;
        //   background-position: center center;
        //   background-size: contain;
        //   vertical-align: middle;
        // }
      }
    }
    .pop_btn{
      width: 6.3rem;
      height: 0.8rem;
      background-color: #f64682;
      font-size: 0.36rem;
      color: #fff;
      line-height: 0.8rem;
      border-radius: 0.1rem;
      margin: 0 auto;
    }
  }
}
</style>
