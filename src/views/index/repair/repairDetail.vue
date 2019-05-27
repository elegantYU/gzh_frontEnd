<template>
  <div class="rep_wrapper">
    <div class="rep_content">
      <h6>{{ v_info.communityName }}</h6>
      <div class="rep_from">
        <div class="rep_input">
          <label>房屋名称</label>
          <input type="text" readonly v-model="v_info.houseName">
        </div>
        <div class="rep_input">
          <label>报修类型</label>
          <input type="text" readonly v-model="v_info.type">
        </div>
        <div class="rep_input">
          <label>标题</label>
          <input type="text" readonly v-model="v_info.title">
        </div>
        <div class="rep_input">
          <label>联系人</label>
          <input type="text" readonly v-model="v_info.userName">
        </div>
        <div class="rep_input">
          <label>联系方式</label>
          <input type="text" readonly v-model="v_info.telPhone">
        </div>
        <div class="rep_input">
          <label>状态</label>
          <input type="text" readonly v-model="status">
        </div>
        <div class="rep_input">
          <label>预约时间</label>
          <input type="text" readonly v-model="orderTime">
        </div>
        <div class="rep_input">
          <label>报修时间</label>
          <input type="text" readonly v-model="v_info.createTime">
        </div>
      </div>
      <div class="rep_detail">
        <b>内容描述</b>
        <div class="rep_detail_text">
          <textarea readonly v-model="v_info.detail"></textarea>
        </div>
      </div>
      <div class="rep_preview">
        <b>图片</b>
        <div class="rep_preview_wrapper">
          <div
            class="rep_preview_item"
            v-for="(v, i) in v_info.img"
            :key="i"
          >
            <img :src="v" alt="">
          </div>
        </div>
      </div>
      <div class="rep_comment" v-if="v_info.sts===5 || v_info.sts===6">
        <div class="rep_comment_area">
          <textarea placeholder="在这里可以输入评价内容最多200个字" maxlength="200" v-model="v_info.content"></textarea>
        </div>
        <div class="rep_comment_btn" @click="f_submit">{{ commentBtn }}</div>
      </div>
      <div class="rep_commentList">
        <p>评论</p>
        <mu-load-more :loading="v_loading" @load='f_loadComments' :loaded-all="v_loadAll">
          <mu-list>
            <template v-for="(v, i) in v_commments">
              <div class="rep_comments_item" :key="i">
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
            </template>
          </mu-list>
        </mu-load-more>
        <div class="rep_nothing" v-show="v_noComment">
          暂无评价
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'RepairDetail',
  data () {
    return {
      v_id: 0,
      v_info: {},
      v_commments: [],
      v_commmentNum: 1,
      v_loading: false,
      v_loadAll: false,
      v_noComment: false
    }
  },
  mounted () {
    this.v_id = this.$route.params.id
    this.f_getInfo()
    this.f_getComments()
  },
  computed: {
    orderTime: function () {
      // let str = `${this.v_info.startTime} ~ ${this.v_info.endTime.split(' ')[1]}`
      return ''
    },
    status: function () {
      switch (this.v_info.sts) {
        case 1:
        case 2:
          return '待评价'
          break
      }
    },
    commentBtn: function () {
      console.log(this.v_info.sts)
      switch (this.v_info.sts) {
        case 5:
          return '立即评价'
          break
        case 6:
          return '继续评价'
          break
      }
    }
  },
  methods: {
    f_getInfo () {
      this.$http
        .get('/admin/property/repair/detail', { params: { id: this.v_id } })
        .then(res => {
          console.log(res)
          res.data.data.img = JSON.parse(res.data.data.img)
          this.v_info = Object.assign({}, res.data.data)
        })
    },
    f_getComments () {
      this.$http
        .get('/admin/comment/list', {
          params: {
            rId: this.v_id,
            pageNum: this.v_commmentNum,
            pageSize: 10
          }
        })
        .then(res => {
          if (!res.data.data.length) {
            this.v_loadAll = true
          }
          res.data.data.forEach(v => {
            this.v_commments.push(v)
          })
          if (!this.v_commments.length) {
            this.v_noComment = true
          }
        })
    },
    f_loadComments () {
      this.v_loading = true
      setTimeout(() => {
        this.v_loading = false
        this.v_commmentNum++
        this.f_getComments()
      }, 1000)
    },
    f_submit () {
      let params = {
        rId: this.v_id,
        rtype: 'repair',
        createUserId: this.$store.state.user.id, // 用户id
        createUserName: this.$store.state.user.name, // 用户名称
        content: this.v_info.content,
        parentId: 0
      }
      if (this.v_info.content.trim()) {
        this.$http
          .post('/admin/comment/add', params)
          .then(res => {
            if (res.data.success) {
              this.$toast({
                msg: '评价成功',
                time: 1000
              })
              this.f_getComments()
            }
          })
      } else {
        this.v_info.content = ''
        this.$toast({
          msg: '请输入评论内容',
          time: 1500
        })
      }
    }
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
        align-items: center;
        label{
          display: inline-block;
          font-size: 0.34rem;
          line-height: 0.9rem;
          width: 2rem;
          height: 100%;
          color: #b2b2b2;
        }
        input{
          flex: 1;
          height: 100%;
          font-size: 0.28rem;
          background-color: transparent;
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
        height: 1.48rem;
        padding: 0.3rem;
        background-color: #fff;
        textarea{
         width: 100%;
         height: 100%;
         resize: none;
         font-size: 0.26rem;
        }
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
          img{
            width: 100%;
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
            border: 1px solid #036ff5;
            border-radius: 50%;
            img{
              width: 100%;
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
</style>
