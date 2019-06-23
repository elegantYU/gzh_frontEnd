<template>
    <div class="visitor">
      <div class="visitor-name">{{v_from.communityName}}</div>
        <div class="vi_input">
          <label>有效时长</label>
          <input type="text" readonly v-model="v_from.time" @click="f_openType" placeholder="请选择有效时长">
          <i></i>
        </div>
        <div class="vi_input">
          <label>有效次数</label>
          <input type="text" v-model="v_from.title" placeholder="1次">
        </div>
        <div class="vi_input">
          <label>邀请方</label>
          <input type="text" readonly v-model="v_from.houseName" placeholder="请选择房屋">
          <i></i>
        </div>
        <div class="vi_input">
          <label>访客姓名</label>
          <input type="text"  v-model="v_from.prpname" placeholder="请输入访客姓名">
        </div>
        <div class="vi_input">
          <label>联系方式</label>
          <input type="text" v-model="v_from.phone" placeholder="请输入访客联系方式">
        </div>
        <div class="vi_input">
          <label>性别</label>
            <input type="radio" name="sex" value="male" class="vi_input-tb"><p>男</p><br>
            <input type="radio" name="sex" value="female" class="vi_input-tb"><p>女</p>
        </div>
        <div class="vi_input">
          <label>访客身份</label>
          <input type="text" readonly v-model="v_from.identity" @click="f_openIden" placeholder="请选择访客身份">
          <i></i>
        </div>
        <div class="vi_input">
          <label>到访时间</label>
          <div class="vi_input-time">
              <mu-col span="9" md="1" sm="1">
                <mu-date-input v-model="value1"  full-width container="dialog" underline-color="white" placeholder="请选择到访时间"  :solo="true"></mu-date-input>
              </mu-col>
          </div>
        </div>
        <div class="vi_input">
          <label>密码类型</label>
          <input type="text" readonly v-model="v_from.password" @click="f_openPass" placeholder="请选择密码类型">
          <i></i>
        </div>
      <div class="visitor-commonStyle-img">
        <div class="visitor-commonStyle-cont">
          访客照片
          <div class="vi_upload">
            <div class="vi_preview">
              <div
                class="vi_preview_list"
                v-for="(v, i) in v_images"
                :key="i"
              >
                <img :src="v.src" alt="">
              </div>
              <div class="vi_preview_add">
                <input type="file" multiple accept='image/*' ref="" @change="f_upload($event)">
              </div>
            </div>
            <p>请上传清晰的访客人脸照片</p>
          </div>
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
            <mu-list-item-title>{{ v.name }}</mu-list-item-title>
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
            @click="f_chooseIden(v.name)"
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
            @click="f_choosePass(v.name)"
          >
            <mu-list-item-title>{{ v.name }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>

      <div class="visitor-password">生成访客密码</div>
      <div class="visitor-password-cont">二维码或数字密码</div>
      <div class="visitor-password sendout">发送给好友</div>
      <div class="nulldiv"></div>
    </div>
</template>

<script>
import { stop, move } from '../../../utils/utils'
export default {
  name: "visitorpass",
  data () {
    return {
      value1: undefined,
      v_images: [],
      v_from: {
        communityName: '',
        time: '',
        title: '',
        houseName: '',
        prpname: '',
        phone: '',
        identity: '',
        password: ''
      },
      v_times: [
        { name: '5分钟' },
        { name: '10分钟' },
        { name: '15分钟' },
        { name: '20分钟' },
        { name: '30分钟' },
        { name: '45分钟' },
        { name: '60分钟' }
      ],
      v_idens: [
        { name: '父母' },
        { name: '子女' },
        { name: '亲戚' },
        { name: '朋友' },
        { name: '其他' }
      ],
      v_passs: [
        { name: '二维码' },
        { name: '数字密码' }
      ],
      v_timeFlag: false,
      v_idenFlag: false,
      v_passFlag: false
    }
  },
  mounted () {
    this.v_from.communityName = this.$store.state.village
  },
  methods: {
    f_openType () {
      this.v_timeFlag = true
      // stop()
    },
    f_chooseType (name) {
      this.v_timeFlag = false
      this.v_from.time = name
      move()
    },
    f_openIden () {
      this.v_idenFlag = true
      // stop()
    },
    f_chooseIden: function (name) {
      this.v_idenFlag = false
      this.v_from.identity = name
      move()
    },
    f_openPass () {
      this.v_passFlag = true
      // stop()
    },
    f_choosePass (name) {
      this.v_passFlag = false
      this.v_from.password = name
      move()
    }
  }
}
</script>

<style lang='scss' scoped>
  body{
    overflow: auto !important;
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
</style>
