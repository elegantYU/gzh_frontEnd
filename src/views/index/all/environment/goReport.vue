<template>
  <div class="wr_wrapper">
    <div class="wr_content">
      <h6>{{ v_from.communityName }}</h6>
      <div class="wr_form">
        <div class="wr_input">
          <label>分类</label>
          <input type="text" readonly v-model="v_from.type" @click="f_openType" placeholder="请选择分类">
          <i></i>
        </div>
        <div class="wr_input">
          <label>标题</label>
          <input type="text" v-model="v_from.title" placeholder="请输入标题(15个字以内)" maxlength="15">
        </div>
      </div>
      <div class="wr_detail">
        <b>内容描述</b>
        <div class="wr_input">
          <textarea placeholder="内容不超过200字" maxlength="200" v-model="v_from.detail"></textarea>
        </div>
      </div>
      <div class="wr_upload">
        <b>图片<span>（最多三张）</span></b>
        <div class="wr_preview">
          <div 
            class="wr_preview_list"
            v-for="(v, i) in v_images"
            :key="i"
          >
            <img :src="v" alt="">
          </div>
          <div class="wr_preview_add" @click="f_upload"></div>
        </div>
      </div>
      <div class="wr_submit" @click="f_submit">
        发布
      </div>
      <!-- 分类 -->
      <mu-bottom-sheet :open.sync="v_typeFlag">
        <mu-list>
          <mu-sub-header>选择分类</mu-sub-header>
          <mu-list-item
            button
            v-for="(v, i) in v_types"
            :key="i"
            @click="f_chooseType(v.name)"
          >
            <mu-list-item-title>{{ v.name }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </div>
  </div>
</template>
<script>
import { stop, move } from '../../../../utils/utils'
export default {
  name: 'goReport',
  data () {
    return {
      v_typeFlag: false,
      v_from: {
        communityName: '康馨苑小区',
        type: '',
        detail: '',
        img: ['', '']
      },
      v_images: [],
      v_types: [
        { name: '水暖检修' },
        { name: '电路检修' },
        { name: '家具维修及保养' },
        { name: '地面维修及保养' },
        { name: '墙面检修' },
        { name: '洁具检修及保养' },
        { name: '门窗检修' },
        { name: '家用电器检修' },
        { name: '房顶检修' },
        { name: '防水施工方法' },
      ]
    }
  },
  methods: {
    f_openType () {
      this.v_typeFlag = true
      stop()
    },
    f_chooseType (name) {
      this.v_typeFlag = false
      this.v_from.type = name
      move()
    },
    f_upload () {
      // this.$wxsdk  上传图片获取链接
    },
    f_submit () {
      let params = Object.assign({}, this.v_from)
      params.img = JSON.stringify(params.img)
      if (this.v_from.communityName && this.v_from.type) {
        // 提交表单
      } else {
        this.$toast({
          msg: '所填信息不完整',
          time: 1500
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wr_wrapper{
  height: 100%;
  background-color: #efeff4;
  .wr_content{
    padding-bottom: 1.2rem;
    background-color: #efeff4;
    h6{
      padding: 0.23rem 0 0.26rem;
      font-size: 0.36rem;
    }
    .wr_form{
      border-top: 1px solid #e5e5e5;
      .wr_input{
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        background-color: #fff;
        text-align: left;
        padding: 0 0.3rem;
        label{
          display: inline-block;
          font-size: 0.34rem;
          width: 2rem;
          height: 100%;
        }
        input{
          width: calc(100% - 2.25rem);
          height: 100%;
          background-color: transparent;
        }
        i{
          display: inline-block;
          width: 0.25rem;
          height: 100%;
          background-image: url('../../../../assets/images/environment/repair_arrow.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          vertical-align: middle;
        }
        &.wr_datetime{
          height: 1.8rem;
          .wr_datetime_item{
            display: inline-block;
            width: calc(100% - 2.25rem);
            vertical-align: middle;
            .mu-input{
              height: 0.9rem;
              box-sizing: border-box;
              margin: 0;
              &:last-of-type{
                border: none;
              }
            }
          }
        }
      }
    }
    .wr_detail{
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #000;
        text-align: left;
        font-weight: normal;
      }
      .wr_input{
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
    .wr_upload{
      margin-bottom: 0.4rem;
      b{
        display: block;
        padding: 0.25rem 0.3rem;
        font-size: 0.34rem;
        color: #000;
        text-align: left;
        font-weight: normal;
        span{
          color: #b2b2b2;
        }
      }
      .wr_preview{
        height: 1.74rem;
        padding: 0.3rem;
        box-sizing: border-box;
        background-color: #fff;
        .wr_preview_list{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          img{
            width: 100%;
          }
        }
        .wr_preview_add{
          float: left;
          width: 1.16rem;
          height: 1.16rem;
          box-sizing: border-box;
          margin: 0 0.04rem;
          border: 0.01rem solid #cccccc;
          background-image: url('../../../../assets/images/environment/repair_add.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 0.56rem 0.56rem;
          cursor: pointer;
        }
      }
    }
    .wr_submit{
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
}
</style>
