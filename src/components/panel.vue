<template>
  <div class="panel">
    <div class="partment">{{data.partment}}</div>
    <div class="contact-li">
      <span>上级领导</span>
      <span>{{data.leader.name}}</span>
      <span>{{data.leader.tel}}</span>
      <a :href="'tel:'+data.leader.tel">
        <img class="telicon" :src="require('@/assets/images/contactProperty/tel.png')" alt="">
      </a>
    </div>
    <div class="contact-li" v-for="li in data.watchman" :key="li.id">
      <span>值班人</span>
      <span>{{li.name}}</span>
      <span>{{li.tel}}</span>
      <a :href="'tel:'+li.tel">
        <img class="telicon" :src="require('@/assets/images/contactProperty/tel.png')" alt="">
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'panel',
  data () {
    return {}
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
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
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.panel {
  background: '#fff';
  width: 7rem;
  margin: 0 auto;
  .partment {
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.34rem;
    color: #b2b2b2;
  }
  .contact-li {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-around;
    height: 0.9rem;
  }
  .telicon {
    width: 0.4rem;
  }
}
</style>
