<template>
  <div class="d_wrapper">
    <h6>{{ village }}</h6>
    <div class="d_content">
      <div class="d_input">
        <label>投诉对象:</label>
        <input type="text" readonly v-model="v_form.complaintTarget">
      </div>
      <div class="d_other" v-if="v_form.content">
        <span>详细描述:</span>
        <div>{{ v_form.content }}</div>
      </div>
      <div class="d_other" v-if="v_img.length">
        <span>图片:</span>
        <div class="d_imgs">
          <ul>
            <li
              v-for="(v, i) in v_img"
              :key="i"
              @click="f_bigger(v)"
            >
              <img :src="v" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="d_input">
        <label>投诉时间:</label>
        <input type="text" readonly v-model="v_form.createTime">
      </div>
      <div class="d_input">
        <label>当前状态:</label>
        <input type="text" readonly v-model="sts">
      </div>
      <div class="d_input" v-if="this.v_form.sts">
        <label>解决时间:</label>
        <input type="text" readonly v-model="v_form.modifyTime">
      </div>
    </div>
    <!-- 放大图片 -->
    <div class="bigger" v-if="v_bigger" @click="v_bigger = false">
      <img :src="v_currentImg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_form: {},
      v_img: [],
      v_bigger: false,
      v_currentImg: ''
    }
  },
  computed: {
    village () {
      return this.$store.state.village
    },
    sts () {
      if (this.v_form.sts == 1) {
        return '已审核'
      } else {
        return '待审核'
      }
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
        .get('/admin/complaint/getDetail', { params })
        .then(({ data: { data }}) => {
          console.log('data', data)
          this.v_form = Object.assign({}, data)
          this.v_img = JSON.parse(data.imgUrl)
        })
    },
    f_bigger (v) {
      this.v_bigger = true
      this.v_currentImg = v
    }
  }
}
</script>

<style lang='scss' scoped>
.d_wrapper{
  height: 100%;
  background-color: #efeff4;
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
  h6{
    font-size: 0.32rem;
    color: #999;
    line-height: 0.8rem;
  }
  .d_content{
    background-color: #efeff4;
    .d_input{
      width: 100%;
      min-height: 0.9rem;
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      label{
        display: block;
        width: 2rem;
        height: 100%;
        font-size: 0.3rem;
        line-height: 0.9rem;
        text-align: left;
      }
      input{
        flex: 1;
        display: block;
        height: 0.9rem;
        font-size: 0.3rem;
        background-color: transparent;
      }
    }
    .d_other{
      border-bottom: 1px solid #eee;
      span{
        display: block;
        padding: 0 0.2rem;
        text-align: left;
        font-size: 0.3rem;
        height: 0.6rem;
        line-height: 0.6rem;
      }
      div{
        background-color: #fff;
        text-align: left;
        text-indent: 2em;
        line-height: 1.5em;
        font-size: 0.3rem;
        padding: 0.2rem 0;
      }
      .d_imgs{
        background-color: #fff;
        height: 2rem;
        ul{
          width: 100%;
          height: 100%;
          padding: 0.2rem;
          li{
            float: left;
            margin-right: 0.1rem;
            width: 1.6rem;
            height: 1.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
