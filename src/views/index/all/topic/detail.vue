<template>
  <div class="td_wrapper">
    <div class="td_container">
      <h6>{{ v_detail.title }}</h6>
      <div class="td_header_detail">
        <span>来源: {{ v_detail.sourceName }}</span>
        <span>{{ v_detail.createTime }}</span>
        <ul>
          <li><i></i>320</li>
          <li><i></i>320</li>
        </ul>
      </div>
      <img src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-96210.jpg" alt="">
      <div class="td_content">
        {{ v_detail.content }}
      </div>
      <div class="td_comment">
        <div class="td_comment_header">
          <span>全部评论（{{ v_total }}条）</span>
          <span @click="f_openSubmitComments(v_detail.id)">评论</span>
        </div>
        <div class="td_comment_list" v-if="v_total">
          <div
            v-for="(v, i) in v_comments"
            :key="i"
            class="td_comment_item"
          >
            <div class="td_comment_item_left">
              <div class="td_comment_avatar">
                <img src="" alt="">
              </div>
            </div>
            <div class="td_comment_item_right">
              <div class="td_comment_right_top">
                <span>{{ v.mianComment.createUserName }}</span>
                <i @click="f_openSubmitComments(v.mainComment.rid)"></i>
              </div>
              <div class="td_comment_right_bottom">
                {{ '2019-01-01' }}
              </div>
              <div class="td_comment_content">
                {{ v.mianComment.content }}
              </div>
              <div class="td_comment_content_list">
                <!-- 品论 -->
                <div
                  class="td_comment_content_list_each"
                  v-for="(val, ind) in v.childrenComments"
                  :key="ind"
                  :class="v.openComment ? '' : 'td_comment_content_list_more'"
                  @click="f_openSubmitComments(v.rid)"
                >
                  <span>{{ val.createUserName }}:</span>
                  <p>{{ val.content }}</p>
                </div>
                <div class="td_more_comments" v-if="v.childrenComments.length > 3" @click="f_openComments(i)">共{{ v.childrenComments.length }}条回复 ></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 没有评论 -->
        <div v-else>暂无评论</div>
      </div>
      <!-- 报名 -->
      <div class="td_signup" :class="signupLabel">
        <span>{{ new Date().getTime > new Date(this.v_detail.postEnd) ? '已结束' : '报名中' }}</span>
        <span @click="f_openSignUp">我要报名</span>
      </div>
      <!-- 提交评论 -->
      <div class="td_submit_wrapper" v-if="v_submit">
        <div class="td_mask" @click="f_closeSubmitComments"></div>
        <div class="td_submit_text">
          <textarea placeholder="请输入内容" v-model="v_textarea"></textarea>
        </div>
        <div class="td_submit_btn" @click="f_postComment">提交</div>
      </div>
      <!-- 我要报名 -->
      <div class="td_signup_wrapper" v-if="v_signup">
        <div class="td_mask" @click="f_closeSignUp"></div>
        <div class="td_sign_content">
          <h6>我要报名</h6>
          <div class="td_sign_input">
            <label>房屋信息</label>
            <div class="td_sign_box">
              <mu-select label="Normal" solo v-model="v_house" full-width>
                <mu-option v-for="(v, i) in v_houseList" :key="i" :label="v" :value="v"></mu-option>
              </mu-select>
            </div>
            <i></i>
          </div>
          <div class="td_sign_input">
            <label>姓名</label>
            <div class="td_sign_box">
              <input type="text" readonly v-model="$store.state.user.name">
            </div>
          </div>
          <div class="td_sign_input">
            <label>联系方式</label>
            <div class="td_sign_box">
              <input type="text" readonly v-model="$store.state.user.phoneNum">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      v_id: 2,
      v_detail: {},
      v_comments: [],
      v_total: 0,
      v_status: 0,
      v_submit: false,
      v_signup: false,
      v_houseList: [],
      v_house: '',
      v_textarea: '',
      v_currentRid: ''
    }
  },
  computed: {
    signupLabel () {
      switch (this.v_status) {
        case 1:
          return 'td_signup_2'
          break
        case 2:
          return 'td_signup_3'
          break
        case 3:
          return 'td_signup_4'
          break
      }

      if (new Date().getTime > new Date(this.v_detail.postEnd)) {
        return 'td_signup_3'
      }
    }
  },
  mounted () {
    this.f_getDetail()
    this.f_getComments()
    this.f_getHouse()
  },
  methods: {
    f_getHouse () {
      let params = {
        memberId: this.$store.state.user.id
      }

      this.$http
        .get('/admin/member/house/all', { params })
        .then(res => {
          if (res.data.data) {
           this.v_houseList = res.data.data.map(v => `${v.region}${v.street}${v.community}${v.village}${v.building}${v.unit}${v.room}`)
          }
        })
    },
    f_getDetail () {
      let params = {
        id: 2
      }

      this.$http
        .get('/obtain/notice/detail', { params })
        .then(res => {
          console.log(res.data.data)
          this.v_detail = Object.assign({}, res.data.data)
        })
    },
    f_getComments () {
      this.$http
        .post(`/admin/comment/noticeList?rId=${this.v_id}&rtype=notice`)
        .then(res => {
          res.data.data.forEach(v => {
            v.openComment = false
            this.v_total++
            this.v_comments.push(v)
          })
        })
    },
    f_openComments (i) {
      this.v_comments[i].openComment = true
    },
    f_openSubmitComments (id) {
      this.v_submit = true
      this.v_currentRid = id
    },
    f_closeSubmitComments () {
      this.v_submit = false
    },
    f_postComment (id) {
      let params = {
        rId: id,
        rType: 'notice',
        createUserId: this.$store.state.user.id,
        createUserName: this.$store.state.user.name,
        content: this.v_textarea
      }

      this.$http
        .post('/admin/comment/add', params)
        .then(res => {
          if (res.data.success) {
            this.$toast('评论成功')
            this.f_closeSubmitComments()
          } else {
            console.log('评论失败', res)
          }
        })
    },
    f_openSignUp () {
      this.v_signup = true
    },
    f_closeSignUp () {
      this.v_signup = false
    },
    f_signup () {
      let params = {
        rActivityId: this.v_id,
        activityTitle: this.v_detail.title,
        houseInfo: this.v_house,
        memberName: this.$store.state.user.name,
        memberId: this.$store.state.user.id,
        phone: this.$store.state.user.phoneNum
      }

      this.$http
        .get('/notice/activity/add', )
        .then(res => {
          if (res.data.success) {
            this.v_status = 1
            this.f_closeSignUp()
          }
        })
    },
  }
}
</script>

