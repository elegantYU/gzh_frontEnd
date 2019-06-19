<template>
  <div class="index_wrapper">
    <div class="index_container">
        <div class="index_swipe">
        <span class="index_map" @click="f_switchVillage"><i></i>{{ place }}</span>
        <span class="index_notice" @click="f_viewNotice"></span>
        <mu-carousel hide-controls>
          <mu-carousel-item v-for="(v, i) in v_banner" :key="i">
            <img :src="v" alt="">
          </mu-carousel-item>
        </mu-carousel>
      </div>
      <div class="index_tools">
        <h5>智慧小区</h5>
        <ul class="index_tools_panel clearfix">
          <div>
            <li
              v-for="(v, i) in v_tools1"
              :key="i"
              @click="f_moveto(v)"
            >
              <img :src="v.icon" alt="">
              <span>{{ v.msg }}</span>
            </li>
          </div>
          <div>
            <li
              v-for="(v, i) in v_tools2"
              :key="i"
              @click="f_moveto(v)"
            >
              <img :src="v.icon" alt="">
              <span>{{ v.msg }}</span>
            </li>
          </div>
        </ul>
      </div>
      <div class="index_topic">
        <h5>小区头条<span @click="f_moreTopic">更多<i></i></span></h5>
        <ul class="index_topic_item">
          <li
            v-for="(v, i) in v_topic"
            :key="i"
            @click="f_moveTopic(v)"
          >
            <div class="index_topic_item_left">
              <p>{{ v.title }}</p>
              <div class="index_topic_item_detail">
                <span>{{ v.sourceName }}  {{ v.type === 1 ? '政策法规' : v.type === 2 ? '通知公告' : '热门活动' }}</span>
                <ul class="clearfix">
                  <li :class="v.hasBrowse ? 'index_topic_icon_active' : ''"><i></i>{{ v.rate }}</li>
                  <li :class="v.hasComment ? 'index_topic_icon_active' : ''"><i></i>{{ v.comment }}</li>
                  <li :class="v.hasCollect ? 'index_topic_icon_active' : ''"><i></i>{{ v.collect }}</li>
                </ul>
              </div>
            </div>
            <div class="index_topic_img">
              <img :src="v.img[0]" alt="" v-if='v.img'>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      v_banner: [],
      v_tools1: [
        { msg: '物业报修', path: 'myRepair', icon: require('../../assets/images/index/index_wy.png') },
        { msg: '访客通行', path: '', icon: require('../../assets/images/index/index_fk.png') },
        { msg: '环境秩序', path: 'environment', icon: require('../../assets/images/all/2.png') },
        { msg: '失物招领', path: 'lostFound', icon: require('../../assets/images/index/index_sw.png') }
      ],
      v_tools2: [
        { msg: '智慧停车', path: 'smartPark', icon: require('../../assets/images/index/index_zh.png') },
        { msg: '生活超市', path: 'shop', icon: require('../../assets/images/index/index_sh.png') },
        { msg: '邻里共享', path: 'neighbor', icon: require('../../assets/images/index/index_ll.png') },
        { msg: '全部', path: 'all', icon: require('../../assets/images/index/index_qb.png') }
      ],
      v_topic: [],
      v_noHouse: false,
    }
  },
  computed: {
    place () {
      return this.$store.state.village
    }
  },
  mounted () {
    this.f_getBanner()
    this.f_getTopic()
    console.log(this.$store.state)
  },
  methods: {
    f_switchVillage () {
      console.log('切换小区')
      this.$router.push({ name: "pickads" })
    },
    f_viewNotice () {
      console.log('打开通知页面')
    },
    f_moveto (v) {
      this.$router.push({ name: v.path })
    },
    f_getTopic () {
      let params = {
        memberId: this.$store.state.user.id,
        villageCode: this.$store.state.villageCode,
        start: 1,
        size: 5
      }

      this.$http
        .get('/admin/event/page', { params })      
        .then(({data: {rows: res}}) => {
          console.log('res', res)
          if (res) {
            this.v_topic = [...res]
          }
        })
    },
    f_moveTopic (v) {
      console.log(v)
      this.$router.push({ name: 'topicDetail', query: { id: v.id }})
    },
    f_moreTopic () {
      this.$router.push({ name: 'topic' })
    },
    f_getBanner () {
      this.$http
        .get('/admin/mindex/banner/bannerList', {
          params: {
            pageNum: 1,
            pageSize: 3
          }
        })
        .then(res => {
          this.v_banner = res.data.data
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.index_wrapper{
  height: 100%;
  background-color: #efeff4;
  .index_container{
    padding-bottom: 1.2rem;
    background-color: #efeff4;
    .index_swipe{
      height: 3.1rem;
      position: relative;
      .mu-carousel{
        height: 100%;
        .mu-carousel-item{
          background-color: transparent;
          img{
            width: 100%;
          }
        }
      }
      .index_map{
        position: absolute;
        top: 0.1rem;
        left: 0.3rem;
        width: auto;
        height: 0.21rem;
        z-index: 1;
        font-size: 0.18rem;
        line-height: 0.21rem;
        color: #fff;
        i{
          display: inline-block;
          width: 0.16rem;
          height: 0.21rem;
          background-image: url('../../assets/images/index/index_map.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          margin-right: 0.1rem;
          vertical-align: middle;
        }
      }
      .index_notice{
        position: absolute;
        top: 0.1rem;
        right: 0.3rem;
        width: 0.23rem;
        height: 0.26rem;
        z-index: 1;
        background-image: url('../../assets/images/index/index_notice.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        cursor: pointer;
        &.index_noticed{
          background-image: url('../../assets/images/index/index_noticed.png');
        }
      }
    }
    .index_tools{
      padding: 0.2rem 0.3rem;
      h5{
        font-size: 0.3rem;
        font-weight: bold;
        margin-bottom: 0.15rem;
        text-align: left;
      }
      .index_tools_panel{
        padding: 0.32rem 0.28rem 0.22rem;
        background-color: #fff;
        border-radius: 0.05rem;
        box-shadow: 0 4px 10px rgba(124, 134, 138, 0.2);
        div{
          display: flex;
          justify-content: space-between;
          li{
            width: 1.2rem;
            margin-bottom: 0.33rem;
            text-align: center;
            cursor: pointer;
            img{
              width: 0.88rem;
              height: 0.82rem;
              margin-bottom: 0.22rem;
            }
            span{
              display: block;
              font-size: 0.22rem;
            }
          }
        }
      }
    }
    .index_topic{
      padding: 0.2rem 0.3rem;
      h5{
        font-size: 0.3rem;
        font-weight: bold;
        margin-bottom: 0.15rem;
        text-align: left;
        span{
          float: right;
          color: #999;
          font-size: 0.24rem;
          font-weight: normal;
          cursor: pointer;
          i{
            display: inline-block;
            width: 0.1rem;
            height: 0.2rem;
            background-image: url('../../assets/images/index/index_more.png');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center center;
            margin-left: 0.1rem;
          }
        }
      }
      .index_topic_item{
        &>li{
          height: 1.5rem;
          padding: 0.2rem;
          padding-right: 0.1rem;
          background-color: #fff;
          box-sizing: border-box;
          border-left: 0.03rem solid #ff8d3a;
          border-radius: 0.05rem;
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
              display: flex;
              justify-content: space-between;
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
                      background-image: url('../../assets/images/index/index_view.png');
                    }
                    &.index_topic_icon_active{
                      color: #58c3fb;
                      i{
                        background-image: url('../../assets/images/index/index_viewed.png');
                      }
                    }
                  }
                  &:nth-of-type(2){
                    i{
                      background-image: url('../../assets/images/index/index_comment.png');
                    }
                    &.index_topic_icon_active{
                      color: #fbbc58;
                      i{
                        background-image: url('../../assets/images/index/index_commented.png');
                      }
                    }
                  }
                  &:nth-of-type(3){
                    i{
                      background-image: url('../../assets/images/index/index_collect.png');
                    }
                    &.index_topic_icon_active{
                      color: #ff6c73;
                      i{
                        background-image: url('../../assets/images/index/index_collected.png');
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
  }
}
</style>
