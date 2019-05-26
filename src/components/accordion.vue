<template>
  <div class="accordion-wp">
    <div v-for="(d, index) in data" :key="d.id">
      <p class="title" @click="showTxt(index)">
        {{index + 1}}.{{d.title}}
        <img :class="[index === activeIndex ? 'arrow' : 'down']" :src="[index === activeIndex ? down : arrow]" alt="">
      </p>
      <div v-show="index === activeIndex" class="txt">{{d.txt}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'accordion',
  data () {
    return {
      arrow: require('@/assets/images/my/arrow.png'),
      activeIndex: null,
      down: require('@/assets/images/my/down.png')
    }
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [
          {
            title: '标题',
            txt: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
          },
          {
            title: '标题',
            txt: '内容'
          }
        ]
      }
    }
  },
  methods: {
    showTxt (index) {
      if (index === this.activeIndex) { // 点击同一行
        this.activeIndex = null
      } else {
        this.activeIndex = index
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  cursor: pointer;
  position: relative;
  text-indent: 0.4rem;
  height: 1.02rem;
  line-height: 1.02rem;
  border-bottom: 0.01rem solid #ddd;
  text-align: left;
  font-size: 0.32rem;
  color: #000;
  background: #fff;
}
.txt {
  padding: 0.28rem 0.4rem;
  text-align: left;
  background: #efeff4;
  font-size: 0.22rem;
  color: #a2a2a5;
  line-height: 0.31rem;
}
.arrow {
  width: 0.36rem;
  position: absolute;
  right: 0.4rem;
  top: 0.33rem;
}
.down {
  width: 0.24rem;
  position: absolute;
  right: 0.4rem;
  top: 0.33rem;
}
</style>
