<template>
  <div class="shop_wrapper">
    <div class="shop_container">
      <div class="shop_header">
        <img src="http://interfacelift.com/wallpaper/previews/04201_inbloom_672x420.jpg" alt="">
        <div class="shop_nav">
          <div class="shop_nav_search">
            <i></i>
            <input type="text" placeholder="请输入商品名称">
          </div>
          <div class="shop_nav_car"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  data () {
    return {

    }
  },
  methods: {
    
  }
}
</script>

<style lang='scss' scoped>
.shop_wrapper{
  background-color: #efeff4;
  height: 100%;
  .shop_container{
    background-color: #efeff4;
    padding-block: 1.2rem;
    .shop_header{
      width: 100%;
      height: 3.8rem;
      background-color: #eee;
      position: relative;
      .shop_nav{
        position: absolute;
        top: 0.2rem;
        left: 0;
        width: 100%;
        height: 0.6rem;
        padding: 0 0.2rem; 
        display: flex;
        justify-content: space-between;
        align-items: center;
        .shop_nav_search{
          display: flex;
          align-items: center;
          width: 6rem;
          height: 100%;
          padding: 0 0.15rem;
          border-radius: 0.1rem;
          background-color: rgba(0,0,0, 0.1);
          i{
            width: 0.25rem;
            height: 0.25rem;
            background-image: url('../../../assets/images/shop/search.png');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
          }
          input{
            flex: 1;
            height: 100%;
            font-size: 0.24rem;
            color: #fff;
            background-color: transparent;
            text-indent: 1em;
          }
        }
        .shop_nav_car{
          width: 0.28rem;
          height: 0.28rem;
          background-image: url('../../../assets/images/shop/shopcar.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
        }
      }
      img{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
