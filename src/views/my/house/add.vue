<template>
  <div class="ha_wrapper">
    <div class="ha_container">
      <div class="ha_form">
        <h6>房屋信息</h6>
        <div class="ha_input">
          <label>区域</label>
          <div class="ha_input_box">
            <input type="text" readonly v-model="v_form.region" >
          </div>
        </div>
        <div class="ha_input">
          <label>街道</label>
          <div class="ha_input_box">
            <!-- <mu-select v-model="v_form.street" :solo="true" placeholder="请选择街道" @change="f_getList('communitySynchroKey', v_form.street)">
              <mu-option v-for="(v,i) in v_street" :key="i" :label="v.name" :value="v.name"></mu-option>
            </mu-select> -->
            <input type="text" readonly v-model="v_form.street">
          </div>
        </div>
        <div class="ha_input">
          <label>社区</label>
          <div class="ha_input_box">
            <!-- <mu-select v-model="v_form.community" :solo="true" placeholder="请选择社区" @change="f_getList('residentiaSynchroKey', v_form.community)">
              <mu-option v-for="(v,i) in v_community" :key="i" :label="v.name" :value="v.name"></mu-option>
            </mu-select> -->
            <input type="text" readonly v-model="v_form.community">
          </div>
        </div>
        <div class="ha_input">
          <label>小区</label>
          <div class="ha_input_box">
            <!-- <mu-select v-model="v_form.village" :solo="true" placeholder="请选择小区" @change="f_getBuilding('buildingSynchroKey', v_form.village)">
              <mu-option v-for="(v,i) in v_residentia" :key="i" :label="v.name" :value="v.name"></mu-option>
            </mu-select> -->
            <input type="text" readonly v-model="v_form.village">
          </div>
        </div>
        <div class="ha_input">
          <label>楼幢</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.building" :solo="true" placeholder="请选择楼幢" @change="f_getBuilding('unitSynchroKey', v_form.building)">
              <mu-option v-for="(v,i) in v_building" :key="i" :label="v.name" :value="v.name"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
        <div class="ha_input">
          <label>单元</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.unit" :solo="true" placeholder="请选择单元" @change="f_getBuilding('houseSynchroKey', v_form.unit)">
              <mu-option v-for="(v,i) in v_unit" :key="i" :label="v.name" :value="v.name"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
        <div class="ha_input">
          <label>室</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.room" :solo="true" placeholder="请选择室">
              <mu-option v-for="(v,i) in v_house" :key="i" :label="v.name" :value="v.name"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
      </div>
      <div class="ha_form">
        <h6>身份信息</h6>
        <div class="ha_input">
          <label>身份</label>
          <div class="ha_input_box">
            <mu-select v-model="v_form.identityInformation" :solo="true" placeholder="请选择身份">
              <mu-option v-for="(v,i) in v_identity" :key="i" :label="v" :value="v"></mu-option>
            </mu-select>
          </div>
          <i></i>
        </div>
      </div>
      <div class="ha_form">
        <h6>个人信息</h6>
        <div class="ha_input">
          <label>姓名</label>
          <div class="ha_input_box">
            <input type="text" placeholder="请输入真实姓名" v-model="v_form.name">
          </div>
        </div>
        <div class="ha_input">
          <label>身份证号</label>
          <div class="ha_input_box">
            <input type="text" placeholder="请输入正确的身份证号" v-model="v_form.idNumber">
          </div>
        </div>
        <div class="ha_input">
          <label>联系方式</label>
          <div class="ha_input_box">
            <input type="text" placeholder="请填写对应的联系方式" v-model="v_form.phone">
          </div>
        </div>
      </div>
      <div class="ha_submit" @click="f_submit">提交</div>
      <!-- 三级 -->
      <div class="ha_bottom_wrapper" v-show="v_show">
        <div class="ha_bottom_mask" @click="f_closeSelect"></div>
        <div class="ha_bottom_select">
          <div class="ha_bottom_list">
            <b>省</b>
            <div class="ha_bottom_item_scroll">
              <ul>
                <li
                  v-for="(v, i) in v_provice"
                  :key="i"
                  @click="f_getList('citySynchroKey', v)"
                  :class="v.active ? 'ha_bottom_selected' : ''"
                >{{ v.name }}</li>
              </ul>
            </div>
          </div>
          <div class="ha_bottom_list">
            <b>市</b>
            <div class="ha_bottom_item_scroll">
              <ul>
                <li
                  v-for="(v, i) in v_city"
                  :key="i"
                  @click="f_getList('areaSynchroKey', v)"
                  :class="v.active ? 'ha_bottom_selected' : ''"
                >{{ v.name }}</li>
              </ul>
            </div>
          </div>
          <div class="ha_bottom_list">
            <b>区</b>
            <div class="ha_bottom_item_scroll">
              <ul>
                <li
                  v-for="(v, i) in v_area"
                  :key="i"
                  @click="f_getList('streetSynchroKey', v)"
                  :class="v.active ? 'ha_bottom_selected' : ''"
                >{{ v.name }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HouseAdd',
  data () {
    return {
      v_area: ['区域A', '区域B', '区域C', '区域D', '区域E', '区域F'],
      v_form: {
        memberId: 0,                // 用户id,
        name: '',                   //姓名
        regionId: '',               // 省市区编码（用，号拼接）
        region: '',                 //省市区
        streetId: 0,                //街道id
        street: '',                 //街道名称
        communityId: 0,             //社区id
        community: '',              //社区名称
        villageId: 0,               //小区id
        village: '',                //小区名称
        buildingId: 0,              //楼幢id
        building: '',               //楼幢名称
        unitId: 0,                  //单元id
        unit: '',                   //单元名
        roomId: 0,                  //室id
        room: 0,                    //室
        identityInformation: '',    //身份信息
        idNumber: '',               // 身份证
        phone: '',                  // 联系电话啊
        searchWord: '',             //将上述省市区街道小区楼幢室组合起来
        villageCode: ''
      },
      v_provice: [],
      v_city: [],
      v_area: [],
      v_street: [],
      v_community: [],
      v_residentia: [],
      v_building: [],
      v_unit: [],
      v_house: [],
      v_identity: ['业主', '亲属', '租客'],
      v_show: false,
      v_common: ''
    }
  },
  mounted () {
    this.v_form.memberId = this.$store.state.user.id
    this.v_form.villageCode = this.$store.state.villageCode
    this.v_form.regionId = this.$store.state.currentPlace.regionId
    this.v_form.region = this.$store.state.currentPlace.region
    this.v_form.streetId = this.$store.state.currentPlace.streetId
    this.v_form.street = this.$store.state.currentPlace.street
    this.v_form.communityId = this.$store.state.currentPlace.communityId
    this.v_form.community = this.$store.state.currentPlace.community
    this.v_form.villageId = this.$store.state.currentPlace.villageId
    this.v_form.village = this.$store.state.village

    this.f_getBuilding('buildingSynchroKey')
    this.$toast({
      msg: '请逐级完善所有信息',
      time: 2500
    })
  },
  methods: {
    f_getList (t, v) {
      let id
      switch (t) {
        case 'communitySynchroKey':
          id = this.v_street.filter(val => val.name === v)[0].id
          break
        case 'residentiaSynchroKey':
          id = this.v_community.filter(val => val.name === v)[0].id
          break
        default:
          break
      }

      let params = {
        configCode: t,
        orgCode: v.id || id
      }

      this.$http
        .get('/obtain/config/linkage', { params })
        .then(res => {
          switch (t) {
            case 'provinceSynchroKey':
              this.v_provice = res.data.data
              this.v_provice.forEach(v => v.active = false)
              break
            case 'citySynchroKey':
              this.v_city = res.data.data
              this.v_provice.forEach(v => v.active = false)
              v.active = true
              break
            case 'areaSynchroKey':
              this.v_area = res.data.data
              this.v_city.forEach(v => v.active = false)
              v.active = true
              break
            case 'streetSynchroKey':
              this.v_street = res.data.data
              this.v_area.forEach(v => v.active = false)
              v.active = true
              this.f_closeSelect()
              // 什么数据库  啥都没有
              if (!res.data.data) {
                this.$toast('请选择其他区')
              }
              break
            case 'communitySynchroKey':
              this.v_community = res.data.data
              break
            case 'residentiaSynchroKey':
              this.v_residentia = res.data.data
              break
          }
        })
    },
    f_getBuilding (t, c) {
      let id
      let params
      switch (t) {
        case 'buildingSynchroKey':
          // id = this.v_residentia.filter(v => v.name === c)[0].id
          id = this.$store.state.currentPlace.villageId
          params = {
            configCode: t,
            relateId: id
          }
          break
        case 'unitSynchroKey':
          id = this.v_building.filter(v => v.name === c)[0].id
          params = {
            configCode: t,
            relateId: id
          }
          break
        case 'houseSynchroKey':
          id = this.v_unit.filter(v => v.name === c)[0].id
          params = {
            configCode: t,
            relateId: this.v_building.filter(v => v.name === this.v_form.building)[0].id,
            unitId: id
          }
          break
      }

      this.$http
        .get('/obtain/config/buildingRelation', { params })
        .then(res => {
          if (!res.data.data) {
            this.$toast('暂无数据')
          }
          switch (t) {
            case 'buildingSynchroKey':
              this.v_building = res.data.data
              break
            case 'unitSynchroKey':
              this.v_unit = res.data.data
              break
            case 'houseSynchroKey':
              this.v_house = res.data.data
              break
          }
        })
    },
    f_openSelect () {
      this.v_show = true
      this.v_form.regionId = ''
      this.v_form.region = ''
    },
    f_closeSelect () {
      this.v_show = false
      // 整合 regionId region
      let p = this.v_provice.filter(v => v.active)[0]
      let c = this.v_city.filter(v => v.active)[0]
      let a = this.v_area.filter(v => v.active)[0]
      this.v_form.regionId = `${p.orgCode},${c.orgCode},${a.orgCode}`
      this.v_form.region = `${p.name},${c.name},${a.name}`
    },
    f_submit () {
      let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
      
      this.v_form.buildingId = this.v_building.filter(v => v.name === this.v_form.building)[0].id
      this.v_form.unitId = this.v_unit.filter(v => v.name === this.v_form.unit)[0].id
      this.v_form.roomId = this.v_house.filter(v => v.name === this.v_form.room)[0].id
      this.v_form.searchWord = `${this.v_form.region}${this.v_form.street}${this.v_form.community}${this.v_form.village}${this.v_form.building}${this.v_form.unit}${this.v_form.room}`

      for (const key in this.v_form) {
        const el = this.v_form[key]
        if (el === '') {
          this.$toast('请完善信息')
          return false
        }
      }

      if (!reg.test(this.v_form.idNumber)) {
        this.$toast('请填写正确的身份证号')
        return false
      }

      let params = this.v_form
      this.$http
        .post('/admin/member/house/save', params)
        .then(res => {
          if (res.data.success) {
            this.$toast(res.data.msg)
            this.$router.go(-1)
          } else {
            this.$toast(res.data.msg)
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.ha_wrapper{
  background-color: #efeff4;
  height: 100%;
  .ha_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    .ha_form{
      border-top: 1px solid #e5e5e5;
      h6{
        color: #999999;
        font-size: 0.3rem;
        line-height: 1.5em;
      }
      .ha_input{
        padding: 0 0.3rem;
        background-color: #fff;
        display: flex;
        height: 0.9rem;;
        line-height: 0.9rem;
        border-bottom: 1px solid #e5e5e5;
        &:last-of-type{
          border: none;
        }
        label{
          width: 1.5rem;
          height: 100%;
          line-height: 0.9rem;
          font-size: 0.34rem;
          text-align: left;
        }
        .ha_input_box{
          flex: 1;
          .mu-input{
            display: block;
            font-size: 0.3rem;
          }
          input{
            display: block;
            font-size: 0.3rem;
            width: 100%;
            height: 100%;
          }
        }
        i{
          width: 0.25rem;
          height: 100%;
          background-image: url('../../../assets/images/repair/repair_arrow.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          vertical-align: middle;
        }
      }
    }
    .ha_submit{
      margin: 0.4rem 0.3rem 0;
      height: 0.9rem;
      background-color: #f73476;
      text-align: center;
      font-size: 0.34rem;
      color: #fff;
      line-height: 0.9rem;
      border-radius: 0.415rem;
      cursor: pointer;
    }
    .ha_bottom_wrapper{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .ha_bottom_mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
      }
      .ha_bottom_select{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3.75rem;
        background-color: #fff;
        display: flex;
        .ha_bottom_list{
          flex: 1;
          height: 100%;
          b{
            display: block;
            color: #999;
            font-size: 0.26rem;
            padding: 0.2rem 0;
            border-bottom: 1px solid #e5e5e5;
          }
          .ha_bottom_item_scroll{
            height: 3rem;
            overflow: auto;
            ul{
              width: 100%;
              height: auto;
              padding: 0.3rem 0;
              li{
                padding: 0 0.2rem;
                font-size: 0.3rem;
                height: 0.6rem;
                line-height: 0.6rem;
                border-top: 1px solid transparent;
                border-bottom: 1px solid transparent;
                &.ha_bottom_selected{
                  border-top: 1px solid #ddd;
                  border-bottom: 1px solid #ddd;
                  color: #f73476;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
