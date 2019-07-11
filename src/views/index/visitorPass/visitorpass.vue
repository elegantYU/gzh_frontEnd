<template>
    <div class="visitor">
      <div class="visitor-name">{{v_from.communityName}}</div>
        <div class="vi_input">
          <label>有效时长</label>
          <input type="text" readonly v-model="v_timeNum" @click="f_openType" placeholder="请选择有效时长">
          <i></i>
        </div>
        <div class="vi_input">
          <label>有效次数</label>
          <input type="text" v-model="v_forr" readonly>
        </div>
        <div class="vi_input">
          <label>邀请方</label>
          <mu-select v-model="v_from.houseId" :solo="true" placeholder="请选择房屋">
            <mu-option v-for="(v,i) in v_house" :key="i" :label="v.name" :value="v.house"></mu-option>
          </mu-select>
          <i></i>
        </div>
        <div class="vi_input">
          <label>访客姓名</label>
          <input type="text" v-model="v_from.prpname" placeholder="请输入访客姓名">
        </div>
        <div class="vi_input">
          <label>联系方式</label>
          <input type="number" v-model="v_from.phone" placeholder="请输入访客联系方式">
        </div>
        <div class="vi_input ns_input_check">
          <label>性别</label>
          <span @click="f_gender(1)"><i :class="v_gender === 1 ? 'ns_checked' : ''"></i>男</span>
          <span @click="f_gender(0)"><i :class="v_gender === 0 ? 'ns_checked' : ''"></i>女</span>
        </div>
        <div class="vi_input">
          <label>访客身份</label>
          <input type="text" readonly v-model="v_from.identity" @click="f_openIden" placeholder="请选择访客身份">
          <i></i>
        </div>
        <div class="vi_input">
          <label>到访时间</label>
          <div class="vi_input-time">
            <mu-date-input v-model="visiteTime"  full-width container="dialog" underline-color="white" placeholder="请选择到访时间"  :solo="true"></mu-date-input>
          </div>
        </div>
        <div class="vi_input">
          <label>密码类型</label>
          <input type="text" readonly v-model="v_from.password" @click="f_openPass" placeholder="请选择密码类型">
          <i></i>
        </div>
        <div class="wr_upload">
          <div class="wr_preview">
            <b>访客照片</b>
            <div
              class="wr_preview_list"
              v-for="(v, i) in v_from.imgUrl"
              :key="i"
              @click="f_bigger(v)"
            >
              <i @click.stop="f_deleteImg(i)">x</i>
              <img :src="v">
            </div>
            <a class="wr_preview_add" @click="f_upload"></a>
            <p>请上传清晰的访客人脸照片</p>
          </div>
        </div>

