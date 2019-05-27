<template>
  <div class="pd-wp">
    <div class="ct">
      <p class="title">{{v_detail.title}}</p>
      <p class="detail clearfix">
        <span class="left">来源: {{v_detail.sourceName}}</span>
        <span class="right">{{v_detail.createTime}}</span>
      </p>
      <img class="banner" :src="'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-96210.jpg'" alt="">
      <div class="article">
        {{ v_detail.content }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'policyDetail',
  data () {
    return {
      v_id: 0,
      v_detail: {}
    }
  },
  mounted () {
    this.v_id = this.$route.query.id
    this.f_getDetail()
  },
  methods: {
    f_getDetail () {
      let params = {
        id: this.v_id
      }

      this.$http
        .get('/obtain/notice/detail', { params })
        .then(res => {
          this.v_detail = Object.assign({}, res.data.data)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.pd-wp {
  background-color: #ffffff;
  height: 100%;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .ct {
    width: 7rem;
    margin: 0 auto;
  }
  .title {
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.32rem;
    margin-bottom: 0.1rem;
    font-weight: 600;
  }
  .detail {
    font-size: 0.22rem;
    color: #dfdfdf;
    margin-bottom: 0.1rem;
  }
  .banner {
    width: 100%;
    margin-bottom: 0.6rem;
  }
  .article {
    text-align: left;
    text-indent: 2em;
    line-height: 1.75em;
    font-size: 0.22rem;
  }
}
</style>
