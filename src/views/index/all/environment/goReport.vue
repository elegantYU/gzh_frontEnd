<template>
  <div class="wr_wrapper">
    <div class="wr_content">
      <h6>{{ v_form.communityName }}</h6>
      <div class="wr_form">
        <div class="wr_input">
          <label>分类</label>
          <input type="text" readonly v-model="v_form.type" @click="f_openType" placeholder="请选择分类">
          <i></i>
        </div>
        <div class="wr_input">
          <label>标题</label>
          <input type="text" v-model="v_form.title" placeholder="请输入标题(15个字以内)" maxlength="15">
        </div>
      </div>
      <div class="wr_detail">
        <b>内容描述</b>
        <div class="wr_input">
          <textarea placeholder="内容不超过200字" maxlength="200" v-model="v_form.detail"></textarea>
        </div>
      </div>
      <div class="wr_upload">
        <b>图片<span>（最多三张）</span></b>
        <div class="wr_preview">
          <div
            class="wr_preview_list"
            v-for="(v, i) in v_form.imgUrl"
            :key="i"
          >
            <img :src="v">
          </div>
          <button class="wr_preview_add" @click="f_upload"></button>
        </div>
      </div>
      <button class="wr_submit" @click="f_submit">
        发布
      </button>
      <!-- 分类 -->
      <mu-bottom-sheet :open.sync="v_typeFlag">
        <mu-list>
          <mu-sub-header>选择分类</mu-sub-header>
          <mu-list-item
            button
            v-for="(v, i) in v_types"
            :key="i"
            @click="f_chooseType(v.name, i)"
          >
            <mu-list-item-title>{{ v.name }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </div>
  </div>
</template>
<script>
import { stop, move } from '../../../../utils/utils'
export default {
  name: 'goReport',
  data () {
    return {
      v_typeFlag: false,
      v_form: {
        communityName: '',
        type: '',
        detail: '',
        imgUrl: [],
        title: '',
        submitType: ''
      },
      v_types: [
        { name: '垃圾散落' },
        { name: '绿化损坏' },
        { name: '高空抛物' },
        { name: '井盖缺失' },
        { name: '路面破损' },
        { name: '违章搭建' },
        { name: '违规停车' },
        { name: '宠物问题' },
        { name: '其他' }
      ]
    }
  },
  mounted () {
    this.v_form.communityName = this.$store.state.village
  },
  methods: {
    f_openType () {
      this.v_typeFlag = true
      stop()
    },
    f_chooseType (name, i) {
      this.v_typeFlag = false
      this.v_form.type = name
      this.v_form.submitType = i + 1
      move()
    },
    f_upload (e) {
      if (this.v_form.imgUrl.length > 2) {
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
                    this.v_form.imgUrl.push(data)
                  })
              })
          })
        })
    },
    f_submit () {
      if (this.v_form.type && this.v_form.title && this.v_form.detail) {
        // 提交表单
        let params = {
          address: this.$store.state.village,
          classify: this.v_form.submitType,
          title: this.v_form.title,
          content: this.v_form.detail,
          imgUrl: JSON.stringify(this.v_form.imgUrl),
          createUserId: this.$store.state.user.id,
          createUserName: this.$store.state.user.name,
          villageCode: this.$store.state.villageCode
        }

        this.$http
          .post('/admin/environ/add', params)
          .then(res => {
            if (res.data.success) {
              this.$toast('上报成功')
              this.$router.go(-1)
            } else {
              this.$toast('网络错误')
            }
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
          width: calc(100% - 2.25rem);
          height: 100%;
          background-color: transparent;
          font-size: 0.3rem;
        }
        i{
          display: inline-block;
          width: 0.25rem;
          height: 100%;
          background-image: url('../../../../assets/images/environment/repair_arrow.png');
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
         line-height: 1.5em;
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
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
        .wr_preview_add{
          float: left;
          display: block;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          border: 0.01rem solid #cccccc;
          background-image: url('../../../../assets/images/environment/repair_add.png');
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
      display: block;
      width: 6.5rem;
      margin: 0 auto;
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
