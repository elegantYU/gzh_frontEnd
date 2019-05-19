<template>
  <div class="qus_wrapper">
    <div class="qus_container">
      <ul>
        <li
          v-for="(v, i) in v_list"
          :key="i"
        >
          <div class="qus_item_header" @click="f_openItem(i)">
            {{ i + 1 }}.{{ v.title }}
            <i :class="v.active ? 'qus_item_open' : ''"></i>
          </div>
          <transition name="slide">
            <div class="qus_item_body" v-show="v.active">{{ v.content }}</div>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  data () {
    return {
      v_list: [
        { title: '常见问题的标题', content: '内容内容内容内容内容内容内容内容内容内容内容内容', active: false },
        { title: '常见问题的标题', content: '内容内容内容内容内容内容内容内容内容内容内容内容', active: false },
        { title: '常见问题的标题', content: '内容内容内容内容内容内容内容内容内容内容内容内容', active: false },
        { title: '常见问题的标题', content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容', active: false }
      ]
    }
  },
  methods: {
    f_openItem (i) {
      let flag = this.v_list[i].active
      this.v_list.map(v => v.active = false)
      this.v_list[i].active = !flag
    }
  }
}
</script>

<style lang='scss' scoped>
.qus_wrapper{
  background-color: #efeff4;
  height: 100%;
  .qus_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    ul{
      padding: 0.2rem 0;
      li{
        text-align: left;
        .qus_item_header{
          height: 1rem;
          padding: 0 0.4rem;          
          line-height: 1rem;
          font-size: 0.32rem;
          font-weight: bold;
          color: #333;
          background-color: #fff;
          border-bottom: 1px solid #ddd;
          i{
            float: right;
            margin-top: 0.23rem;
            width: 0.24rem;
            height: 0.43rem;
            background-image: url('../../../assets/images/my/arrow.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
            transition: all 0.2s linear;
            &.qus_item_open{
              transform: rotate(90deg);
            }
          }
        }
        .qus_item_body{
          padding: 0.3rem 0.4rem;
          text-indent: 2em;
          font-size: 0.22rem;
          line-height: 1.5em;
          color: #676767;
        }
      }
    }
  }
}
.slide-enter-active {
  transition: all .2s;
}
.slide-leave-active{
  transition: none;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
