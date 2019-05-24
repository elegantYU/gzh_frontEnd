<template>
  <div class="panel">
    <div class="partment">{{data.partment}}</div>
    <div class="contact-leader">
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
      <a class="tel-a" :href="'tel:'+li.tel">
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
  background: #fff;
  width: 7rem;
  margin: 0 auto;
  border-radius: 0.1rem;
  margin-bottom: 0.5rem;
  .partment {
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.34rem;
    color: #b2b2b2;
    border-bottom: 0.01rem solid #e5e5e5;
  }
  .contact-li,
  .contact-leader {
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: left;
    font-size: 0.34rem;
    border-bottom: 0.01rem solid #e5e5e5;
    span {
      display: inline-block;
      &:nth-of-type(1) {
        width: 2.19rem;
        text-indent: 0.2rem;
        color: #b2b2b2;
      }
      &:nth-of-type(2) {
        width: 1.63rem;
        color: #000;
      }
      &:nth-of-type(3) {
        width: 2.45rem;
        color: #000;
      }
    }
  }
  .contact-li {
    &:nth-last-of-type(){
      border: none;
    }
  }
  .telicon {
    width: 0.4rem;
    vertical-align: middle;
  }
}
</style>
