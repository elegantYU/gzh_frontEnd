<template>
  <div class="wp">
    <div class="search">
      <input type="text" placeholder="输入小区名称进行搜索">
      <img class="serch-icon" :src="require('@/assets/images/pickads/search.png')" alt="">
    </div>
    <div class="pick-wp">
      <div class="left">
        <div class="fa" v-for="(v, index) in left"
        :key="v.id"
        :class="{active: index === activeIndex}"
        @click="f_clickLeft(v)"><i></i><span>{{v.name}}</span></div>
      </div>
      <div class="rigth">
        <div class="child" v-for="v in right"
        :key="v.id"
        @click="f_clickRight(v)">{{v.name}}</div>
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
      right: [],
      activeIndex: 0
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
              // res.data.data.map(v => {
              //   this.left.push(v.name)
              // })
              this.left = res.data.data
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
              // for (var i = 0; i < this.right.length - 1; i++) {
              //   this.left.push(' ')
              // }
            }
          })
      })
    },
    f_clickLeft (v) {
      console.log('clickLeft', v)
      switch (v.region) {
        case 'province':
          this.params = {
            configCode: 'provinceSynchroKey',
            orgCode: v.id
          }
          break
        case 'city':
          this.params = {
            configCode: 'citySynchroKey',
            orgCode: v.id
          }
          break
      }
    },
    f_clickRight (v) {
      console.log('clickRight', v)
    }
  },
  mounted () {
    this.f_getList()
  }
}
</script>
<style lang="scss" scoped>
.wp {
  background: #efeff4;
  width: 100%;
  height: 100%;
  padding-top: 0.18rem;
}
.pick-wp {
  display: flex;
  .left {
    width: 2.4rem;
    .fa {
      height: 0.88rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eaeaea;
      border-bottom: 0.01rem solid #c2c2c2;
      &:nth-of-type(1) {
        border-top: 0.01rem solid #c2c2c2;
      }
    }
    i {
      width: 0.1rem;
      height: 100%;
      background: #eaeaea;
    }
    span {
      flex: 1;
    }
    .active {
      i {
        background: #f73476;
      }
    }
  }
  .rigth {
    flex: 1;
    .child {
      height: 0.88rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      &:nth-of-type(1) {
        border-top: 0.01rem solid #c2c2c2;
      }
      border-bottom: 0.01rem solid #c2c2c2;
    }
  }
}
.search {
  position: relative;
  width: 6.9rem;
  margin: 0 auto 0.18rem;
  input {
    text-indent: 1rem;
    width: 6.9rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background: #fff;
    border-radius: 0.05rem;
    font-size: 0.2rem;
  }
  .serch-icon {
    width: 0.33rem;
    position: absolute;
    left: 0.29rem;
    top: 0.15rem;
  }
}
</style>
