<template>
  <div class="wp">
    <div class="tab-wp clearfix">
      <div class="tab"
      v-for="(t, index) in tabs"
      :key="t.id"
      :class="{activetab: index === tabindex}"
      @click="switchTab(index)">{{t}}</div>
    </div>
    <div class="list-wp">
      <mu-load-more
      :loading="v_loading"
      @load="f_load">
        <mu-list>
          <list v-for="l in list"
            :key="l.id"
            :data = "l"></list>
        </mu-list>
      </mu-load-more>
    </div>
  </div>
</template>
<script>
import list from '@/components/List'
export default {
  name: 'environmentIndex',
  data () {
    return {
      tabs: ['我的上报', '我要上报'],
      tabindex: 0,
      v_loading: false,
      v_loadAll: true,
      v_listNum: 1,
      list: [
        {
          title: '1幢2单元楼下绿化带破损严重绿化带破损严重',
          ct: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
          time: '2019-01-01 15:00:00',
          type: '绿化损坏',
          imgsrc: require('@/assets/images/environment/bg.png')
        }
      ]
    }
  },
  components: {
    list
  },
  methods: {
    switchTab (index) {
      this.tabindex = index
    },
    f_load () {
      this.v_loading = true
      setTimeout(() => {
        this.v_loading = false
        this.v_listNum++
        this.f_getList()
      }, 1000)
    },
    f_getList () {
      this.list = [
        {
          title: '1幢2单元楼下绿化带破损严重绿化带破损严重',
          ct: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
          time: '2019-01-01 15:00:00',
          type: '绿化损坏',
          imgsrc: require('@/assets/images/environment/bg.png')
        },
        {
          title: '1幢2单元楼下绿化带破损严重绿化带破损严重',
          ct: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
          time: '2019-01-01 15:00:00',
          type: '绿化损坏',
          imgsrc: require('@/assets/images/environment/bg.png')
        },
        {
          title: '1幢2单元楼下绿化带破损严重绿化带破损严重',
          ct: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
          time: '2019-01-01 15:00:00',
          type: '绿化损坏',
          imgsrc: require('@/assets/images/environment/bg.png')
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.wp {
  width: 100%;
  height: 100%;
  background: #efeff4;
}
.tab-wp {
  width: 5.7rem;
  margin: 0 auto;
  height: 1.06rem;
  .tab {
    float: left;
    width: 2rem;
    font-size: 0.34rem;
    color: #000;
    border-bottom: 0.1rem solid #efeff4;
    height: 0.8rem;
    line-height: 0.9rem;
    &:nth-of-type(1) {
      margin-right: 1.7rem;
    }
  }
  .activetab {
    color: #f64682;
    border-bottom: 0.1rem solid #f64682;
  }
}
</style>
