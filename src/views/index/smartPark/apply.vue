<template>
  <div class="sa_wrapper">
    <ul>
      <li>
        <span>车位编号</span>
        <span>车位类型</span>
        <span>操作</span>
      </li>
      <li
        v-for="(v, i) in v_list"
        :key="i"
      >
        <span></span>
        <span></span>
        <span></span>
      </li>
    </ul>
    <div  class="popup">
      <popup></popup>
    </div>
  </div>
</template>

<script>
import Popup from "../all/carLock/popup";
export default {
  components: {Popup},
  data () {
    return {
      v_list: [

      ]
    }
  },
  methods: {
    f_getList () {

    }
  }
}
</script>

<style lang='scss' scoped>
  .popup{
    margin: auto;
  }
.sa_wrapper{
  background-color: #efeff4;
  ul{
    width: 100%;
    padding: 0.15rem 0.3rem 1.2rem;
    li{
      font-size: 0.24rem;
      width: 100%;
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 0.35rem;
      span{
        &:last-of-type{
          display: block;
          width: 1.2rem;
          height: 0.6rem;
          border-radius: 0.06rem;
          border: 2px solid #1aad19;
          color: #1aad19;
          line-height: 0.6rem;
          &.active{
            border: 2px solid #f64682;
            color: #f64682;
          }
        }
      }
    }
  }
}
</style>
