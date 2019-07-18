<template>
  <div class="pub_wrapper">
    <div class="pub_content" ref="container">
      <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_laodAll">
        <mu-list>
          <template v-for="(v, i) in v_list">
            <div class="pub_item clearfix" :key="i" @click="f_viewDetail(v)">
              <div class="pub_item_left">
                <h6>{{ v.title }}</h6>
                <p>{{ v.content }}</p>
                <div class="pub_item_left_detail clearfix">
                  <span class="pub_item_detail_time">{{ v.createTime }}</span>
                  <span class="pub_item_detail_title">{{ v.taskType }}</span>
                  <span>{{ f_topicType(v.shareType) }}</span>
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
  </div>
</template>

<script>
export default {
  name: 'Public',
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
            taskType: this.taskType,
            villageCode: this.$store.state.villageCode,
            page : this.v_pageNum,
            rows: 10
          } 
        : params = {
            villageCode: this.$store.state.villageCode,
            page : this.v_pageNum,
            rows: 10
          }

      this.$http
        .get('/admin/share/wx/getShareInfoList', { params })
        .then(res => {
          console.log(res)
          if (!res.data.rows.length) {
            this.v_laodAll = true
          }
          res.data.rows.forEach(v => {
            this.v_list.push(v)
          })
        })
    },
    f_topicType (sts) {
      if (sts == '2') {
        return '物业'
      }
      return '居民'
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
      console.log(v)
      this.$router.push({ name: 'neighborDetail', query: { id: v.id } })
    }
  }
}
</script>

<style lang='scss' scoped>
.pub_wrapper{
  height: 100%;
  background-color: #efeff4;
  .pub_content{
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
         }
         p{
            color: #a9a9a9;
            font-size: 0.26rem;
            line-height: 1.2em;
            text-overflow: -o-ellipsis-lastline;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-flex;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-flex-orient: vertical;
         }
         .pub_item_left_detail{
            position: absolute;
            width: 100%;
            padding-right: 0.25rem;
            bottom: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span{
              display: block;
              // float: left;
              font-size: 0.2rem;
              // &:last-of-type{
              //   float: right;
              // }
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
}
</style>
