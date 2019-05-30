
<template>
  <div class="list">
    <div class="content clearfix">
      <div class="lt">
        <p class="title">{{data.title}}</p>
        <p class="ct">{{data.centent}}</p>
        <p class="btm clearfix">
          <span class="time">{{data.createTime}}</span>
          <span class="type">{{ type }}</span>
        </p>
      </div>
      <img :src="data.imgUrl" alt="" class="rtimg">
    </div>
  </div>
</template>
<script>
export default {
  name: 'list',
  props: {
    data: {
      type: Object,
      // default: () => {
      //   return {
      //     title: '1幢2单元楼下绿化带破损严重绿化带破损严重',
      //     ct: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      //     time: '2019-01-01 15:00:00',
      //     type: '绿化损坏',
      //     imgsrc: require('@/assets/images/environment/bg.png')
      //   }
      // }
    }
  },
  computed: {
    type () {
      switch (this.data.classify) {
        case 1:
          return '垃圾散乱'
          break
        case 2:
          return '绿化损坏'
          break
        case 3:
          return '高空抛物'
          break
        case 4:
          return '井盖缺失'
          break
        case 5:
          return '路面破损'
          break
        case 6:
          return '违章搭建'
          break
        case 7:
          return '违规停车'
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  background: #fff;
  text-align: left;
  margin-bottom: 0.2rem;
  .content {
    padding: 0.2rem 0.3rem;
  }
  .lt {
    width: 5.07rem;
    float: left;
  }
  .rtimg {
    float: right;
  }
  .title {
    font-size: 0.34rem;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.05rem;
  }
  .ct {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #a9a9a9;
    font-size: 0.26rem;
    line-height: 0.4rem;
    margin-bottom: 0.05rem;
  }
  .btm {
    color: #000;
    font-size: 0.2rem;
  }
  .time {
    float: left;
  }
  .type {
    float: right;
  }
  .rtimg {
    width: 1.62rem;
    height: 1.43rem;
  }
}
</style>
