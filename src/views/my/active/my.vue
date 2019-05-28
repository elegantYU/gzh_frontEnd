<template>
  <div class="am_wrapper">
    <div class="am_container">
      <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_loadAll">
        <mu-list>
          <template v-for="(v, i) in v_list">
            <div
              :key="i"
              @click="f_viewDetail(v)"
              class="th_list_item"
            >
              <div class="index_topic_item_left">
                <p>{{ v.title }}</p>
                <div class="index_topic_item_detail clearfix">
                  <span>{{ f_formatDate(v.createTime) }}</span>
                  <span>{{ v.sourceName }}</span>
                  <ul class="clearfix">
                    <li :class="v.hasBrowse ? 'index_topic_icon_active' : ''"><i></i>{{ v.rate }}</li>
                    <li :class="v.hasComment ? 'index_topic_icon_active' : ''"><i></i>{{ v.comment }}</li>
                    <li :class="v.hasCollect ? 'index_topic_icon_active' : ''"><i></i>{{ v.collect }}</li>
                  </ul>
                </div>
              </div>
              <div class="index_topic_img">
                <img :src="v.img[0]" alt="">
              </div>
            </div>
          </template>
        </mu-list>
      </mu-load-more>
    </div>
  </div>
</template>

<script>
export default {
  name: 'My',
  data () {
    return {
      v_list: [],
      v_pageNum: 1,
      v_loading: false,
      v_loadAll: false
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    f_getList () {
      let params = {
        memberId: this.$store.state.user.id,
        start: this.v_pageNum,
        pageSize: 10
      }

      this.$http
        .get('/notice/activity/participateList', { params })
        .then(res => {
          if (res.data.data.length) {
            res.data.data.map(v => this.v_list.push(v))
          } else {
            this.v_loadAll = true
          }
        })
    },
    f_load () {
      this.v_loading = true
      setTimeout(() => {
        this.v_loading = false
        this.v_pageNum++
        this.f_getList()
      }, 1000)
    },
    f_viewDetail (v) {
      this.$router.push({ name: 'topicDetail', query: { id: v.id }})
    },
    f_formatDate (time) {
      return time.split(' ')[0]
    }
  }
}
</script>

<style lang='scss' scoped>
.am_wrapper{
  height: 100%;
  background-color: #efeff4;
  .am_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    .th_list_item{
      height: 1.5rem;
      padding: 0.2rem 0.3rem 0.2rem 0.5rem;
      background-color: #fff;
      box-sizing: border-box;
      margin-bottom: 0.16rem;
      .index_topic_item_left{
        float: left;
        width: calc(100% - 1.7rem);
        height: 1.1rem;
        padding-right: 0.15rem;
        box-sizing: border-box;
        position: relative;
        p{
          font-size: 0.26rem;
          font-weight: bold;
          text-align: left;
          line-height: 1.2em;
          margin-bottom: 0.35rem;
          text-overflow: -o-ellipsis-lastline;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
        }
        .index_topic_item_detail{
          position: absolute;
          bottom: 0;
          width: 100%;
          font-size: 0.18rem;
          color: #888;
          span{
            float: left;
            margin-left: 0.15rem;
          }
          ul{
            float: right;
            li{
              float: left;
              font-size: 0.2rem;
              color: #999;
              margin-right: 0.16rem;
              i{
                display: inline-block;
                width: 0.24rem;
                height: 0.22rem;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center center;
                vertical-align: middle;
                margin-right: 0.05rem;
              }
              &:nth-of-type(1){
                i{
                  background-image: url('../../../assets/images/index/index_view.png');
                }
                &.index_topic_icon_active{
                  color: #58c3fb;
                  i{
                    background-image: url('../../../assets/images/index/index_viewed.png');
                  }
                }
              }
              &:nth-of-type(2){
                i{
                  background-image: url('../../../assets/images/index/index_comment.png');
                }
                &.index_topic_icon_active{
                  color: #fbbc58;
                  i{
                    background-image: url('../../../assets/images/index/index_commented.png');
                  }
                }
              }
              &:nth-of-type(3){
                i{
                  background-image: url('../../../assets/images/index/index_collect.png');
                }
                &.index_topic_icon_active{
                  color: #ff6c73;
                  i{
                    background-image: url('../../../assets/images/index/index_collected.png');
                  }
                }
              }
            }
          }
        }
      }
      .index_topic_img{
        float: left;
        width: 1.7rem;
        height: 100%;
        display: flex;
        align-items: center;
        img{
          width: 100%
        }
      }
    }
  }
}
</style>
