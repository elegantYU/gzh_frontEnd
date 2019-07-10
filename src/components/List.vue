
<template>
  <div class="list" @click="f_moveDetail">
    <div class="content clearfix">
      <div class="lt">
        <p class="title">{{data.title}}</p>
        <p class="ct">{{data.content}}</p>
        <p class="btm clearfix">
          <span class="time">{{ time }}</span>
          <span class="type">{{ type }}</span>
          <span class="status">{{ status }}</span>
        </p>
      </div>
      <img :src="img" alt="" class="rtimg">
    </div>
  </div>
</template>
<script>
export default {
  name: 'list',
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    time () {
      return this.data.createTime.substr(0, 16)
    },
    type () {
      switch (this.data.classify) {
        case '1':
          return '垃圾散乱'
          break
        case '2':
          return '绿化损坏'
          break
        case '3':
          return '高空抛物'
          break
        case '4':
          return '井盖缺失'
          break
        case '5':
          return '路面破损'
          break
        case '6':
          return '违章搭建'
          break
        case '7':
          return '违规停车'
          break
        case '8':
          return '宠物问题'
          break
        case '9':
          return '其它问题'
          break
      }
    },
    img () {
      const imgs = JSON.parse(this.data.imgUrl)
      return imgs.length && imgs[0]
    },
    status () {
      switch (this.data.status) {
        case "0":
          return '待处理'
          break
        case "1":
          return '处理中'
          break
        case "2":
          return '已完成'
          break
        case "3":
          return '已超时'
          break
        case "4":
          return '已督办'
          break
      }
    }
  },
  methods: {
    f_moveDetail () {
      this.$router.push({ name: 'godetail', query: { id: this.data.id } })
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
    font-weight: bold;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.05rem;
  }
  .ct {
    height: 0.8rem;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .rtimg {
    width: 1.62rem;
    height: 1.43rem;
  }
}
</style>
