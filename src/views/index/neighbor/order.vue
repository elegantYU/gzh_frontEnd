<template>
  <div class="no_wrapper">
    <div class="no_content">
      <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_laodAll">
        <mu-list>
          <template v-for="(v, i) in v_list">
            <div class="no_item clearfix" :key="i" @click="f_viewDetail(v)">
              <div class="no_item_left">
                <h6>{{ v.title }}</h6>
                <p>{{ v.content }}</p>
                <div class="no_item_left_detail clearfix">
                  <span class="no_item_detail_time">{{ v.createTime }}</span>
                  <span class="no_item_detail_title">{{ v.taskType }}</span>
                </div>
              </div>
              <div class="no_item_right">
                <img :src="v.imgUrl" alt="">
              </div>
            </div>
          </template>
        </mu-list>
      </mu-load-more>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      v_list: [],
      v_pageNum: 1,
      v_loading: false,
      v_laodAll: false
    }
  },
  props: {
    taskType: Number
  },
  watch: {
    'taskType': function (now, last) {
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
      this.taskType !== 0
        ? params = {
            userId: 25,
            status: this.taskType,
            pageNum: this.v_pageNum,
            pageSize: 10
          } 
        : params = {
            userId: 25,
            pageNum: this.v_pageNum,
            pageSize: 10
          }

      this.$http
        .get('/admin/share/getMeApplyInfoList', { params })
        .then(res => {
          if (!res.data.data.length) {
            this.v_laodAll = true
          }
          res.data.data.list.forEach(v => {
            this.v_list.push(v)
          })
        })
    },
    f_load () {
      this.v_loading = true
      setTimeout(() => {
        this.v_loading = false
        this.pageNum++
        this.f_getList()
      }, 1000)
    },
    f_viewDetail (v) {
      console.log('list', this.v_list)
      this.$router.push({ name: 'neighborOD', query: { id: v.id } })
    }
  }
}
</script>

<style lang='scss' scoped>
.no_wrapper{
  height: 100%;
  background-color: #efeff4;
  .no_content{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    .no_item{
      width: 100%;
      height: 1.82rem;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      background-color: #fff;
      margin-bottom: 0.2rem;
      .no_item_left{
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
         .no_item_left_detail{
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
      .no_item_right{
        float: left;
        width: 1.6rem;
        height: 100%;
        display: flex;
        align-items: center;
        img{
          vertical-align: middle;
          width: 100%;
        }
      }
    }
  }
}
</style>
