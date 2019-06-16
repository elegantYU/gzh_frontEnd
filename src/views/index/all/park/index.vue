<template>
  <div class="pi_wrapper">
    <div class="pi_contianer">
      <h6>{{ place }}</h6>
      <ul>
        <li
          class="pi_item"
          v-for="(v, i) in v_list"
          :key="i"
        >
          <div class="pi_input">
            <label>车牌号</label>
            <p>{{ v.carNum }}</p>
          </div>
          <div class="pi_input">
            <label>状态</label>
            <p :class="v.sts == 1 ? 'active' : ''">{{ f_formatSts(v) }}</p>
          </div>
          <div class="pi_input">
            <label>费用</label>
            <p>{{ v.price }}元</p>
          </div>
          <div class="pi_input">
            <label>有效期</label>
            <p>{{ f_formatTime(v) }}</p>
          </div>
          <div class="pi_input" v-if="v.sts == 3">
            <span>立即续费</span>
          </div>
        </li>
      </ul>
      <div class="pi_submit" @click="f_addPark">添加车位申请</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_list: [],
      v_pageNum: 1
    }
  },
  computed: {
    place () {
      return this.$store.state.village
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    f_getList () {
      const params = {
        userId: this.$store.state.user.id,
        villageCode: this.$store.state.villageCode,
        pageNum: this.v_pageNum,
        pageSize: 50
      }
      this.$http
        .get('/admin/parking/getMeParking', { params })
        .then(({ data: { data: res }}) => {
          this.v_list.push(...res.list)
        })
    },
    f_addPark () {
      this.$router.push({ name: 'parkApply' })
    },
    f_formatTime (v) {
      const s = v.startTime.replace(/(\d{4}).(\d{2}).(\d{2}).*/g, '$1-$2-$3')
      const e = v.endTime.replace(/(\d{4}).(\d{2}).(\d{2}).*/g, '$1-$2-$3')
      
      return `${s}至${e}`
    },
    f_formatSts (v) {
      console.log(v.sts)
      const t = new Date().getTime()
      const e = new Date(v.endTime).getTime()
      const surplus = ((e - t) / (24*60*60*1000)).toFixed() 
      switch (v.sts) {
        case '0':
          return '待处理'
          break
        case '1':
          return `剩余${surplus}天`
          break
        case '2':
          return '已到期'
          break
        case '3':
          return '未通过'
          break
        case '4':
          return '已删除'
          break
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.pi_wrapper{
  background-color: #efeff4;
  height: 100%;
  .pi_contianer{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    h6{
      height: 0.9rem;
      color: #999;
      background-color: #fff;
      font-size: 0.36rem;
      line-height: 0.9rem;
    }
    ul{
      padding: 0.2rem 0.25rem 0;
      margin-bottom: 1rem;
      .pi_item{
        border-radius: 0.15rem;
        background-color: white;
        box-shadow: 0.1rem 0 0.3rem 0 rgba(0, 0, 0, 0.05);
        margin-bottom: 0.5rem;
        .pi_input{
          border-bottom: 1px solid #e5e5e5;
          height: 0.9rem;
          font-size: 0.34rem;
          padding: 0 0.4rem;
          display: flex;
          &:last-of-type{
            border: none;
          }
          label{
            width: 1.4rem;
            height: 100%;
            line-height: 0.9rem;
            color: #b2b2b2;
            text-align: left;
          }
          p{
            flex: 1;
            height: 100%;
            line-height: 0.9rem;
            text-align: right;
            &.active{
              color: #f64682;
            }
          }
          span{
            width: 1.8rem;
            height: 0.6rem;
            margin-top: 0.15rem;
            margin-left: auto;
            border-radius: 0.1rem;
            background-color: #f64682;
            color: #fff;
            font-size: 0.32rem;
            line-height: 0.6rem;
          }
        }
      }
    }
    .pi_submit{
      border-radius: 0.15rem;
      line-height: 0.9rem;
      height: 0.9rem;
      color: #f64682;
      font-size: 0.3rem;
      background-color: #fff;
      box-shadow: 0.1rem 0 0.3rem 0 rgba(0, 0, 0, 0.05);
      cursor: pointer;
      margin: 0 0.25rem auto;
    }
  }
}
</style>
