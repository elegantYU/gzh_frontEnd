<template>
  <div class="earlylist">
    <ul class="earlylist-list" rel="container">
      <li v-for="(v,i) in v_earlylist" :key="i" @click="f_detail(v)">
        <div class="earlylist-list-tit">{{v.title}}</div>
        <div class="earlylist-list-cont">{{v.content}}</div>
        <div class="earlylist-list-date">
          <div>{{v.startTime}}</div>
          <span  class="myRep_detail_status">{{v.statusName}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_earlylist: [],
    }
  },
  props: {
    status: {
      type: Number
    }
  },
  watch: {
    status: {
      handler (now) {
        this.v_earlylist = []
        this.f_getList()
      }
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    f_getList () {
      const params = {
          userId: this.$store.state.user.id,
          orgCode: this.$store.state.villageCode,
          status: this.status
        }

      if (this.status === 0) {
        this.$http
          .post(`/applet/event/current/mobile/device/completeWarningList?userId=${this.$store.state.user.id}&orgCode=${this.$store.state.villageCode}`)
          .then(({ data: { rows }}) => {
            this.v_earlylist.push(...rows)
          })
      } else {
        this.$http
          .get('/applet/event/current/mobile/device/deviceWarningList', { params })
          .then(({ data: { rows }}) => {
            this.v_earlylist.push(...rows)
          })
      }
    },
    f_detail (v) {
      this.$router.push({ name: 'equipment', query: { id: v.id, status: this.status }})
    },
  }
}
</script>

<style scoped lang="scss">
.earlylist{
  height: 100%;
  background-color: #efeff4;
  .earlylist-list{
    li{
      background-color: white;
      height: 1.8rem;
      padding: 0.1rem 0.2rem;
      margin-bottom: 0.2rem;
      .earlylist-list-tit{
        text-align: left;
        font-size: 0.3rem;
        font-weight: bold;
        margin-bottom: 0.2rem;
      }
      .earlylist-list-cont{
        width: 100%;
        height: 0.5rem;
        color: #a9a9a9;
        font-size: 0.27rem;
        overflow: hidden;
        text-align: left;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        margin-bottom: 0.2rem;
      }
      .earlylist-list-date{
        display: flex;
        text-align: left;
        span{
          margin-left: auto;
        }
        .myRep_detail_status{
          margin-left: auto;
          &.myRep_status_warn{
            color: #f64682;
          }
          &.myRep_status_success{
            color: #07C160;
          }
        }
      }
    }
  }
}
</style>
