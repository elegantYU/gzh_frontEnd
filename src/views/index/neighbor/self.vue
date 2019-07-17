<template>
  <div class="ns_wrapper">
    <div class="ns_container">
      <h6>{{ place }}</h6>
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
          <input type="number" placeholder="手机号、微信、QQ" v-model="v_from.telephone">
        </div>
        <!-- 车位共享 -->
        <div class="ns_input" v-if="v_taskType === '2'" @click="v_parkFlag = true">
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
            <mu-date-input container="bottomSheet" :should-disable-date="f_startTimeRules" prefix="开始" :solo='true' :full-width="true" clock-type='24hr' view-type='list' v-model="v_start" type="dateTime" landscape></mu-date-input>
            <mu-date-input container="bottomSheet" :solo='true' :full-width="true" prefix="结束" clock-type='24hr' view-type='list' v-model="v_end" type="time" landscape></mu-date-input>
          </span>
        </div>
        <!-- 拼车 -->
        <div class="ns_input" v-if="v_taskType === '1'" @click="f_openCarNum">
          <label>车牌号</label>
          <input type="text" readonly placeholder="请选择车牌号" v-model="v_from.carNum">
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
          <mu-date-input v-model="v_start" underline-color="red" label="请输入发车时间" view-type='list' container="bottomSheet" :should-disable-date="f_startTimeRules" type="dateTime" :solo='true' clock-type='24hr' label-float full-width landscape></mu-date-input>
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
            <mu-date-input container="bottomSheet" :should-disable-date="f_startTimeRules" prefix="开始" :solo='true' :full-width="true" clock-type='24hr' view-type='list' v-model="v_start" type="dateTime" landscape></mu-date-input>
            <mu-date-input container="bottomSheet" :should-disable-date="f_endTimeRules" :solo='true' :full-width="true" prefix="结束" clock-type='24hr' view-type='list' v-model="v_endDate" type="dateTime" landscape></mu-date-input>
          </span>
        </div>
        <!-- 资源共享 -->
        <div class="ns_input ns_shareTime" v-if="v_taskType === '4'">
          <label>共享时间</label>
          <span>
            <mu-date-input container="bottomSheet" :should-disable-date="f_startTimeRules" prefix="开始" :solo='true' :full-width="true" clock-type='24hr' view-type='list' v-model="v_start" type="dateTime" landscape></mu-date-input>
            <mu-date-input container="bottomSheet" :solo='true' :full-width="true" prefix="结束" clock-type='24hr' view-type='list' v-model="v_end" type="time" landscape></mu-date-input>
          </span>
        </div>
      </div>
      <!-- 内容描述 -->
      <div class="ns_description">
        <b>内容描述</b>
        <div class="ns_input">
          <textarea maxlength="200" v-model="v_from.content"></textarea>
        </div>
      </div>
      <!-- 图片上传 -->
      <div class="ns_upload">
        <b>图片<span>（最多三张）</span></b>
        <div class="ns_preview">
          <div 
            class="ns_preview_list"
            v-for="(v, i) in v_from.imgUrl"
            :key="i"
            @click="f_bigger(v)"
          >
            <i @click.stop="f_deleteImg(i)">x</i>
            <img :src="v" alt="">
          </div>
          <a class="ns_preview_add" @click="f_upload"></a>
        </div>
      </div>
      <a class="ns_submit" @click="f_validate">发布</a>
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
            v-for="(v, i) in v_carNum"
            :key="i"
            @click="f_chooseCarNum(i)"
          >
            <mu-list-item-title>{{ v }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
      <!-- 车位 -->
      <mu-bottom-sheet :open.sync="v_parkFlag">
        <mu-list>
          <mu-sub-header>选择车位</mu-sub-header>
          <mu-list-item
            button
            v-for="(v, i) in v_carPark"
            :key="i"
            @click="f_choosePark(i)"
          >
            <mu-list-item-title>{{ v }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </div>
    <!-- 放大图片 -->
    <div class="bigger" v-if="v_bigger" @click="v_bigger = false">
      <img :src="v_currentImg" alt="">
    </div>
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
      v_parkFlag: false,
      v_types: [
        { name: '拼车', taskType: '1' },
        { name: '车位共享', taskType: '2' },
        { name: '时间互换', taskType: '3' },
        { name: '资源共享', taskType: '4' }
      ],
      v_carNum: [],
      v_carPark: [],
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
        createUserId: 1,
        imgUrl: [],
        villageCode: ''     // 小区code
      },
      v_start: '',
      v_end: '',
      v_endDate: '',
      v_bigger: false,
      v_currentImg: ''
    }
  },
  computed: {
    type () {
      switch (this.v_from.taskType) {
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
    place () {
      return this.$store.state.village
    }
  },
  watch: {
    'v_start': function (now, past) {
      let date = dateFormat(now)
      this.v_from.startTime = `${date} ${new Date(now).toLocaleTimeString('chinese', { hour12: false })}`
      if (this.v_from.endTime) {
        let time = this.v_from.endTime.split(' ')[1]
        this.v_from.endTime = `${date} ${time}`
      }
    },
    'v_end': function (now, past) {
      let start = this.v_from.startTime
      let startTime = new Date(start).toLocaleTimeString('chinese', { hour12: false })
      if (now && start) {
        let date = dateFormat(start)
        let endTime = new Date(now).toLocaleTimeString('chinese', { hour12: false })
        let endStamp = new Date(`${date} ${endTime}`).getTime()
        if (endStamp < new Date(start).getTime()) {
          this.v_from.endTime = start
          this.v_from.startTime = `${date} ${endTime}`
          const cache = this.v_start
          this.v_start = this.v_end
          this.v_end = cache
        } else {
          this.v_from.endTime = `${date} ${endTime}`
        }
      } else {
        this.v_from.endTime = this.v_end = ''
        this.$toast({
          msg: '请先选择开始时间',
          time: 1500
        })
      }
    },
    'v_endDate': function (now, past) {
      let start = this.v_from.startTime
      let startTime = new Date(start).getTime()
      if (now && start) {
        let date = start.split(' ')[0]
        let endTime = new Date(now).toLocaleTimeString('chinese', { hour12: false })
        let endStamp = new Date(now).getTime()
        if (endStamp < startTime) {
          let date = dateFormat(start)
          this.v_from.endTime = start
          this.v_from.startTime = `${date} ${endTime}`
          const cache = this.v_start
          this.v_start = this.v_endDate
          this.v_endDate = cache
        } else {
          this.v_from.endTime = `${date} ${endTime}`
        }
      } else {
        this.v_from.endTime = this.v_endDate = ''
        this.$toast({
          msg: '请先选择开始时间',
          time: 1500
        })
      }
      console.log('时间互换结束时间', this.v_from.endTime)
    }
  },
  mounted () {
    this.v_from.createUserId = this.$store.state.user.id
    this.v_from.createUserName = this.$store.state.user.name
    this.v_from.villageCode = this.$store.state.villageCode
    this.f_getCar()
    this.f_getPark()
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
      console.log('这个车牌', this.v_carNum[i])
      this.v_from.carNum = this.v_carNum[i]
      this.v_carFlag = false
    },
    f_choosePark (i) {
      console.log(this.v_carPark[i])
      this.v_from.carNum = this.v_carPark[i]
      this.v_parkFlag = false
    },
    f_changeLock (n) {
      this.v_from.carLock = n
    },
    f_changeSex (n) {
      this.v_from.gender = n
    },
    f_startTimeRules (date) {
      const today = new Date().getTime()
      return new Date(date).getTime() < today
    },
    f_endTimeRules (date) {
      if (!this.v_start) {
        return
      }
      const start = new Date(this.v_start).getTime()
      return new Date(date).getTime() < (start - 1000*60*60*24)
    },
    f_upload (e) {
      if (this.v_from.imgUrl.length > 2) {
        this.$toast('最多三张图片')
        return
      }
      
      this.$wxsdk.chooseImage()
        .then(({ localIds }) => {
          localIds.map(v => {
            this.$wxsdk.getLocalImgData(v)
              .then(({ localData }) => {
                const form = new FormData()
                form.append("base64", localData)
                this.$http
                  .post('/admin/file/upload2', form)
                  .then(({data: { data }}) => {
                    this.v_from.imgUrl.push(data)
                  })
              })
          })
        })
    },
    f_getPark () {
      let params = {
        memberId: this.$store.state.user.id,
        villageCode: this.$store.state.villageCode,
        pageNum: 1,
        pageSize: 100
      }

      this.$http
        .get('/admin/member/parking/lot/my/lots', { params })
        .then(res => {
          res.data.data.map(v => this.v_carPark.push(v.position))
        })
    },
    f_getCar () {
      let params = {
        memberId: this.$store.state.user.id,
        villageCode: this.$store.state.villageCode,
        pageNum: 1,
        pageSize: 100
      }

      this.$http
        .get('/admin/member/car/my/cars', { params })
        .then(res => {
          res.data.data.map(v => this.v_carNum.push(v.vehicleNumber))
        })
    },
    f_validate () {
      // 校验字段 各种jb判断
      let params
      let imgList = JSON.stringify(this.v_from.imgUrl)
      if (this.v_from.taskType && this.v_from.title && this.v_from.contact && this.v_from.telephone) {
        switch (this.v_from.taskType) {
          case '1':
            if (this.v_from.carNum && this.v_from.departPlace && this.v_from.destination && this.v_from.startTime) {
              params = {
                createUserId: this.v_from.createUserId,
                createUserName: this.v_from.createUserName,
                taskType: this.v_from.taskType,
                title: this.v_from.title,
                contact: this.v_from.contact,
                telephone: this.v_from.telephone,
                carNum: this.v_from.carNum,
                departPlace: this.v_from.departPlace,
                destination: this.v_from.destination,
                startTime: this.v_from.startTime,
                content: this.v_from.content,
                imgUrl: imgList,
                villageCode: this.v_from.villageCode,
              }
              this.f_submit(params)
            } else {
              this.$toast('请填写完整')
            }
            break
          case '2':
            console.log('参数', this.v_from.carNum , this.v_from.startTime , this.v_from.endTime)
            if (this.v_from.carNum && this.v_from.startTime && this.v_from.endTime) {
              params = {
                createUserId: this.v_from.createUserId,
                createUserName: this.v_from.createUserName,
                taskType: this.v_from.taskType,
                title: this.v_from.title,
                contact: this.v_from.contact,
                telephone: this.v_from.telephone,
                carNum: this.v_from.carNum,
                price: this.v_from.price,
                carLock: this.v_from.carLock,
                startTime: this.v_from.startTime,
                endTime: this.v_from.endTime,
                content: this.v_from.content,
                imgUrl: imgList,
                villageCode: this.v_from.villageCode,
              }
              this.f_submit(params)
            } else {
              this.$toast('请填写完整')
            }
            break
          case '3':
            console.log('参数', this.v_from.skill , this.v_from.startTime , this.v_from.endTime)
            if (this.v_from.skill && this.v_from.startTime && this.v_from.endTime) {
              params = {
                createUserId: this.v_from.createUserId,
                createUserName: this.v_from.createUserName,
                taskType: this.v_from.taskType,
                title: this.v_from.title,
                contact: this.v_from.contact,
                telephone: this.v_from.telephone,
                gender: this.v_from.gender,
                skill: this.v_from.skill,
                startTime: this.v_from.startTime,
                endTime: this.v_from.endTime,
                profession: this.v_from.profession,
                content: this.v_from.content,
                imgUrl: imgList,
                villageCode: this.v_from.villageCode,
              }
              this.f_submit(params)
            } else {
              this.$toast('请填写完整')
            }
            break
          case '4':
            console.log('参数', this.v_from.startTime , this.v_from.endTime , this.v_from.content)
            if (this.v_from.startTime && this.v_from.endTime && this.v_from.content) {
              params = {
                createUserId: this.v_from.createUserId,
                createUserName: this.v_from.createUserName,
                taskType: this.v_from.taskType,
                title: this.v_from.title,
                contact: this.v_from.contact,
                telephone: this.v_from.telephone,
                startTime: this.v_from.startTime,
                endTime: this.v_from.endTime,
                content: this.v_from.content,
                imgUrl: imgList,
                villageCode: this.v_from.villageCode,
              }
              console.log('提交参数', params)
              this.f_submit(params)
            } else {
              this.$toast('请填写内容和时间')
            }
            break
        }
      } else {
        this.$toast('请完善基本信息')
      }
    },
    f_submit (params) {
      this.$http
        .post('/admin/share/publishShareInfo', params)
        .then(res => {
          console.log(res)
          if (res.data.success) {
            this.$toast('发布成功')
            this.$router.go(-1)
          } else {
            this.$toast(res.data.msg)
          }
        })
    },
    f_bigger (v) {
      this.v_bigger = true
      this.v_currentImg = v
    },
    f_deleteImg (i) {
      this.v_from.imgUrl.splice(i, 1)
    },
  }
}
</script>

