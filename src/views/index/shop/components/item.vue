<template>
  <div class="si_wrapper" @click="f_opemDetail">
    <div class="shop_item_img">
      <img src="https://img.wowoqq.com/allimg/171130/1-1G1300I102-52.jpg" alt="">
    </div>
    <b>品谷白有套4粒 100g</b>
    <p>套箱浓郁，口感绵甜多只</p>
    <div class="shop_item_detail">
      <span>￥25.8</span>
      <s>原价:30</s>
      <span>销量999+件</span>
      <i @click.stop="f_addShopCar"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopItem',
  data () {
    return {

    }
  },
  props: {
    item: Object
  },
  methods: {
    // 加入购物车
    f_addShopCar () {
      
    },
    f_opemDetail () {
      this.$router.push({ name: 'shopItemDetail' })
    }
  }
}
</script>

<style lang='scss' scoped>
.si_wrapper{
  width: 3.5rem;
  height: 4.5rem;
  padding: 0.4rem 0.15rem 0.3rem;
  border-radius: 0.1rem;
  background-color: #fff;
  text-align: left;
  .shop_item_img{
    display: table-cell;
    width: 3.2rem;
    height: 2.6rem;
    vertical-align: middle;
    text-align: center;
    img{
      max-width: 100%;
      max-height: 2.6rem;
    }
  }
  &>b{
    display: block;
    font-size: 0.28rem;
    font-weight: normal;
    color: #010101;
    margin: 0.2rem auto;
    // 溢出隐藏
  }
  &>p{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.22rem;
    color: #999999;
    margin-bottom: 0.2rem;
  }
  .shop_item_detail{
    display: flex;
    width: 100%;
    height: 0.26rem;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: nowrap;
    span{
      font-size: 0.3rem;
      color: #ee1236;
      &:last-of-type{
        font-size: 0.14rem;
        color: #000;
      }
    }
    s{
      font-size: 0.14rem;
    }
    i{
      width: 0.28rem;
      height: 0.28rem;
      background-image: url('../../../../assets/images/shop/shopcar.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      cursor: pointer;
    }
  }
}
</style>
