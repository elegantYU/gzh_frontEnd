<template>
  <div class="affairs">
    <div  class="affairs-cont">
      <div v-for="(item,index) in num" class="affairs-cont-lie" @click="jump">
        <p>{{index+1}}、</p>
        <p>{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      num: ['社会保险职工参保信息变更登记服务指南', '申请补缴基本养老保险费服务指南', '参保单位查询打印社会保险信息服务指南', '参保单位查询打印社会保险信息服务指南']
    }
  },
  methods: {
    jump () {
      this.$router.push({ name:"detailss"})
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
      font-size: 0.2rem;
    }
  }
}
</style>
