<template>
    <div class="whole">
      <div class="whole_list" @click="jumpDetails">
        <div class="whole_list_cont">
          <div class="whole_list_cont_tit">{{v_tit}}</div>
          <div class="whole_list_cont_subject">{{v_cont}}</div>
          <div class="whole_list_cont_date">
            <div>{{v_date}}</div>
            <span>{{v_types[0]}}</span>
          </div>
        </div>
        <div class="whole_list_img">

        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Whole",
  data () {
    return {
      v_lists: [],
      v_tit: '标题一',
      v_date: '2019-01-01 10: 00: 00',
      v_cont: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容',
      v_types: [
        '待确认',
        '待处理',
        '待评价',
        '待完成'
      ]
    }
  },
  methods: {
    jumpDetails () {
      this.$router.push({name:'repairDetails'})
    }
  }
}
</script>

<style scoped lang="scss">
.whole{
  .whole_list{
    display: flex;
    height: 1.6rem;
    background-color: white;
    .whole_list_cont{
      padding: 0.1rem 0.2rem;
      .whole_list_cont_tit{
        text-align: left;
        font-size: 0.3rem;
        margin-bottom: 0.1rem;
        font-weight: bold;
      }
      .whole_list_cont_subject{
        width: 4.7rem;
        height: 0.5rem;
        font-size: 0.27rem;
        overflow: hidden;
        text-align: left;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        margin-bottom: 0.2rem;
      }
      .whole_list_cont_date{
        display: flex;
        width: 4.7rem;
        text-align: left;
        span{
          margin-left: auto;
        }
      }
    }
    .whole_list_img{
      width: 1.4rem;
      height: 1.4rem;
      background-color: black;
      margin: 0.1rem 0.3rem 0;
    }
  }
}
</style>
