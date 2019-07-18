<template>
  <div class="mod_wrapper">
    <div class="mod_container">
      <div class="mod_header">
        <i></i>
        <div class="mod_header_detail">
          <p>{{ v_user.name }} <span>{{ v_user.phoneNum }}</span></p>
          <b>{{ v_item.addressInfo }}</b>
        </div>
      </div>
      <div class="mod_content">
        <div class="mod_content_header">
          <p @click="f_moveStore"><i></i>{{ v_item.sellerName }} ></p>
          <span>{{ status }}</span>
        </div>
        <div class="mo_item_content" v-for="(v, i) in v_list" :key="i">
          <div class="mo_item_img">
            <img :src="v.productSku" alt="">
          </div>
          <div class="mo_item_desc">
            <h6><span>{{ v.productName }}</span><span>￥ {{ v.moneyPrice }}</span></h6>
            <div class="mo_item_desc_content">
              <div class="mo_item_desc_detail">
                {{ v.specInfo }}
              </div>
              <div class="mo_item_desc_count">
                x {{ v.number }}
              </div>
            </div>
          </div>
        </div>
        <div class="mo_item_sub">
          <span>共计{{ v_item.productNum }}件商品</span>
          <span>合计：￥{{ v_item.totalPrice }}</span>
        </div>
        <div class="mo_item_footer">
          <div class="mo_item_btn" v-show="v_orderState < 2" @click="f_cancel">
            取消订单
          </div>
          <div class="mo_item_btn" v-show="v_orderState > 3" @click="f_delete">
            删除订单
          </div>
          <div class="mo_item_btn active" v-show="v_orderState > 3" @click="f_openComment">
            评价
          </div>
        </div>
      </div>
      <div class="rep_commentList" v-show="v_orderState > 3">
        <p>评论</p>
        <mu-load-more :loading="v_loading" @load='f_loadComments' :loaded-all="v_loadAll">
          <mu-list>
            <template v-for="(v, i) in v_comments">
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
      <div class="mod_comment" v-if="v_switch">
        <textarea placeholder="请输入评价" ref="textarea" v-model="v_comment"></textarea>
        <p>
          <span @click="f_closeComment">取消</span>
          <span @click="f_comment">确定</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_id: '',
      v_orderState: 0,
      v_user: {},
      v_list: [],
      v_comments: [],
      v_comment: '',
      v_commmentNum: 1,
      v_item: {},
      v_loading: false,
      v_loadAll: false,
      v_switch: false,
      v_noComment: false
    }
  },
  computed: {
    firModel() {
      return this.v_list[0] || {}
    },
    status () {
      switch (this.v_orderState) {
        case 1:
          return '进行中'
          break
        case 2:
          return '待收货'
          break
        case 4:
          return '待评价'
          break
        case 5:
          return '已取消'
          break
        case 6:
          return '已完成'
          break
      }
    }
  },
  mounted () {
    this.v_id = this.$route.query.orderSn
    this.v_orderState = this.$route.query.orderState
    this.v_user = this.$store.state.user
    this.v_item = Object.assign({}, this.$route.query.item)
    console.log('详情', this.v_item)
    this.f_getDetail()
    this.f_getComments()
  },
  methods: {
    async f_getDetail () {
      const params = {
        orderSn: this.v_id
      }

      const { data: { data: result }} = await this.$http
        .get('/admin/order/orders/detail', { params })

      this.v_list.push(...result)
      console.log('list', this.v_list)
    },
    f_moveStore () {
      return false
    },
    async f_cancel () {
      const params = {
        orderSn: this.v_id
      }
      
      const f = confirm('确认取消吗?')
      if (f) {
        const { data: { success } } = await this.$http
          .get('/admin/order/orders/cancel', { params })
        
        success && this.$toast('已取消')
      }
    },
    async f_delete (v) {
      const params = {
        orderSn: this.v_id
      }

      const f = confirm('确认删除吗?')
      if (f) {
        const { data: { success } } = await this.$http
          .get('/admin/order/orders/delete', { params })

        success && this.$toast('已删除')
      }
    },
    f_openComment () {
      this.v_switch = true
      this.$nextTick(x => {
        this.$refs.textarea.focus()
      })
    },
    f_closeComment () {
      this.v_switch = false
      this.v_comment = ''
    },
    async f_comment () {
      const params = {
        rId: this.v_id,
        rtype: 'orders',
        createUserId: this.$store.state.user.id,
        createUserName: this.$store.state.user.name,
        content: this.v_comment,
        parentId: 0
      }

      const { data } = await this.$http
        .post('/admin/comment/add', params)
      
      if (data.success)
        this.f_closeComment()
        this.v_commmentNum = 1
        this.v_comments = []
        this.f_getComments()
        this.f_updateStatus()
    },
    async f_getComments () {
      const params = {
        rId: this.v_id,
        rType: 'orders',
        pageNum: this.v_commmentNum,
        pageSize: 100
      }

      const { data: { data: result }} = await this.$http
        .get('/admin/comment/list', { params })

      if (!result.length) {
        this.v_noComment = true
      }
      this.v_comments.push(...result)
    },
    async f_updateStatus () {
      const params = {
        orderSn: this.v_id.toString(),
        state: 6
      }

      await this.$http
        .get('/admin/order/orders/updateState', { params })
    },
    f_loadComments () {
      this.v_loading = true
      setTimeout(() => {
        this.v_loading = false
        this.v_commmentNum++
        this.f_getComments()
      }, 1000)
    }
  }
}
</script>

