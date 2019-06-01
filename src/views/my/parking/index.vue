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
            <p>{{ v.position }}</p>
          </div>
          <div class="park_input">
            <label>类型</label>
            <p>{{ v.lotType }}</p>
          </div>
          <div class="park_input">
            <label>车位锁</label>
            <p>{{ v.lockType }}</p>
          </div>
          <div class="park_input">
            <label>有效期</label>
            <p>{{ v.validityDate }}</p>
          </div>
          <div class="park_input">
            <label>状态</label>
            <p :class="!v.status ? '' : 'house_unchecked'">{{ f_status(v) }}</p>
          </div>
        </li>
      </ul>
      <div class="park_submit" @click="f_addItem">添加车位认证</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Park',
  data () {
    return {
      v_list: []
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    f_getList () {
      let params = {
        memberId: this.$store.state.user.id,
        pageNum: 1,
        pageSize: 10000,
        villageCode: this.$store.state.villageCode,       // 小区id
      }

      this.$http
        .get('/admin/member/parking/lot/my/lots', { params })
        .then(res => {
          res.data.data.map(v => this.v_list.push(v))
        })
    },
    f_status (v) {
      switch (v.status) {
        case 0:
          return '未认证'
          break
        case 1:
        case 2:
          return '已认证'
          break
      }
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
