<template>
  <div class="sd_wrapper">
    <div class="sd_container">
      <div class="sd_header">
        <div class="sd_header_img">
          <img src="https://w.wallhaven.cc/full/od/wallhaven-odw1y7.jpg" alt="">
        </div>
        <h6>胡姬花一级压寨花生油</h6>
        <p>压寨呼声有，阿嗨哦菜还有渲染没错的io</p>
        <b>￥ 168.00</b>
        <div class="sd_header_shop clearfix">
          <span class="sd_header_shop_tag">限时促销</span>
          <div class="sd_header_shopcar_none"></div>
          <div class="sd_header_shopcar_add">
            <i>-</i><span>15</span><i>+</i>
          </div>
        </div>
        <div class="sd_header_detail">
          <span>原价：<s>￥198.00</s></span>
          <span>月销：88</span>
        </div>
      </div>
      <div class="sd_detail">
        <p>——  详情  ——</p>
        <ul>
          <li>1. asdasdasdasdas</li>
        </ul>
      </div>
    </div>
    <div class="sd_fixed_bar">
      <ul class="sd_fixed_bar_left">
        <li><i></i>首页</li>
        <li><i></i>购物车</li>
      </ul>
      <div class="sd_fixed_bar_right">
        <span>加入购物车</span>
        <span>立即下单</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopItemDetail',
  data () {
    return {
      v_id: ''
    }
  },
  mounted () {
    // this.v_id = this.$route.query.id
  },

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
      }
      .sd_header_shop{
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
        }
        .sd_header_shopcar_add{
          float: right;
          font-size: 0.24rem;
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
    }
  }
}
</style>
