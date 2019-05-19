<template>
  <div class="pa_wrapper">
    <div class="pa_container">
      <h6>康馨园小区</h6>
      <div class="pa_form">
        <div class="pa_input">
          <label>饲养人</label>
          <div class="pa_input_box">
            <input type="text" readonly v-model="v.raiser">
          </div>
        </div>
        <div class="pa_input">
          <label>家庭住址</label>
          <div class="pa_input_box">
            <mu-select v-model="v.address" :solo="true" placeholder="请选择房屋">
              <mu-option v-for="(v,i) in v_address" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
        <div class="pa_input">
          <label>宠物品种</label>
          <div class="pa_input_box">
            <input type="text" v-model="v.petBreed" placeholder="请输入宠物品种">
          </div>
        </div>
        <div class="pa_input">
          <label>昵称</label>
          <div class="pa_input_box">
            <input type="text" v-model="v.petName" placeholder="请输入宠物昵称">
          </div>
        </div>
        <div class="pa_input">
          <label>体重</label>
          <div class="pa_input_box">
            <input type="text" v-model="v.weight" placeholder="请输入宠物体重">
          </div>
        </div>
        <div class="pa_input">
          <label>性别</label>
          <div class="pa_input_box">
            <span @click="f_checkGender(i, '1')"><i :class="v.gender === '1' ? 'pa_checked' : ''"></i>雄</span>
            <span @click="f_checkGender(i, '0')"><i :class="v.gender === '0' ? 'pa_checked' : ''"></i>雌</span>
          </div>
        </div>
        <div class="pa_input">
          <label>是否绝育</label>
          <div class="pa_input_box">
            <span @click="f_checkSterilization(i, '1')"><i :class="v.sterilization === '1' ? 'pa_checked' : ''"></i>是</span>
            <span @click="f_checkSterilization(i, '0')"><i :class="v.sterilization === '0' ? 'pa_checked' : ''"></i>否</span>
          </div>
        </div>
        <div class="pa_input">
          <label>健康免疫证编号</label>
          <div class="pa_input_box">
            <input type="text" v-model="v.exemptionNum" placeholder="请输入健康免疫证编号">
          </div>
        </div>
        <div class="pa_input">
          <label>免疫时间</label>
          <div class="pa_input_box">
            <mu-date-input container="bottomSheet" :solo='true' :full-width="true" clock-type='24hr' view-type='list' v-model="v.exemptionTime" type="date" landscape></mu-date-input>
          </div>
        </div>
        <div class="pa_input">
          <label>疫苗种类</label>
          <div class="pa_input_box">
            <input type="text" v-model="v.vaccineType" placeholder="请输入疫苗种类">
          </div>
        </div>
        <div class="pa_input">
          <label>养犬登记编号</label>
          <div class="pa_input_box">
            <input type="text" v-model="v.petRegisNum" placeholder="请输入养犬登记编号">
          </div>
        </div>
      </div>
      <div class="pa_upload">
        <b>证件照片上传<span>（健康免疫证与养犬登记证）</span></b>
        <div class="pa_preview">
          <div
            class="pa_preview_list"
            v-for="(v, i) in v_images"
            :key="i"
          >
            <img :src="v" alt="">
          </div>
          <div class="pa_preview_add" @click="f_upload"></div>
        </div>
      </div>
      <div class="pa_submit" @click="f_submit">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PetAdd',
  data () {
    return {
      v_form: {
        raiser: '',
        petBreed: '',
        petName: '',
        gender: '1',
        sterillzation: '1',
        weight: '',
        address: '',
        exemptionNum: '',
        exemptionTime: '',
        vaccineType: '',
        petRegisNum: '',
        createUserId: '',
        exemptionImg: '',
        petRegisImg: '',
        petImg: ''
      },
      v_address: []
    }
  },
  methods: {
    f_upload () {

    },
    f_submit () {
      let params = Object.assign({}, this.v_form)

      if (params.raiser && params.petBreed && params.exemptionNum && params.exemptionTime && params.vaccineType && params.petRegisNum) {
        this.$http
          .post('/admin/member/pet/addPet', params)
          .then(res => {
            console.log(res)
          })
      } else {
        this.$toast('请完善基本信息')
        return
      }
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
    h6{
      padding: 0.24rem 0;
      font-size: 0.36rem;
      color: #000;
    }
    .pa_form{
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
          line-height: 0.9rem;
          font-size: 0.34rem;
          text-align: left;
        }
        .pa_input_box{
          flex: 1;
          input{
            width: 100%;
            height: 100%;
          }
          &.pa_input_radio{
            text-align: left;
            span{
              display: inline-block;
              width: 1.38rem;
              height: 100%;
              line-height: 0.9rem;
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
                  background-image: url('../../../../assets/images/neighbor/neighbor_checked.png');
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
          background-image: url('../../../../assets/images/repair/repair_arrow.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          vertical-align: middle;
        }
      }
    }
    .pa_upload{
      margin-bottom: 0.4rem;
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #000;
        text-align: left;
        font-weight: normal;
        span{
          color: #b2b2b2;
        }
      }
      .pa_preview{
        height: 1.74rem;
        padding: 0.3rem;
        box-sizing: border-box;
        background-color: #fff;
        .pa_preview_list{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          img{
            width: 100%;
          }
        }
        .pa_preview_add{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          border: 0.01rem solid #cccccc;
          background-image: url('../../../../assets/images/repair/repair_add.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 0.56rem 0.56rem;
          cursor: pointer;
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
