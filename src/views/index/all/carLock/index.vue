<template>
  <div class="ci_wrapper">
    <div class="ci_form">
      <div class="ci_input">
        <label>车位</label>
        <div class="ci_input_box">
          <mu-select v-model="v_park" :solo="true" full-width placeholder="请选择车位">
            <mu-option v-for="(v,i) in v_parks" :key="i" :label="v" :value="v"></mu-option>
          </mu-select>
        </div>
        <i></i>
      </div>
      <div class="ci_input">
        <label>当前状态</label>
        <div class="ci_input_box">
          <input type="text" readonly v-model="v_sts">
        </div>
      </div>
    </div>
    <div class="ci_submit" @click="f_getUnlock">解锁</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_sts: '',
      v_park: '',
      v_parks: []
    }
  },
  mounted () {
    this.f_getParkList()
  },
  methods: {
    async f_getParkList () {
      const params = {
        phone: this.$store.state.user.phoneNum
      }

      const { data: { data }} = await this.$http
        .get('/obtain/config/carSpinner', { params })

      if (data.length) {
        this.v_parks = data.map(v => v.carNo)
      }
    },
    async f_getLockSts (i) {
      this.v_park = this.v_parks[i]
      const params = {
        id: this.v_park.id
      }
      
      const { data: { data }} = await this.$http
        .get('/admin/lock/getLockStatus', { params })
      
      this.v_sts = data == 0 ? '已锁' : '解锁'
    },
    async f_getUnlock () {
      if (!this.v_park) {
        this.$toast('请选择车位')
        return
      }
      const params = {
        id: this.v_park.id
      }

      const { data: { success }} = await this.$http
        .get('/admin/lock/unLock', { params })
      
      success ? this.$toast('解锁成功') : this.$toast('解锁失败')
    }
  }
}
</script>

<style lang='scss' scoped>
.ci_wrapper{
  height: 100%;
  background-color: #efeff4;
  .ci_form{
    .ci_input{
      padding: 0 0.3rem;
      background-color: #fff;
      display: flex;
      align-items: center;
      height: 0.9rem;;
      line-height: 0.9rem;
      border-bottom: 1px solid #e5e5e5;
      &:last-of-type{
        border: none;
      }
      label{
        width: 1.8rem;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.34rem;
        text-align: left;
      }
      .ci_input_box{
        flex: 1;
        height: 100%;
        position: relative;
        .mu-input{
          display: block;
          font-size: 0.3rem;
        }
        input{
          display: block;
          font-size: 0.3rem;
          width: 100%;
          height: 100%;
          font-size: 0.3rem;
        }
      }
      i{
        width: 0.25rem;
        height: 100%;
        background-image: url('../../../../assets/images/repair/repair_arrow.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        vertical-align: middle;
      }
    }
  }
  .ci_submit{
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
}
</style>