<style lang='scss' scoped>
.td_wrapper{
  background-color: #efeff4;
  height: 100%;
  .td_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    h6{
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.32rem;
    }
    .td_header_detail{
      height: 0.42rem;
      display: flex;
      padding: 0 0.3rem;
      align-items: center;
      justify-content: space-between;
      font-size: 0.22rem;
      ul{
        li{
          float: left;
          font-size: 0.2rem;
          color: #999;
          margin-right: 0.16rem;
          i{
            display: inline-block;
            width: 0.24rem;
            height: 0.22rem;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center center;
            vertical-align: middle;
            margin-right: 0.05rem;
          }
          &:nth-of-type(1){
            i{
              background-image: url('../../../../assets/images/index/index_view.png');
            }
            &.index_topic_icon_active{
              color: #58c3fb;
              i{
                background-image: url('../../../../assets/images/index/index_viewed.png');
              }
            }
          }
          &:nth-of-type(2){
            i{
              background-image: url('../../../../assets/images/index/index_collect.png');
            }
            &.index_topic_icon_active{
              color: #ff6c73;
              i{
                background-image: url('../../../../assets/images/index/index_collected.png');
              }
            }
          }
        }
      }
    }
    img{
      width: 100%;
    }
    .td_content{
      padding: 0.2rem 0.3rem;
      background-color: white;
      font-size: 0.22rem;
      text-align: left;
      text-indent: 2em;
      line-height: 1.75em;
    }
    .td_comment{
      .td_comment_header{
        height: 0.62rem;
        padding: 0 0.3rem;
        background-color: #efeff4;
        line-height: 0.62rem;
        font-size: 0.24rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          &:last-of-type{
            width: 0.77rem;
            height: 0.37rem;
            line-height: 0.37rem;
            border-radius: 0.04rem;
            border: 1px solid #e9e8e8;
            background-color: #fff;
            font-size: 0.18rem;
            color: #f64682;
            cursor: pointer;
          }
        }
      }
      .td_comment_list{
        background-color: #fff;
        padding: 0 0.3rem;
        .td_comment_item{
          display: flex;
          .td_comment_item_left{
            width: 1rem;
            height: auto;
            .td_comment_avatar{
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
              overflow: hidden;
              img{
                width: 100%;
              }
            }
          }
          .td_comment_item_right{
            flex: 1;
            .td_comment_right_top{
              padding-left: 0.2rem;
              height: 0.4rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              span{
                font-size: 0.24rem;
              }
              i{
                display: inline-block;
                width: 0.28rem;
                height: 0.26rem;
                background-image: url('../../../../assets/images/topic/comments.png');
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center center;
                cursor: pointer;
              }
            }
            .td_comment_right_bottom{
              padding-left: 0.2rem;
              font-size: 0.22rem;
              color: #666;
              text-align: left;
            }
            .td_comment_content{
              text-align: left;
              padding: 0.3rem 0.2rem;
              font-size: 0.28rem;
              line-height: 1.5em;
            }
            .td_comment_content_list{
              width: 100%;
              height: auto;
              padding: 0.1rem 0.2rem;
              &.td_comment_content_list_more{
                height: 1.55rem;
                overflow: hidden;
              }
              .td_comment_content_list_each{
                margin-bottom: 0.12rem;
                text-align: left;
                white-space: normal;
                font-size: 0.24rem;
                p{
                  color: #666;
                  display: inline;
                }
              }
              .td_more_comments{
                font-size: 0.24rem;
                color: #666;
                text-align: left;
              }
            }
          }
        }
      }
    }
    .td_signup{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0.2rem 0.3rem;
      height: 1.2rem;
      display: flex;
      align-items: center;
      span{
        font-size: 0.28rem;
        flex: 1;
        height: 100%;
        line-height: 0.8rem;
        &:first-of-type{
          background-color: #fff;
          color: #f64682;
          border-radius: 0.1rem 0 0 0.1rem;
        }
        &:last-of-type{
          color: white;
          background-color: #f64682;
          border-left: 1px solid #f64682;
          border-radius: 0 0.1rem 0.1rem 0;
        }
      }
      &.td_signup_2{
        span{
          &:last-of-type{
            background-color: #fff;
            color: #000;
            pointer-events: none;
          }
        }
      }
      &.td_signup_3{
        span{
          &:first-of-type{
            color: #000;
          }
          &:last-of-type{
            background-color: #999;
            color: #fff;
            pointer-events: none;
          }
        }
      }
      &.td_signup_4{
        span{
          &:first-of-type{
            color: #000;
          }
          &:last-of-type{
            background-color: #fff;
            color: #000;
            pointer-events: none;
          }
        }
      }
    }
    .td_submit_wrapper{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-bottom: 0.2rem;
      .td_mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
      }
      .td_submit_text{
        width: 100%;
        height: 2rem;
        padding: 0.2rem;
        background-color: white;
        margin-bottom: 0.1rem;
        textarea{
          resize: none;
          font-size: 0.24rem;
          line-height: 1.75em;
        }
      }
      .td_submit_btn{
        width: calc(100% - 0.6rem);
        height: 0.8rem;
        border-radius: 0.1rem;
        background-color: #f64682;
      }
    }
  }
}
</style>
