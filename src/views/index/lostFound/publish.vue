<template>
  <div class="lp_wrapper">
    <div class="lp_container">
      <h6>{{ place }}</h6>
      <div class="lp_form">
        <div class="lp_input">
          <label>类型</label>
          <div class="lp_input_box">
            <mu-select v-model="v_form.type" :solo="true" placeholder="请选择类型">
              <mu-option v-for="(v,i) in v_type" :key="i" :label="v.name" :value="v.type"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
        <div class="lp_input">
          <label>标题</label>
          <div class="lp_input_box">
            <input type="text" placeholder="请输入标题" v-model="v_form.title">
          </div>
        </div>
        <div class="lp_input">
          <label>发布人</label>
          <div class="lp_input_box">
            <input type="text" placeholder="请输入姓名" v-model="v_form.createUserName">
          </div>
        </div>
        <div class="lp_input">
          <label>联系方式</label>
          <div class="lp_input_box">
            <input type="text" placeholder="手机号、微信、QQ" v-model="v_form.telephone">
          </div>
        </div>
      </div>
      <div class="lp_detail">
        <b>内容</b>
        <div class="lp_detail_box">
          <textarea v-model="v_form.content" placeholder="内容不超过200字" maxlength="200"></textarea>
        </div>
      </div>
      <div class="lp_upload">
        <b>图片<span>(最多三张)</span></b>
        <div class="lp_preview">
          <div 
            class="lp_preview_list"
            v-for="(v, i) in v_form.imgUrl"  
            :key="i"
          >
            <img :src="v" alt="">
          </div>
          <div class="lp_preview_add" @click="f_upload">
            <!-- <input type="file" multiple accept='image/*' ref="" @change="f_upload($event)"> -->
          </div>
        </div>
      </div>
      <div class="lp_submit" @click="f_submit">发布</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_form: {
        title: '',
        content: '',
        createUserId: '',
        createUserName: '',
        telephone: '',
        type: '',
        villageCode: '',
        imgUrl: []
      },
      v_type: [
        { name: '失物', type: 1 },
        { name: '招领', type: 2 },
      ]
    }
  },
  computed: {
    place () {
      return this.$store.state.village
    }
  },
  methods: {
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
                
              })
          })
        })

      const form = new FormData()
      form.append("files", e.target.files[0])
      this.$http
        .post('/admin/file/uploadFiles', form)
        .then(({data: { data }}) => {
          if (data.length) {
            this.v_form.imgUrl.push(...data)
          }
        })
    },
    f_submit () {
      const params = {
        ...this.v_form,
        createUserId: this.$store.state.user.id,
        imgUrl: JSON.stringify(this.v_form.imgUrl),
        villageCode: this.$store.state.villageCode
      }

      if (!params.title || !params.type || !params.createUserName || !params.telephone || !params.content) {
        this.$toast('请完善基本信息')
        return
      }

      this.$http
        .post('/admin/lost/addLostFound', params)
        .then(({data: {success}}) => {
          if (success) {
            this.$toast('发布成功')
            this.$router.go(-1)
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.lp_wrapper{
  background-color: #efeff4;
  height: 100%;
  .lp_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    h6{
      height: 0.87rem;
      line-height: 0.87rem;
      font-size: 0.36rem;
    }
    .lp_form{
      border-top: 1px solid #e5e5e5;
      .lp_input{
        padding: 0 0.3rem;
        background-color: #fff;
        display: flex;
        height: 0.9rem;;
        line-height: 0.9rem;
        border-bottom: 1px solid #e5e5e5;
        &:last-of-type{
          border: none;
        }
        label{
          width: 1.5rem;
          height: 100%;
          line-height: 0.9rem;
          font-size: 0.34rem;
          text-align: left;
        }
        .lp_input_box{
          flex: 1;
          .mu-input{
            display: block;
            font-size: 0.3rem;
          }
          input{
            display: block;
            font-size: 0.3rem;
            width: 100%;
            height: 100%;
          }
        }
        i{
          width: 0.25rem;
          height: 100%;
          background-image: url('../../../assets/images/repair/repair_arrow.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          vertical-align: middle;
        }
      }
    }
    .lp_detail{
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #000;
        text-align: left;
        font-weight: normal;
      }
      .lp_detail_box{
        background-color: #fff;
        min-height: 1.5rem;
        padding: 0.1rem 0.3rem;
        textarea{
          width: 100%;
          font-size: 0.34rem;
          color: #b2b2b2;
          text-align: left;
          line-height: 1.5em;
          resize: none;
        }
      }
    }
    .lp_upload{
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
      .lp_preview{
        height: 1.74rem;
        padding: 0.3rem;
        box-sizing: border-box;
        background-color: #fff;
        .lp_preview_list{
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
        .lp_preview_add{
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
    .lp_submit{
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
