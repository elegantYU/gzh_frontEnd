<template>
    <div class="earlyDetali">
      <h6 class="earlyDetali_name">{{v_from.communityName}}</h6>
      <div class="earlyDetali_cont">
        <div class="earlyDetali_input">
          <label>标题</label>
          <input type="text" readonly v-model="v_from.lab">
        </div>
        <div class="earlyDetali_input">
          <label>事件状态</label>
          <input type="text" readonly v-model="v_from.dcl">
        </div>
        <div class="earlyDetali_input">
          <label>预警类型</label>
          <input type="text" readonly v-model="v_from.lex">
        </div>
        <div class="earlyDetali_input">
          <label>位置信息</label>
          <input type="text" readonly v-model="v_from.pos">
        </div>
        <div class="earlyDetali_input">
          <label>居民姓名</label>
          <input type="text" readonly v-model="v_from.jName">
        </div>
        <div class="earlyDetali_input">
          <label>身份证号</label>
          <input type="text" readonly v-model="v_from.num">
        </div>
        <div class="earlyDetali_input">
          <label>居民电话</label>
          <input type="text" readonly v-model="v_from.jPhone">
        </div>
        <div class="earlyDetali_input">
          <label>人员类型</label>
          <input type="text" readonly v-model="v_from.prp">
        </div>
        <div class="earlyDetali_input">
          <label>是否超时</label>
          <input type="text" readonly v-model="v_from.overtime">
        </div>
        <div class="earlyDetali_input">
          <label>督办状态</label>
          <input type="text" readonly v-model="v_from.supervise">
        </div>
        <div class="earlyDetali_input">
          <label>承办部门</label>
          <input type="text" readonly v-model="v_from.undertake">
        </div>
        <div class="earlyDetali_input">
          <label>承办人员</label>
          <input type="text" readonly v-model="v_from.undertakeprp">
        </div>
        <div class="earlyDetali_div">
          <label>事件内容</label>
          <div v-model="v_from.eventCont">{{v_from.eventCont}}</div>
        </div>
        <div class="earlyDetali-bnt">办理</div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      v_from:{
        communityName:'小区名字',
        lab:'人员预警测试',
        dcl:'待处理',
        lex:'人员预警',
        pos:'南大门',
        jName:'张三',
        num:'330327199709093030',
        jPhone:'13382774448',
        prp:'残疾人',
        overtime:'否',
        supervise:'未督办',
        undertake:'客户服务部',
        undertakeprp:'物业人员',
        eventCont:'内容内容内容容内容内容容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容'
      }
    }
  },
}
</script>

<style scoped lang="scss">
.earlyDetali{
  height: 100%;
  background-color: #efeff4;
  .earlyDetali_name{
    font-size: 0.3rem;
    line-height: 0.8rem;
  }
  .earlyDetali_cont{
    height: 100%;
    background-color: white;
    border-top: 0.02rem solid #e5e5e5;
    .earlyDetali_input:last-child{
      border: none;
    }
    .earlyDetali_input{
      width: 100%;
      height: 0.9rem;
      line-height: 0.9rem;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e5e5;
      background-color: #fff;
      text-align: left;
      padding: 0 0.5rem;
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
        font-size: 0.3rem;
        background-color: transparent;
      }
      div{
        width: 56%;
        height: 0.9rem;
        padding: 0.3rem 0;
        margin-left: auto;
        font-size: 0.28rem;
      }
    }
  }
}

.earlyDetali_div{
  width: 100%;
  line-height: 0.9rem;
  box-sizing: border-box;
  background-color: #fff;
  text-align: left;
  padding: 0 0.5rem;
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
  div{
    width: 56%;
    padding: 0.3rem 0;
    margin-left: auto;
    font-size: 0.28rem;
  }
}


.earlyDetali-bnt{
  width: 3rem;
  height: 0.8rem;
  color: white;
  font-size: 0.3rem;
  background-color: #58c3fb;
  border-radius: 0.1rem;
  line-height: 0.8rem;
  margin: 0.2rem auto 0.6rem;
}

</style>
