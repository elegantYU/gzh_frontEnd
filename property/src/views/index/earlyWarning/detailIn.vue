<template>
  <div class="earlyDetali">
    <div class="e_content">
      <h6 class="earlyDetali_name">{{ village }}</h6>
      <div class="earlyDetali_cont">
        <div class="earlyDetali_input">
          <label>标题</label>
          <input type="text" readonly v-model="v_from.title">
        </div>
        <div class="earlyDetali_input">
          <label>事件状态</label>
          <input type="text" readonly v-model="v_from.statusName">
        </div>
        <div class="earlyDetali_input">
          <label>预警类型</label>
          <input type="text" readonly v-model="v_from.typeName">
        </div>
        <div class="earlyDetali_input">
          <label>位置信息</label>
          <input type="text" readonly v-model="v_from.position">
        </div>
        <div class="earlyDetali_input">
          <label>上报类型</label>
          <input type="text" readonly v-model="v_from.subTypeName">
        </div>
        <div class="earlyDetali_input">
          <label>上报分类</label>
          <input type="text" readonly v-model="v_from.reportName">
        </div>
        <div class="earlyDetali_input">
          <label>是否超时</label>
          <input type="text" readonly v-model="v_from.overtimeFlagName">
        </div>
        <div class="earlyDetali_input">
          <label>督办状态</label>
          <input type="text" readonly v-model="v_from.overseeStatusName">
        </div>
        <div class="earlyDetali_input">
          <label>承办部门</label>
          <input type="text" readonly v-model="v_from.currentDealDeptName">
        </div>
        <div class="earlyDetali_input">
          <label>承办人员</label>
          <input type="text" readonly v-model="v_from.currentDealRoleName">
        </div>
        <div class="earlyDetali_input">
          <label>处理时间</label>
          <input type="text" readonly v-model="v_from.startTime">
        </div>
        <div class="earlyDetali_div">
          <label>事件内容</label>
          <div>{{v_from.content}}</div>
        </div>
        <div class="earlyDetali-bnt" @click="f_submit">{{ btnText }}</div>
        <!-- popup -->
        <div class="pop_wrapper" v-if="v_pop">
          <div class="pop_mask" @click="f_close"></div>
          <div class="pop_content">
            <div class="pop_item">
              <label>处理人员</label>
              <input type="text" v-model="v_popForm.dealUserName">
            </div>
            <div class="pop_item">
              <label>人员电话</label>
              <input type="text" v-model="v_popForm.mobile">
            </div>
            <div class="pop_item">
              <label>处理意见</label>
              <textarea v-model="v_popForm.content"></textarea>
            </div>
            <p>TIPS: 提交后无法更改，请确保信息的正确</p>
            <span @click="f_handle">提交</span>
          </div>
          <div class="pop_close" @click="f_close"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_from: {},
      status: 0,
      v_pop: false,
      v_popForm: {
        dealUserName: '',
        mobile: '',
        content: ''
      }
    }
  },
  computed: {
    village () {
      return this.$store.state.village
    },
    btnText () {
      if (this.status === 1) {
        return '受理'
      } else {
        return '办结'
      }
    }
  },
  mounted () {
    this.f_getDetail()
    this.status = this.$route.query.status
  },
  methods: {
    f_getDetail () {
      const params = {
        id: this.$route.query.id
      }

      this.$http
        .get('/applet/event/current/mobile/comprehensive/comprehensiveShow', { params })
        .then(({ data }) => {
          this.v_from = Object.assign({}, data)
        })
    },
    f_submit () {
      if (this.status === 1) {
        this.$http
          .post(`/applet/event/current/mobile/comprehensive/comprehensiveAccept?id=${this.v_from.id}&idNumber=${this.$store.state.user.idNo}`)
          .then(res => {
            if (res.data.flag) {
              this.$router.back()
            }
            this.$toast(res.data.msg)
          })
      } else {
        this.v_pop = true
      }
    },
    f_close () {
      this.v_pop = false
    },
    f_handle () {
      if (!this.v_popForm.dealUserName || !this.v_popForm.mobile || !this.v_popForm.content) {
        this.$toast('请填写完整')
        return
      }

      this.$http
        .post(`/applet/event/current/mobile/comprehensive/commentComprehensive?dealUserName=${this.v_popForm.dealUserName}&mobile=${this.v_popForm.mobile}&content=${this.v_popForm.content}&eventId=${this.v_from.id}&idNumber=${this.$store.state.user.idNo}`)
        .then(res => {
          if (res.data.flag) {
            this.$router.back()
            this.v_pop = false
          }
          this.$toast(res.data.msg)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .earlyDetali{
    height: 100%;
    background-color: #efeff4;
    .e_content{
      padding-bottom: 1.2rem;
      background-color: #efeff4;
      overflow: auto;
    }
    .earlyDetali_name{
      font-size: 0.3rem;
      line-height: 0.8rem;
    }
    .earlyDetali_cont{
      height: 100%;
      background-color: white;
      border-top: 0.02rem solid #e5e5e5;
      .earlyDetali_input:last-child{
        border: none;
      }
      .earlyDetali_input{
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        background-color: #fff;
        text-align: left;
        padding: 0 0.5rem;
        display: flex;
        align-items: center;
        label{
          display: inline-block;
          font-size: 0.34rem;
          line-height: 0.9rem;
          width: 2rem;
          height: 100%;
          color: #b2b2b2;
        }
        input{
          flex: 1;
          height: 100%;
          text-align: right;
          font-size: 0.3rem;
          background-color: transparent;
        }
        div{
          width: 56%;
          height: 0.9rem;
          padding: 0.3rem 0;
          margin-left: auto;
          font-size: 0.28rem;
        }
      }
    }
  }

  .earlyDetali_div{
    width: 100%;
    line-height: 0.9rem;
    box-sizing: border-box;
    background-color: #fff;
    text-align: left;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    label{
      display: inline-block;
      font-size: 0.34rem;
      line-height: 0.9rem;
      width: 2rem;
      height: 100%;
      color: #b2b2b2;
    }
    div{
      width: 56%;
      padding: 0.3rem 0;
      margin-left: auto;
      font-size: 0.28rem;
      line-height: 1.5em;
    }
  }


  .earlyDetali-bnt{
    width: 3rem;
    height: 0.8rem;
    color: white;
    font-size: 0.3rem;
    background-color: #58c3fb;
    border-radius: 0.1rem;
    line-height: 0.8rem;
    margin: 0.2rem auto 0.6rem;
  }
.pop_wrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .pop_mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .pop_content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6.9rem;
    height: 6.4rem;
    background-color: #fff;
    border-radius: 0.1rem;
    padding: 0.7rem 0.3rem 0.6rem;
    .pop_item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: 0.5rem;
      margin-bottom: 0.2rem;
      &:last-of-type{
        margin-bottom: 0.6rem;
      }
      label{
        font-size: 0.24rem;
        color: #646464;
      }
      input{
        display: block;
        border-radius: 0.1rem;
        width: 4.8rem;
        height: 0.5rem;
        border: 2px solid #d7d7d7;
        font-size: 0.24rem;
      }
      textarea{
        display: block;
        border-radius: 0.1rem;
        width: 4.8rem;
        height: 2rem;
        border: 2px solid #d7d7d7;
        font-size: 0.24rem;
        line-height: 1.5em;
        resize: none;
      }
    }
    p{
      font-size: 0.2rem;
      color: #646464;
      margin-bottom: 0.2rem;
    }
    span{
      display: block;
      margin: 0 auto;
      width: 5.2rem;
      height: 0.8rem;
      border-radius: 0.1rem;
      background-color: #4cd6bf;
      line-height: 0.8rem;
      font-size: 0.36rem;
      color: #fff;
    }
  }
  .pop_close{
    position: absolute;
    top: calc(50% + 3.9rem);
    left: 50%;
    transform: translateX(-50%);
    width: 0.67rem;
    height: 0.67rem;
    background-image: url('../../../assets/images/close.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    cursor: pointer;
  }
}
</style>
