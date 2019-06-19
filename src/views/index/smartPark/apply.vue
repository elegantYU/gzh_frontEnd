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
        <span>{{ v.code }}</span>
        <span>{{ f_formatType(v) }}</span>
        <span @click="f_getOrder(v)" :class="{'active': v.sts == '1'}">{{ f_sts(v) }}</span>
      </li>
    </ul>
    <div class="popup" v-if="false">
      <popup></popup>
    </div>
  </div>
</template>

<script>
import Popup from "./popup.vue"

export default {
  components: {
    Popup
  },
  data () {
    return {
      v_list: []
    }
  },
  methods: {
    async f_getList () {
      const params = {
        userId: this.$store.state.user.id,
        villageCode: this.$store.state.villageCode
      }

      const { data: { data }} = await this.$http
        .get('/admin/member/parking/lot/surplus/lots', { params })
      
      this.v_list.push(...data)
    },
    f_formatType (v) {
      switch (v.type) {
        case 'A':
          return '孝心车位'
          break
        case 'B':
          return '访客车位'
          break
        case 'C':
          return '孝心车位'
          break
      }
    },
    f_sts (v) {
      if (v.sts == '0') {
        return '立即预约'
      } else {
        return '解锁'
      }
    },
    f_getOrder (v) {
      if (v.sts == '0') {
        const params = {
          userId: this.$store.state.user.id,
          userName: this.$store.state.user.name,
          startTime: '',
          id: v.id
        }

        this.$http
          .get('/admin/member/parking/lot/applyParkingLot', { params })
          .then(({ data: { success }}) => {
            success && this.$toast('预约成功')
          })
      } else {
        
      }
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
      &:not(1){
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
}
</style>
