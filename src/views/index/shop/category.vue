<template>
  <div class="sc_wrapper">
    <div
      class="shop_category"
      v-for="(v, i) in v_list"
      :key="i"
    >
      <div class="shop_category_head">
        <span>{{ v.codeText }}</span>
        <span @click="f_moveMore(v.codeCd)">更多 ></span>
      </div>
      <div class="shop_category_body">
        <ul>
          <li
            v-for="(value, index) in v.children"
            :key="index"
          >
            <shopItem :item="value" :key="index"></shopItem>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import shopItem from './components/item.vue'

export default {
  data () {
    return {
      v_list: []
    }
  },
  components: {
    shopItem
  },
  created () {
    this.f_getList()
  },
  methods: {
    async f_getList () {
      const {data: {data: result}} = await this.$http
        .get('/admin/product/floor')

      this.v_list.push(...result)
      await Promise.all(result.map(v => this.f_getItem({
        start: 1,
        pageSize: 5,
        villageCode: this.$store.state.villageCode,
        productCateId: v.codeCd
      }, v.codeCd))).then(res => {
        this.v_list= []
        this.v_list.push(...result)
      })
    },
    f_getItem (params, i) {
      return new Promise(async resolve => {
        const res = await this.$http
          .get('/admin/product/pageList', { params })

        this.v_list.map(v => {
          if (v.codeCd === i) {
            v.children = res.data.data.slice(0)
          }
        })
        resolve(res)
      })
    },
    f_moveMore (i) {
      this.$router.push({ name: 'shopMore', query: { productCateId: i }})
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
