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
          <span>{{ name }}</span>
          <span>{{ type }}</span>
          <span>{{ time }}</span>
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

      }

      const { data } = await this.$http
        .get('', { params })
      
      this.v_list = data.map(v => ({
        name: '',
        type: '',
        time: ''
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
