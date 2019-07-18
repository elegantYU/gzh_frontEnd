<template>
  <div class="mv_wrapper">
    <div class="mv_container">
      <h6>
        <span>访客姓名</span>
        <span>门禁信息</span>
        <span>到访时间</span>
      </h6>
      <ul>
        <li
          v-for="(v, i) in v_list"
          :key="i"
        >
          <span>{{ v.name }}</span>
          <span>{{ v.type }}</span>
          <span>{{ v.time }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_list: []
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    async f_getList () {
      const params = {
        userId: this.$store.state.user.id,
        pageNum: 1,
        pageSize: 100
      }

      const { data: { data }} = await this.$http
        .get('/admin/visit/getMeVisit', { params })
      
      this.v_list = data.list.map(v => ({
        name: v.visitorName,
        type: v.telephone,
        time: v.applyTime.slice(0, 16)
      }))
    }
  }
}
</script>

<style lang='scss' scoped>
.mv_wrapper{
  background-color: #fff;
  height: 100%;
  .mv_container{
    background-color: #fff;
    padding-bottom: 1.2rem;
    overflow: auto;
    h6{
      display: flex;
      align-items: center;
      height: 0.8rem;
      font-size: 0.32rem;
      padding: 0 0.3rem;
      background-color: #efeff4;
      span:nth-of-type(1), span:nth-of-type(2){
        display: block;
        width: 1.8rem;
      }
      span:nth-of-type(3){
        flex: 1;
      }
    }
    ul{
      li{
        border-bottom: 1px solid #efeff4;
        height: 0.4rem;
        font-size: 0.18rem;
        display: flex;
        align-items: center;
        padding: 0 0.3rem;
        span:nth-of-type(1), span:nth-of-type(2){
          display: block;
          width: 1.8rem;
        }
        span:nth-of-type(3){
          flex: 1;
        }
      }
    }
  }
}
</style>
