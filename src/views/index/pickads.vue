<template>
  <div>
    <div class="pick-wp">
      <div class="left">
        <div v-for="v in left"
        :key="v.id">{{v}}</div>
      </div>
      <div class="rigth">
        <div v-for="v in right"
        :key="v.id">{{v.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pickads',
  data () {
    return {
      params: {
        configCode: 'provinceSynchroKey',
        orgCode: '0'
      },
      left: [],
      right: []
    }
  },
  methods: {
    f_getList () {
      return new Promise((resolve, reject) => {
        this.$http
          .get('/obtain/config/linkage', { params: this.params })
          .then(res => {
            console.log(res)
            if (res.data.success) {
              res.data.data.map(v => {
                this.left.push(v.name)
              })
              resolve(res.data.data)
            }
          })
      }).then(res => {
        console.log('res', res)
        this.params = {
          configCode: 'citySynchroKey',
          orgCode: res[0].id
        }
        this.$http
          .get('/obtain/config/linkage', { params: this.params })
          .then(res => {
            console.log('市', res)
            if (res.data.success) {
              this.right = res.data.data
            }
          })
      })
    }
  },
  mounted () {
    this.f_getList()
  }
}
</script>
<style lang="scss" scoped>
.pick-wp {
  display: flex;
  .left{
    width: 1rem;
  }
  .rigth {
    flex: 1;
    // display: flex;
    // flex-direction: column;
  }
}
</style>
