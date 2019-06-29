<template>
  <div class="ld_wrapper">
    <div class="ld_container">
      <h6>{{ place }}</h6>
      <div class="ld_form">
        <div class="ld_input">
          <label>类型</label>
          <input type="text" readonly :value="type">
        </div>
        <div class="ld_input">
          <label>标题</label>
          <input type="text" readonly :value="v_form.title">
        </div>
        <div class="ld_input">
          <label>发布人</label>
          <input type="text" readonly :value="v_form.createUserName">
        </div>
        <div class="ld_input">
          <label>联系方式</label>
          <input type="text" readonly :value="v_form.telephone">
        </div>
        <div class="ld_input">
          <label>状态</label>
          <input type="text" readonly :value="sts">
        </div>
        <div class="ld_input">
          <label>时间</label>
          <input type="text" readonly :value="v_form.createTime">
        </div>
      </div>
      <div class="ld_detail">
        <b>内容</b>
        <div class="ld_detail_content">{{ v_form.content }}</div>
      </div>
      <div class="ld_img">
        <b>图片</b>
        <div class="ld_img_wrapper">
          <div
            v-for="(v, i) in imgs"
            :key="i"
          >
            <img :src="v" alt="">
          </div>
        </div>
      </div>
      <div class="ld_submit" v-show="v_del" @click="f_delete">结束</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_form: {},
      v_del: false
    }
  },
  computed: {
    place () {
      return this.$store.state.village
    },
    type () {
      let t
      this.v_form.type == '1'
        ? t = '失物'
        : t = '招领'
      return t
    },
    sts () {
      let s
      this.v_form.sts == '0'
        ? s = '已删除'
        : s = '进行中'
      return s
    },
    imgs () {
      return JSON.parse(v_form.imgUrl)
    }
  },
  mounted () {
    this.f_getDetail()
  },
  methods: {
    f_getDetail () {
      const params = {
        id: this.$route.query.id
      }

      this.$http
        .get('/admin/lost/getLostFoundDetail', { params })
        .then(({data: {data}}) => {

          this.v_form = Object.assign({}, data)
          this.v_form.imgUrl = JSON.parse(data.imgUrl)
          this.$store.state.user.id == data.createUserId
            ? this.v_del = true
            : this.v_del = false
        })
    },
    f_delete () {
      const params = {
        id: this.$route.query.id,
        villageCode: this.$store.state.villageCode,
      }

      let flag = confirm('此条信息将被删除，是否进行？')
      if (flag) {
        this.$http
          .get('/admin/lost/delete', { params })
          .then(res => {
            if (res.data.success) {
              this.$toast('删除成功')
              this.$router.go(-1)
            } else {
              this.$toast('网络错误')
            }
          })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.ld_wrapper{
  background-color: #efeff4;
  height: 100%;
  .ld_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    h6{
      font-size: 0.3rem;
      line-height: 0.9rem;
      height: 0.9rem;
    }
    .ld_form{
      border-top: 1px solid #e5e5e5;
      .ld_input{
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
        input{
          flex: 1;
          font-size: 0.3rem;
          height: 100%;
          background-color: transparent;
        }
      }
    }
    .ld_detail{
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #b2b2b2;
        text-align: left;
        font-weight: normal;
      }
      .ld_detail_content{
        min-height: 1.15rem;
        padding: 0.3rem;
        background-color: #fff;
        font-size: 0.26rem;
        line-height: 1.5em;
        text-align: left;
      }
    }
    .ld_img{
      margin-bottom: 0.3rem;
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #b2b2b2;
        text-align: left;
        font-weight: normal;
      }
      .ld_img_wrapper{
        height: 1.74rem;
        padding: 0.3rem;
        background-color: #fff;
        div{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          display: flex;
          align-items: center;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
    .ld_submit{
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
  }
}
</style>
