<template>
  <div class="lp_wrapper">
    <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_laodAll">
      <mu-list>
        <template v-for="(v, i) in v_list">
          <div class="pub_item clearfix" :key="i" @click="f_viewDetail(v)">
            <div class="pub_item_left">
              <h6>{{ v.title }}</h6>
              <p>{{ v.content }}</p>
              <div class="pub_item_left_detail clearfix">
                <span class="pub_item_detail_time">{{ v.createTime }}</span>
                <span class="pub_item_detail_title">{{ v.type == 1 ? '失物' : '招领' }}</span>
              </div>
            </div>
            <div class="pub_item_right">
              <img :src="JSON.parse(v.imgUrl)[0]" alt="">
            </div>
          </div>
        </template>
      </mu-list>
    </mu-load-more>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_list: [],
      v_pageNum: 1,
      v_loading: false,
      v_laodAll: false
    }
  },
  props: {
    type: Number
  },
  watch: {
    'type': function (now, last) {
      this.v_list = []
      this.f_getList()
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    f_getList () {
      let params
      this.type > 0
        ? params = {
            type: this.type,
            villageCode: this.$store.state.villageCode,
            pageNum: this.v_pageNum,
            pageSize: 5
          } 
        : params = {
            villageCode: this.$store.state.villageCode,
            pageNum: this.v_pageNum,
            pageSize: 5
          }

      this.$http
        .get('/admin/lost/getAllLostFoundList', { params })
        .then(({data: {data: res}}) => {
          if (!res.list.length) {
            this.v_laodAll = true
            return
          }
          res.list.forEach(v => {
            this.v_list.push(v)
          })
        })
    },
    f_load () {
      this.v_loading = true
      setTimeout(() => {
        this.v_loading = false
        this.v_pageNum++
        this.f_getList()
      }, 1000)
    },
    f_viewDetail (v) {
      this.$router.push({ name: 'lfDetail', query: { id: v.id } })
    }
  }
}
</script>

<style lang='scss' scoped>
.lp_wrapper{
  background-color: #efeff4;
  padding-bottom: 1.2rem;
  .pub_item{
    width: 100%;
    height: 1.82rem;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 0.2rem;
    .pub_item_left{
      float: left;
      width: calc(100% - 1.6rem);
      height: 100%;
      box-sizing: border-box;
      padding-right: 0.25rem;
      text-align: left;
      position: relative;
        h6{
          font-size: 0.34rem;
          margin-bottom: 0.05rem;
        }
        p{
          color: #a9a9a9;
          font-size: 0.26rem;
          line-height: 1.2em;
          text-overflow: -o-ellipsis-lastline;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
        }
        .pub_item_left_detail{
          position: absolute;
          width: 100%;
          padding-right: 0.25rem;
          bottom: 0;
          left: 0;
          span{
            display: block;
            float: left;
            font-size: 0.2rem;
            &:last-of-type{
              float: right;
            }
          }
        }
    }
    .pub_item_right{
      float: left;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.6rem;
      height: 100%;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
