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
          {{ v_info.detail }}
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
      <div class="rep_comment" v-if="v_info.sts === 2 || v_info.sts === 4">
        <div class="rep_comment_btn" @click="f_submit">{{ btnText }}</div>
      </div>
      <div class="rep_commentList" v-show="v_commments.length">
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
      </div>
    </div>
  </div>
</template>

<script>
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
      v_sts: 0
    }
  },
  mounted () {
    this.v_info = this.$store.state.currentRepair
    this.f_getComments()
  },
  computed: {
    orderTime: function () {
      if (this.v_info.startTime) {
        const s =  this.v_info.startTime.replace(this.v_info.startTime.substr(this.v_info.startTime.length - 3), '')
        const e =  this.v_info.endTime.replace(this.v_info.endTime.substr(this.v_info.endTime.length - 3), '')
        let str = `${s} ~ ${e.split(' ')[1]}`
        return str
      }
    },
    status: function () {
      switch (this.v_info.sts) {
        case 1:
        case 2:
          return '待审核'
          break
        case 3:
          return '未通过'
          break
        case 4:
          return '待上门'
          break
        case 5:
          return '待评论'
          break
        case 6:
          return '已评论'
          break
      }
    },
    btnText () {
      if (this.v_info.sts == 2) {
        this.v_sts = 4
        return '确认'
      } else if (this.v_info.sts == 4) {
        this.v_sts = 5
        return '完成'
      }
    }
  },
  methods: {
    f_getComments () {
      this.$http
        .get('/admin/comment/list', {
          params: {
            rId: this.v_id,
            pageNum: this.v_commmentNum,
            pageSize: 100
          }
        })
        .then(res => {
          if (!res.data.data.length) {
            this.v_loadAll = true
          }
          res.data.data.forEach(v => {
            this.v_commments.push(v)
          })
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
        sts: this.v_sts
      }
      this.$http
        .post('/admin/property/repair/changeStatus', params)
        .then(({ data }) => {
          data.success && this.$toast('已确认')
        })
    },
    async f_updateCommmentStatus () {
      const params = {
        id: this.v_id,
        sts: 6
      }

      const { data } = await this.$http
        .post('/admin/property/repair/update', params)
      
      if (data.success) this.v_info.sts = 6
    }
  }
}
</script>

<style lang="scss" scoped>
.rep_wrapper{
  height: 100%;
  background-color: #efeff4;
  overflow: auto;
  .rep_content{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
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
          text-align: right;
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
