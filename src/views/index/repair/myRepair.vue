<template>
  <div class="myRep_wrapper">
    <div class="myRep_content">
      <ul class="myRep_nav clearfix">
        <li class="active">我的报修单</li>
        <li @click="f_moveRepair">我要报修</li>
      </ul>
      <ul class="myRep_list">
        <li
          v-for="(v, i) in v_repairList"
          :key="i"
          @click="f_detail"
        >
          <div class="myRep_list_left">
            <h6>{{ v.name }}</h6>
            <p>{{ v.detail }}</p>
            <div class="myRep_list_left_detail clearfix">
              <span class="myRep_detail_time">{{ v.time }}</span>
              <span class="myRep_detail_status">{{ v.status }}</span>
            </div>
          </div>
          <img :src="v.image" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyRepair',
  data () {
    return {
      v_repairList: [
        {
          name: '厨房水管破裂',
          detail: '这是发生什么卡了？你家的排粪管炸了!我的天哪，屎尿喷的哪哪都是，赶紧回去看看吧，到屎里把人捞出来',
          time: '2019-01-01 15:00:00',
          status: '已完成',
          image: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-94316.jpg'
        },
        {
          name: '厨房水管破裂',
          detail: '这是发生什么卡了？你家的排粪管炸了!我的天哪，屎尿喷的哪哪都是，赶紧回去看看吧，到屎里把人捞出来',
          time: '2019-01-01 15:00:00',
          status: '已完成',
          image: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-94316.jpg'
        },
        {
          name: '厨房水管破裂',
          detail: '这是发生什么卡了？你家的排粪管炸了!我的天哪，屎尿喷的哪哪都是，赶紧回去看看吧，到屎里把人捞出来',
          time: '2019-01-01 15:00:00',
          status: '已完成',
          image: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-94316.jpg'
        },
        {
          name: '厨房水管破裂',
          detail: '这是发生什么卡了？你家的排粪管炸了!我的天哪，屎尿喷的哪哪都是，赶紧回去看看吧，到屎里把人捞出来',
          time: '2019-01-01 15:00:00',
          status: '已完成',
          image: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-94316.jpg'
        }
      ]
    }
  },
  methods: {
    f_detail () {
      console.log('保修单的详情')
    },
    f_moveRepair () {
      console.log('我要报修')
      this.$router.push({ name: 'willrepair' })
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
            }
          }
        }
        img{
          float: left;
          width: 1.6rem;
          height: 1.43rem;
        }
      }
    }
  }
}
</style>
