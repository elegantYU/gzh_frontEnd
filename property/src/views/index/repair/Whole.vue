<template>
    <div class="whole">
      <ul class="whole_list" ref="container">
        <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_loadAll">
          <mu-list>
            <template v-for="(v, i) in v_repairList">
              <li
                :key="i"
                @click="f_detail(v)"
              >
                <div class="whole_list_cont">
                  <div class="whole_list_cont_tit">{{ v.title }}</div>
                  <div class="whole_list_cont_subject">{{ v.detail }}</div>
                  <div class="whole_list_cont_date">
                    <div>{{ v.createTime }}</div>
                    <span  class="myRep_detail_status" :class="v.sts === 3 ? 'myRep_status_warn' : v.sts === 6 ? 'myRep_status_success' : ''">{{ f_formatSts(v) }}</span>
                  </div>
                </div>
                <div class="whole_list_img">
                  <img :src="v.img[0]" alt="">
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
      v_repairList: [],
      v_listNum: 1,
      v_loading: false,
      v_loadAll: true
    }
  },
  props: {
    sts: {
      type: Number
    }
  },
  watch: {
    'sts' () {
      this.v_repairList = []
      this.f_getList()
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    f_detail (v) {
      this.$store.commit('setCurrentRepair', v)
      this.$router.push({name:'repairDetail'})
    },
    f_formatSts (v) {
      switch (v.sts) {
        case 1:
        case 2:
          return '待确认'
          break
        case 3:
          return '待处理'
          break
        case 4:
          return '待评价'
          break
        case 5:
          return '已完成'
          break
        case 6: 
          return '已评论'
          break
      }
    },
    f_getList () {
      this.$http
        .get('/admin/property/repair/list', {
          params: {
            villageCode: this.$store.state.villageCode, //this.$store.state.villageCode
            repairId: this.$store.state.user.id, // this.$store.state.user.id
            pageNum: this.v_listNum,
            pageSize: 10,
            status: this.sts ? this.sts : ''
          }
        })
        .then(res => {
          if (!res.data.data.length) {
            this.v_loadAll = true
            return
          }

          res.data.data.forEach(v => {
            if (v.img) {
              v.img = JSON.parse(v.img)
            } else {
              v.img = []
            }
            this.v_repairList.push(v)
          })
          console.log(this.v_repairList)
        })
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
.whole{
  height: 100%;
  background-color: #efeff4;
  .whole_list{
    li{
      display: flex;
      height: 1.6rem;
      padding: 0.1rem 0.2rem;
      margin-bottom: 0.2rem;
      background-color: white;
      .whole_list_cont{
        flex: 1;
        padding-right: 0.2rem;
        .whole_list_cont_tit{
          text-align: left;
          font-size: 0.3rem;
          margin-bottom: 0.1rem;
          font-weight: bold;
        }
        .whole_list_cont_subject{
          width: 100%;
          height: 0.7rem;
          color: #a9a9a9;
          font-size: 0.25rem;
          overflow: hidden;
          text-align: left;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          padding-top: 0.02rem;
          margin-bottom: 0.1rem;
        }
        .whole_list_cont_date{
          display: flex;
          width: 100%;
          text-align: left;
          font-size: 0.2rem;
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
      .whole_list_img{
        width: 1.4rem;
        height: 1.4rem;
        background-color: black;
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
</style>
