<template>
    <div class="visitor">
      <div class="visitor-name">{{v_from.communityName}}</div>
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
            <mu-col span="9" md="1" sm="1">
              <mu-date-input v-model="value1"  full-width container="dialog" underline-color="white" placeholder="请选择到访时间"  :solo="true"></mu-date-input>
            </mu-col>
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
        <div class="visitor-commonStyle-cont">
          访客照片
          <div class="wr_upload">
            <div class="wr_preview">
              <div
                class="wr_preview_list"
                v-for="(v, i) in v_images"
                :key="i"
              >
                <img :src="v.src" alt="">
              </div>
              <div class="wr_preview_add">
                <input type="file" multiple accept='image/*' ref="" @change="f_upload($event)">
              </div>
            </div>
            <p>请上传清晰的访客人脸照片</p>
          </div>
        </div>
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
      value1: undefined,
      v_images: [],
      v_from: {
        communityName: ''
      }
    }
  },
  mounted() {
    this.v_from.communityName = this.$store.state.village
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
    color: rgb(178,178,178);
  }
  input{
    margin-left: 0.6rem;
    height: 80%;
    margin-top: 0.08rem;
    font-size: 0.4rem;
    color: rgb(178,178,178);
  }
  form{
    display: flex;
    margin-left: 0.8rem;
    p{
      line-height: 0.8rem;
      margin-left: 0.3rem;
      color: rgb(178,178,178);
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
        position: relative;
      }
      .visitor-commonStyle-data{
        height: 0.8rem;
        padding-left: 0.1rem;
        overflow: hidden;
        .mu-text-field-input{
          color: rgb(178,178,178);
        }
        .mu-input.is-solo{
          padding: 0;
          margin-top: 0.1rem;
        }
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
    color: rgb(178,178,178);
  }
  .nulldiv{
    height: 2rem;
  }
  .wr_upload{
    display: flex;
    margin-bottom: 0.4rem;
    position: absolute;
    left: 30%;
    top: 61.5%;
    p{
      font-size: 0.25rem;
      margin-left: 0.3rem;
      line-height: 1.2rem;
      color: rgb(178,178,178);
    }
    .wr_preview{
      height: 1.2rem;
      box-sizing: border-box;
      background-color: #fff;
      .wr_preview_list{
        float: left;
        width: 1.16rem;
        height: 1.16rem;
        box-sizing: border-box;
        margin: 0 0.04rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          max-width: 100%;
          max-height: 100%;
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
        input{
          width: 0;
          opacity: 0;
        }
      }
    }
  }
</style>
