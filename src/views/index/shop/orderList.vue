<template>
  <div class="so_wrapper">
    <div class="so_container">
      <div class="so_header">
        <i></i>
        <div class="so_header_deta">
          <p>{{ v_user.name }} {{ v_user.phoneNum }}</p>
          <div class="so_header_place">
            <mu-select v-model="v_addressInfo" :solo="true" placeholder="请先选择收货地址">
              <mu-option v-for="(v,i) in v_house" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
        </div>
      </div>
      <div class="so_content">
        <div class="so_content_item" v-for="(v, i) in v_origin" :key="i">
          <div class="mod_content_header">
            <p><i></i>{{ v.sellerName }} ></p>
            <span>{{ status }}</span>
          </div>
          <div class="mo_item_content">
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
        </div>
      </div>
      <div class="so_footer">
        <div class="mo_item_sub">
          <span>共计{{ v_allCount }}件商品</span>
          <span>合计：￥{{ v_allPrice }}</span>
        </div>
        <div class="so_footer_last">
          <div>
            <i></i>
            <div>
              <span>联系商家</span>
              <p>1153153</p>
            </div>
          </div>
          <span @click="f_submit">提交</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_addressInfo: '',
      v_house: [],
      v_user: [],
      v_origin: [],
      v_list: [{}],
      v_orderState: 1,
      v_allPrice: 0,
      v_allCount: 0
    }
  },
  computed: {
    status () {
      switch (this.v_orderState) {
        case 1:
          return ''
          break
        case 2:
          return '待确认'
          break
        case 3:
          return '已完成'
          break
      }
    }
  },
  mounted () {
    this.v_origin = this.$store.state.orderParams
    this.v_house = this.$store.state.house
    console.log(this.$store.state.house)
    this.v_user = this.$store.state.user
    this.f_getStore()
    this.f_math()
  },
  methods: {
    f_math () {
      this.v_origin.map(v => {
        this.v_allPrice += v.moneyProduct
        this.v_allCount += v.number
      })
    },
    async f_getStore () {
      this.v_origin.forEach(v => {
         this.f_get(v).then(r => {
           v['sellerName'] =r
         })
      })
    },
    async f_get (v) {
      const params = {
        sellerId: v.sellerId
      }

      const { data: { data: result }} = await this.$http
        .get('/admin/seller/manage/info', { params })

      return result.sellerName
    },
    f_submit () {
      if (this.v_orderState === 1 && this.v_addressInfo) {
        const params = {orders: []}
        params.orders = this.v_origin.map(v => {
          delete v.sellerName
          return {
            ...v,
            addressInfo: this.v_addressInfo
          }
        })

        console.log(params)
        this.$http
          .post('/admin/order/orders/add', params)
          .then(({data: {data}}) => {
            data.success && this.$toast('已提交订单')
            this.$router.push({ name: 'myOrder' })
          })
      } else {
        this.$toast('请选择地址')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.so_wrapper{
  background-color: #efeff4;
  height: 100%;
  .so_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    .so_header{
      width: 100%;
      height: 1.2rem;
      margin-bottom: 0.2rem;
      background-color: #fff;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i{
        display: block;
        width: 1.1rem;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 0.5rem 0.6rem;
        background-image: url('../../../assets/images/shop/place.png');
      }
      .so_header_deta{
        flex: 1;
        height: 100%;
        text-align: left;
        font-size: 0.3rem;
        p{
          display: block;
          height: 0.6rem;
          color: #666;
          line-height: 0.6rem;
          span{
            margin-left: 0.2rem;
          }
        }
        .so_header_place{
          height: 0.6rem;
          color: #000;
          line-height: 0.6rem;
          .mu-input{
            padding: 0;
            height: 100%;
            min-height: 0;
            font-size: 0.3rem;
          }
        }
      }
    }
    .so_content{
      height: auto;
      .so_content_item{
        background-color: #fff;
        padding: 0 0 0.2rem;
        text-align: left;
        margin-bottom: 0.16rem;
        .mod_content_header{
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
          margin-bottom: 0.25rem;
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
            height: 100%;
            h6{
              display: flex;
              width: 100%;
              height: 0.6rem;
              line-height: 0.6rem;
              font-size: 0.28rem;
              color: #f64682;
              justify-content: space-between;
              align-items: center;
              span:first-of-type{
                width: 3.3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #282828;
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
                height: 1rem;
                line-height: 1.5em;
                text-overflow: -o-ellipsis-lastline;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
              }
              .mo_item_desc_count{
                display: inline-block;
                padding: 0.08rem 0;
                color: #f64682;
              }
            }
          }
        }
      }
    }
    .so_footer{
      padding: 0.3rem;
      background-color: #fff;
      .mo_item_sub{
        height: 0.32rem;
        margin-bottom: 0.3rem;
        font-size: 0.24rem;
        color: #282828;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .so_footer_last{
        display: flex;
        width: 100%;
        height: 0.7rem;
        justify-content: space-between;
        align-items: center;
        &>div{
          height: 100%;
          display: flex;
          align-items: center;
          i{
            display: inline-block;
            width: 0.3rem;
            height: 100%;
            background-repeat: no-repeat;
            background-size: 0.3rem 0.33rem;
            background-position: 50%;
            background-image: url('../../../assets/images/shop/tel.png');
            margin-right: 0.1rem;
          }
          &>div{
            text-align: left;
            span{
              display: block;
              height: 0.3rem;
              line-height: 0.2rem;
              font-size: 0.14rem;
            }
            p{
              display: block;
              height: 0.4rem;
              line-height: 0.4rem;
              font-size: 0.14rem;
            }
          }
        }
        &>span{
          display: block;
          width: 2rem;
          height: 0.6rem;
          border-radius: 0.3rem;
          background-color: #f64682;
          font-size: 0.3rem;
          line-height: 0.6rem;
          color: #fff;
        }
      }
    }
  }
}
</style>
