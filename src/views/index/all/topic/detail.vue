<template>
  <div class="td_wrapper">
    <div class="td_container">
      <h6>热门活动标题</h6>
      <div class="td_header_detail">
        <span>来源: 物业</span>
        <span>2019-01-01 00:00:00</span>
        <ul>
          <li><i></i>320</li>
          <li><i></i>320</li>
        </ul>
      </div>
      <img src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-96206.jpg" alt="">
      <div class="td_content">
        这里都是话这里都是话这里都是话这里都是话这里都是话这里都是话这里都是话这里都是话这里都是话这里都是话这里都是话这里都是话这里都是话这里都是话这里都是话
      </div>
      <div class="td_comment">
        <div class="td_comment_header">
          <span>全部评论（10条）</span>
          <span>评论</span>
        </div>
        <div class="td_comment_list">
          <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_loadAll">
            <mu-list>
              <template v-for="(v, i) in v_comments">
                <div
                  :key="i"
                  class="td_comment_item"
                >
                  <div class="td_comment_item_left">
                    <div class="td_comment_avatar">
                      <img src="" alt="">
                    </div>
                  </div>
                  <div class="td_comment_item_right">
                    <div class="td_comment_right_top">
                      <span>贝贝</span>
                      <i></i>
                    </div>
                    <div class="td_comment_right_bottom">
                      17-05-21 15:32
                    </div>
                    <div class="td_comment_content">
                      这是xxx的评论啊苏打水大所大所大所大所大所所啊苏打水大所大所多
                    </div>
                    <div class="td_comment_content_list">
                      <!-- 品论 -->
                    </div>
                  </div>
                </div>
              </template>
            </mu-list>
          </mu-load-more>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      v_comments: []
    }
  }
}
</script>

<style lang='scss' scoped>
.td_wrapper{
  background-color: #efeff4;
  height: 100%;
  .td_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    h6{
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.32rem;
    }
    .td_header_detail{
      height: 0.42rem;
      display: flex;
      padding: 0 0.3rem;
      align-items: center;
      justify-content: space-between;
      font-size: 0.22rem;
      ul{
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
    img{
      width: 100%;
    }
    .td_content{
      padding: 0.2rem 0.3rem;
      background-color: white;
      font-size: 0.22rem;
      text-align: left;
      text-indent: 2em;
      line-height: 1.75em;
    }
    .td_comment{
      .td_comment_header{
        height: 0.62rem;
        padding: 0 0.3rem;
        background-color: #efeff4;
        line-height: 0.62rem;
        font-size: 0.24rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          &:last-of-type{
            width: 0.77rem;
            height: 0.37rem;
            line-height: 0.37rem;
            border-radius: 0.04rem;
            border: 1px solid #e9e8e8;
            background-color: #fff;
            font-size: 0.18rem;
            color: #f64682;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
