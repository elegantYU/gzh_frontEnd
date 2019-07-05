<template>
  <div class="wp">
    <div class="search">
      <img class="serch-icon" :src="require('@/assets/images/pickads/search.png')" alt="">
      <input type="text" placeholder="输入小区名称进行搜索">
    </div>
    <div class="ps-wp">
      <img class="ps-icon" :src="require('@/assets/images/pickads/ps.png')" alt="">
      <ul class="clearfix">
        <li
          v-for="(v, i) in v_nav"
          :key="i"
          @click="f_nav(v, i)"
        >{{ v.name }}</li>
      </ul>
    </div>
    <div class="pick-wp">
      <div class="left">
        <div class="fa" v-for="(v, i) in v_left"
        :key="i"
        :class="{active: i === activeIndex}"
        @click="f_left(v, i)"><i></i><span>{{v.name}}</span></div>
      </div>
      <div class="rigth">
        <div class="child" v-for="(v, i) in v_right"
        :key="i"
        @click="f_right(v, i)">{{v.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pickads',
  data () {
    return {
      // new data
      activeIndex: 0,
      v_left: [],
      v_right: [],
      v_current: [],
      v_form: {
        provinceId: '',
        cityId: '',
        areaId: '',
        streetId: '',
        communityId: '',
        residentiaId: '',
        province: '',
        city: '',
        area: '',
        street: '',
        community: '',
        residentia: ''
      },
      v_nav: [],
      v_activeIndex: 0,   // 记录用户点击流程
      v_provice: [],      // 做数据留存
      v_city: [],
      v_area: [],
      v_street: [],
      v_community: [],
      v_residentia: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'login') {
        const params = { memberId: vm.$store.state.user.id }
        vm.$http
          .get('/admin/member/house/cache/get', { params })
          .then(({ data: { data: res }}) => {
            if (res) {
              vm.$store.commit('setCurrentPlace', res)
              vm.$store.commit('setVillage', res.village)
              vm.$store.commit('setVillageCode', res.villageCode)
              vm.$router.replace({ name: 'index' })
            }
          })
      }
    })
  },
  mounted () {
    this.f_init()
  },
  methods: {
    async f_savePlace (obj) {
      const params = { ...obj, memberId: this.$store.state.user.id, villageCode: this.$store.state.villageCode }
      await this.$http
        .post('/admin/member/house/cache/save', params)
    },
    async f_init () {
      const params = {
        configCode: 'provinceSynchroKey',
        orgCode: '0'
      }
      const { data: { data: res }} = await this.$http
        .get('/obtain/config/linkage', { params })

      // 初始化 填满左右
      this.v_left = [...res]
      this.v_provice = [...res]
      this.v_nav.push(this.v_left[0])
      this.f_getList({ id: '1020' })
        .then(r => {
          this.v_right = this.v_current.slice(0)
        })
    },
    async f_getList (v) {
      let type
      switch (this.v_activeIndex) {
        case 0:
          type = 'citySynchroKey'
          break
        case 1:
          type = 'areaSynchroKey'
          break
        case 2:
          type = 'streetSynchroKey'
          break
        case 3:
          type = 'communitySynchroKey'
          break
        case 4:
          type = 'residentiaSynchroKey'
          break
      }
      const params = {
        configCode: type,
        orgCode: v.id
      }

      const { data: { data: res }} = await this.$http
        .get('/obtain/config/linkage', { params })

      this.v_current = [...res]
      switch (this.v_activeIndex) {
        case 0:
          this.v_city = [...res]
          break
        case 1:
          this.v_area = [...res]
          break
        case 2:
          this.v_street = [...res]
          break
        case 3:
          this.v_community = [...res]
          break
        case 4:
          this.v_residentia = [...res]
          break
      }
    },
    f_left (v, i) {
      this.activeIndex = i
      // 点击左侧 根据id和v_activeIndex 获取右侧数据和改变nav
      this.v_nav.splice(this.v_activeIndex, 1, v)
      this.f_getList(v)
        .then(r => {
          this.v_right = this.v_current.slice(0)
        })
    },
    f_right (v, i) {
      this.activeIndex = 0
      this.v_activeIndex++
      this.v_nav.splice(this.v_activeIndex, 1, v)
      // 点击右侧 前进步数
      if (this.v_activeIndex > 4) {
        const obj = {
          regionId: `${this.v_nav[0].orgCode},${this.v_nav[1].orgCode},${this.v_nav[2].orgCode}`,
          region: `${this.v_nav[0].name},${this.v_nav[1].name},${this.v_nav[2].name}`,
          streetId: this.v_nav[3].id,
          street: this.v_nav[3].name,
          communityId: this.v_nav[4].id,
          community: this.v_nav[4].name,
          villageId: this.v_nav[5].id,
          village: this.v_nav[5].name,
        }
        this.$store.commit('setCurrentPlace', obj)
        this.$store.commit('setVillage', this.v_nav[5].name)
        this.$store.commit('setVillageCode', this.v_nav[5].orgCode)
        console.log('所有信息', obj, this.v_nav, obj)
        this.f_savePlace(obj)
        this.$router.replace({ name: 'index' })
        return
      }

      this.v_left = this.v_right.slice(0)
      this.f_getList(v, i)
        .then(r => {
          this.v_right = this.v_current.slice(0)
        })
    },
    // 点击nav
    f_nav (v, i) {
      this.v_nav.splice(i + 1, this.v_nav.length)
      this.v_activeIndex = i
      this.f_getList(v)
        .then(r => {
          this.v_right = this.v_current.slice(0)
          this.v_left = []
          switch (i) {
            case 0:
              this.v_left = this.v_provice
              break
            case 1:
              this.v_left = this.v_city
              break
            case 2:
              this.v_left = this.v_area
              break
            case 3:
              this.v_left = this.v_street
              break
            case 4:
              this.v_left = this.v_community
              break
            case 5:
              this.v_left = this.v_residentia
              break
          }
        })
    },
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
      font-size: 0.3rem;
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
      font-size: 0.3rem;
      &:nth-of-type(1) {
        border-top: 0.01rem solid #c2c2c2;
      }
      border-bottom: 0.01rem solid #c2c2c2;
    }
  }
}
.search {
  display: flex;
  align-items: center;
  width: 6.9rem;
  margin: 0 auto 0.18rem;
  padding-left: 0.2rem;
  background: #fff;
  input {
    text-indent: 2em;
    flex: 1;
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 0.05rem;
    font-size: 0.2rem;
  }
  .serch-icon {
    width: 0.33rem;
    height: 0.33rem;
  }
}
.ps-wp {
  // position: relative;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: left;
  background: #fff;
  font-size: 0.26rem;
  padding-left: 0.3rem;
  display: flex;
  align-items: center;
  .ps-icon {
    // position: absolute;
    width: 0.2rem;
  }
  ul{
    height: 0.9rem;
    flex: 1;
    li{
      float: left;
      height: 100%;
      line-height: 0.9rem;
      padding: 0 0.1rem;
      position: relative;
      &::after{
        position: absolute;
        content: '>';
        display: inline-block;
        right: -0.03rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.26rem;
      }
      &:last-of-type{
        &::after{
          content: ''
        }
      }
    }
  }
}
</style>