<!--      选择时间类型-->
      <mu-bottom-sheet :open.sync="v_timeFlag">
        <mu-list>
          <mu-sub-header>选择有效时间</mu-sub-header>
          <mu-list-item
            button
            v-for="(v, i) in v_times"
            :key="i"
            @click="f_chooseType(v.name)"
          >
            <mu-list-item-title>{{ v.name }}{{v.Minute}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>

<!--      选择关系-->
      <mu-bottom-sheet :open.sync="v_idenFlag">
        <mu-list>
          <mu-sub-header>选择到访身份</mu-sub-header>
          <mu-list-item
            button
            v-for="(v, i) in v_idens"
            :key="i"
            @click="f_chooseIden(v.name,i)"
          >
            <mu-list-item-title>{{ v.name }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>

<!--      选择密码-->
      <mu-bottom-sheet :open.sync="v_passFlag">
        <mu-list>
          <mu-sub-header>选择密码类型</mu-sub-header>
          <mu-list-item
            button
            v-for="(v, i) in v_passs"
            :key="i"
            @click="f_choosePass(v.name,i)"
          >
            <mu-list-item-title>{{ v.name }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>

      <a class="visitor-password" @click="f_passWord">生成访客密码</a>
      <div class="visitor-password-cont" v-if="v_passType == 2">{{v_password}}</div>
      <div class="visitor-password-cont" v-if="v_passType == 1">
        <img :src="v_password" alt="">
      </div>
      <!-- <div class="visitor-password sendout">发送给好友</div> -->
      <div class="nulldiv"></div>
       <!-- 放大图片 -->
      <div class="bigger" v-if="v_bigger" @click="v_bigger = false">
        <img :src="v_currentImg" alt="">
      </div>
    </div>
</template>

<script>
import { stop, move } from '../../../utils/utils'

export default {
  name: "visitorpass",
  data () {
    return {
      visiteTime: '',
      v_forr:'',
      v_password:'生成二维码或数字密码',
      v_passType: 2,
      v_from: {
        communityName: '',
        time: '',
        title: '',
        houseId: '',
        prpname: '',
        phone: '',
        identity: '',
        password: '',
        imgUrl: [],
      },
      v_times: [
        { name: '5',Minute:'分钟' },
        { name: '10',Minute:'分钟'},
        { name: '15',Minute:'分钟' },
        { name: '20',Minute:'分钟' },
        { name: '30',Minute:'分钟' },
        { name: '45',Minute:'分钟' },
        { name: '60',Minute:'分钟' }
      ],
      v_idens: [
        { name: '亲戚',num:'1' },
        { name: '子女',num:'2'  },
        { name: '朋友',num:'3' },
        { name: '其他',num:'4'  },
      ],
      v_passs: [
        { name: '二维码' },
        { name: '数字密码' }
      ],
      v_pasnbm:'',
      v_gender: 1,
      v_timeFlag: false,
      v_idenFlag: false,
      v_passFlag: false,
      v_timeNum:'',
      v_identityNum:'',
      v_passwordNum:'',
      v_house: [],
      v_bigger: false,
      v_currentImg: ''
    }
  },
  mounted () {
    this.f_frequency()
    // this.formartTime(time)
    this.v_from.communityName = this.$store.state.village
    this.v_house = this.$store.state.house
  },
  methods: {
    f_upload (e) {
      if (this.v_from.imgUrl.length > 1) {
        this.$toast('最多一张图片')
        return
      }

      this.$wxsdk.chooseImage(1)
        .then(({ localIds }) => {
          this.$toast({
            time: 3000,
            msg: '图片加载中...'
          })
          localIds.map(v => {
            this.$wxsdk.getLocalImgData(v)
              .then(({ localData }) => {
                const from = new FormData()
                from.append("base64", localData)
                this.$http
                  .post('/admin/file/upload2', from)
                  .then(({data: { data }}) => {
                    this.$toast('加载完毕')
                    this.v_from.imgUrl.push(data)
                  })
              })
          })
        })
    },

    //访客次数
    f_frequency () {
      const params = {
        villageCode : this.$store.state.villageCode
      }

      this.$http.get('/admin/visit/getVisitTime', { params })
        .then(res=>{
          this.v_forr = res.data.data.applyNum.overTime
        })
    },
    // 申请访客通行密码
    f_passWord () {
      const applyTime = new Date(this.visiteTime).toLocaleString('chinese', { hour12: false }).replace(/\//g, '-')
      console.log('时间格式化', applyTime)
      if(this.v_from.time && this.v_from.prpname && this.v_from.phone && this.v_gender && this.v_from.identity && applyTime ) {
        let params = {
          time: this.v_from.time,
          overNum: this.v_forr,
          houseId: this.v_from.houseName,
          houseName: this.$store.state.village,
          visitorName: this.v_from.prpname,
          telephone: this.v_from.phone,
          gender: this.v_gender,
          visitorType: this.v_identityNum,
          applyTime: applyTime,
          passwordType: this.v_passwordNum,
          createUserId: this.$store.state.user.id,
          createUserName: this.$store.state.user.name,
          imgurl: JSON.stringify(this.v_from.imgUrl),
          villageCode: this.$store.state.villageCode
        }

        console.log('所有参数', params)
        this.$http.post('/admin/visit/addVisit', params)
          .then(res => {
            if (res.data.success) {
              this.$toast('获取成功')
              this.v_password = res.data.data.password
              this.v_passType = res.data.data.type
            } else {
              this.$toast('网络错误')
            }
          })
      }else {
        console.log('判定字段', this.v_from.time , this.v_from.prpname , this.v_from.phone , this.v_gender , this.v_from.identity , applyTime)
        this.$toast({
          msg: '所填信息不完整',
          time: 1500
        })
      }
    },
    f_gender (n) {
      this.v_gender = n
    },
    f_openType () {
      this.v_timeFlag = true
      // stop()
    },
    f_chooseType (name,Minute) {
      this.v_timeFlag = false
      this.v_from.time = name

      if (this.v_from.time!='') {
        this.v_timeNum=this.v_from.time+'分钟'
      }
      move()
    },
    f_openIden () {
      this.v_idenFlag = true
      // stop()
    },
    f_chooseIden: function (name,i) {
      this.v_idenFlag = false
      this.v_from.identity = name
      this.v_identityNum=i+1


      move()
    },
    f_openPass () {
      this.v_passFlag = true
      // stop()
    },
    f_choosePass (name,i) {
      this.v_passFlag = false
      this.v_from.password = name
      this.v_passwordNum=i+1
      console.log(this.v_passwordNum)
      move()
    },
    f_bigger (v) {
      this.v_bigger = true
      this.v_currentImg = v
    },
    f_deleteImg (i) {
      this.v_from.imgUrl.splice(i, 1)
    }
  }
}
</script>

<style lang='scss' scoped>
  body{
    overflow: auto !important;
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
  .vi_input {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
    text-align: left;
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    position: relative;
    label {
      display: block;
      font-size: 0.34rem;
      line-height: 0.8rem;
      width: 2rem;
      height: 100%;
    }

    input {
      display: block;
      font-size: 0.3rem;
      flex: 1;
      height: 100%;
      background-color: transparent;
    }
    .mu-input{
      padding: 0;
      min-height: 0;
      height: 100%;
      font-size: 0.3rem;
    }
    .vi_input-tb{
      display: block;
      font-size: 0.3rem;
      flex: 1;
      width: 10%;
      height: 50%;
      background-color: transparent;
    }
    p{
      line-height: 0.8rem;
      margin-right: 1.2rem;
      background-color: transparent;
      font-size: 0.3rem;
    }
    .vi_input-time{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      display: flex;
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
          background: none;
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

  .visitor{
    background-color: #efeff4;
    .visitor-name{
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.37rem;
    }
  }
  .visitor-commonStyle-img{
    display: flex;
    width: 100vw;
    height: 1.6rem;
    font-size: 0.35rem;
    position: relative;
    background-color: #ffffff;
    .visitor-commonStyle-cont{
      margin-left: 0.3rem;
      line-height: 1.6rem;
    }
  }
  .visitor-password{
    width: 90%;
    height: 0.8rem;
    background-color: rgb(247,52,118);
    margin: 0.3rem auto;
    border-radius: 0.5rem;
    text-align: center;
    line-height: 0.8rem;
    color: #ffffff;
    font-size: 0.3rem;
  }
  .visitor-password-cont{
    width: 100vw;
    height: 2rem;
    background-color: #ffffff;
    text-align: center;
    line-height: 2rem;
    color: rgb(178,178,178);
    font-size: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 1.8rem;
      height: 1.8rem;
    }
  }
  .nulldiv{
    height: 2rem;
  }
  .vi_upload{
    display: flex;
    width: 60%;
    position: absolute;
    left: 60%;
    top: 50%;
    transform: translate(-50%,-50%);
    p{
      font-size: 0.2rem;
      line-height: 1.2rem;
      margin-left: 0.3rem;
      color: rgb(178,178,178);
    }
    .vi_preview{
      height: 1.2rem;
      box-sizing: border-box;
      background-color: #fff;
      .vi_preview_list{
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
      .vi_preview_add{
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
        input{
          width: 0;
          opacity: 0;
        }
      }
    }
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


  .wr_upload{
    margin-bottom: 0.4rem;
    .wr_preview{
      display: flex;
      align-items: center;
      height: 1.8rem;
      padding: 0.3rem;
      box-sizing: border-box;
      background-color: #fff;
      position: relative;
      b{
        width: 2rem;
        font-size: 0.34rem;
        color: #000;
        text-align: left;
        font-weight: normal;
      }
      p{
        position: absolute;
        right: 0.3rem;
        bottom:0;
        font-size: 0.25rem;
        color: darkgrey;
        line-height: 1.75em;
        text-align: left;
        font-weight: normal;
      }
      .wr_preview_list{
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
      .wr_preview_add{
        display: block;
        width: 1.16rem;
        height: 1.16rem;
        box-sizing: border-box;
        margin: 0 0.05rem;
        border: 0.01rem solid #cccccc;
        background-image: url('../../../assets/images/environment/repair_add.png');
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
</style>
