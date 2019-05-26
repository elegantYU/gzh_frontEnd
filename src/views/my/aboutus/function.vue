<template>
  <div class="wp">
    <div class="ct">
      <accordion :data = 'data'></accordion>
    </div>
  </div>
</template>
<script>
import accordion from '@/components/accordion'
export default {
  name: 'function',
  data () {
    return {
      data: [
        {
          title: '标题',
          txt: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
        },
        {
          title: '标题',
          txt: '内容'
        },
        {
          title: '标题',
          txt: '内容'
        },
        {
          title: '标题',
          txt: '内容'
        }
      ]
    }
  },
  components: {
    accordion
  }
}
</script>
<style lang="scss" scoped>
.wp {
  width: 100%;
  height: 100%;
  background: #efeff4;
}
.ct {
  padding-top: 0.2rem;
}
</style>
