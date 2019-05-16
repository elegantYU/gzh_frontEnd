<template>
  <div class="wp">
    <p class="title">常用服务</p>
    <div class="serve-wp">
      <div class="serve-li" v-for="(d, i) in data" :key="d.id">
        <img class="icon" :src="require(`@/assets/images/all/${i+1}.png`)" alt="">
        <p class="txt">{{d}}</p>
      </div>
    </div>
    <p class="title">更多服务</p>
    <div class="serve-wp">
      <div class="serve-li" v-for="(d, i) in moreServe" :key="d.id">
        <img class="icon" :src="require(`@/assets/images/all/more${i+1}.png`)" alt="">
        <p class="txt">{{d}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'allIndex',
  data () {
    return {
      data: ['物业报修', '访客通行', '联系物业', '智慧停车', '停车服务', '预约服务', '车位锁', '环境秩序', '智慧政务', '生活超市', '邻里共享', '失物招领', '小区头条', '宠物登记'],
      moreServe: ['诉求建议', '快递服务']
    }
  }
}
</script>
<style lang="scss" scoped>
.wp {
  background: #efeff4;
  width: 100%;
  height: 100%;
}
.title {
  font-size: 0.3rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #000;
}
.serve-wp {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  padding-left: 0.25rem;
  padding-top: 0.3rem;
  .icon {
    width: 0.88rem;
    margin-bottom: 0.15rem;
  }
  .serve-li {
    width: 1.74rem;
    margin-bottom: 0.3rem;
  }
  .txt {
    font-size: 0.22rem;
  }
}
</style>
