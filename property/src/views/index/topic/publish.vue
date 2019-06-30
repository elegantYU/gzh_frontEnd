<template>
  <div class="tp_wrapper">
    <h6>{{ village }}</h6>
    <div class="tp_form">
      <div class="tp_input">
        <label>标题</label>
        <div class="tp_input_box">
          <input type="text" placeholder="请输入标题" v-model="v_form.title">
        </div>
      </div>
      <div class="tp_input">
        <label>类型</label>
        <div class="tp_input_box">
          <mu-select v-model="v_form.sourceType" :solo="true" placeholder="请选择类型">
            <mu-option v-for="(v,i) in v_type" :key="i" :label="v.name" :value="v.type"></mu-option>
          </mu-select>
        </div>
      </div>
      <div class="tp_input">
        <label>投放开始时间</label>
        <div class="tp_input_box">
          <mu-date-input container="bottomSheet" placeholder="选择时间" solo :should-disable-date="f_startTimeRules"  :full-width="true" clock-type='24hr' view-type='list' v-model="v_form.postBegin" type="dateTime" landscape></mu-date-input>
        </div>
      </div>
      <div class="tp_input">
        <label>投放结束时间</label>
        <div class="tp_input_box">
          <mu-date-input container="bottomSheet" placeholder="选择时间" solo :should-disable-date="f_endTimeRules"  :full-width="true" clock-type='24hr' view-type='list' v-model="v_form.postEnd" type="dateTime" landscape></mu-date-input>
        </div>
      </div>
    </div>
    <div class="ns_description">
      <b>内容描述</b>
      <div class="ns_input">
        <textarea placeholder="请输入内容描述" v-model="v_form.content"></textarea>
      </div>
    </div>
    <div class="ns_upload">
      <b>图片</b>
      <div class="ns_preview">
        <div
          class="ns_preview_list"
          v-for="(v, i) in v_form.img"
          :key="i"
        >
          <img :src="v" alt="">
        </div>
        <div class="ns_preview_add" @click="f_upload"></div>
      </div>
    </div>
    <div class="ns_submit" @click="f_submit">发布</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_form: {
        title: '',
        content: '',
        sourceType: '3',
        sourceName: '物业',
        postBegin: '',
        postEnd: '',
        villageCode: '',
        img: [],
        status: 1,
        createUserId: ''
      },
      v_type: [
        { name: '热门活动', type: '3' }
      ]
    }
  },
  computed: {
    village () {
      return this.$store.state.village
    }
  },
  methods: {
    f_startTimeRules (date) {
      const today = new Date().getTime()
      return new Date(date).getTime() < today
    },
    f_endTimeRules (date) {
      const start = this.v_form.postBegin ? new Date(this.v_form.postBegin).getTime() : new Date().getTime()
      return new Date(date).getTime() < start
    },
    f_upload (e) {
      if (this.v_form.img.length > 2) {
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
                    this. 
                    this.v_form.img.push(data)
                  })
              })
          })
        })
    },
    f_submit () {
      if (!this.v_form.title || !this.v_form.content || !this.v_form.postBegin || !this.v_form.postEnd) {
        this.$toast('请填写完整')
        return
      }

      this.v_form.createUserId = this.$store.state.user.id
      this.v_form.villageCode = this.$store.state.villageCode
    
      const img = this.v_form.img.join(';')
      const start = new Date(this.v_form.postBegin).toLocaleString('chinese', { hour12: false }).replace(/\//g, '-')
      const end = new Date(this.v_form.postEnd).toLocaleString('chinese', { hour12: false }).replace(/\//g, '-')

      const params = Object.assign({}, this.v_form, { img: img, postBegin: start, postEnd: end })

      this.$http
        .post('/admin/event/detail', params)
        .then(({ data: { success }}) => {
          if (success) {
            this.$toast('发布成功')
            this.$router.go(-1)
          } else {
            this.$toast('发布失败')
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.tp_wrapper{
  height: 100%;
  background-color: #efeff4;
  h6{
    font-size: 0.34rem;
    height: 0.9rem;
    line-height: 0.9rem;
  }
  .tp_form{
    background-color: #fff;
    border-top: 1px solid #eee;
    .tp_input{
      width: 100%;
      height: 0.9rem;
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      label{
        display: block;
        width: 2rem;
        height: 100%;
        text-align: left;
        line-height: 0.9rem;
        font-size: 0.3rem;
      }
      .tp_input_box{
        flex: 1;
        height: 100%;
        input{
          display: block;
          width: 100%;
          height: 100%;
          font-size: 0.3rem;
        }
        .mu-input{
          padding: 0;
          font-size: 0.3rem;
          height: 100%;
          min-height: 0;
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
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
      .ns_preview_add{
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
  .ns_submit{
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
</style>
