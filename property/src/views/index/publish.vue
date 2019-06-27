<template>
  <div class="pub_wrapper">
    <div class="pub_container">
      <img src="../../assets/images/index/publish_banner.png" alt="">
      <div class="pub_list">
        <div
          v-for="(v, i) in v_list"
          :key="i"
          @click="f_move(i)"
        >
          <img :src="v.img" alt="">
          <span>{{ v.name }}</span>
        </div>
      </div>
      <div class="pub_cancel">
        <span @click="f_back">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Publish',
  data () {
    return {
      v_list: [
        { path: 'myRepair', img: require('../../assets/images/index/index_wy.png'), name: '物业报修' },
        { path: 'environment', img: require('../../assets/images/all/8.png'), name: '环境秩序' }
      ]
    }
  },
  methods: {
    f_move (i) {
      this.$router.push({ name: this.v_list[i].path })
    },
    f_back () {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style lang='scss' scoped>
.pub_wrapper{
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .pub_container{
    width: 6rem;
    height: 6rem;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    img{
      width: 100%;
      margin-bottom: 0.5rem;
    }
    .pub_list{
      width: 3rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div{
        width: 1.2rem;
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
    .pub_cancel{
      position: absolute;
      width: 100%;
      bottom: 0.7rem;
      left: 0;
      display: flex;
      justify-content: center;
      span{
        display: block;
        font-size: 0.17rem;
        color: #e52c77;
        position: absolute;
        cursor: pointer;
        &::before{
          position: absolute;
          left: 50%;
          top: -0.5rem;
          transform: translateX(-50%);
          content: '';
          width: 0.28rem;
          height: 0.28rem;
          background-image: url('../../assets/images/index/publish_cancel.png');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center center;
        }
      }
    }
  }
}
</style>
