<template>
  <div class="mo_wrapper">
    <div class="mo_container">
      <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_loadAll">
        <mu-list>
          <template v-for="(v, i) in v_list">
            <div class="mo_item" :key="i">
              <div class="mo_item_header">
                <p><i></i>{{ v.sellerName }} ></p>
                <span>{{ f_status(v.orderState) }}</span>
              </div>
              <div class="mo_item_content" @click="f_comment(v)">
                <div class="mo_item_img">
                  <img :src="v.productSku" alt="">
                </div>
                <div class="mo_item_desc">
                  <h6><span>{{ v.productName }}</span><span>￥ {{ v.moneyPrice }}</span></h6>
                  <div class="mo_item_desc_content">
                    <div class="mo_item_desc_detail">
                      {{ v.specInfo }}
                    </div>
                    <div class="mo_item_desc_count">
                      x {{ v.number }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="mo_item_sub">
                <span>共计{{ v.productNum }}件商品</span>
                <span>合计：￥{{ v.totalPrice }}</span>
              </div>
              <div class="mo_item_footer">
                <div class="mo_item_btn active" v-show="v.orderState === 2" @click="f_updateState(v)">
                  确认收货
                </div>
                <div class="mo_item_btn" v-show="v.orderState < 2" @click="f_cancel(v)">
                  取消订单
                </div>
                <div class="mo_item_btn" v-show="v.orderState > 3" @click="f_delete(v)">
                  删除订单
                </div>
                <div class="mo_item_btn active" v-show="v.orderState == 4" @click="f_comment(v)">
                  评价
                </div>
              </div>
            </div>
          </template>
        </mu-list>
      </mu-load-more>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_list: [],
      v_pageNum: 1,
      v_loading: false,
      v_loadAll: false
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    async f_getList () {
      const params = {
        memberId: this.$store.state.user.id,
        pageNum: this.v_pageNum,
        pageSize: 10
      }

      const { data: { data: result } } = await this.$http
        .get('/admin/order/orders/list', { params })

      if (!result.length) {
        this.v_loadAll = true
      } 
      this.v_list.push(...result)
      console.log('订单', result)
    },
    f_load () {
      this.v_loading = true
      setTimeout(() => {
        this.v_loading = false
        this.v_pageNum++
        this.f_getList()
      }, 1000)
    },
    f_status (v) {
      switch (v) {
        case 1:
          return '进行中'
          break
        case 2:
          return '待收货'
          break
        case 4:
          return '待评价'
          break
        case 5:
          return '已取消'
          break
        case 6:
          return '已完成'
          break
      }
    },
    async f_delete (v) {
      const params = {
        orderSn: v.orderSn
      }

      const f = confirm('确认删除吗?')
      if (f) {
        const { data: { success } } = await this.$http
          .get('/admin/order/orders/delete', { params })

        success && this.$toast('已删除')
        this.v_list = []
        this.f_getList()
      }
    },
    async f_cancel (v) {
      const params = {
        orderSn: v.orderSn
      }
      
      const f = confirm('确认取消吗?')
      if (f) {
        const { data: { success } } = await this.$http
          .get('/admin/order/orders/cancel', { params })
        
        success && this.$toast('已取消')
        this.v_list = []
        this.f_getList()
      }
    },
    f_comment (v) {
      this.$router.push({ name: 'orderList', query: { orderSn: v.orderSn, orderState: v.orderState, item: v } })
    },
    // 更新订单状态
    async f_updateState (v) {
      v.orderState = 4
      const params = {
        orderSn: v.orderSn,
        state: 4
      }

      const { data } = await this.$http
        .get('/admin/order/orders/updateState', { params })

    }
  }
}
</script>

<style lang='scss' scoped>
.mo_wrapper{
  background-color: #efeff4;
  height: 100%;
  .mo_container{
    background-color: #efeff4;
    padding: 0.3rem 0.3rem 1.2rem;
    .mo_item{
      width: 100%;
      height: 3.8rem;
      border-radius: 0.15rem;
      background-color: #fff;
      margin-bottom: 0.2rem;
      text-align: left;
      .mo_item_header{
        width: 100%;
        height: 0.7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.3rem;
        padding: 0 0.2rem;
        p{
          display: inline-block;
          color: #333;
          i{
            display: inline-block;
            width: 0.32rem;
            height: 0.3rem;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: 50%;
            background-image: url('../../../assets/images/shop/store.png');
            margin-right: 0.2rem;
            vertical-align: bottom;
          }
        }
        span{
          color: #f64682;
        }
      }
      .mo_item_content{
        width: 100%;
        height: 1.8rem;
        display: flex;
        align-items: center;
        background-color: #f5f5f5;
        padding: 0 0.2rem;
        .mo_item_img{
          width: 1.8rem;
          height: 1.8rem;
          display: flex;
          align-items: center;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
        .mo_item_desc{
          flex: 1;
          padding-left: 0.2rem;
          h6{
            display: flex;
            width: 100%;
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 0.28rem;
            color: #282828;
            justify-content: space-between;
            align-items: center;
            span:first-of-type{
              width: 3.3rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .mo_item_desc_content{
            display: flex;
            width: 100%;
            height: 1.2rem;
            margin-bottom: 0.2rem;
            color: #858585;
            font-size: 0.22rem;
            justify-content: space-between;
            align-items: flex-start;
            .mo_item_desc_detail{
              width: 3.3rem;
              height: 100%;
              line-height: 1.5em;
              text-overflow: -o-ellipsis-lastline;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-flex;
              -webkit-line-clamp: 2;
              /*! autoprefixer: off */
              -webkit-flex-orient: vertical;
            }
            .mo_item_desc_count{
              display: inline-block;
              padding: 0.08rem 0;
            }
          }
        }
      }
      .mo_item_sub{
        padding: 0 0.2rem;
        height: 0.4rem;
        margin-bottom: 0.3rem;
        font-size: 0.24rem;
        color: #282828;
        span{
          float: right;
          line-height: 0.6rem;
          margin-left: 0.25rem;
        }
      }
      .mo_item_footer{
        display: flex;
        flex-direction: row-reverse;
        .mo_item_btn{
          width: 1rem;
          height: 0.4rem;
          color: #999999;
          font-size: 0.18rem;
          line-height: 0.4rem;
          border-radius: 0.2rem;
          border: 1px solid #999;
          text-align: center;
          margin: 0 0.1rem;
          &.active {
            border: 1px solid #f64682;
            color: #f64682;
          }
        }
      }
    }
  }
}
</style>
