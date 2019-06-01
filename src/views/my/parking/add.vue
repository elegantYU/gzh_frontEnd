<template>
  <div class="pa_wrapper">
    <div class="pa_container">
      <div class="pa_header">
        车位信息
        <span @click="f_addItem">添加</span>
      </div>
      <ul>
        <li
          v-for="(v, i) in v_list"
          :key="i"
        >
          <div class="pa_input">
            <label>姓名</label>
            <div class="pa_input_box">
              <input type="text" placeholder="请输入姓名" v-model="v.belonger">
            </div>
          </div>
          <div class="pa_input">
            <label>联系方式</label>
            <div class="pa_input_box">
              <input type="text" placeholder="请输入联系方式" v-model="v.phoneNum">
            </div>
          </div>
          <div class="pa_input">
            <label>车位编号</label>
            <div class="pa_input_box">
              <mu-select v-model="v.position" :solo="true" full-width placeholder="请选择车位">
                <mu-option v-for="(v,i) in v_parkNum" :key="i" :label="v" :value="v"></mu-option>
              </mu-select>
            </div>
            <i></i>
          </div>
          <div class="pa_input">
            <label>类型</label>
            <div class="pa_input_box">
              <input type="text" readonly v-model="v.lotType">
            </div>
          </div>
          <div class="pa_input">
            <label>车牌号</label>
            <div class="pa_input_box">
              <mu-select v-model="v.vehicleNumber" multiple full-width :solo="true" placeholder="请选择车牌号">
                <mu-option v-for="(v,i) in v_carNum" :key="i" :label="v" :value="v"></mu-option>
              </mu-select>
            </div>
            <i></i>
          </div>
          <div class="pa_input">
            <label>车位锁</label>
            <div class="pa_input_box pa_input_radio">
              <span @click="f_checkLock(i, '有')"><i :class="v.lockType === '有' ? 'pa_checked' : ''"></i>有</span>
              <span @click="f_checkLock(i, '无')"><i :class="v.lockType === '无' ? 'pa_checked' : ''"></i>无</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="pa_submit" @click="f_submit">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParkAdd',
  data () {
    return {
      v_list: [
        { memberId: '', belonger: '', phoneNum: '', position: '', lotType: '自有', vehicleNumber: [], lockType: '有', villageCode: ''  }
      ],
      v_parkNum: [],
      v_carNum: []
    }
  },
  mounted  () {
    this.v_list[0].memberId = this.$store.state.user.id
    this.v_list[0].villageCode = this.$store.state.villageCode
    this.f_getCarNum()
  },
  methods: {
    f_getCarNum () {
      let params = {
        phone: this.$store.state.user.phoneNum
      }

      this.$http
      .get('/obtain/config/carportSpinner', { params })
        .then(res => {
          console.log(res)
          res.data.data.map(v => this.v_parkNum.push(v.code))
        })
      this.$http
        .get('/obtain/config/carSpinner', { params })
        .then(res => {
          console.log(res)
          res.data.data.map(v => this.v_carNum.push(v.carNo))                 // 待改
        })
    },
    f_addItem () {
      let item = {
        belonger: '',
        phoneNum: '',
        position: '',
        lotType: '自有',
        vehicleNumber: [],
        lockType: '有',
        memberId: this.$store.state.user.id,
        villageCode: this.$store.state.villageCode    // 小区id
      }
      this.v_list.push(item)
    },
    f_checkLock (i, n) {
      this.v_list[i].lockType = n
    },
    f_submit () {
      let flag = false
      for (let i = 0; i < this.v_list.length; i++) {
        for (const key in this.v_list[i]) {
          if (this.v_list[i][key] === '') {
            this.$toast('请填写完整')
            return
          }
        }
        for (let ind = 1; ind < this.v_list.length; ind++) {
          if (this.v_list[i].vehicleNumber === this.v_list[ind].vehicleNumber) {
            flag= true
          }
        }
      }
      this.v_list.forEach(v => {
        v.vehicleNumber = v.vehicleNumber.join(',')
      })

      if (flag) {
        this.$toast('请勿选择同一车位')
        return
      }

      this.v_list.map((v, i) => {
        let params = Object.assign({}, v)
        this.$http
          .post('/admin/member/parking/lot/save', params)
          .then(res => {
            if (res.data.success) {
              if (this.v_list.length-1 === i) {
                this.$router.go(-1)
              }
            } else {
              this.$toast(res.data.msg)
            }
          })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.pa_wrapper{
  background-color: #efeff4;
  height: 100%;
  .pa_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    .pa_header{
      height: 0.85rem;
      padding: 0 0.32rem;
      line-height: 0.85rem;
      font-size: 0.3rem;
      color: #999;
      position: relative;
      text-align: left;
      span{
        position: absolute;
        top: 50%;
        right: 0.32rem;
        transform: translateY(-50%);
        width: 1.2rem;
        height: 0.6rem;
        border: 0.02rem solid #dfdfdf;
        background-color: #f8f8f8;
        border-radius: 0.06rem;
        font-size: 0.26rem;
        line-height: 0.6rem;
        color: #f64682;
        text-align: center;
        cursor: pointer;
      }
    }
    ul{
      li{
        border-top: 1px solid #e5e5e5;
        margin-bottom: 0.2rem;
        .pa_input{
          padding: 0 0.3rem;
          background-color: #fff;
          display: flex;
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
            .mu-input{
              display: block;
            }
            input{
              display: block;
              font-size: 0.3rem;
              width: 100%;
              height: 100%;
              font-size: 0.3rem;
            }
            &.pa_input_radio{
              text-align: left;
              display: flex;
              flex-wrap: nowrap;
              span{
                display: inline-block;
                width: 1.38rem;
                height: 100%;
                line-height: 0.9rem;
                font-size: 0.3rem;
                i{
                  display: inline-block;
                  width: 0.46rem;
                  height: 0.46rem;
                  border-radius: 50%;
                  border: 1px solid #cacaca;
                  vertical-align: -0.15rem;
                  margin-right: 0.2rem;
                  &.pa_checked{
                    border: none;
                    background-image: url('../../../assets/images/neighbor/neighbor_checked.png');
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: 100% 100%;
                  }
                }
              }
            }
          }
          &>i{
            width: 0.25rem;
            height: 100%;
            background-image: url('../../../assets/images/repair/repair_arrow.png');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: contain;
            vertical-align: middle;
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
}
</style>
