<template>
  <div class="pi_wrapper">
    <div class="pi_contianer">
      <h6>{{ place }}</h6>
      <ul>
        <li
          class="pi_item"
          v-for="(v, i) in v_list"
          :key="i"
          @click="f_getDetail(v)"
        >
          <span>{{ v.carNum }}</span>
          <span>{{ f_formatTime(v) }}</span>
        </li>
      </ul>
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
        villageCode: this.$store.state.villageCode,
        page: this.v_pageNum,
        rows: 50
      }
      this.$http
        .get('/admin/parking/system/wx/getSystemAll', { params })
        .then(({ data: { rows }}) => {
          this.v_list.push(...rows)
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
    f_getDetail (v) {
      this.$store.commit('setCurrentParkCheck', v)
      this.$router.push({ name: 'parkDetail' })
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
      padding: 0.2rem 0 0;
      .pi_item{
        background-color: #fff;
        margin-bottom: 0.5rem;
        padding: 0 0.2rem;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
