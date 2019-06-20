<template>
  <div class="surplus">
    <div class="surplus-cont">
      <div class="surplus-img">
        <img :src="Catimg" />
      </div>
      <div class="surplus-tit">
        <div class="surplus-img-tit">当前剩余车位</div>
        <div class="surplus-img-num">{{catnum}}</div>
      </div>
    </div>
    <div class="surplus-nearby">
      <div class="surplus-nearby-text">附近小区停车位</div>
      <div
        class="surplus-nearby-text-cont"
        v-for="(v, i) in v_list"
        :key="i"
      >
        <div>{{v.NAME}}</div>
        <div class="surplus-nearby-red">{{v.num}}</div>个,距离
        <div class="surplus-nearby-red">{{distance}}</div>
        <div><span class="arrow-km">km</span><img :src="Arrow" class="arrow" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Catimg from '../../../assets/images/all/13_02.gif'
import Arrow from '../../../assets/images/all/20_03.gif'
export default {
  data () {
    return {
      Catimg: Catimg,
      catnum: '55',
      sname: '计家小区',
      snamenum: '20',
      distance: '1',
      Arrow: Arrow,
      v_list: []
    }
  },
  mounted () {
    this.f_getTotal()
    this.f_getSurpulsPark()
  },
  methods: {
    async f_getTotal () {
      const params = {
        villageCode: "330105001009002001"
      }
      const { data: { data }} = await this.$http
        .get('/admin/member/parking/lot/surplus/getSurplusParkingLotNum', { params })
      
      this.catnum = data
    },
    async f_getSurpulsPark () {
      const params = {
        villageCode: "330105001009002001"
      }

      const { data: { data }} = await this.$http
        .get('/admin/member/parking/lot/getAllNearbyParkingLot', { params })
      
      data.length && this.v_list.push(...data)
    }
  }
}
</script>

<style lang='scss' scoped>
 .arrow{
   display: inline-block;
   width: 0.6rem;
   height: 0.6rem;
   float: left;
   margin-top: -0.1rem;
 }
 .arrow-km{
   float: left;
   font-size: 0.3rem;
   margin-top: 0.05rem;
 }
.surplus-img{
  width: 7.5rem;
  height: 4rem;
  position: absolute;
  top: 0;
  img{
    width: 100%;
    height: 100%;
  }
}
  .surplus-img-tit{
    position: absolute;
    top: 0.5rem;
    left: 45%;
    transform: translateX(-50%);
    font-style:italic;
    color: white;
    font-size: 0.3rem;
  }
  .surplus-img-num{
    position: absolute;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-style:italic;
    color: white;
    font-size: 1.5rem;
  }
.surplus-nearby{
  width: 80%;
  margin: auto ;
  margin-top: 4.5rem;
  .surplus-nearby-text{
    display: flex;
    font-size: 0.4rem;
  }
  .surplus-nearby-text-cont{
    display: flex;
    margin-top: 0.3rem;
    font-size: 0.36rem;
    .surplus-nearby-red{
      color: red;
    }
  }
}
</style>
