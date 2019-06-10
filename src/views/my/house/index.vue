<template>
  <div class="house_wrapper">
    <div class="house_container">
      <h6>{{ place }}</h6>
      <ul class="house_list">
        <li
          v-for="(v, i) in v_houseList"
          :key="i"
        >
          <div class="house_input">
            <label>身份</label>
            <p>{{ v.identityInformation }}</p>
          </div>
          <div class="house_input">
            <label>房屋信息</label>
            <p>{{ f_house(v) }}</p>
          </div>
          <div class="house_input">
            <label>认证状态</label>
            <p :class="!v.status ? '' : 'house_unchecked'">{{ f_status(v) }}</p>
          </div>
        </li>
      </ul>
      <div class="house_submit" @click="f_submit">添加房屋认证</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'House',
  data () {
    return {
      v_houseList: []
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
        memberId: this.$store.state.user.id,
        villageCode: this.$store.state.villageCode
      }

      this.$http
        .get('/admin/member/house/all', { params })
        .then(res => {
          if (res.data.data.length) {
            this.v_houseList = res.data.data.map(v => v)
            this.$store.state.house = this.v_houseList
          }

        })
    },
    f_house (v) {
      return `${v.building}${v.unit}${v.room}`
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
      this.$router.push({ name: 'houseAdd' })
    }
  }
}
</script>

<style lang='scss' scoped>
.house_wrapper{
  background-color: #efeff4;
  height: 100%;
  .house_container{
    padding-bottom: 1.2rem;
    background-color: #efeff4;
    h6{
      height: 0.9rem;
      color: #999;
      background-color: #fff;
      font-size: 0.36rem;
      line-height: 0.9rem;
    }
    .house_list{
      padding: 0.2rem 0.25rem 0;
      margin-bottom: 1rem;
      li{
        width: 7rem;
        height: 2.7rem;
        border-radius: 0.15rem;
        background-color: white;
        box-shadow: 0.1rem 0 0.3rem 0 rgba(0, 0, 0, 0.05);
        margin-bottom: 0.5rem;
        .house_input{
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
    .house_submit{
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
