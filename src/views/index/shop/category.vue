<template>
  <div class="sc_wrapper">
    <div class="shop_category">
      <div class="shop_category_head">
        <span>水果生鲜</span>
        <span @click="f_moveMore()">更多 ></span>
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
  name: 'Category',
  data () {
    return {
      v_list: []
    }
  },
  components: {
    shopItem
  },
  methods: {
    f_getList () {
      
    },
    f_moveMore (i) {
      this.$router.push({ name: 'shopMore', query: {  }})
    }
  }
}
</script>

<style lang='scss' scoped>
.sc_wrapper{
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
          background-color: #fff;
        }
      }
    }
  }
}
</style>
