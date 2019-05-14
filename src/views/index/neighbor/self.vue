<template>
  <div class="ns_wrapper">
    <h6>小区名称</h6>
    <div class="ns_from">
      <div class="ns_input">
        <label>分类</label>
        <input type="text" readonly placeholder="请选择分类" v-model="type"  @click="f_openType">
        <i></i>
      </div>
      <div class="ns_input">
        <label>标题</label>
        <input type="text" placeholder="请输入标题" v-model="v_from.title">
      </div>
      <div class="ns_input">
        <label>联系人</label>
        <input type="text" placeholder="请输入姓名" v-model="v_from.contact">
      </div>
      <div class="ns_input">
        <label>联系方式</label>
        <input type="text" placeholder="手机号、微信、QQ" v-model="v_from.telephone">
      </div>
      <!-- 车位共享 -->
      <div class="ns_input" v-if="v_taskType === '2'">
        <label>车位编号</label>
        <input type="text" readonly placeholder="请选择车位" v-model="v_from.carNum">
        <i></i>
      </div>
      <div class="ns_input" v-if="v_taskType === '2'">
        <label>收费标准</label>
        <input type="text" placeholder="10元/时" v-model="v_from.price">
      </div>
      <div class="ns_input ns_input_check" v-if="v_taskType === '2'">
        <label>车位锁</label>
        <span @click="f_changeLock(1)"><i :class="v_from.carLock === 1 ? 'ns_checked' : ''"></i>有</span>
        <span @click="f_changeLock(0)"><i :class="v_from.carLock === 0 ? 'ns_checked' : ''"></i>无</span>
      </div>
      <div class="ns_input ns_shareTime" v-if="v_taskType === '2'">
        <label>共享时间</label>
        <span>
          <mu-date-input container="bottomSheet" :should-disable-date="f_startTimeRules" prefix="开始" :solo='true' :full-width="true" clock-type='24hr' view-type='list' v-model="v_from.startTime" type="dateTime" landscape></mu-date-input>
          <mu-date-input container="bottomSheet" :solo='true' :full-width="true" prefix="结束" clock-type='24hr' view-type='list' v-model="v_from.endTime" type="time" landscape></mu-date-input>
        </span>
      </div>
      <!-- 拼车 -->
      <div class="ns_input" v-if="v_taskType === '1'">
        <label>车牌号</label>
        <input type="text" readonly placeholder="请选择车牌号" v-model="v_from.carNum" @click="f_openCarNum">
        <i></i>
      </div>
      <div class="ns_input" v-if="v_taskType === '1'">
        <label>发车地点</label>
        <input type="text" placeholder="请输入发车地点" v-model="v_from.departPlace">
      </div>
      <div class="ns_input" v-if="v_taskType === '1'">
        <label>目的地</label>
        <input type="text" placeholder="请输入目的地" v-model="v_from.destination">
      </div>
      <div class="ns_input" v-if="v_taskType === '1'">
        <label>发车时间</label>
        <mu-date-input v-model="v_from.startTime" underline-color="red" label="请输入发车时间" view-type='list' container="bottomSheet" :should-disable-date="f_startTimeRules" type="dateTime" :solo='true' clock-type='24hr' label-float full-width landscape></mu-date-input>
      </div>
      <!-- 时间互换 -->
      <div class="ns_input ns_input_check" v-if="v_taskType === '3'">
        <label>性别</label>
        <span @click="f_changeSex(1)"><i :class="v_from.gender === 1 ? 'ns_checked' : ''"></i>男</span>
        <span @click="f_changeSex(0)"><i :class="v_from.gender === 0 ? 'ns_checked' : ''"></i>女</span>
      </div>
      <div class="ns_input" v-if="v_taskType === '3'">
        <label>职业</label>
        <input type="text" placeholder="请输入职业" v-model="v_from.profession">
      </div>
      <div class="ns_input" v-if="v_taskType === '3'">
        <label>技能</label>
        <input type="text" placeholder="请输入技能" v-model="v_from.skill">
      </div>
      <div class="ns_input ns_shareTime" v-if="v_taskType === '3'">
        <label>互换时间</label>
        <span>
          <mu-date-input container="bottomSheet" :should-disable-date="f_startTimeRules" prefix="开始" :solo='true' :full-width="true" clock-type='24hr' view-type='list' v-model="v_from.startTime" type="dateTime" landscape></mu-date-input>
          <mu-date-input container="bottomSheet" :solo='true' :full-width="true" prefix="结束" clock-type='24hr' view-type='list' v-model="v_from.endTime" type="time" landscape></mu-date-input>
        </span>
      </div>
      <!-- 资源共享 -->
      <div class="ns_input ns_shareTime" v-if="v_taskType === '4'">
        <label>共享时间</label>
        <span>
          <mu-date-input container="bottomSheet" :should-disable-date="f_startTimeRules" prefix="开始" :solo='true' :full-width="true" clock-type='24hr' view-type='list' v-model="v_from.startTime" type="dateTime" landscape></mu-date-input>
          <mu-date-input container="bottomSheet" :solo='true' :full-width="true" prefix="结束" clock-type='24hr' view-type='list' v-model="v_from.endTime" type="time" landscape></mu-date-input>
        </span>
      </div>
    </div>
    <!-- 类型 -->
    <mu-bottom-sheet :open.sync="v_typeFlag">
      <mu-list>
        <mu-sub-header>选择类型</mu-sub-header>
        <mu-list-item
          button
          v-for="(v, i) in v_types"
          :key="i"
          @click="f_chooseType(i)"
        >
          <mu-list-item-title>{{ v.name }}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
    <!-- 车牌 -->
    <mu-bottom-sheet :open.sync="v_carFlag">
      <mu-list>
        <mu-sub-header>选择车牌</mu-sub-header>
        <mu-list-item
          button
          v-for="(v, i) in v_types"
          :key="i"
          @click="f_chooseCarNum(i)"
        >
          <mu-list-item-title>{{ v.name }}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>

