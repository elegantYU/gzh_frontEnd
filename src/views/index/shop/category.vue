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
            <shopItem :item="value"></shopItem>
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
  created () {
    this.f_getList()
  },
  methods: {
    f_getList () {
      this.$http
        .get('/admin/product/floor')
        .then(res => {
          res.data.data.map((v, i) => {
            let params = {
              start: 1,
              pageSize: 5,
              villageCode: this.$store.state.villageCode,
              productCateId: v.codeCd
            }
            this.v_list.push(v)
            this.f_getItem(params, v.codeCd)
          })
        })
    },
    f_getItem (params, i) {
      this.$http
        .get('/admin/product/pageList', { params })
        .then(res => {
          this.v_list.map(v => {
            if (v.codeCd === i) {
              v.children = res.data.data.slice(0)
            }
          })
          console.log('mdb', this.v_list)
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
