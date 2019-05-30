<template>
  <div class="sm_wrapper">
    <div class="shop_category">
      <div class="shop_category_head">
        <span>水果生鲜</span>
      </div>
      <div class="shop_category_body">
        <ul>
          <li>
            <shopItem></shopItem>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import shopItem from './components/item.vue'

export default {
  name: 'more',
  components: {
    shopItem
  },
}
</script>

<style lang='scss' scoped>
.sm_wrapper{
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
      }
    }
    .shop_category_body{
      width: 100%;
      height: auto;
      overflow: hidden;
      ul{
        display: flex;
        width: 100%;
        height: auto;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          width: 3.5rem;
          height: 4.5rem;
          margin-bottom: 0.1rem;
        }
      }
    }
  }
}
</style>
