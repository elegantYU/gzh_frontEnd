<template>
  <div class="contact-wp">
    <div class="contact-con">
      <p class="village">{{village}}</p>
      <panel v-for="c in contact" :key="c.id" :data="c"></panel>
    </div>
  </div>
</template>
<script>
import panel from '@/components/panel'

export default {
  name: 'contact',
  data () {
    return {
      contact: []
    }
  },
  computed: {
    village () {
      return this.$store.state.village
    }
  },
  props: {},
  components: {
    panel
  },
  methods: {
    f_getlist () {
      this.$http
        .get('/admin/property/members')
        .then(res => {
          if (res.data.data) {
            const data = res.data.data
            this.contact.push(...data)
          }
        })
    }
  },
  mounted () {
    this.f_getlist()
    // for(var i=0;i<5;i++){
    //   setTimeout(() => {
    //     console.log(i)
    //   }, 1000*i)
    // }
  }
}
</script>
<style lang="scss" scoped>
.contact-wp {
  width: 100%;
  height: 100%;
  background: #efeff4;
  .contact-con{
    padding-bottom: 1.2rem;
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
}
</style>
