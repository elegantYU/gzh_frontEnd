<template>
  <div class="wr_wrapper">
    <div class="wr_content">
      <h6>{{ v_from.communityName }}</h6>
      <div class="wr_form">
        <div class="wr_input">
          <label>房屋名称</label>
          <input type="text" readonly :value="v_from.houseName">
        </div>
        <div class="wr_input">
          <label>报修类型</label>
          <input type="text" readonly :value="v_from.type" @click="f_openType" placeholder="请选择报修类型">
          <i></i>
        </div>
        <div class="wr_input">
          <label>标题</label>
          <input type="text" :value="v_from.title" placeholder="请输入标题" maxlength="15">
        </div>
        <div class="wr_input">
          <label>联系人</label>
          <input type="text" :value="v_from.userName" placeholder="请输入联系人">
        </div>
        <div class="wr_input">
          <label>联系方式</label>
          <input type="text" :value="v_from.telPhone" placeholder="请输入联系方式">
        </div>
        <div class="wr_input wr_datetime">
          <label>预约时间</label>
          <div class="wr_datetime_item">
            <mu-date-input container="bottomSheet" :should-disable-date="f_startTimeRules" :solo='true' :full-width="true" prefix="开始" clock-type='24hr' view-type='list' v-model="v_from.startTime" type="dateTime" landscape></mu-date-input>
            <mu-date-input container="bottomSheet" :should-disable-date="f_endTimeRules" :solo='true' :full-width="true" prefix="结束" clock-type='24hr' view-type='list' v-model="v_from.endTime" type="dateTime" landscape></mu-date-input>
          </div>
        </div>
      </div>
      <div class="wr_detail">
        <b>内容描述</b>
        <div class="wr_input">
          <textarea placeholder="内容不超过200字" maxlength="200" :value="v_from.detail"></textarea>
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
      <div class="wr_submit">
        报修
      </div>
      <!-- 报修类型 -->
      <mu-bottom-sheet :open.sync="v_typeFlag">
        <mu-list>
          <mu-sub-header>选择报修类型</mu-sub-header>
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
export default {
  name: 'WillRepair',
  data () {
    return {
      v_from: {
        communityName: '戈雅花苑',
        houseName: '1栋2单元407',
        type: '',
        title: '',
        userName: '',
        createUserId: '',
        telPhone: '',
        startTime: '',
        endTime: '',
        detail: '',
        img: []
      },
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
      ],
      v_typeFlag: false,
      v_images: []
    }
  },
  methods: {
    f_openType () {
      this.v_typeFlag = true
    },
    f_chooseType (name) {
      this.v_typeFlag = false
      this.v_from.type = name
    },
    f_startTimeRules (date) {
      let today = new Date().getTime()
      console.log(new Date(date).toLocaleString())
      return new Date(date).getTime() < today
    },
    // 预约时间区间是否默认为两小时
    // 时间判断弹窗➕清空操作
    f_endTimeRules (date) {

    },
    f_upload () {

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
          background-image: url('../../../assets/images/repair/repair_arrow.png');
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
          background-image: url('../../../assets/images/repair/repair_add.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 0.56rem 0.56rem;
          cursor: pointer;
        }
      }
    }
    .wr_submit{
      padding: 0 0.3rem; 
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
