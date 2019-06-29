<template>
  <div class="affairs">
    <div  class="affairs-cont">
      <div v-for="(v,i) in num" class="affairs-cont-lie" :key="i" @click="jump(v)">
        <p>{{i+1}}、</p>
        <p>{{v.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: "index",
  data() {
    return {
      num: []
    }
  },
  mounted() {
    this.f_addair()
  },
  methods: {
    f_addair() {
      const params = {
        memberId: this.$store.state.user.id,
        type: 3,
        villageCode: '330105001001003',
        pageNum: 1,
        pageSize: 6
      }

      this.$http.get('/obtain/notice/pageList', {params})
        .then(res => {
          console.log(res.data)
          this.num = res.data.data
        })
    },
    jump(v) {
      console.log(v)
      this.$router.push({name: "detailss", query: v})
    }
  }
}
</script>

<style lang="scss" scoped>
.affairs{
  background-color: #efeff4;
  height: 100vh;
  .affairs-cont{
    width: 80%;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    .affairs-cont-lie{
      display: flex;
      margin-top: 0.2rem;
      font-size: 0.3rem;
    }
  }
}
</style>
