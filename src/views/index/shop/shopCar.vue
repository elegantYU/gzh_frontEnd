<template>
  <div class="sc_wrapper">
    <div class="sc_header">
      <span>共<b>1</b>件宝贝</span>
      <span :class="v_delete ? 'active' : ''">管理</span>
    </div>
    <div class="sc_container">
      <div class="sc_content">
        <mu-load-more :loading="v_loading" @load="f_load" :loaded-all="v_laodAll">
          <mu-list>
            <template v-for="(v, i) in v_list">
              <div class="sc_list" :key="i" >
                <div class="sc_list_check">
                  <i ></i>
                </div>
                <div class="sc_list_img">
                  <img src="" alt="">
                </div>
                <div class="sc_list_detail">
                  <h6>商品名称</h6>
                  <div class="sc_list_detail_desc"></div>
                  <div class="sc_list_detail_footer">
                    <b>￥ 128.00</b>
                    <s>158.00</s>
                    <div class="sc_list_count">
                      <i>-</i><span>0</span><i>+</i>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </mu-list>
        </mu-load-more>
      </div>
    </div>
     <div class="sc_footer">
      <span><i></i>全选</span>
      <p>合计：<b>￥ 128.00</b></p>
      <button>下单</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_list: [],
      v_start: 1,
      v_loading: false,
      v_laodAll: false,
      v_delete: false
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    async f_getList () {
      const { data: { data: result } } = await this.$http
        .post(`/admin/cart/list?memberId=${this.$store.state.user.id}&villageCode=${this.$store.state.villageCode}&start=${v_start}&pageSize=10`)
      
      this.v_laodAll = result.length > 0 ? false : true
      this.v_list.push(...result)
    },
    f_load () {
      this.v_loading = true
      setTimeout(() => {
        this.v_loading = false
        this.v_start++
        this.f_getList()
      }, 1000)
    }
  }
}
</script>

<style lang='scss' scoped>
.sc_wrapper{
  height: 100%;
  background-color: #efeff4;
  .sc_header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    display: flex;
    padding: 0 0.3rem;
    justify-content: space-between;
    align-items: center;
    span{
      color: #333333;
      font-size: 0.24rem;
      b{
        color: #e01212;
      }
      &.active{
        color: #f64682;
      }
    }
  }
  .sc_container{
    background-color: #efeff4;
    .sc_content{
      background-color: #fff;
      .sc_list{
        height: 2.22rem;
        border-top: 1px solid #f4f4f4;
        border-bottom: 1px solid #f4f4f4;
        padding: 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .sc_list_check{
          width: 0.64rem;
          position: relative;
          i{
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 0.35rem;
            height: 0.35rem;
            border-radius: 50%;
            border: 2px solid #c9c9c9;
            &.active{
              border: none;
              background-repeat: no-repeat;
              background-size: contain;
              background-position: 50%;
              background-image: url('../../../assets/images/shop/checked.png');
            }
          }
        }
        .sc_list_img{
          display: flex;
          align-items: center;
          width: 1.6rem;
          height: 100%;
          img{
            max-width: 100%;
          }
        }
        .sc_list_detail{
          flex: 1;
          padding-left: 0.2rem;
          h6{
            display: block;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.28rem;
            color: #333;
            font-weight: bold;
            margin-bottom: 0.18rem;
          }
          .sc_list_detail_desc{
            margin-bottom: 0.18rem;
            font-size: 0.2rem;
            color: #999;
            line-height: 1.5em;
            text-overflow: -o-ellipsis-lastline;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
          }
          .sc_list_detail_footer{
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            b{
              color: #e01212;
              font-size: 0.24rem;
            }
            s{
              color: #333;
              font-size: 0.16rem;
              text-align: left;
            }
            .sc_list_count{
              height: 0.3rem;
              border: 1px solid #aeaeae;
              font-size: 0.24rem;
              i{
                padding: 0 0.15rem;
                line-height: 0.3rem;
                color: #666666;
                cursor: pointer;
              }
              span{
                padding: 0 0.2rem;
                border-left: 1px solid #aeaeae;
                border-right: 1px solid #aeaeae;
              }
            }
          }
        }
      }
    }
  }
  .sc_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.88rem;
    display: flex;
    padding-left: 0.3rem;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    span{
      font-size: 0.28rem;
      color: #333333;
      i{
        display: inline-block;
        width: 0.35rem;
        height: 0.35rem;
        border-radius: 50%;
        border: 2px solid #c9c9c9;
        vertical-align: text-bottom;
        margin-right: 0.15rem;
        &.active{
          border: none;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: 50%;
          background-image: url('../../../assets/images/shop/checked.png');
        }
      }
    }
    p{
      font-size: 0.28rem;
      margin-left: auto;
      margin-right: 0.2rem;
      color: #333333;
      b{
        color: #e01212;
      }
    }
    button{
      display: block;
      width: 2rem;
      height: 100%;
      line-height: 0.88rem;
      color: #fff;
      background-color: #f64682;
    }
  }
}
</style>
