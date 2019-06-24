<template>
    <div class="whole">
      <div class="whole_list" @click="jumpDetails">
        <div class="whole_list_cont">
          <div class="whole_list_cont_tit">{{v_tit}}</div>
          <div class="whole_list_cont_subject">由是大袋的还会带大海击打击啊大海的哈皇帝大家爱还带哈登打和ID和达和是啥都还哈登的</div>
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
  width: 90%;
  margin: auto;
  .whole_list{
    display: flex;
    height: 1.6rem;
    border-bottom: 0.02rem solid black;
    background-color: #f2f2f2;
    .whole_list_cont{
      padding: 0.1rem 0.2rem;
      .whole_list_cont_tit{
        text-align: left;
        font-size: 0.3rem;
        margin-bottom: 0.1rem;
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
      margin-top: 0.1rem;
    }
  }
}
</style>
