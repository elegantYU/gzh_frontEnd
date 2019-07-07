<template>
  <div class="sa_wrapper">
    <ul>
      <li class="sa_first">
        <span>车位编号</span>
        <span>车位类型</span>
        <span>操作</span>
      </li>
      <li
        v-for="(v, i) in v_list"
        :key="i"
        class="sa_item"
      >
        <span>{{ v.code }}</span>
        <span>{{ f_formatType(v) }}</span>
        <span :class="{'active': v.sts == '1'}" @click="f_getOrder(v)">{{ f_sts(v) }}</span>
      </li>
    </ul>
    <popup v-if="v_pop" :parkInfo='v_currentItem' @order="f_closePop" @close="f_closePop"></popup>
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
      v_list: [],
      v_currentItem: {},
      v_pop: false,
      v_pageNum: 1,
      v_pageSize: 50
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    async f_getList () {
      const params = {
        villageCode: this.$store.state.villageCode, // this.$store.state.villageCode,
        userId: this.$store.state.user.id,
        page: this.v_pageNum,
        rows: this.v_pageSize
      }

      const { data: { data }} = await this.$http
        .get('/admin/member/parking/lot/systemParkingLot', { params })
      
      this.v_list.push(...data.list)
    },
    f_formatType (v) {
      switch (v.type) {
        case 'B':
          return '访客车位'
          break
        default:
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
        this.v_currentItem = v
        this.v_pop = true
      } else {
        const params = {
          id: v.id,
          type: 2
        }

        this.$http
          .get('/admin/lock/unLock', { params })
          .then(({ data }) => {
            if (data.success) {
              this.$toast('解锁成功')
            } else {
              this.$toast('解锁失败')
            }
            this.v_list = []
            this.f_getList()
          })
      }
    },
    f_closePop () {
      this.v_list = []
      this.f_getList()
      this.v_pop = false
    }
  }
}
</script>

<style lang='scss' scoped>
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
        &:first-of-type{
          display: block;
          width: 2.1rem;
          text-align: left;
        }
        &:last-of-type{
          width: 1.2rem;
        }
      }
      &.sa_item{
        span{
          &:last-of-type{
            display: block;
            height: 0.6rem;
            border-radius: 0.06rem;
            border: 2px solid #1aad19;
            color: #1aad19;
            line-height: 0.6rem;
            cursor: pointer;
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
