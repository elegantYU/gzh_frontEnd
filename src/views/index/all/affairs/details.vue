<template>
    <div class="detailss">
      <div class="detailss-cont">
        <div class="detailss-tit">社会保险职工参保信息变更登记</div>
        <div class="detailss-locn">
          <img :src="Lcon">
          <p>申请条件</p>
        </div>
        <div class="detailss-condition">111111111111111111111111111111111111111111111111111111111111111111111111111
        </div>
        <div class="detailss-download">
          <p>附件下载</p>
          <div class="detailss-download-img">
            <div class="detailss-download-img-cont">
              <img :src="Word" alt="">
              <p>文档名称11</p>
            </div>
            <div class="detailss-download-img-cont">
              <img :src="Tet" alt="">
              <p>表格名称11</p>
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
export default {
  name: "detailss",
  data () {
    return {
      Lcon: Lcon,
      Word: Word,
      Tet: Tet
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
      line-height: 1rem;
    }
    .detailss-locn{
      display: flex;
      img{
        width: 9%;
        height: 9%;
        margin-bottom: 0.3rem;
      }
      p{
        margin-top: 0.15rem;
      }
    }
    .detailss-condition{
      height: 5rem;
      text-align: left;
      word-wrap:break-word;
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
