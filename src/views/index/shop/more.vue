<template>
  <div class="sm_wrapper">
    <div class="shop_category">
      <div class="shop_category_head">
        <span>水果生鲜</span>
      </div>
      <div class="shop_category_body">
        <ul>
          <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_loadAll">
            <mu-list>
              <template v-for="(v, i) in v_item">
                <li :key="i">
                  <shopItem :item="v"></shopItem>
                </li>
              </template>
            </mu-list>
          </mu-load-more>
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
  data () {
    return {
      v_item: [],
      v_productCateId: 0,
      v_start: 1,
      v_loading: false,
      v_loadAll: false
    }
  },
  mounted () {
    this.v_productCateId = this.$route.query.productCateId
    this.f_getList()
  },
  methods: {
    f_getList () {
      let params = {
        start: this.v_start,
        pageSize: 10,
        villageCode: this.$store.state.villageCode,
        productCateId: this.v_productCateId
      }

      this.$http
        .get('/admin/product/pageList', { params })
        .then(res => {
          if (res.data.data.length) {
            res.data.data.map(v => this.v_item.push(v))
          } else {
            this.v_loadAll = true
          }
        })
    },
    f_load () {
      this.v_loading = true
      setTimeout(() => {
        this.v_loading = false
        this.v_start++
        this.f_getList()
      }, 1000)
    }
  }
}
</script>

<style lang='scss' scoped>
.sm_wrapper{
  .shop_category{
    width: 100%;
    background-color: #efeff4;
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
