<template>
  <div class="wp">
    <p class="title">常用服务</p>
    <div class="serve-wp">
      <div class="serve-li" v-for="(d, i) in data" :key="d.id" @click="switchRoute(d)">
        <img class="icon" :src="require(`@/assets/images/all/${i+1}.png`)" alt="">
        <p class="txt">{{d}}</p>
      </div>
    </div>
    <p class="title">更多服务</p>
    <div class="serve-wp">
      <div class="serve-li" v-for="(d, i) in moreServe" :key="d.id" @click="switchRoute(d)">
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
      data: ['物业报修', '环境秩序', '智慧停车', '停车服务', '邻里共享', '失物招领', '车位锁', '访客通行', '生活超市', '宠物登记', '智慧政务', '小区头条', '联系物业' ],
      moreServe: ['诉求建议', '快递服务']
    }
  },
  methods: {
    switchRoute (d) {
      switch(d)
      {
        case '物业报修':
          this.$router.push({name: 'myRepair'})
          break;
        case '访客通行':
          this.$router.push({name: 'visitorpass'})
          break;
        case '联系物业':
          this.$router.push({name: 'contact'})
          break;
        case '智慧停车':
          this.$router.push({name: 'smartPark'})
          break;
        case '停车服务':
          this.$router.push({name: 'parkService'})
          break;
        case '车位锁':
          this.$router.push({name: 'parkLock'})
          break;
        case '环境秩序':
          this.$router.push({name: 'environment'})
          break;
        case '智慧政务':
          this.$router.push({name: 'affairs'})
          break;
        case '生活超市':
          this.$router.push({name: 'shop'})
          break;
        case '邻里共享':
          this.$router.push({name: 'neighbor'})
          break;
        case '失物招领':
          this.$router.push({name: 'lostFound'})
          break;
        case '小区头条':
          this.$router.push({name: 'topic'})
          break;
        case '宠物登记':
          this.$router.push({name: 'pet'})
          break;
        case '诉求建议':
          this.$router.push({name: 'appealList'})
          break;
        case '快递服务':
          window.location.href = 'https://m.kuaidi100.com/app/?coname=chenjunqi'
          break;
      }
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
  // display: flex;
  // flex-wrap: wrap;
  width: 6.96rem;
  margin: 0 auto;
  background: #fff;
  padding-top: 0.3rem;
  text-align: left;
  .icon {
    width: 0.88rem;
    margin-bottom: 0.15rem;
  }
  .serve-li {
    display: inline-block;
    width: 1.74rem;
    margin-bottom: 0.3rem;
    text-align: center;
  }
  .txt {
    font-size: 0.22rem;
  }
}
</style>
