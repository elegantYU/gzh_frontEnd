<template>
  <div class="list_wrapper">
    <div class="list_content">
      <div class="list_nav">
        <span class="active">我的投诉</span>
        <span @click="f_moveMy">我要投诉</span>
      </div>
      <ul>
        <li
          v-for="(v, i) in v_list"
          :key="i"
          @click="f_detail(v)"
        >
          <span>{{ v.complaintTarget }}</span>
          <span>{{ v.createTime }}</span>
          <span>{{ v.sts }}</span>
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
    f_getList () {
      const params = {
        userId: this.$store.state.user.id,
        villageCode: this.$store.state.villageCode,
        pageNum: 1,
        pageSize: 1000
      }

      this.$http
        .get('/admin/complaint/getAllMeComSugg', { params })
        .then(({ data: { data: { list }}}) => {
          if (list.length) {
            list.reverse()
            this.v_list.push(...list)
          } 
        })
    },
    f_moveMy () {
      this.$router.push({ name: 'appeal' })
    },
    f_detail (v) {
      this.$router.push({ name: 'appealDetail', query: { id: v.id }})
    }
  }
}
</script>

<style lang='scss' scoped>
.list_wrapper{
  height: 100%;
  background-color: #efeff4;
  .list_content{
    padding-bottom: 1.2rem;
    background-color: #efeff4;
    overflow: auto;
    .list_nav{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 0.8rem;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      span{
        display: block;
        flex: 1;
        height: 100%;
        border-bottom-style: solid;
        border-bottom-color: transparent;
        border-bottom-width: 0.1rem; 
        line-height: 0.8rem;
        font-size: 0.34rem;
        cursor: pointer;
        &.active{
          border-bottom-color: #f64682;
          color: #f64682;
        }
      }
    }
    ul{
      margin-top: 1rem;
      width: 100%;
      background-color: #fff;
      li{
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        padding: 0 0.2rem;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.3rem;
        cursor: pointer;
        span{
          display: block;
          &:first-of-type{
            width: 2rem;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
