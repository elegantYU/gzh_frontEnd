<template>
  <div class="wr_wrapper">
    <div class="wr_content">
      <h6>康馨园小区</h6>
      <div class="wr_form">
        <div class="wr_input">
          <label>房屋名称</label>
          <input type="text" readonly value="1单元">
        </div>
        <div class="wr_input">
          <label>报修类型</label>
          <input type="text" readonly value="1单元" @click="f_openType">
          <i></i>
        </div>
        <div class="wr_input">
          <label>标题</label>
          <input type="text" value="1单元">
        </div>
        <div class="wr_input">
          <label>联系人</label>
          <input type="text" value="1单元">
        </div>
        <div class="wr_input">
          <label>联系方式</label>
          <input type="text" value="1单元">
        </div>
        <div class="wr_input">
          <label>预约时间</label>
          <input type="text" value="1单元">
        </div>
      </div>
      <!-- 报修类型 -->
      <mu-bottom-sheet :open.sync="v_typeFlag">
        <mu-list @item-click="f_chooseType">
          <mu-sub-header>选择报修类型</mu-sub-header>
          <mu-list-item
            button
            v-for="(v, i) in v_types"
            :key="i"
          >
            <mu-list-item-title>{{ v.name }}</mu-list-item-title>
          </mu-list-item>
          <!-- <mu-list-item button>
            <mu-list-item-title>Inbox</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Chat</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Email</mu-list-item-title>
          </mu-list-item> -->
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
      v_types: [
        { name: '水电' },
        { name: '水电' },
        { name: '水电' },
        { name: '水电' }
      ],
      v_typeFlag: false
    }
  },
  methods: {
    f_openType () {
      this.v_typeFlag = true
    },
    f_chooseType () {
      this.v_typeFlag = false
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
      }
    }
  }
}
</style>