<script>
import { dateFormat } from '../../../utils/utils' 

export default {
  name: 'Self',
  data () {
    return {
      v_taskType: '0',
      v_typeFlag: false,
      v_carFlag: false,
      v_types: [
        { name: '拼车', taskType: '1' },
        { name: '车位共享', taskType: '2' },
        { name: '时间互换', taskType: '3' },
        { name: '资源共享', taskType: '4' }
      ],
      v_from: {
        taskType: '',
        createUserName: '',
        contact: '',
        telephone: '',
        title: '',
        doorLock: '',
        content: '',
        startTime: '',
        endTime: '',
        carLock: 1,
        price: '',
        carNum: '',
        departPlace: '',
        destination: '',
        gender: 1,
        profession: '',
        skill: '',
        createUserId: '',
        imgUrl: []
      }
    }
  },
  computed: {
    type: function () {
      switch (this.v_from.taskType) {
        case '1':
          console.log('------------')
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
  },
  watch: {
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
  methods: {
    f_openType () {
      this.v_typeFlag = true
    },
    f_chooseType (i) {
      this.v_taskType = this.v_from.taskType = this.v_types[i].taskType
      this.v_typeFlag = false
    },
    f_openCarNum () {
      this.v_carFlag = true
    },
    f_chooseCarNum (i) {
      console.log('这个车牌', i)
    },
    f_changeLock (n) {
      this.v_from.carLock = n
    },
    f_changeSex (n) {
      this.v_from.gender = n
    },
    f_startTimeRules (date) {
      let today = new Date().getTime()
      return new Date(date).getTime() < today
    }
  }
}
</script>

<style lang='scss' scoped>
.ns_wrapper{
  background-color: #efeff4;
  h6{
    padding: 0.24rem 0;
    font-size: 0.36rem;
    color: #000;
  }
  .ns_from{
    border-top: 1px solid #e5e5e5;
    .ns_input{
      width: 100%;
      height: 0.9rem;
      line-height: 0.9rem;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e5e5;
      background-color: #fff;
      text-align: left;
      padding: 0 0.3rem;
      label{
        display: inline-block;
        font-size: 0.34rem;
        width: 2rem;
        height: 100%;
      }
      input{
        width: calc(100% - 2.25rem);
        height: 100%;
        background-color: transparent;
      }
      &>i{
        display: inline-block;
        width: 0.25rem;
        height: 100%;
        background-image: url('../../../assets/images/repair/repair_arrow.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        vertical-align: middle;
      }
      &>.mu-input{
        width: calc(100% - 2.25rem);
      }
      &.ns_shareTime{
        height: 1.8rem;
        span{
          display: inline-block;
          width: calc(100% - 2.25rem);
          vertical-align: middle;
          .mu-input{
            height: 0.9rem;
            box-sizing: border-box;
            margin: 0;
            &:last-of-type{
              border: none;
            }
          }
        }
      }
      &.ns_input_check{
        span{
          display: inline-block;
          width: 1.38rem;
          height: 100%;
          i{
            display: inline-block;
            width: 0.46rem;
            height: 0.46rem;
            border-radius: 50%;
            border: 1px solid #cacaca;
            vertical-align: -0.11rem;
            margin-right: 0.2rem;
            &.ns_checked{
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
  }
}
</style>
