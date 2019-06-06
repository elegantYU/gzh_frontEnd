<template>
  <div class="shop_wrapper">
    <div class="shop_container">
      <div class="shop_header">
        <img src="https://w.wallhaven.cc/full/j5/wallhaven-j5kkgp.jpg" alt="">
        <div class="shop_nav">
          <div class="shop_nav_search">
            <i></i>
            <input type="text" placeholder="请输入商品名称">
          </div>
          <div class="shop_nav_car" @click="f_moveCar"></div>
        </div>
      </div>
      <div class="shop_body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  data () {
    return {
      v_list: []
    }
  },
  mounted () {
    this.$router.push({ name: 'shopCategory' })
  },
  methods: {
    f_moveCar () {
      this.$router.push({ name: 'shopCar' })
    }
  }
}
</script>

<style lang='scss' scoped>
.shop_wrapper{
  background-color: #efeff4;
  height: 100%;
  .shop_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
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
    .shop_body{
      padding: 0 0.2rem;
      .shop_category{
        width: 100%;
        height: 5.2rem;
        .shop_category_head{
          display: flex;
          width: 100%;
          height: 0.7rem;
          justify-content: space-between;
          align-items: center;
          span{
            font-size: 0.32rem;
            color: #383839;
            &:last-of-type{
              color: #868686;
              font-size: 0.24rem;
              cursor: pointer;
            }
          }
        }
        .shop_category_body{
          width: 100%;
          height: 4.5rem;
          overflow: hidden;
          &.shop_category_more{
            height: auto;
          }
          ul{
            display: flex;
            width: 100%;
            height: auto;
            justify-content: space-between;
            flex-wrap: wrap;
            li{
              width: 3.5rem;
              height: 4.5rem;
              border-radius: 0.1rem;
              background-color: #fff;
              margin-bottom: 0.1rem;
              padding: 0.4rem 0.15rem 0.3rem;
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
                margin-bottom: 0.2rem;
                // 溢出隐藏
              }
              &>p{
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.22rem;
                color: #999999;
                margin-bottom: 0.25rem;
              }
              .shop_item_detail{
                display: flex;
                width: 100%;
                height: 0.26rem;
                justify-content: space-between;
                align-items: baseline;
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
                  background-image: url('../../../assets/images/shop/shopcar.png');
                  background-size: contain;
                  background-repeat: no-repeat;
                  background-position: center center;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
