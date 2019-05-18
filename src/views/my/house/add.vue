<template>
  <div class="ha_wrapper">
    <div class="ha_container">
      <div class="ha_form">
        <h6>房屋信息</h6>
        <div class="ha_input">
          <label>区域</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.area" :solo="true" placeholder="请选择省市区">
              <mu-option v-for="(v,i) in v_area" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
        <div class="ha_input">
          <label>街道</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.area" :solo="true" placeholder="请选择街道">
              <mu-option v-for="(v,i) in v_area" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
        <div class="ha_input">
          <label>社区</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.area" :solo="true" placeholder="请选择社区">
              <mu-option v-for="(v,i) in v_area" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
        <div class="ha_input">
          <label>小区</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.area" :solo="true" placeholder="请选择小区">
              <mu-option v-for="(v,i) in v_area" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
        <div class="ha_input">
          <label>楼幢</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.area" :solo="true" placeholder="请选择楼幢">
              <mu-option v-for="(v,i) in v_area" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
        <div class="ha_input">
          <label>单元</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.area" :solo="true" placeholder="请选择单元">
              <mu-option v-for="(v,i) in v_area" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
        <div class="ha_input">
          <label>室</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.area" :solo="true" placeholder="请选择室">
              <mu-option v-for="(v,i) in v_area" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
      </div>
      <div class="ha_form">
        <h6>身份信息</h6>
        <div class="ha_input">
          <label>身份</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.area" :solo="true" placeholder="请选择身份">
              <mu-option v-for="(v,i) in v_area" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
      </div>
      <div class="ha_form">
        <h6>个人信息</h6>
        <div class="ha_input">
          <label>姓名</label>
          <div class="ha_input_box">
            <input type="text" placeholder="请输入真实姓名">
          </div>
        </div>
        <div class="ha_input">
          <label>身份证号</label>
          <div class="ha_input_box">
            <input type="text" placeholder="请输入正确的身份证号">
          </div>
        </div>
        <div class="ha_input">
          <label>联系方式</label>
          <div class="ha_input_box">
            <input type="text" placeholder="请填写对应的联系方式">
          </div>
        </div>
      </div>
      <div class="ha_submit">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HouseAdd',
  data () {
    return {
      v_area: ['区域A', '区域B', '区域C', '区域D', '区域E', '区域F'],
      v_form: {
        area: ''
      }
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    f_getList () {
      this.$http
        .get('/obtain/config/linkage', { params: { configCode: 'provinceSynchroKey', orgCode: '0' } })
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.ha_wrapper{
  background-color: #efeff4;
  height: 100%;
  .ha_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    .ha_form{
      border-top: 1px solid #e5e5e5;
      h6{
        color: #999999;
        font-size: 0.3rem;
        line-height: 1.5em;
      }
      .ha_input{
        padding: 0 0.3rem;
        background-color: #fff;
        display: flex;
        height: 0.9rem;;
        line-height: 0.9rem;
        border-bottom: 1px solid #e5e5e5;
        &:last-of-type{
          border: none;
        }
        label{
          width: 1.5rem;
          line-height: 0.9rem;
          font-size: 0.34rem;
          text-align: left;
        }
        .ha_input_box{
          flex: 1;
          input{
            width: 100%;
            height: 100%;
          }
        }
        i{
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
    .ha_submit{
      margin: 0.4rem 0.3rem 0;
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
