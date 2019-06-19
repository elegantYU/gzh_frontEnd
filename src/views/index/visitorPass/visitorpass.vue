<template>
    <div class="visitor">
      <div class="visitor-name">小区名称</div>
      <div class="visitor-commonStyle">
        <div class="visitor-commonStyle-cont">有效时长</div>
        <select>
           <option v-for="item in mun" value="">{{item}}</option>
        </select>
      </div>
      <div class="visitor-commonStyle">
        <div class="visitor-commonStyle-cont">有效次数</div>
        <input type="number" placeholder="1次">
      </div>
      <div class="visitor-commonStyle">
        <div class="visitor-commonStyle-cont">邀请方</div>
        <select>
          <option value="">请选择房屋</option>
        </select>
      </div>
      <div class="visitor-commonStyle">
        <div class="visitor-commonStyle-cont">访客姓名</div>
        <input type="text" placeholder="请输入访客姓名">
      </div>
      <div class="visitor-commonStyle">
        <div class="visitor-commonStyle-cont">联系方式</div>
        <input type="number" placeholder="请输入访客联系方式">
      </div>
      <div class="visitor-commonStyle">
        <div class="visitor-commonStyle-cont">性别</div>
        <form>
          <input type="radio" name="sex" value="male"><p>男</p><br>
          <input type="radio" name="sex" value="female"><p>女</p>
        </form>
      </div>
      <div class="visitor-commonStyle">
        <div class="visitor-commonStyle-cont">访客身份</div>
        <select>
          <option v-for="item in cnt" value="">{{item}}</option>
        </select>
      </div>
      <div class="visitor-commonStyle">
        <div class="visitor-commonStyle-cont">到访时间</div>
        <div class="visitor-commonStyle-data">
          <mu-container>
            <mu-row>
              <mu-col span="8" md="1" sm="1">
                <mu-date-input v-model="value1"  full-width container="dialog" underline-color="white" ></mu-date-input>
              </mu-col>
            </mu-row>
          </mu-container>
        </div>
      </div>
      <div class="visitor-commonStyle">
        <div class="visitor-commonStyle-cont">密码类型</div>
        <select>
          <option  value="二维码">二维码</option>
          <option  value="数字密码">数字密码</option>
        </select>
      </div>
      <div class="visitor-commonStyle-img">
        <div class="visitor-commonStyle-cont">访客照片</div>
      </div>
      <div class="visitor-password">生成访客密码</div>
      <div class="visitor-password-cont">二维码或数字密码</div>
      <div class="visitor-password sendout">发送给好友</div>
      <div class="nulldiv"></div>
    </div>
</template>

<script>
export default {
  name: "visitorpass",
  data () {
    return {
      mun: ['请选择时间', '5分钟', '10分钟', '15分钟', '20分钟', '30分钟', '45分钟', '60分钟'],
      cnt: ['请选择访客与住户的关系', '父母', '子女', '亲戚', '朋友', '其他'],
      value1: undefined
    }
  }
}
</script>

<style lang='scss' scoped>
  select{
    border: none;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 70%;
    height: 90%;
    margin-left: auto;
    line-height: 0.8rem;
  }
  input{
    margin-left: 0.6rem;
    height: 80%;
    margin-top: 0.08rem;
    font-size: 0.4rem;
  }
  form{
    display: flex;
    margin-left: 0.8rem;
    p{
      line-height: 0.8rem;
      margin-left: 0.3rem;
    }
  }
  .visitor{
    background-color: #efeff4;
    .visitor-name{
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.37rem;
    }
    .visitor-commonStyle{
      width: 100vw;
      height: 0.8rem;
      background-color: #ffffff;
      display: flex;
      font-size: 0.35rem;
      border-bottom: 0.01rem solid #eeeeee;
      .visitor-commonStyle-cont{
        margin-left: 0.3rem;
        line-height: 0.8rem;
      }
      .visitor-commonStyle-data{
        height: 2rem;
        padding-left: 0.4rem;
      }
    }
  }
  .visitor-commonStyle-img{
    display: flex;
    width: 100vw;
    height: 1.6rem;
    font-size: 0.35rem;
    background-color: #ffffff;
    .visitor-commonStyle-cont{
      margin-left: 0.3rem;
      line-height: 1.6rem;
    }
  }
  .visitor-password{
    width: 90%;
    height: 0.8rem;
    background-color: rgb(247,52,118);
    margin: 0.3rem auto;
    border-radius: 0.5rem;
    text-align: center;
    line-height: 0.8rem;
    color: #ffffff;
  }
  .visitor-password-cont{
    width: 100vw;
    height: 2rem;
    background-color: #ffffff;
    text-align: center;
    line-height: 2rem;
  }
  .nulldiv{
    height: 2rem;
  }
</style>
