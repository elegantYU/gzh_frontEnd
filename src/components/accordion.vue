<template>
  <div class="wp">
    <div v-for="(d, index) in data" :key="d.id">
      <p class="title" @click="showTxt(index)">
        {{d.title}}
        <img :class="{}" :src="arrow" alt="">
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
      activeIndex: null
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
      this.activeIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
.txt {
  padding: 0.28rem 0.4rem;
  text-align: left;
  background: #efeff4;
  font-size: 0.22rem;
  color: #a2a2a5;
  line-height: 0.31rem;
}
</style>
