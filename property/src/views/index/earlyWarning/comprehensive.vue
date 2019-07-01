<template>
  <div class="earlylist">
    <ul class="earlylist-list" rel="container">
      <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_loadAll">
        <mu-list>
          <template v-for="(v,i) in v_earlylist">
            <li :key="i" @click="f_detail">
              <div class="earlylist-list-tit">{{v.title}}</div>
              <div class="earlylist-list-cont">{{v.content}}</div>
              <div class="earlylist-list-date">
                <div>{{v.startTime}}</div>
                <span  class="myRep_detail_status">{{v.statusName}}</span>
              </div>
            </li>
          </template>
        </mu-list>
      </mu-load-more>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_earlylist: [],
      v_loading: false,
      v_loadAll: true
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
  methods: {
    f_getList () {
      const params = this.status === 0
      ? {
          userId: this.$store.state.user.id,
          orgCode: this.$store.state.villageCode,
        }
      : {
          userId: this.$store.state.user.id,
          orgCode: this.$store.state.villageCode,
          status: this.status
        }

      this.$http
        .post('/event/current/mobile/comprehensive/comprehensiveWarningList', params)
        .then(({ data: { rows }}) => {
          console.log('设备列表', rows)
        })
     },
    f_detail () {
      this.$router.push({ name: 'detailIn' })
    }
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
        height: 1.6rem;
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

