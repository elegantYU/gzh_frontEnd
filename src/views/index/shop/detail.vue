<template>
  <div class="sd_wrapper">
    <div class="sd_container">
      <div class="sd_header">
        <div class="sd_header_img">
          <img src="https://w.wallhaven.cc/full/od/wallhaven-odw1y7.jpg" alt="">
        </div>
        <h6>{{ v_detail.name1 }}</h6>
        <p>{{ v_detail.keyword }}</p>
        <b>￥ {{ v_detail.mallPcPrice }}</b>
        <div class="sd_header_shop clearfix">
          <span class="sd_header_shop_tag">限时促销</span>
          <div class="sd_header_shopcar_none" v-if="!v_num" @click="f_addNum"></div>
          <div class="sd_header_shopcar_add" v-else>
            <i @click="f_cutNum">-</i><span>{{ v_num }}</span><i @click="f_addNum">+</i>
          </div>
        </div>
        <div class="sd_header_detail">
          <span v-if="v_detail.marketPrice">原价：<s>￥{{ v_detail.marketPrice }}</s></span>
          <span>月销：{{ v_detail.actualSales }}</span>
        </div>
      </div>
      <div class="sd_detail">
        <p>—  详情  —</p>
        <div class="sd_detail_text" v-html="v_detail.description"></div>
      </div>
    </div>
    <div class="sd_fixed_bar">
      <ul class="sd_fixed_bar_left clearfix">
        <li @click="f_moveIndex"><i></i><span>首页</span></li>
        <li @click="f_moveCar"><i :class="shopCar"></i><span>购物车</span></li>
      </ul>
      <div class="sd_fixed_bar_right">
        <span @click="f_addNum">加入购物车</span>
        <span @click="f_getOrder">立即下单</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopItemDetail',
  data () {
    return {
      v_id: '',
      v_detail: {},
      v_num: 0
    }
  },
  computed: {
    shopCar () {
      if (this.v_num) {
        return 'active'
      }
      return ''
    }
  },
  mounted () {
    this.v_id = this.$route.query.id
    this.f_getDetail()
  },
  methods: {
    f_getDetail () {
      let params = {
        id: this.v_id
      }

      this.$http
        .get('/admin/product/detail', { params })
        .then(res => {
          console.log(res)
          this.v_detail = Object.assign({}, res.data.data)
        })
    },
    async f_addNum () {
      this.v_num++

      const params = {
        memberId: this.$store.state.user.id,
        count: this.v_num,
        productId: this.v_id,
        sellerId: this.v_detail.sellerId,
        villageCode: this.v_detail.villageCode,
        unitPrice: this.v_detail.mallPcPrice,
        specInfo: this.v_detail.name1
      }

      await this.$http
        .post('/admin/cart/add', params)
    },
    async f_cutNum () {
      if (!this.v_num) {
        return false
      }
      this.v_num--
      
      const params = {
        id: this.v_id,
        num: this.v_num
      }

      await this.$http
        .post('/admin/cart/changeCart', params)
    },
    f_moveIndex () {
      this.$router.push({ name: 'index' })
    },
    f_moveCar () {
      this.$router.push({ name: 'shopCar' })
    },
    f_getOrder () {

    }
  }
}
</script>

<style lang='scss' scoped>
.sd_wrapper{
  background-color: #efeff4;
  height: 100%;
  .sd_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    .sd_header{
      background-color: #fff;
      padding: 0.1rem 0.3rem 0.35rem;
      margin-bottom: 0.2rem;
      .sd_header_img{
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        img{
          max-width: 100%;
          max-height: 100%;
          border-radius: 0.03rem;
        }
      }
      h6{
        font-size: 0.35rem;
        font-weight: bold;
        text-align: left;
        color: #353535;
        margin: 0.25rem 0 0.15rem;
      }
      p{
        font-size: 0.3rem;
        color: #353535;
        text-align: left;
        margin-bottom: 0.25rem;
      }
      b{
        color: #de2e2e;
        font-size: 0.36rem;
        display: block;
        text-align: left;
        margin-bottom: 0.2rem;
      }
      .sd_header_shop{
        margin-bottom: 0.45rem;
        .sd_header_shop_tag{
          float: left;
          background-color: #f64682;
          padding: 0.08rem;
          color: #fff;
          font-size: 0.26rem;
        }
        .sd_header_shopcar_none{
          float: right;
          width: 0.32rem;
          height: 0.32rem;
          background-image: url('../../../assets/images/shop/shopAdd.png');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center center;
          margin-top: 0.04rem;
        }
        .sd_header_shopcar_add{
          float: right;
          font-size: 0.24rem;
          display: flex;
          height: 0.4rem;
          line-height: 0.4rem;
          i{
            color:#f64682;
            font-size: 0.4rem;
          }
          span{
            display: inline-block;
            border: 1px solid #999999;
            padding: 0.06rem 0.1rem;
            margin: 0 0.1rem;
            vertical-align: middle;
          }
        }
      }
      .sd_header_detail{
        display: flex;
        justify-content: space-between;
      }
    }
    .sd_detail{
      padding: 0 0.3rem 0.3rem;
      background-color: #fff;
      &>p{
        display: block;
        height: 0.95rem;
        font-size: 0.28rem;
        line-height: 0.95rem;
        color: #333333;
        border-bottom: 1px solid #eeeeee;
      }
      .sd_detail_text{
        padding-top: 0.3rem;
        text-align: left;
        font-size: 0.24rem;
        color: #666666;
        line-height: 1.5em;
        p{
          text-indent: 2em;
        }
      }
    }
  }
  .sd_fixed_bar{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .sd_fixed_bar_left{
      height: 100%;
      padding-left: 0.3rem;
      li{
        padding-top: 0.08rem;
        margin-right: 0.6rem;
        cursor: pointer;
        float: left;
        &:first-of-type{
          i{
            background-image: url('../../../assets/images/tabs/tab_home_active.png');
          }
        }
        &:last-of-type{
          margin: 0;
          i{
            background-image: url('../../../assets/images/shop/shopCarHas.png');
            &.active{
              background-image: url('../../../assets/images/shop/shopCarNone.png');
            }
          }
        }
        i{
          display: block;
          margin: 0 auto 0.1rem;
          width: 0.55rem;
          height: 0.53rem;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center center;
        }
        span{
          font-size: 0.2rem;
        }
      }
    }
    .sd_fixed_bar_right{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.3rem;
      span{
        display: block;
        width: 2.3rem;
        height: 0.8rem;
        background-color: #f64682;
        line-height: 0.8rem;
        font-size: 0.28rem;
        color: #fff;
        cursor: pointer;
        &:first-of-type{
          border-radius: 0.4rem 0 0 0.4rem;
          background-color: #ff81ac;
        }
        &:last-of-type{
          border-radius: 0 0.4rem 0.4rem 0;
        }
      }
    }
  }
}
</style>
