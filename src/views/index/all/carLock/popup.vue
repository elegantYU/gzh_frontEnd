<template>
    <div class="popup">
      <div class="popup-tit">访客车位预约</div>
      <div class="popup-cont">
        <div class="popup-commonStyle">
          <div class="popup-commonStyle-tit">
            <p>姓</p>
            <p style="margin-left: auto">名</p>
          </div>
          <input type="text" placeholder="请输入姓名">
        </div>
        <div class="popup-commonStyle">
          <div class="popup-commonStyle-tit titlt">
            联系方式
          </div>
          <input type="number" placeholder="请输入联系方式">
        </div>
        <div class="popup-commonStyle">
          <div class="popup-commonStyle-tit">
            车牌号
          </div>
          <input type="number" placeholder="请输入车牌号">
        </div>
        <div class="popup-commonStyle">
          <div class="popup-commonStyle-tit">
            住户房屋
          </div>
          <div class="ca_input_box">
            <mu-select :solo="true" placeholder="请选择房屋">
              <mu-option v-for="option,index in options" :key="option" :label="option" :value="option"></mu-option>
            </mu-select>
          </div>
        </div>
        <div class="popup-commonStyle">
          <div class="popup-commonStyle-tit">
            访客身份
          </div>
          <div class="ca_input_box">
            <mu-select :solo="true" placeholder="请选择与住户的关系">
              <mu-option v-for="option,index in options" :key="option" :label="option" :value="option"></mu-option>
            </mu-select>
          </div>
        </div>
        <div class="popup-commonStyle">
          <div class="popup-commonStyle-tit">
            预约时间
          </div>
            <mu-row>
              <mu-col span="9">
                <mu-date-input v-model="value1"  full-width container="dialog" underline-color="white" placeholder="请选择预约时间"></mu-date-input>
              </mu-col>
            </mu-row>
        </div>
      </div>
      <div class="popup-appointment">立即预约</div>
    </div>
</template>

<script>
export default {
  name: "popup",
  data () {
    return {
      options: [
        'Option 1', 'Option 2', 'Option 3', 'Option 4',
        'Option 5', 'Option 6', 'Option 7', 'Option 8',
        'Option 9', 'Option 10'
      ],
      normal: {
        value1: '',
        value2: '',
        value3: '',
        value4: 'Option 1',
        value5: 'Option 2'
      },
      value1:undefined
    }
  }
}
</script>

<style lang="scss"  scoped>
  mu-input{
    padding: 0.2rem;
  }
  input{
    border-bottom: 0.02rem solid #eeeeee;
  }
  .titlt{
    letter-spacing: 0.04rem;
  }
.popup{
  width: 90%;
  height: 9rem;
  background-color: white;
  border-radius: 0.2rem;
}
  .popup-tit{
    height: 0.4rem;
    font-size: 0.5rem;
    line-height: 1.2rem;
  }
  .popup-cont{
    width: 80%;
    margin: 1rem auto 0;
  }
  .popup-commonStyle{
    display: flex;
    margin-bottom: 0.3rem;
  }
  .popup-commonStyle-tit{
    display: flex;
    width: 1.5rem;
    margin-right: 0.3rem;
  }
  .popup-appointment{
    width: 80%;
    height: 0.8rem;
    background-color: rgb(246,70,130);
    text-align: center;
    line-height: 0.8rem;
    border-radius: 0.5rem;
    margin: auto;
  }
  .ca_input_box{
    width: 1.5rem;
    height: 0.34rem;
    flex: 1;
    font-size: 0.3rem;
  .mu-input-content{
    width: 1.5rem;
    height: 0.34rem;
    padding: 0;
  }
    .mu-input{
      width: 100%;
      height: 100%;
      padding: 0;
    }
    .mu-select{
      display: block;
      width: 100%;
      height: 100%;
      padding: 0;
    }
  input{
    display: block;
    font-size: 0.3rem;
    width: 100%;
    height: 100%;
    padding: 0;
  }
  }

</style>
