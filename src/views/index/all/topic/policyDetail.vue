<template>
  <div class="pd-wp">
    <div class="ct">
      <p class="title">{{data.title}}</p>
      <p class="detail clearfix">
        <span class="left">来源: {{data.origin}}</span>
        <span class="right">{{data.time}}</span>
      </p>
      <img class="banner" :src="data.src" alt="">
      <div class="article">
        <p v-for="p in data.article" :key="p.id">{{p}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'policyDetail',
  data () {
    return {
      data: {
        title: '通知通告或者政策法规标题',
        origin: '物业',
        time: '2019-01-01 00:00:00',
        src: require('@/assets/images/topic/banner.png'),
        article: [
          '新华社北京5月8日电 近日，中共中央办公厅印发了《关于加强和改进城市基层党的建设工作的意见》，并发出通知，要求各地区各部门结合实际认真贯彻落实。',
          '《关于加强和改进城市基层党的建设工作的意见》全文如下。',
          '为深入贯彻习近平新时代中国特色社会主义思想，深入贯彻党的十九大和十九届二中、三中全会精神，认真落实全国组织工作会议精神，切实加强党对城市工作的领导，推动城市经济社会发展，根据党章和有关法律法规，现就加强和改进城市基层党的建设工作（以下简称城市基层党建工作）提出如下意见。',
          '一、加强和改进城市基层党建工作的重要性紧迫性',
          '城市工作在党和国家工作全局中举足轻重，是各级党委工作的重要阵地。城市基层党组织是党在城市全部工作和战斗力的基础。随着新型城'
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pd-wp {
  background-color: #ffffff;
  height: 100%;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .ct {
    width: 7rem;
    margin: 0 auto;
  }
  .title {
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.32rem;
    margin-bottom: 0.1rem;
    font-weight: 600;
  }
  .detail {
    font-size: 0.22rem;
    color: #dfdfdf;
    margin-bottom: 0.78rem;
  }
  .banner {
    width: 100%;
  }
  .article {
    text-align: left;
    p {
      line-height: 0.4rem;
      font-size: 0.22rem;
      color: #000;
      margin-bottom: 0.6rem;
      text-indent: 0.3rem;
    }
  }
}
</style>