<style lang='scss' scoped>
.mod_wrapper{
  background-color: #efeff4;
  height: 100%;
  .mod_container{
    background-color: #efeff4;
    padding: 0.3rem 0 1.2rem;
    .mod_header{
      width: 100%;
      height: 1.2rem;
      margin-bottom: 0.2rem;
      background-color: #fff;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i{
        display: block;
        width: 1.1rem;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 0.5rem 0.6rem;
        background-image: url('../../../assets/images/shop/place.png');
      }
      .mod_header_detail{
        flex: 1;
        height: 100%;
        text-align: left;
        font-size: 0.3rem;
        p{
          display: block;
          height: 0.6rem;
          color: #666;
          line-height: 0.6rem;
          span{
            margin-left: 0.2rem;
          }
        }
        b{
          display: block;
          height: 0.6rem;
          color: #000;
          line-height: 0.6rem;
          font-weight: normal;
        }
      }
    }
    .mod_content{
      background-color: #fff;
      padding: 0 0.2rem 0.2rem;
      text-align: left;
      margin-bottom: 0.16rem;
      .mod_content_header{
        width: 100%;
        height: 0.7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.3rem;
        p{
          display: inline-block;
          color: #333;
          i{
            display: inline-block;
            width: 0.32rem;
            height: 0.3rem;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: 50%;
            background-image: url('../../../assets/images/shop/store.png');
            margin-right: 0.2rem;
            vertical-align: bottom;
          }
        }
        span{
          color: #f64682;
        }
      }
      .mo_item_content{
        width: 100%;
        height: 1.8rem;
        display: flex;
        align-items: center;
        background-color: #f5f5f5;
        margin-bottom: 0.25rem;
        .mo_item_img{
          width: 1.8rem;
          height: 1.8rem;
          display: flex;
          align-items: center;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
        .mo_item_desc{
          flex: 1;
          padding-left: 0.2rem;
          height: 100%;
          h6{
            display: flex;
            width: 100%;
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 0.28rem;
            color: #282828;
            justify-content: space-between;
            align-items: center;
            span:first-of-type{
              width: 3.3rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .mo_item_desc_content{
            display: flex;
            width: 100%;
            height: 1.2rem;
            margin-bottom: 0.2rem;
            color: #858585;
            font-size: 0.22rem;
            justify-content: space-between;
            align-items: flex-start;
            .mo_item_desc_detail{
              width: 3.3rem;
              height: 100%;
              line-height: 1.5em;
              text-overflow: -o-ellipsis-lastline;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              /*! autoprefixer: off */
              -webkit-box-orient: vertical;
            }
            .mo_item_desc_count{
              display: inline-block;
              padding: 0.08rem 0;
            }
          }
        }
      }
      .mo_item_sub{
        height: 0.32rem;
        margin-bottom: 0.3rem;
        font-size: 0.24rem;
        color: #282828;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .mo_item_footer{
        display: flex;
        flex-direction: row-reverse;
        .mo_item_btn{
          width: 1rem;
          height: 0.4rem;
          color: #999999;
          font-size: 0.18rem;
          line-height: 0.4rem;
          border-radius: 0.2rem;
          border: 1px solid #999;
          text-align: center;
          margin: 0 0.1rem;
          &.active {
            border: 1px solid #f64682;
            color: #f64682;
          }
        }
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
    .mod_comment{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2.4rem;
      padding: 0.1 0.3rem;
      background-color: #fff;
      textarea{
        display: block;
        width: 100%;
        height: 1.8rem;
        border-radius: 0.1rem;
        padding: 0.2rem;
        text-align: left;
        font-size: 0.26rem;
        resize: none;
      }
      p{
        display: flex;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        flex-direction: row-reverse;
        span{
          font-size: 0.26rem;
          line-height: 0.4rem;
          color: #999;
          padding: 0 0.3rem;
          cursor: pointer;
          &:last-of-type{
            color: #f64682;
          }
        }
      }
    }
  }
}
</style>
