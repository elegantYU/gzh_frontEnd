<template>
    <div class="earlylist">
      <ul class="earlylist-list" rel="container">
        <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_loadAll">
          <mu-list>
            <template v-for="(v,i) in v_earlylist">
              <li :key="i" @click="f_detail">
                <div class="earlylist-list-tit">{{v.name}}</div>
                <div class="earlylist-list-cont">{{v.cont}}</div>
                <div class="earlylist-list-date">
                  <div>{{v.date}}</div>
                  <span  class="myRep_detail_status" :class="v.sts === 3 ? 'myRep_status_warn' : v.sts === 6 ? 'myRep_status_success' : ''">{{v.sta}}</span>
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
      v_earlylist: [
        { name: '标题一', cont: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容', date: '2019-06-24 10:54:53', sta: '待处理' },
        { name: '标题二', cont: '内容是我内容是我内容是我内容是我内容是我内容是我内容是我', date: '2019-06-24 10:54:53', sta: '待处理' },
        { name: '标题三', cont: '谁是内容谁是内容谁是内容谁是内容谁是内容谁是内容谁是内容', date: '2019-06-24 10:54:53', sta: '处理中' },
        { name: '标题四', cont: '内容在哪内容在哪内容在哪内容在哪内容在哪内容在哪内容在哪', date: '2019-06-24 10:54:53', sta: '已完成' }
      ],
      v_loading: false,
      v_loadAll: true
    }
  },
  methods: {
    f_detail () {
      this.$router.push({ name: 'equipment' })
    },
    f_load () {
      this.v_loading = true
      setTimeout(() => {
        this.v_loading = false
        this.v_listNum++
        this.f_getList()
      }, 1000)
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
