<template>
   <div class="wr_wrapper">
    <div class="wr_content">
      <h6>{{ v_communityName }}</h6>
      <div class="wr_form">
        <div class="wr_input">
          <label>投诉对象</label>
          <input type="text" readonly v-model="v_from.complaintTarget" @click="f_openAppeal" placeholder="请选择投诉对象">
          <i></i>
        </div>
      </div>
      <div class="wr_detail">
        <b>内容描述</b>
        <div class="wr_input">
          <textarea placeholder="内容不超过200字" maxlength="200" v-model="v_from.content"></textarea>
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
          <div class="wr_preview_add" @click="f_upload">
            <!-- <input type="file" multiple accept='image/*' ref="" @change="f_upload($event)"> -->
          </div>
        </div>
      </div>
      <div class="wr_submit" @click="f_submit">
        提交
      </div>
      <!-- 投诉对象 -->
      <mu-bottom-sheet :open.sync="v_appealFlag">
        <mu-list>
          <mu-sub-header>选择投诉对象</mu-sub-header>
          <mu-list-item
            button
            v-for="(v, i) in v_user.appeal"
            :key="i"
            @click="f_chooseAppeal(v)"
          >
            <mu-list-item-title>{{ v }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </div>
  </div>
</template>
<script>
import { stop, move } from '../../../utils/utils'
export default {
  name: 'appwalAdvice',
  data () {
    return {
      v_id: '',
      v_user: {
        appeal: ['业委会', '物业', '邻里纠纷']
      },
      v_communityName: '',
      v_from: {
        complaintTarget: '',
        type: '1',
        createUserId: 0,
        createName: '',
        content: '',
        villageCode: ''
      },
      v_appealFlag: false,
      v_images: []
    }
  },
  mounted () {
    this.v_from.createUserId = this.$store.state.user.id
    this.v_from.createName = this.$store.state.user.name
    this.v_from.villageCode = this.$store.state.villageCode
    this.v_communityName = this.$store.state.village
  },
  methods: {
    f_openAppeal () {
      this.v_appealFlag = true
      stop()
    },
    f_chooseType (name) {
      this.v_typeFlag = false
      this.v_from.type = name
      move()
    },
    f_chooseAppeal (name) {
      this.v_appealFlag = false
      this.v_from.complaintTarget = name
      console.log(this.v_from.complaintTarget)
      move()
    },
    f_upload (e) {
      if (this.v_images.length > 2) {
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
                    this.v_images.push(data)
                  })
              })
          })
        })
    },
    f_submit () {
      let params = Object.assign({}, this.v_from)
      params.imgUrl = JSON.stringify(this.v_images)
      if (this.v_from.complaintTarget && this.v_from.content) {
        this.$http
          .post('/admin/complaint/addComOrSugg', params)
          .then(res => {
            this.$toast('已发送')
            this.$router.go(-1)
          })
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
        label{
          display: inline-block;
          font-size: 0.34rem;
          line-height: 0.9rem;
          width: 2rem;
          height: 100%;
        }
        input{
          display: block;
          width: calc(100% - 2.25rem);
          height: 100%;
          background-color: transparent;
          font-size: 0.3rem;
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
          input{
            width: 0;
            opacity: 0;
          }
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