<style lang='scss' scoped>
.ns_wrapper{
  background-color: #efeff4;
  height: 100%;
  position: relative;
  .ns_container{
    position: absolute;
    top: 0;
    left: 0;
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    overflow: auto;
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
        display: flex;
        label{
          display: block;
          font-size: 0.34rem;
          line-height: 0.9rem;
          width: 2rem;
          height: 100%;
        }
        input{
          display: block;
          flex: 1;
          height: 100%;
          font-size: 0.3rem;
          background-color: transparent;
          font-size: 0.3rem;
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
          display: block;
          width: calc(100% - 2.25rem);
          padding: 0;
          min-height: 0;
          height: 100%;
        }
        &.ns_shareTime{
          height: 1.8rem;
          span{
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
        &.ns_input_check{
          span{
            display: flex;
            font-size: 0.3rem;
            align-items: center;
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
    .ns_description{
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        text-align: left;
        font-weight: normal;
      }
      .ns_input{
        height: 1.48rem;
        padding: 0.3rem;
        background-color: #fff;
        textarea{
          width: 100%;
          height: 100%;
          resize: none;
          font-size: 0.26rem;
          line-height: 1.5em;
        }
      }
    }
    .ns_upload{
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
      .ns_preview{
        height: 1.74rem;
        padding: 0.3rem;
        box-sizing: border-box;
        background-color: #fff;
        .ns_preview_list{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          i{
            position: absolute;
            top: -0.15rem;
            right: -0.15rem;
            width: 0.3rem;
            height: 0.3rem;
            cursor: pointer;
            border-radius: 50%;
            background-color: crimson;
            color: #fff;
            font-size: 0.15rem;
            line-height: 0.3rem;
            text-align: center;
          }
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
        .ns_preview_add{
          float: left;
          display: block;
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
          input{
            width: 0;
            opacity: 0;
          }
        }
      }
    }
    .ns_submit{
      display: block;
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
  .bigger{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      max-width: 6.5rem;
    }
  }
}
</style>
