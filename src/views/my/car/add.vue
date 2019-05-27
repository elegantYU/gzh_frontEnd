<template>
  <div class="ca_wrapper">
    <div class="ca_container">
      <div class="ca_header">
        车辆信息
        <span @click="f_addItem">添加</span>
      </div>
      <ul>
        <li
          v-for="(v, i) in v_list"
          :key="i"
        >
          <div class="ca_input">
            <label>型号</label>
            <div class="ca_input_box">
              <mu-select v-model="v.vehicleType" :solo="true" placeholder="请选择型号">
                <mu-option v-for="(v,i) in v_model" :key="i" :label="v" :value="v"></mu-option>
              </mu-select>
            </div>
            <i></i>
          </div>
          <div class="ca_input">
            <label>类型</label>
            <div class="ca_input_box">
              <mu-select v-model="v.vehicleStructure" :solo="true" placeholder="请选择类型">
                <mu-option v-for="(v,i) in v_type" :key="i" :label="v" :value="v"></mu-option>
              </mu-select>
            </div>
            <i></i>
          </div>
          <div class="ca_input">
            <label>车牌</label>
            <div class="ca_input_box">
              <mu-select v-model="v.vehicleNumber" :solo="true" placeholder="请选择车牌号">
                <mu-option v-for="(v,i) in v_carNum" :key="i" :label="v" :value="v"></mu-option>
              </mu-select>
            </div>
            <i></i>
          </div>
        </li>
      </ul>
      <div class="ca_submit" @click="f_submit">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarAdd',
  data () {
    return {
      v_list: [
        { vehicleType: '', vehicleStructure: '', vehicleNumber: '' }
      ],
      v_model: ['货车', '轿车', '面包车'],
      v_type: ['轿车--两厢车', '轿车--三厢车', '面包车--七座', '面包车--七座以上', '货车--厢式货车', '货车--敞开类货车'],
      v_carNum: []
    }
  },
  mounted () {
    this.f_getCarNUm()
  },
  methods: {
    f_getCarNUm () {
      let params = {
        phone: this.$store.state.user.phoneNum
      }

      this.$http
        .get('/obtain/config/carSpinner', { params })
        .then(res => {
          this.v_carNum = res.data.data.map(v => v.carNo)
        })
    },
    f_addItem () {
      let item = {
        memberId: this.$store.state.user.id,
        vehicleType: '',
        vehicleStructure: '',
        vehicleNumber: ''
      }
      this.v_list.push(item)
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

      if (flag) {
        this.$toast('请勿选择同一车牌')
        return
      }

      this.v_list.map((v, i) => {
        this.$http
          .post('/admin/member/car/save', params)
          .then(res => {
            if (this.v_list.length -1 === i) {
              this.$toast('提交成功')
              this.$router.go(-1)
            }
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ca_wrapper{
  background-color: #efeff4;
  height: 100%;
  .ca_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    .ca_header{
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
        .ca_input{
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
            width: 1.5rem;
            line-height: 0.9rem;
            font-size: 0.34rem;
            text-align: left;
          }
          .ca_input_box{
            flex: 1;
            font-size: 0.3rem;
            .mu-input{
              display: block;
            }
            input{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          i{
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
    .ca_submit{
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
