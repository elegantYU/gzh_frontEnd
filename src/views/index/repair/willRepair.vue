<template>
  <div class="wr_wrapper">
    <div class="wr_content">
      <h6>{{ v_from.communityName }}</h6>
      <div class="wr_form">
        <div class="wr_input">
          <label>房屋名称</label>
          <input type="text" readonly v-model="v_from.houseName" @click="f_openHouse" placeholder="请选择房屋信息">
          <i></i>
        </div>
        <div class="wr_input">
          <label>报修类型</label>
          <input type="text" readonly v-model="v_from.type" @click="f_openType" placeholder="请选择报修类型">
          <i></i>
        </div>
        <div class="wr_input">
          <label>标题</label>
          <input type="text" v-model="v_from.title" placeholder="请输入标题(15个字以内)" maxlength="15">
        </div>
        <div class="wr_input">
          <label>联系人</label>
          <input type="text" v-model="v_from.userName" placeholder="请输入联系人">
        </div>
        <div class="wr_input">
          <label>联系方式</label>
          <input type="text" v-model="v_from.telPhone" placeholder="手机号、微信、QQ">
        </div>
        <div class="wr_input wr_datetime">
          <label>预约时间</label>
          <div class="wr_datetime_item">
            <mu-date-input container="bottomSheet" :should-disable-date="f_startTimeRules" :solo='true' :full-width="true" prefix="开始" clock-type='24hr' view-type='list' v-model="v_from.startTime" type="dateTime" landscape></mu-date-input>
            <mu-date-input container="bottomSheet" :solo='true' :full-width="true" prefix="结束" clock-type='24hr' view-type='list' v-model="v_from.endTime" type="time" landscape></mu-date-input>
          </div>
        </div>
      </div>
      <div class="wr_detail">
        <b>内容描述</b>
        <div class="wr_input">
          <textarea placeholder="内容不超过200字" maxlength="200" v-model="v_from.detail"></textarea>
        </div>
      </div>
      <div class="wr_upload">
        <b>图片<span>（最多三张）</span></b>
        <div class="wr_preview">
          <div
            class="wr_preview_list"
            v-for="(v, i) in v_images"
            :key="i"
          >
            <img :src="v" alt="">
          </div>
          <div class="wr_preview_add" @click="f_upload"></div>
        </div>
      </div>
      <div class="wr_submit" @click="f_submit">
        报修
      </div>
      <!-- 哪间屋子 -->
      <mu-bottom-sheet :open.sync="v_houseFlag">
        <mu-list>
          <mu-sub-header>选择房屋信息</mu-sub-header>
          <mu-list-item
            button
            v-for="(v, i) in v_user.house"
            :key="i"
            @click="f_chooseHouse(v)"
          >
            <mu-list-item-title>{{ v }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
      <!-- 报修类型 -->
      <mu-bottom-sheet :open.sync="v_typeFlag">
        <mu-list>
          <mu-sub-header>选择报修类型</mu-sub-header>
          <mu-list-item
            button
            v-for="(v, i) in v_types"
            :key="i"
            @click="f_chooseType(v.name)"
          >
            <mu-list-item-title>{{ v.name }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </div>
  </div>
</template>

<script>
import { dateFormat, stop, move } from '../../../utils/utils'
export default {
  name: 'WillRepair',
  data () {
    return {
      v_id: '',
      v_user: {
        house: []
      },
      v_from: {
        communityName: '戈雅花苑',
        houseName: '',
        type: '',
        title: '',
        userName: '',
        createUserId: 2,
        telPhone: '',
        startTime: '',
        endTime: '',
        detail: '',
        img: ['', '']
      },
      v_types: [
        { name: '水暖检修' },
        { name: '电路检修' },
        { name: '家具维修及保养' },
        { name: '地面维修及保养' },
        { name: '墙面检修' },
        { name: '洁具检修及保养' },
        { name: '门窗检修' },
        { name: '家用电器检修' },
        { name: '房顶检修' },
        { name: '防水施工方法' }
      ],
      v_typeFlag: false,
      v_houseFlag: false,
      v_images: []
    }
  },
  watch: {
    // 时间修正
    'v_from.startTime': function (now, past) {
      let date = dateFormat(now)
      this.v_from.startTime = `${new Date(now).toLocaleString('chinese', { hour12: false }).replace(/\//g, '-')}`
      if (this.v_from.endTime) {
        let time = this.v_from.endTime.split(' ')[1]
        this.v_from.endTime = `${date} ${time}`
      }
    },
    'v_from.endTime': function (now, past) {
      let start = this.v_from.startTime
      let startTime = new Date(start).toLocaleTimeString('chinese', { hour12: false })
      if (now && start) {
        let date = dateFormat(start)
        let endStamp = new Date(now).getTime()
        let endTime = new Date(now).toLocaleTimeString('chinese', { hour12: false })
        if (endStamp < new Date(start).getTime()) {
          this.v_from.endTime = start
          this.v_from.startTime = `${date} ${endTime}`
        } else {
          this.v_from.endTime = `${date} ${endTime}`
        }
      } else {
        this.v_from.endTime = ''
        this.$toast({
          msg: '请先选择开始时间',
          time: 1500
        })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$data.v_id = to.query.id || ''
      if (vm.$data.v_id) {
        vm.$http.get('/admin/property/repair/add').then(res => {
          // 信息填充
        })
      }
    })
  },
  mounted () {
    this.v_from.createUserId = this.$store.state.user.id
    this.f_getHouse()
  },
  methods: {
    f_getHouse () {
      let params = {
        memberId: this.$store.state.user.id
      }

      this.$http
        .get('/admin/member/house/all', { params })
        .then(res => {
          res.data.data.map(v => this.v_user.house.push(`${v.searchWord}`))
        })
    },
    f_openType () {
      this.v_typeFlag = true
      stop()
    },
    f_openHouse () {
      this.v_houseFlag = true
      stop()
    },
    f_chooseType (name) {
      this.v_typeFlag = false
      this.v_from.type = name
      move()
    },
    f_chooseHouse (name) {
      this.v_houseFlag = false
      this.v_from.houseName = name
      move()
    },
    f_startTimeRules (date) {
      let today = new Date().getTime()
      return new Date(date).getTime() < today
    },
    f_upload () {
      // this.$wxsdk  上传图片获取链接
    },
    f_submit () {
      let params = Object.assign({}, this.v_from)
      params.img = JSON.stringify(params.img)
      if (this.v_from.communityName && this.v_from.houseName && this.v_from.type && this.v_from.userName && this.v_from.telPhone && this.v_from.startTime && this.v_from.endTime) {
        if (this.v_id) {
          params = { ...params, id: this.v_id }
          this.$http
            .post('/admin/property/repair/add', params)
            .then(res => {
              if (res.data.success) {
                this.$toast({
                  msg: '修改成功',
                  time: 1000
                })
                this.$router.go(-1)
              }
            })
        } else {
          this.$http
            .post('/admin/property/repair/add', params)
            .then(res => {
              if (res.data.success) {
                this.$toast({
                  msg: '提交成功',
                  time: 1000
                })
                this.$router.go(-1)
              }
            })
        }
      } else {
        this.$toast({
          msg: '所填信息不完整',
          time: 1500
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wr_wrapper{
  height: 100%;
  background-color: #efeff4;
  .wr_content{
    padding-bottom: 1.2rem;
    background-color: #efeff4;
    h6{
      padding: 0.23rem 0 0.26rem;
      font-size: 0.36rem;
    }
    .wr_form{
      border-top: 1px solid #e5e5e5;
      .wr_input{
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
          display: block;
          font-size: 0.34rem;
          line-height: 0.9rem;
          width: 2rem;
          height: 100%;
          line-height: 0.9rem;
        }
        input{
          display: block;
          font-size: 0.3rem;
          flex: 1;
          height: 100%;
          font-size: 0.3rem;
          background-color: transparent;
        }
        i{
          display: inline-block;
          width: 0.25rem;
          height: 100%;
          background-image: url('../../../assets/images/repair/repair_arrow.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          vertical-align: middle;
        }
        &.wr_datetime{
          height: 1.8rem;
          .wr_datetime_item{
            display: flex;
            flex-wrap: wrap;
            width: calc(100% - 2.25rem);
            vertical-align: middle;
            .mu-input{
              height: 0.9rem;
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              &:last-of-type{
                border: none;
              }
            }
          }
        }
      }
    }
    .wr_detail{
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #000;
        text-align: left;
        font-weight: normal;
      }
      .wr_input{
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
    .wr_upload{
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
      .wr_preview{
        height: 1.74rem;
        padding: 0.3rem;
        box-sizing: border-box;
        background-color: #fff;
        .wr_preview_list{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          img{
            width: 100%;
          }
        }
        .wr_preview_add{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          border: 0.01rem solid #cccccc;
          background-image: url('../../../assets/images/repair/repair_add.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 0.56rem 0.56rem;
          cursor: pointer;
        }
      }
    }
    .wr_submit{
      margin: 0 0.3rem;
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
