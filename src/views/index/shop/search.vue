<template>
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
    <p v-show="v_noGoods">暂无商品资源</p>
  </div>
</template>

<script>
import shopItem from './components/item.vue'

export default {
  components: {
    shopItem
  },
  data () {
    return {
      v_item: [],
      v_start: 1,
      v_loading: false,
      v_loadAll: false,
      v_noGoods: false
    }
  },
  props: {
    keyword: String
  },
  watch: {
    keyword: function (v) {
      if (v) {
        this.f_getList()
      }
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    async f_getList () {
      const params = {
        start: this.v_start,
        pageSize: 10,
        villageCode: this.$store.state.villageCode,
        productCateId: this.v_productCateId,
        search: this.keyword
      }

      const { data: { data: result }} =  await this.$http
        .get('/admin/product/pageList', { params })

      if (result.length) {
        this.v_noGoods = false
        this.v_item.push(...result)
      } else {
        this.v_loadAll = true
        this.v_noGoods = true
      }
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
</style>
