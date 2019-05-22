<template>
  <div class="tn_wrapper">
    <div class="tn_container">
      <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_loadAll">
        <mu-list>
          <template v-for="(v, i) in v_topic">
            <div
              :key="i"
              @click="f_moveDetail(v)"
              class="th_list_item"
            >
              <div class="index_topic_item_left">
                <p>{{ v.title }}</p>
                <div class="index_topic_item_detail clearfix">
                  <span>{{ v.postBegin }}</span>
                  <span>来源</span>
                </div>
              </div>
              <div class="index_topic_img">
                <img :src="v.image" alt="">
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
  name: 'Notice',
  data () {
    return {
      v_topic: [],
      v_loading: false,
      v_loadAll: false,
      v_pageNum: 1
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    f_getList () {
      let params = {
        type: 2,
        pageNum: this.v_pageNum,
        pageSize: 10
      }

      this.$http
        .get('/obtain/notice/pageList', { params })
        .then(res => {
          if (res.data.data.length) {
            res.data.data.forEach(v => {
              v.postBegin = v.postBegin.split(' ')[0]
              this.v_topic.push(v) 
            })
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
    f_moveDetail (v) {
      this.$http
        .get('/obtain/notice/add', {
          params: {
            id
          }
        })
        .then(res => {
          console.log('增加流量')
        })
      this.$router.push({ name: 'topicDetail', query: { id: v.id }})
    }
  }
}
</script>

<style lang='scss' scoped>
.tn_wrapper{
  background-color: #efeff4;
  height: 100%;
  .tn_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    .th_list_item{
      height: 1.5rem;
      padding: 0.2rem 0.3rem 0.2rem 0.5rem;
      background-color: #fff;
      box-sizing: border-box;
      box-shadow: 0 4px 10px rgba(124, 134, 138, 0.2);
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
            &:last-of-type{
              float: right;
            }
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
                  background-image: url('../../../../assets/images/index/index_view.png');
                }
                &.index_topic_icon_active{
                  color: #58c3fb;
                  i{
                    background-image: url('../../../../assets/images/index/index_viewed.png');
                  }
                }
              }
              &:nth-of-type(2){
                i{
                  background-image: url('../../../../assets/images/index/index_comment.png');
                }
                &.index_topic_icon_active{
                  color: #fbbc58;
                  i{
                    background-image: url('../../../../assets/images/index/index_commented.png');
                  }
                }
              }
              &:nth-of-type(3){
                i{
                  background-image: url('../../../../assets/images/index/index_collect.png');
                }
                &.index_topic_icon_active{
                  color: #ff6c73;
                  i{
                    background-image: url('../../../../assets/images/index/index_collected.png');
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
