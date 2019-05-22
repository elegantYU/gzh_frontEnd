<template>
  <div class="contact-wp">
    <p class="village">{{village}}</p>
    <panel v-for="c in contact" :key="c.id" :data="c"></panel>
  </div>
</template>
<script>
import panel from '@/components/panel'
export default {
  name: 'contact',
  data () {
    return {
      village: '康馨苑小区',
      contact: [
        {
          partment: '工程部',
          leader: {
            name: '诸葛亮',
            tel: '12345678909'
          },
          watchman: [
            {
              name: '刘备12',
              tel: '12345678909'
            },
            {
              name: '刘备2',
              tel: '12345678909'
            }
          ]
        },
        {
          partment: '施工部',
          leader: {
            name: '诸葛亮',
            tel: '12345678909'
          },
          watchman: [
            {
              name: '刘备12',
              tel: '12345678909'
            }
          ]
        }
      ]
    }
  },
  props: {},
  components: {
    panel
  }
}
</script>
<style lang="scss" scoped>
.contact-wp {
  width: 100%;
  height: 100%;
  background: #efeff4;
  .village {
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.34rem;
    color: #999999;
    background: #fff;
    margin-bottom: 0.2rem;
  }
}
</style>
