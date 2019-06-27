<template>
  <div class="sc_wrapper">
    <div class="sc_header">
      <span>共<b>{{ v_list.length }}</b>件宝贝</span>
      <span :class="v_delete ? 'active' : ''" @click="f_willDelete">管理</span>
    </div>
    <div class="sc_container">
      <div class="sc_content">
        <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_laodAll">
          <mu-list style="padding:0;">
            <template v-for="(v, i) in v_list">
              <div class="sc_list" :key="i" v-touch:long="f_deleteOne(i)">
                <div class="sc_list_check">
                  <i :class="v.active ? 'active' : ''" @click="f_checkOne(i)"></i>
                </div>
                <div class="sc_list_img">
                  <img :src="v.product && v.product.masterImg" alt="">
                </div>
                <div class="sc_list_detail">
                  <h6>{{ v.product && v.product.name1 }}</h6>
                  <div class="sc_list_detail_desc">{{  v.product && v.product.name1 }}</div>
                  <div class="sc_list_detail_footer">
                    <b>￥ {{ v.product && v.product.mallPcPrice }}</b>
                    <s v-if="v.product && v.product.marketPrice">{{ v.product && v.product.marketPrice }}</s>
                    <div class="sc_list_count">
                      <i @click="f_cutNum(i)">-</i><span>{{ v.count }}</span><i @click="f_addNum(i)">+</i>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </mu-list>
        </mu-load-more>
      </div>
    </div>
     <div class="sc_footer">
      <span @click="f_checkAll"><i :class="v_allChecked ? 'active' : ''"></i>全选</span>
      <p>合计：<b>￥ {{ allPrice }}</b></p>
      <button @click="f_orderAll">{{ v_delete ? '删除' : '下单' }}</button>
    </div>
  </div>
</template>

<script>
import throttle from '../../../utils/utils'

