<template>
  <div class="park_wrapper">
    <div class="park_container">
      <h6>康馨苑小区</h6>
      <ul>
        <li
          v-for="(v, i) in v_list"
          :key="i"
        >
          <div class="park_input">
            <label>车位编号</label>
            <p>{{ v.carNum }}</p>
          </div>
          <div class="park_input">
            <label>类型</label>
            <p>{{ v.type }}</p>
          </div>
          <div class="park_input">
            <label>车位锁</label>
            <p>{{ v.carLock }}</p>
          </div>
          <div class="park_input">
            <label>有效期</label>
            <p>{{ v.time }}</p>
          </div>
          <div class="park_input">
            <label>状态</label>
            <p>{{ v.status }}</p>
          </div>
        </li>
      </ul>
      <div class="park_submit" @click="f_addItem">添加房屋认证</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Park',
  data () {
    return {
      v_list: [
        { carNum: '军A000', type: '思想车', carLock: '0', time: '2019-01-01', status: '0' }
      ]
    }
  },
  methods: {
    f_getList () {
      this.$http
        .get('')
        .then(res => {
          console.log(res)
        })
    },
    f_addItem () {
      this.$router.push({ name: 'parkAdd' })
    }
  }
}
</script>

<style lang='scss' scoped>
.park_wrapper{
  background-color: #efeff4;
  height: 100%;
  .park_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    h6{
      height: 0.9rem;
      color: #999;
      background-color: #fff;
      font-size: 0.36rem;
      line-height: 0.9rem;
    }
    ul{
      padding: 0.2rem 0.25rem 0;
      margin-bottom: 1rem;
      li{
        width: 7rem;
        height: 4.5rem;
        border-radius: 0.15rem;
        background-color: white;
        box-shadow: 0.1rem 0 0.3rem 0 rgba(0, 0, 0, 0.05);
        margin-bottom: 0.5rem;
        .park_input{
          border-bottom: 1px solid #e5e5e5;
          height: 0.9rem;
          font-size: 0.34rem;
          padding: 0 0.4rem;
          display: flex;
          &:last-of-type{
            border: none;
          }
          label{
            width: 1.4rem;
            height: 100%;
            line-height: 0.9rem;
            color: #b2b2b2;
            text-align: left;
          }
          p{
            flex: 1;
            height: 100%;
            line-height: 0.9rem;
            text-align: right;
            &.house_unchecked{
              color: #0000ff;
            }
          }
        }
      }
    }
    .park_submit{
      border-radius: 0.15rem;
      line-height: 0.9rem;
      width: 7rem;
      height: 0.9rem;
      color: #f64682;
      font-size: 0.3rem;
      background-color: #fff;
      box-shadow: 0.1rem 0 0.3rem 0 rgba(0, 0, 0, 0.05);
      cursor: pointer;
      margin: 0 auto;
    }
  }
}
</style>
