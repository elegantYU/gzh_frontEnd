<template>
    <div class="detailss">
      <div class="detailss-cont">
        <div class="detailss-tit">{{num.title}}</div>
        <div class="detailss-locn">
          <img :src="Lcon">
          <p>申请条件</p>
        </div>
        <div class="detailss-condition">{{num.content}}</div>
        <div class="detailss-download">
          <p>附件下载</p>
          <div class="detailss-download-img">
            <div class="detailss-download-img-cont" v-if="words" @click="download">
              <img :src="Word" alt="">
              <p>{{num.img}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Lcon from '../../../../assets/images/all/detailss/show_less.png'
import Word from '../../../../assets/images/all/detailss/images/word_03.gif'
import Tet from '../../../../assets/images/all/detailss/images/text_03.gif'
import Axios from 'axios'

export default {
  data () {
    return {
      Lcon: Lcon,
      Word: Word,
      Tet: Tet,
      num: '',
      v_loadall: false,
      words: false,
    }
  },
  mounted () {
    this.f_detail()
    if (this.num.img!='') {
      this.words=true
    }else {
      this.words=false
    }
  },
  methods: {
    download () {
      const url = this.num.img
      window.open(url)
      window.close()
    },
    f_detail () {
      const params = {
        memberId: this.$store.state.user.id,
        id:this.$route.query.id
      }

      this.$http.get('/obtain/notice/detail', {params})
        .then(res => {
          console.log(res.data)
          this.num = res.data.data
        })
    }
  }
}
</script>

<style scoped lang="scss">
.detailss{
  height: 100vh;
  background-color: #efeff4;
  .detailss-cont{
    width: 90%;
    margin: auto;
    .detailss-tit{
      font-size: 0.3rem;
      padding-top: 0.5rem;
    }
    .detailss-locn{
      display: flex;
      img{
        display: inline-block;
        width: 0.5rem;
        height: 0.9rem;
      }
      p{
        line-height: 0.65rem;
        margin-top: 0.15rem;
      }
    }
    .detailss-condition{
      text-align: left;
      word-wrap:break-word;
      padding-bottom: 0.5rem;
    }
    .detailss-download{
      p{
        text-align: left;
      }
      .detailss-download-img{
        display: flex;
        margin-top: 0.3rem;
        img{
          display: inline-block;
          width: 1rem;
          height: 1rem;
          margin-right: 0.6rem;
        }
        p{
          width: 1rem;
          height: 0.3rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 0.2rem;
          margin-top: 0.1rem;
        }
      }
    }
  }
}
</style>
