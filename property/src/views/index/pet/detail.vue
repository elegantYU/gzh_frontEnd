<template>
  <div class="rep_wrapper">
    <div class="rep_content">
      <div class="rep_from">
        <div class="rep_input">
          <label>饲养人</label>
          <input type="text" readonly v-model="v_detail.raiser">
        </div>
        <div class="rep_input">
          <label>宠物品种</label>
          <input type="text" readonly v-model="v_detail.petBreed">
        </div>
        <div class="rep_input">
          <label>昵称</label>
          <input type="text" readonly v-model="v_detail.petName">
        </div>
        <div class="rep_input">
          <label>性别</label>
          <input type="text" readonly v-model="v_detail.gender">
        </div>
        <div class="rep_input">
          <label>是否绝育</label>
          <input type="text" readonly v-model="v_detail.sterilization">
        </div>
        <div class="rep_input">
          <label>体重</label>
          <input type="text" readonly v-model="v_detail.weight">
        </div>
        <div class="rep_input">
          <label>住址：</label>
          <input type="text" readonly v-model="v_detail.address">
        </div>
        <div class="rep_input">
          <label>动物健康免疫证编号</label>
          <input type="text" readonly v-model="v_detail.exemptionNum">
        </div>
        <div class="rep_input">
          <label>免疫时间：</label>
          <input type="text" readonly v-model="v_detail.exemptionTime">
        </div>
        <div class="rep_input">
          <label>疫苗种类：</label>
          <input type="text" readonly v-model="v_detail.vaccineType">
        </div>
        <div class="rep_input">
          <label>养犬登记编号</label>
          <input type="text" readonly v-model="v_detail.petRegisNum">
        </div>
        <div class="rep_input">
          <label>登记时间：</label>
          <input type="text" readonly v-model="v_detail.createTime">
        </div>
      </div>
      <div class="rep_preview">
        <b>证件照片</b>
        <div class="rep_preview_wrapper">
          <div
            class="rep_preview_item"
            v-for="(v, i) in imgs"
            :key="i"
          >
            <img :src="v" alt="">
          </div>
        </div>
      </div>
      <div class="pet_btns">
        <span @click="f_passNot">审核不通过</span>
        <span @click="f_pass">审核通过</span>
      </div>
      <div class="pet_pop" v-show="v_pop">
        <div class="pet_mask" @click="f_cancel"></div>
        <div class="pet_content">
          <textarea v-model="v_desc" placeholder="请输入审批原因"></textarea>
          <div class="pet_pop_btns">
            <span @click="f_cancel">取消</span>
            <span @click="f_submit">确认</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_id: 0,
      v_detail: {},
      v_pop: false,
      v_desc: ''
    }
  },
  computed: {
    imgs () {
      return JSON.parse(v_detail.exemptionImg)
    }
  },
  mounted () {
    this.v_id = this.$route.query.id
  },
  methods: {
    async f_getDetail () {
      const params = {
        id: this.v_id
      }

      const { data: { data }} = await this.$http
        .get('/admin/member/pet/getPetDetail', { params })
      
      this.v_detail = Object.assign({}, data)
    },
    f_passNot () {
      this.v_pop = true
    },
    async f_pass () {
      const params = {
        id: this.v_id,
        type: 1,
        userId: this.$store.state.user.id,
        userName: this.$store.state.user.name
      }

      const { data: { success }} = await this.$http
        .get('/admin/member/pet/system/wx/updatePet', { params })

      success ? this.$toast('审核通过') : this.$toast('网络错误')
    },
    async f_submit () {
      if (!this.v_desc) {
        this.$toast('拒绝理由不能为空')
        return 
      }

      const params = {
        id: this.v_id,
        type: 2,
        userId: this.$store.state.user.id,
        userName: this.$store.state.user.name,
        msg: this.v_desc
      }

      const { data: { success }} = await this.$http
        .get('/admin/member/pet/system/wx/updatePet', { params })

      success ? this.$toast('审批拒绝') : this.$toast('网络错误')
    },
    f_cancel () {
      this.v_pop = false
    },
  }
}
</script>

<style lang="scss" scoped>
.rep_wrapper{
  height: 100%;
  background-color: #efeff4;
  overflow: auto;
  .rep_content{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    h6{
      padding: 0.23rem 0 0.26rem;
      font-size: 0.36rem;
    }
    .rep_from{
      border-top: 1px solid #e5e5e5;
      .rep_input{
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        background-color: #fff;
        text-align: left;
        padding: 0 0.3rem;
        display: flex;
        align-items: center;
        label{
          display: inline-block;
          font-size: 0.34rem;
          line-height: 0.9rem;
          width: 3.2rem;
          height: 100%;
          color: #b2b2b2;
        }
        input{
          flex: 1;
          height: 100%;
          text-align: right;
          font-size: 0.28rem;
          background-color: transparent;
        }
      }
    }
    .rep_detail{
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #b2b2b2;
        text-align: left;
        font-weight: normal;
      }
      .rep_detail_text{
        text-align: left;
        min-height: 1.48rem;
        padding: 0.3rem;
        background-color: #fff;
        font-size: 0.26rem;
        line-height: 1.5em;
      }
    }
    .rep_preview{
      margin-bottom: 0.3rem;
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #b2b2b2;
        text-align: left;
        font-weight: normal;
      }
      .rep_preview_wrapper{
        height: 1.74rem;
        padding: 0.3rem;
        box-sizing: border-box;
        background-color: #fff;
        .rep_preview_item{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
    .pet_btns{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        flex: 1;
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
    .pet_pop{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      .pet_mask{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        top: 0;
        left: 0;
      }
      .pet_content{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0.2rem;
        background-color: #fff;
        textarea{
          display: block;
          width: 100%;
          height: 2.6rem;
          font-size: 0.28rem;
          line-height: 1.5em;
          resize: none;
          border: 1px solid #eeeeee;
        }
        .pet_pop_btns{
          height: 1.2rem;
          line-height: 1.2rem;
          float: right;
          font-size: 0.3rem;
          color: #666;
          span{
            margin-left: 0.5rem;
            &:last-of-type{
              color: #f64682;
            }
          }
        }
      }
    }
  }
}
</style>
