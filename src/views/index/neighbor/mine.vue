<template>
  <div class="nm_wrapper">
    <div class="nm_content">
      <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_laodAll">
        <mu-list>
          <template v-for="(v, i) in v_list">
            <div class="nm_item clearfix" :key="i" @click="f_viewDetail(v)">
              <div class="nm_item_left">
                <h6>{{ v.title }}</h6>
                <p>{{ v.content }}</p>
                <div class="nm_item_left_detail clearfix">
                  <span class="nm_item_detail_time">{{ v.createTime }}</span>
                  <span class="nm_delete" @click.stop="f_delete(i)"></span>
                  <span class="nm_item_detail_title">{{ v.taskType }}</span>
                </div>
              </div>
              <div class="nm_item_right">
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
  name: 'Mine',
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
            userId: this.$store.state.user.id,
            taskType: this.taskType,
            pageNum: this.v_pageNum,
            villageCode: this.$store.state.villageCode,
            pageSize: 10
          } 
        : params = {
            userId: this.$store.state.user.id,
            villageCode: this.$store.state.villageCode,
            pageNum: this.v_pageNum,
            pageSize: 10
          }

      this.$http
        .get('/admin/share/getMeShareInfo', { params })
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
        this.v_pageNum++
        this.f_getList()
      }, 1000)
    },
    f_delete (i) {
      let params = {
        id: this.v_list[i].id,
        villageCode: this.$store.state.villageCode,
      }

      let flag = confirm('此条信息将被删除，是否进行？')
      if (flag) {
        this.$http
          .get('/admin/share/deleteShareInfo', { params })
          .then(res => {
            if (res.data.success) {
              this.v_list.splice(i, 1)
              this.$toast('删除成功')
            } else {
              this.$toast('网络错误')
            }
          })
      }
    },
    f_viewDetail (v) {
      this.$router.push({ name: 'neighborDetail', query: { id: v.id } })
    }
  }
}
</script>

<style lang='scss' scoped>
.nm_wrapper{
  height: 100%;
  background-color: #efeff4;
  .nm_content{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    .nm_item{
      width: 100%;
      height: 1.82rem;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      background-color: #fff;
      margin-bottom: 0.2rem;
      .nm_item_left{
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
         .nm_item_left_detail{
            position: absolute;
            width: 100%;
            padding-right: 0.25rem;
            bottom: 0;
            left: 0;
            span{
              display: block;
              float: left;
              font-size: 0.2rem;
              &:nth-of-type(2){
                float: right;
                width: 0.21rem;
                height: 0.25rem;
                background-image: url('../../../assets/images/neighbor/neighbor_delete.png');
                background-repeat: no-repeat;
                background-position: center center;
                background-size: contain;
                margin-left: 0.39rem;
              }
              &:last-of-type{
                float: right;
              }
            }
         }
      }
      .nm_item_right{
        float: left;
        width: 1.6rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
</style>
