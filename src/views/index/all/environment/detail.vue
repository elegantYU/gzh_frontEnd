<template>
  <div class="rep_wrapper">
    <div class="rep_content">
      <h6>{{ v_info.communityName }}</h6>
      <div class="rep_from">
        <div class="rep_input">
          <label>分类</label>
          <input type="text" readonly v-model="v_info.type">
        </div>
        <div class="rep_input">
          <label>标题</label>
          <input type="text" readonly v-model="v_info.title">
        </div>
        <div class="rep_input">
          <label>状态</label>
          <input type="text" readonly v-model="v_info.status">
        </div>
        <div class="rep_input">
          <label>时间</label>
          <input type="text" readonly v-model="v_info.time">
        </div>
      </div>
      <div class="rep_detail">
        <b>内容描述</b>
        <div class="rep_detail_text">
          {{ v_info.detail }}
        </div>
      </div>
      <div class="rep_preview">
        <b>图片</b>
        <div class="rep_preview_wrapper">
          <div
            class="rep_preview_item"
            v-for="(v, i) in v_info.imgUrl"
            :key="i"
          >
            <img :src="v" alt="">
          </div>
        </div>
      </div>
      <!-- <div class="rep_showcomment_btn" @click="f_showcomment">评论</div> -->
      <div class="rep_comment" v-if="v_info.status == 5">
        <div class="rep_comment_area" v-show="v_textareaFlag">
          <textarea placeholder="在这里可以输入评价内容最多200个字" maxlength="200" v-model="v_info.content"></textarea>
        </div>
        <div class="rep_comment_btn" @click="f_submit">{{ v_submitText }}</div>
      </div>
      <div class="rep_commentList" v-if="v_commments.length">
        <p>评论</p>
        <div class="rep_comments_item" v-for="(v, i) in v_commments" :key="i">
          <div class="rep_comments_item_top clearfix">
            <div class="rep_comments_item_avatar">
              <img :src="v.headIcon" alt="">
            </div>
            <div class="rep_comments_item_info">
              <p>{{ v.createUserName }}</p>
              <span>{{ v.createTime }}</span>
            </div>
          </div>
          <div class="rep_comments_item_bottom">{{ v.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'environmentDetail',
  data () {
    return {
      v_id: 0,
      v_info: {
        type: '',
        title: '',
        status: '',
        time: '',
        detail: '',
        content: '',
        imgUrl: ''
      },
      v_commments: [],
      v_commmentNum: 1,
      typeObj: {
        1: '垃圾散乱',
        2: '绿化损坏',
        3: '高空抛物',
        4: '井盖缺失',
        5: '路面破损',
        6: '违章搭建',
        7: '违规停车',
        8: '宠物问题',
        9: '其他问题',
      },
      status: {
        0: '待处理',
        1: '处理中',
        2: '已完成',
        3: '已超时',
        4: '已督办',
        5: '已评论'
      },
      v_submitText: '评论',
      v_textareaFlag: false
    }
  },
  methods: {
    f_submit () {
      if (this.v_submitText === '评论') {
        this.v_textareaFlag = true
        this.v_submitText = '提交评论'
      }

      const params = {
        id: this.v_id,
        parentId: this.v_commments.length - 1 >= 0 ? this.v_commments.length - 1 : 0,
        createUserId: this.$store.state.user.id,
        createUserName: this.$store.state.user.name,
        villageCode: this.$store.state.villageCode,
        content: this.v_info.content
      }
      if (this.v_info.content) {
        this.$http
        .post('/admin/environ/addComment', params)
        .then(res => {
          if (res.data.success) {
            this.$toast('评论成功')
            this.v_info.content = ''
            this.f_getComments()
          } else {
            this.$toast('网络错误')
          }
        })
      }
    },
    f_getComments () {
      this.$http
        .post(`/admin/comment/noticeList?rId=${this.v_id}&rtype=environ`)
        .then(res => {
          if (res.data.success) {
            const data = res.data.data
            if(data.length) {
              data.map(v => {
                this.v_commments.push({
                  createUserName: v.mianComment.createUserName,
                  createTime: v.mianComment.createTime,
                  content: v.mianComment.content,
                  rid: v.mianComment.rid
                })
              })
            }
          } else {
            this.$toast('网络错误')
          }
        })
    },
    f_getDetail () {
      let params = {
        id: this.v_id
      }
      this.$http
        .get('/admin/environ/getEnvironDetail', { params })
        .then(res => {
          console.log('f_getDetail', res)
          if (res.data.success) {
            const data = res.data.data
            this.v_info.type = this.typeObj[data.classify]
            this.v_info.title = data.title
            this.v_info.time = data.createTime
            this.v_info.detail = data.content
            this.v_info.status = this.status[data.status]
            this.v_info.imgUrl = JSON.parse(data.imgUrl)
          } else {
            this.$toast('网络错误')
          }
        })
    }
  },
  mounted () {
    this.v_id = this.$route.query.id
    this.f_getComments()
    this.f_getDetail()
  }
}
</script>
<style lang="scss" scoped>
.rep_wrapper{
  height: 100%;
  background-color: #efeff4;
  .rep_content{
    background-color: #efeff4;
    h6{
      padding: 0.23rem 0 0.26rem;
      font-size: 0.36rem;
    }
    .rep_from{
      border-top: 1px solid #e5e5e5;
      .rep_input{
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        background-color: #fff;
        text-align: left;
        padding: 0 0.3rem;
        display: flex;
        label{
          display: inline-block;
          font-size: 0.34rem;
          line-height: 0.9rem;
          width: 2rem;
          height: 100%;
          color: #b2b2b2;
        }
        input{
          width: calc(100% - 2.25rem);
          height: 100%;
          background-color: transparent;
          font-size: 0.3rem;
        }
      }
    }
    .rep_detail{
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #b2b2b2;
        text-align: left;
        font-weight: normal;
      }
      .rep_detail_text{
        text-align: left;
        min-height: 1.48rem;
        padding: 0.3rem;
        background-color: #fff;
        font-size: 0.26rem;
        line-height: 1.5em;
      }
    }
    .rep_preview{
      margin-bottom: 0.3rem;
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #b2b2b2;
        text-align: left;
        font-weight: normal;
      }
      .rep_preview_wrapper{
        height: 1.74rem;
        padding: 0.3rem;
        box-sizing: border-box;
        background-color: #fff;
        .rep_preview_item{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
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
    .rep_comment{
      margin-bottom: 0.7rem;
      .rep_comment_area{
        height: 1.48rem;
        padding: 0.3rem;
        background-color: #fff;
        margin-bottom: 0.3rem;
        textarea{
         width: 100%;
         height: 100%;
         resize: none;
         font-size: 0.26rem;
        }
      }
      .rep_comment_btn{
        margin: 0 0.3rem;
        height: 0.9rem;
        background-color: #f73476;
        text-align: center;
        font-size: 0.34rem;
        color: #fff;
        line-height: 0.9rem;
        border-radius: 0.415rem;
        cursor: pointer;
      }
    }
    .rep_commentList{
      padding: 0 0.3rem;
      &>p{
        font-size: 0.3rem;
        text-indent: 0.5em;
        text-align: left;
        border-left: 0.1rem solid #f73476;
      }
      .rep_comments_item{
        padding: 0.2rem 0.09rem;
        border-bottom: 1px solid #e6e6e6;
        .rep_comments_item_top{
          height: 0.6rem;
          margin-bottom: 0.22rem;
          .rep_comments_item_avatar{
            float: left;
            width: 0.6rem;
            height: 0.6rem;
            margin-right: 0.18rem;
            box-sizing: border-box;
            border: 1px solid #242425;
            border-radius: 50%;
            img{
              max-width: 100%;
              max-height: 100%;
            }
          }
          .rep_comments_item_info{
            float: left;
            color: #666666;
            text-align: left;
            box-sizing: border-box;
            padding: 0.05rem 0 0;
            p{
              display: block;
              font-size: 0.28rem;
              margin-bottom: 0.1rem;
            }
            span{
              display: block;
              font-size: 0.2rem;
            }
          }
        }
        .rep_comments_item_bottom{
          box-sizing: border-box;
          padding-left: 0.78rem;
          text-align: left;
          font-size: 0.3rem;
          color: #333333;
        }
      }
      .rep_nothing{
        font-size: 0.24rem;
        color: #ccc;
        padding: 0.2rem 0;
      }
    }
  }
}
.rep_showcomment_btn {
  margin: 0 0.3rem;
    height: 0.9rem;
    background-color: #f73476;
    text-align: center;
    font-size: 0.34rem;
    color: #fff;
    line-height: 0.9rem;
    border-radius: 0.415rem;
    cursor: pointer;
}
</style>