export default {
  data () {
    return {
      v_origin: {},
      v_list: [],
      v_start: 1,
      v_loading: false,
      v_laodAll: false,
      v_delete: false,
      v_allChecked: false
    }
  },
  computed: {
    allPrice () {
      const active  = this.v_list.filter(v => v.active)
      let pirce = 0
      active.map(v => {
        pirce += v.product.mallPcPrice * v.count
      })
      return pirce.toFixed(2)
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    async f_getList () {
      const params = {
        memberId: this.$store.state.user.id,
        villageCode: this.$store.state.villageCode,
        start: this.v_start,
        pageSize: 100
      }
      const { data: { data: result } } = await this.$http
        .get(`/admin/cart/list`, { params })

      this.v_laodAll = Object.keys(result).length > 0 ? false : true
      const r = Object.keys(result).reduce((acc, cur) => {
        const a = result[cur].map(v => {
          v['active'] = false
          return v
        })
        acc.push(...a)
        return acc
      }, [])
      this.v_origin = result
      this.v_list.push(...r)
    },
    f_load () {
      this.v_loading = true
      setTimeout(() => {
        this.v_loading = false
        this.v_start++
        this.f_getList()
      }, 1000)
    },
    f_checkOne (i) {
      this.v_list[i].active = !this.v_list[i].active
    },
    f_checkAll () {
      // 全选
      this.v_allChecked = !this.v_allChecked
      this.v_list.map(v => v.active = this.v_allChecked)
    },
    f_willDelete () {
      this.v_delete = !this.v_delete
    },
    f_deleteOne (i) {
      const _this = this
      return function (e, start, end) {
        const flag = confirm('是否删除?')
        if (flag) {
         _this.$http
            .post(`/admin/cart/del?id=${_this.v_list[i].id}`)
            .then(res => {
              if (res.data.success) {
                _this.v_list.splice(i, 1)
              } else {
                _this.$toast('网络错误')
              }
            })
        }
      }
    },
    async f_cutNum (i) {
      this.v_list[i].count--
      if (this.v_list[i].count === 0) {
        const f = confirm('是否删除?')
        if (f) {
          const { data: { success } } = await this.$http
            .post(`/admin/cart/del?id=${this.v_list[i].id}`)

          success && this.v_list.splice(i, 1)
        }
      } else {
        await this.$http
          .post(`/admin/cart/changeCart?id=${this.v_list[i].id}&num=-1`)
      }

    },
    async f_addNum (i) {
      if (this.v_list[i].product.productStock === this.v_list[i].count) {
        this.$toast('暂无库存')
        return
      }
      this.v_list[i].count++

      await this.$http
        .post(`/admin/cart/changeCart?id=${this.v_list[i].id}&num=1`)
    },
    f_orderAll () {
      let params
      if (this.v_delete) {
        //  删除
        const delArr = this.v_list.filter(v => v.active)
        if (delArr.length > 0) {
          const f = confirm('确认删除?')
          f && Promise.all(delArr.map(v => {
            params = { id: v.id }
            return this.$http
              .post('/admin/cart/del', params)
          }))
          .then(res => {
            this.$toast('删除完成')
            this.f_getList()
          })
        } else {
          this.$toast('无可删除商品')
        }
      } else {
        //  下单

        const orders = this.v_list.filter(v => v.active).map((v => {
          return {
            cartId: v.id,
            sellerId: v.sellerId,
            memberId: this.$store.state.user.id,
            memberName: this.$store.state.user.name,
            moneyProduct: (v.product.mallPcPrice * v.count).toFixed(2) * 1,
            mobile: this.$store.state.user.phoneNum,
            moneyPrice: v.product.mallPcPrice,
            productId: v.product.id,
            productName: v.product.name1,
            number: v.count,
            specInfo: v.product.name1,
            productSku: v.product.masterImg
          }
        }))
        console.log(orders)
        if (!orders.length) {
          this.$toast('请选择商品')
          return false
        }
        this.$store.commit('setOrderParams', orders)
        this.$router.push({ name: 'shopOrderList' })
        // 订单页面
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.sc_wrapper{
  height: 100%;
  background-color: #efeff4;
  .sc_header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    display: flex;
    padding: 0 0.3rem;
    background-color: #efeff4;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    span{
      color: #333333;
      font-size: 0.24rem;
      b{
        color: #e01212;
      }
      &.active{
        color: #f64682;
      }
    }
  }
  .sc_container{
    position: absolute;
    top: 0.8rem;
    left: 0;
    background-color: #efeff4;
    width: 100%;
    padding-bottom: 2.22rem;
    z-index: 1;
    .sc_content{
      background-color: #fff;
      width: 100%;
      .sc_list{
        height: 2.22rem;
        border-top: 1px solid #f4f4f4;
        border-bottom: 1px solid #f4f4f4;
        padding: 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .sc_list_check{
          width: 0.64rem;
          position: relative;
          i{
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 0.35rem;
            height: 0.35rem;
            border-radius: 50%;
            border: 2px solid #c9c9c9;
            &.active{
              border: none;
              background-repeat: no-repeat;
              background-size: contain;
              background-position: 50%;
              background-image: url('../../../assets/images/shop/checked.png');
            }
          }
        }
        .sc_list_img{
          display: flex;
          align-items: center;
          width: 1.6rem;
          height: 100%;
          img{
            max-width: 100%;
          }
        }
        .sc_list_detail{
          flex: 1;
          padding-left: 0.2rem;
          width: 4.6rem;
          h6{
            display: block;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.28rem;
            color: #333;
            font-weight: bold;
            margin-bottom: 0.18rem;
            text-align: left;
          }
          .sc_list_detail_desc{
            margin-bottom: 0.18rem;
            text-align: left;
            font-size: 0.2rem;
            color: #999;
            line-height: 1.5em;
            text-overflow: -o-ellipsis-lastline;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            height: 0.8rem;
          }
          .sc_list_detail_footer{
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            b{
              color: #e01212;
              font-size: 0.24rem;
            }
            s{
              color: #333;
              font-size: 0.16rem;
              text-align: left;
            }
            .sc_list_count{
              height: 0.4rem;
              border: 1px solid #aeaeae;
              font-size: 0.24rem;
              i{
                padding: 0 0.15rem;
                line-height: 0.4rem;
                color: #666666;
                cursor: pointer;
                font-style: normal;
              }
              span{
                padding: 0 0.2rem;
                border-left: 1px solid #aeaeae;
                border-right: 1px solid #aeaeae;
              }
            }
          }
        }
      }
    }
  }
  .sc_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.88rem;
    display: flex;
    padding-left: 0.3rem;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    z-index: 2;
    span{
      font-size: 0.28rem;
      color: #333333;
      i{
        display: inline-block;
        width: 0.35rem;
        height: 0.35rem;
        border-radius: 50%;
        border: 2px solid #c9c9c9;
        vertical-align: text-bottom;
        margin-right: 0.15rem;
        &.active{
          border: none;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: 50%;
          background-image: url('../../../assets/images/shop/checked.png');
        }
      }
    }
    p{
      font-size: 0.28rem;
      margin-left: auto;
      margin-right: 0.2rem;
      color: #333333;
      b{
        color: #e01212;
      }
    }
    button{
      display: block;
      width: 2rem;
      height: 100%;
      line-height: 0.88rem;
      font-size: 0.28rem;
      color: #fff;
      background-color: #f64682;
    }
  }
}
</style>
