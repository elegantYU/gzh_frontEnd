<template>
  <div class="nd_wrapper">
    <div class="nd_container">
      <h6>{{ place }}</h6>
      <div class="nd_from">
        <div class="nd_input">
          <label>分类</label>
          <input type="text" readonly v-model="type">
        </div>
        <div class="nd_input">
          <label>标题</label>
          <input type="text" readonly v-model="v_content.title">
        </div>
        <div class="nd_input">
          <label>联系人</label>
          <input type="text" readonly v-model="v_content.contact">
        </div>
        <div class="nd_input">
          <label>联系方式</label>
          <input type="text" readonly v-model="v_content.telephone">
        </div>
        <!-- 车位详情 -->
        <div class="nd_input" v-if="v_content.taskType === '1' || v_content.taskType === '2'">
          <label>{{ v_content.taskType === '1' ? '车牌号' : '车位编号' }}</label>
          <input type="text" readonly v-model="v_content.carNum">
        </div>
        <div class="nd_input" v-if="v_content.taskType === '2'">
          <label>收费标准</label>
          <input type="text" readonly v-model="v_content.price">
        </div>
        <div class="nd_input" v-if="v_content.taskType === '2'">
          <label>车位锁</label>
          <input type="text" readonly v-model="hasLock">
        </div>
        <!-- 拼车 -->
        <div class="nd_input" v-if="v_content.taskType === '1'">
          <label>发车地点</label>
          <input type="text" readonly v-model="v_content.departPlace">
        </div>
        <div class="nd_input" v-if="v_content.taskType === '1'">
          <label>目的地</label>
          <input type="text" readonly v-model="v_content.destination">
        </div>
        <!-- 时间互换 -->
        <div class="nd_input" v-if="v_content.taskType === '3'">
          <label>性别</label>
          <input type="text" readonly v-model="v_content.gender">
        </div>
        <div class="nd_input" v-if="v_content.taskType === '3'">
          <label>职业</label>
          <input type="text" readonly v-model="v_content.profession">
        </div>
        <div class="nd_input" v-if="v_content.taskType === '3'">
          <label>技能</label>
          <input type="text" readonly v-model="v_content.skill">
        </div>
        <div class="nd_input">
          <label>{{ v_content.taskType === '1' ? '发车时间' : v_content.taskType === '3' ? '互换时间' : '共享时间' }}</label>
          <input type="text" readonly v-model="shareTime">
        </div>
        <!-- 资源共享 -->
        <div class="nd_input" v-if="v_content.shareType === '4'">
          <label>人脸门禁</label>
          <input type="text" readonly v-model="v_content.skill">
          <span>※需要携带本人省份证在进门处登记人脸识别照片</span>
        </div>
        <!-- 预约状态 -->
        <div class="nd_input" v-if="v_orderStatus">
          <label>预约状态</label>
          <input type="text" readonly :value="v_apply">
        </div>
      </div>
      <!-- 内容描述 -->
      <div class="nd_description">
        <b>内容描述</b>
        <div class="nd_input">
          <textarea readonly v-model="v_content.content"></textarea>
        </div>
      </div>
      <!-- 图片 -->
      <div class="nd_preview">
        <b>图片</b>
        <div class="nd_preview_wrapper">
          <div
            class="nd_preview_item"
            v-for="(v, i) in imgJson"
            :key="i"
          >
            <img :src="v" alt="">
          </div>
        </div>
      </div>
      <!-- 取消共享 或者 立即预约 -->
      <div class="nd_submit" v-if="submit" @click="f_order">
        {{ v_orderText }}
      </div>
      <!-- 物业特有评论 -->
      <div class="nd_comments" v-if="v_content.shareType == 2">
        <h6>申请人</h6>
        <ul class="nd_comments_list">
          <li
            v-for="(v, i) in v_comments"
            :key="i"
            class="clearfix"
          >
            <div class="nd_comments_avatar">
              <img src="" alt="">
            </div>
            <div class="nd_comments_content">
              <ul>
                <li><label>姓名</label>：{{ $store.state.user.name }}</li>
                <li><label>联系方式</label>：{{ $store.state.user.phoneNum }}</li>
                <li><label>身份证号</label>：</li>
                <li><label>房屋信息</label>：{{ $store.state.house[0] }}</li>
                <li><label>预约时间</label>：{{ new Date().toLocaleString('chinese', { hour12: false }).replace(/\//g, '-') }}</li>
              </ul>
            </div>
            <span>预约成功</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      v_content: {},
      v_orderStatus: false,
      v_orderText: '',
      v_apply: '',
      v_comments: []
    }
  },
  computed: {
    type: function () {
      switch (this.v_content.taskType) {
        case '1':
          return '拼车'
          break
        case '2':
          return '车位共享'
          break
        case '3':
          return '时间互换'
          break
        case '4':
          return '资源共享'
          break
      }
    },
    shareTime: function () {
      switch (this.v_content.taskType) {
        case '1':
        case '3':
          return this.v_content.startTime.replace(this.v_content.startTime.slice(16), '')
          break
        default:
          if (this.v_content.endTime) {
            let time = this.v_content.endTime.split(' ')[1].replace(this.v_content.endTime.split(' ')[1].slice(5), '')
            let start = this.v_content.startTime.replace(this.v_content.startTime.slice(16), '')
            return `${start} ~ ${time}`
          }
          break
      }
    },
    hasLock: function () {
      return this.v_content.carLock ? '有' : '无'
    },
    imgJson: function () {
      console.log(this.v_content.imgUrl)
      return eval(this.v_content.imgUrl)
    },
    submit: function () {
      if (this.v_content.shareType == 2) {
        this.v_orderText = '立即预约'
        return true
      } else if (this.v_content.createUserId === this.$store.state.user.id) {
        this.v_orderText = '取消共享'
        return true
      } else {
        return false
      }
    },
    place () {
      return this.$store.state.village
    }
  },
  created () {
    this.f_getContent()
  },
  methods: {
    f_getContent () {
      let id = this.$route.query.id
      let params = {
        id
      }
      this.$http
        .get('/admin/share/getShareInfoDetail', { params })
        .then(res => {
          if (res.data.success) {
            this.v_content = Object.assign({}, res.data.data)
          }
        })
    },
    f_order () {
      if (this.v_content.shareType === '2') {
        let params = {
          id: this.v_content.id,
          userId: this.$store.state.user.id,
          userName: this.$store.state.user.name,
          telephone: this.$store.state.user.phoneNum,
          address: this.$store.state.house[0],
          villageCode: this.$store.state.villageCode,
          IDCard: '--'
        }
        console.log('房屋', this.$store.state.house)
        this.$http
          .get('/admin/share/applyShareInfo', { params })
          .then(res => {
            if (res.data.msg) {
              this.v_apply = res.data.msg
              this.v_orderStatus = true
              this.$toast(this.v_apply)
              this.$router.go(-1)
            }
          })
      } else {
        let params = {
          id: this.v_content.id,
          type: 2
        }
        let flag = confirm('确认取消共享吗?')
        if (flag) {
          this.$http
            .get('/admin/share/deleteShareInfo', { params })
            .then(res => {
              if (res.data.success) {
                this.$toast('取消成功')
                this.$router.go(-1)
              } else {
                this.$toast('网络错误')
              }
            })
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.nd_wrapper{
  height: 100%;
  background-color: #efeff4;
  .nd_container{
    background-color: #efeff4;
    h6{
      padding: 0.23rem 0 0.26rem;
      font-size: 0.36rem;
    }
    .nd_from{
      border-top: 1px solid #e5e5e5;
      .nd_input{
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        background-color: #fff;
        text-align: left;
        padding: 0 0.3rem;
        position: relative;
        display: flex;
        label{
          display: block;
          font-size: 0.34rem;
          line-height: 0.9rem;
          width: 2rem;
          height: 100%;
        }
        input{
          flex: 1;
          height: 100%;
          font-size: 0.3rem;
          background-color: transparent;
        }
        span{
          position: absolute;
          right: 0.3rem;
          top: 0.35rem;
          color: #ff0000;
          font-size: 0.16rem;
        }
      }
    }
    .nd_description{
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #b2b2b2;
        text-align: left;
        font-weight: normal;
      }
      .nd_input{
        height: 1.48rem;
        padding: 0.3rem;
        background-color: #fff;
        textarea{
         width: 100%;
         height: 100%; 
         resize: none;
         font-size: 0.26rem;
        }
      }
    }
    .nd_preview{
      margin-bottom: 0.3rem;
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #b2b2b2;
        text-align: left;
        font-weight: normal;
      }
      .nd_preview_wrapper{
        height: 1.74rem;
        padding: 0.3rem;
        box-sizing: border-box;
        background-color: #fff;
        .nd_preview_item{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          display: flex;
          align-items: center;
          img{
            width: 100%;
          }
        }
      }
    }
    .nd_submit{
      margin: 0 0.3rem 0.3rem;
      height: 0.9rem;
      background-color: #f73476;
      text-align: center;
      font-size: 0.34rem;
      color: #fff;
      line-height: 0.9rem;
      border-radius: 0.415rem;
      cursor: pointer;
    }
    .nd_comments{
      padding: 0.3rem;
      background-color: #efeff4;
      h6{
        color: #333;
        font-size: 0.3rem;
        text-indent: 1em;
        text-align: left;
        position: relative;
        padding: 0;
        &::before{
          position: absolute;
          left: 0;
          top: 0;
          content: '';
          width: 0.1rem;
          height: 0.3rem;
          background-color: #f73476;
        }
      }
      .nd_comments_list{
        padding-left: 0.2rem;
        padding-top: 0.2rem;
        &>li{
          position: relative;
          .nd_comments_avatar{
            width: 0.6rem;
            height: 0.6rem;
            display: flex;
            align-items: center;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid #036ff5;
            float: left;
            img{
              width: 100%;
            }
          }
          .nd_comments_content{
            padding-left: 0.2rem;
            float: left;
            li{
              color: #000;
              font-size: 0.24rem;
              height: 0.24rem;
              text-align: left;
              margin-bottom: 0.15rem;
              label{
                display: inline-block;
                text-align: justify;
                width: 1rem;
                overflow: hidden;
                color: #666;
                vertical-align: top;
                &::after{
                  content: " ";
                  display: inline-block;
                  width: 100%;
                  height: 0;
                }
              }
            }
          }
          span{
            color: #f73476;
            font-size: 0.24rem;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
