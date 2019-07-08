<template>
  <div class="pa_wrapper">
    <div class="pa_container">
      <h6>{{place}}</h6>
      <div class="pa_form">
        <div class="pa_input">
          <label>饲养人</label>
          <div class="pa_input_box">
            <input type="text" readonly v-model="v_form.raiser">
          </div>
        </div>
        <div class="pa_input">
          <label>家庭住址</label>
          <div class="pa_input_box">
            <mu-select v-model="v_form.address" full-width :solo="true" placeholder="请选择房屋">
              <mu-option v-for="(v,i) in v_address" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
        <div class="pa_input">
          <label>宠物品种</label>
          <div class="pa_input_box">
            <input type="text" v-model="v_form.petBreed" placeholder="请输入宠物品种">
          </div>
        </div>
        <div class="pa_input">
          <label>昵称</label>
          <div class="pa_input_box">
            <input type="text" v-model="v_form.petName" placeholder="请输入宠物昵称">
          </div>
        </div>
        <div class="pa_input">
          <label>体重</label>
          <div class="pa_input_box">
            <input type="text" v-model="v_form.weight" @change="changeWeight" placeholder="请输入宠物体重">
          </div>
        </div>
        <div class="pa_input">
          <label>性别</label>
          <div class="pa_input_box pa_input_radio">
            <span @click="f_checkGender('1')"><i :class="v_form.gender === '1' ? 'pa_checked' : ''"></i>雄</span>
            <span @click="f_checkGender('0')"><i :class="v_form.gender === '0' ? 'pa_checked' : ''"></i>雌</span>
          </div>
        </div>
        <div class="pa_input">
          <label>是否绝育</label>
          <div class="pa_input_box pa_input_radio">
            <span @click="f_checkSterilization('1')"><i :class="v_form.sterilization === '1' ? 'pa_checked' : ''"></i>是</span>
            <span @click="f_checkSterilization('0')"><i :class="v_form.sterilization === '0' ? 'pa_checked' : ''"></i>否</span>
          </div>
        </div>
        <div class="pa_input">
          <label>健康免疫证编号</label>
          <div class="pa_input_box">
            <input type="text" v-model="v_form.exemptionNum" placeholder="请输入健康免疫证编号">
          </div>
        </div>
        <div class="pa_input">
          <label>免疫时间</label>
          <div class="pa_input_box">
            <mu-date-input container="bottomSheet" no-display :solo='true' :full-width="true" clock-type='24hr' view-type='list' v-model="v_form.exemptionTime" type="dateTime" landscape></mu-date-input>
          </div>
        </div>
        <div class="pa_input">
          <label>疫苗种类</label>
          <div class="pa_input_box">
            <input type="text" v-model="v_form.vaccineType" placeholder="请输入疫苗种类">
          </div>
        </div>
        <div class="pa_input">
          <label>养犬登记编号</label>
          <div class="pa_input_box">
            <input type="text" v-model="v_form.petRegisNum" placeholder="请输入养犬登记编号">
          </div>
        </div>
      </div>
      <div class="pa_upload">
        <b>证件照片上传<span>（健康免疫证与养犬登记证）</span></b>
        <div class="pa_preview">
          <p>请上传含有上述信息的所有页面，以便物业核对</p>
          <div
            class="pa_preview_list"
            v-for="(v, i) in v_form.exemptionImg"
            :key="i"
          >
            <img :src="v" alt="">
          </div>
          <button class="pa_preview_add" @click="f_upload"></button>
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
        sterilization: '1',
        weight: '',
        address: '',
        exemptionNum: '',
        exemptionTime: '',
        vaccineType: '',
        petRegisNum: '',
        createUserId: '',       // user id
        villageCode: '',        // 小区id
        exemptionImg: []        // 图片数组
      },
      v_address: []
    }
  },
  computed: {
    place () {
      return this.$store.state.village
    }
  },
  mounted () {
    // 饲养人name
    this.v_form.raiser = this.$store.state.user.name
    this.v_form.createUserId = this.$store.state.user.id
    this.v_form.villageCode = this.$store.state.villageCode
    this.f_getHouse()
  },
  methods: {
    f_upload (e) {
      if (this.v_form.exemptionImg.length > 2) {
        this.$toast('最多三张图片')
        return
      }
      this.$wxsdk.chooseImage()
        .then(({ localIds }) => {
          this.$toast({
            time: 3000,
            msg: '图片加载中...'
          })
          localIds.map(v => {
            this.$wxsdk.getLocalImgData(v)
              .then(({ localData }) => {
                const form = new FormData()
                form.append("base64", localData)
                this.$http
                  .post('/admin/file/upload2', form)
                  .then(({data: { data }}) => {
                    this.$toast('加载完成')
                    this.v_form.exemptionImg.push(data)
                  })
              })
          })
        })
    },
    f_getHouse () {
      let params = {
        memberId: this.v_form.createUserId,
        villageCode: this.v_form.villageCode
      }

      this.$http
        .get('/admin/member/house/all', { params })
        .then(res => {
          this.v_address = res.data.data.map(v => `${v.building}${v.unit}${v.room}`)
        })
    },
    f_checkGender (n) {
      this.v_form.gender = n
    },
    f_checkSterilization (n) {
      this.v_form.sterilization = n
    },
    f_submit () {
      let params = Object.assign({}, this.v_form)
      params.exemptionImg = JSON.stringify(this.v_form.exemptionImg)
      params.exemptionTime = new Date(params.exemptionTime).toLocaleString('chinese', { hour12: false }).replace(/\//g, '-')
      console.log(params)

      if (params.raiser && params.petBreed && params.exemptionNum && params.exemptionTime && params.vaccineType && params.petRegisNum) {
        this.$http
          .post('/admin/member/pet/addPet', params)
          .then(res => {
            if (res.data.success) {
              this.$toast('登记成功')
              this.$router.go(-1)
            } else {
              this.$toast('网络错误')
            }
            console.log(res)
          })
      } else {
        this.$toast('请完善基本信息')
        return
      }
    },

    //输入体重默认单位kg
    changeWeight () {
      if (this.v_form.weight=='') {
        this.v_form.weight=''
      }else {
        this.v_form.weight = this.v_form.weight + 'kg'
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
        align-items: center;
        height: 0.9rem;
        line-height: 0.9rem;
        border-bottom: 1px solid #e5e5e5;
        font-size: 0.3rem;
        &:last-of-type{
          border: none;
        }
        label{
          width: 2.4rem;
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
            width: 100%;
            height: 100%;
            font-size: 0.28rem;
            line-height: 0.9rem;
          }
          &.pa_input_radio{
            text-align: left;
            display: flex;
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
        position: relative;
        p{
          position: absolute;
          font-size: 0.18rem;
          color: #ff0000;
          top: 0.1rem;
          left: 0.4rem;
        }
        .pa_preview_list{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
        .pa_preview_add{
          float: left;
          display: block;
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
          input{
            width: 0;
            opacity: 0;
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
