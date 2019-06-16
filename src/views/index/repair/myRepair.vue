<template>
  <div class="myRep_wrapper">
    <div class="myRep_content">
      <ul class="myRep_nav clearfix">
        <li class="active">我的报修单</li>
        <li @click="f_moveRepair">我要报修</li>
      </ul>
      <ul class="myRep_list" ref="container">
        <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_loadAll">
          <mu-list>
            <template v-for="(v, i) in v_repairList">
              <li
                :key="i"
                @click="f_detail(v)"
              >
                <div class="myRep_list_left">
                  <h6>{{ v.title }}</h6>
                  <p>{{ v.detail }}</p>
                  <div class="myRep_list_left_detail clearfix">
                    <span class="myRep_detail_time">{{ v.createTime }}</span>
                    <span class="myRep_detail_status" :class="v.sts === 3 ? 'myRep_status_warn' : v.sts === 6 ? 'myRep_status_success' : ''">{{ f_formatSts(v) }}</span>
                  </div>
                </div>
                <div class="myRep_list_right">
                  <img :src="v.img[0]" alt="">
                </div>
              </li>
            </template>
          </mu-list>
        </mu-load-more>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyRepair',
  data () {
    return {
      v_repairList: [],
      v_listNum: 1,
      v_loading: false,
      v_loadAll: true
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    f_detail (v) {
      //  这里根据状态判断进入页面
      if (v.sts === 3) {
        this.$router.push({ name: 'willRepair', query: { id: v.id } })
      } else {
        this.$router.push({ name: 'repairDetail', params: { id: v.id } })
      }
    },
    f_formatSts (v) {
      switch (v.sts) {
        case 1:
        case 2:
          return '待审核'
          break
        case 3:
          return '未通过'
          break
        case 4:
          return '待上门'
          break
        case 5:
          return '待评价'
          break
        case 6:
          return '已完成'
          break
      }
    },
    f_moveRepair () {
      this.$router.push({ name: 'willRepair' })
    },
    f_getList () {
      this.$http
        .get('/admin/property/repair/list', {
          params: {
            villageCode: this.$store.state.villageCode,
            createUserId: this.$store.state.user.id,
            pageNum: this.v_listNum,
            pageSize: 10
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

<style lang="scss" scoped>
.myRep_wrapper{
  background-color: #efeff4;
  height: 100%;
  .myRep_content{
    padding-bottom: 1.2rem;
    background-color: #efeff4;
    .myRep_nav{
      margin-bottom: 0.28rem;
      li{
        float: left;
        width: 2rem;
        height: 0.8rem;
        box-sizing: border-box;
        margin-left: 0.88rem;
        font-size: 0.34rem;
        font-weight: 500;
        line-height: 0.8rem;
        &:last-of-type{
          float: right;
          margin-left: 0;
          margin-right: 0.88rem;
        }
        &.active{
          color: #f64682;
          border-bottom: 0.1rem solid #f64682;
        }
      }
    }
    .myRep_list{
      li{
        height: 1.83rem;
        background-color: #fff;
        box-sizing: border-box;
        padding: 0.2rem 0.3rem;
        margin-bottom: 0.2rem;
        .myRep_list_left{
          float: left;
          width: calc(100% - 1.6rem);
          height: 1.43rem;
          box-sizing: border-box;
          padding-right: 0.24rem;
          text-align: left;
          position: relative;
          h6{
            font-size: 0.34rem;
            color: #000;
            margin-bottom: 0.15rem;
          }
          p{
            font-size: 0.26rem;
            color: #a9a9a9;
            line-height: 1.2em;
            margin-bottom: 0.15rem;
            text-overflow: -o-ellipsis-lastline;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
          }
          .myRep_list_left_detail{
            position: absolute;
            width: 100%;
            bottom: 0;
            span{
              font-size: 0.2rem;
              color: #000;
            }
            .myRep_detail_time{
              float: left;
            }
            .myRep_detail_status{
              float: right;
              margin-right: 0.24rem;
              &.myRep_status_warn{
                color: #f64682;
              }
              &.myRep_status_success{
                color: #07C160;
              }
            }
          }
        }
        .myRep_list_right{
          float: left;
          width: 1.6rem;
          height: 1.43rem;
          display: flex;
          align-items: center;
          img{
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
