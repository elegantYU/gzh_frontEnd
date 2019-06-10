<template>
  <div class="car_wrapper">
    <div class="car_container">
      <h6>{{ place }}</h6>
      <ul>
        <li
          class="car_item"
          v-for="(v, i) in v_list"
          :key="i"
        >
          <div class="car_input">
            <label>型号</label>
            <p>{{ v.vehicleType }}</p>
          </div>
          <div class="car_input">
            <label>种类</label>
            <p>{{ v.vehicleStructure }}</p>
          </div>
          <div class="car_input">
            <label>车牌号</label>
            <p>{{ v.vehicleNumber }}</p>
          </div>
          <div class="car_input">
            <label>状态</label>
            <p :class="!v.status ? '' : 'house_unchecked'">{{ f_status(v) }}</p>
          </div>
        </li>
      </ul>
      <div class="car_submit" @click="f_submit">添加车辆认证</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Car',
  data () {
    return {
      v_list: []
    }
  },
  computed: {
    place () {
      return this.$store.state.village
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    f_getList () {
      let params = {
        villageCode: this.$store.state.villageCode,    // 小区id
        village: '',        // 小区名
        memberId: this.$store.state.user.id,
        pageNum : 1,
        pageSize: 10000
      }

      this.$http
        .get('/admin/member/car/my/cars', { params })
        .then(res => {
          this.v_list = res.data.data
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
    f_submit () {
      this.$router.push({ name: 'carAdd' })
    }
  }
}
</script>

<style lang='scss' scoped>
.car_wrapper{
  background-color: #efeff4;
  height: 100%;
  .car_container{
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
      .car_item{
        width: 7rem;
        height: 3.6rem;
        border-radius: 0.15rem;
        background-color: white;
        box-shadow: 0.1rem 0 0.3rem 0 rgba(0, 0, 0, 0.05);
        margin-bottom: 0.5rem;
        .car_input{
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
    .car_submit{
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
