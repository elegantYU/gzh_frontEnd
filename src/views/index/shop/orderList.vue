<template>
  <div class="so_wrapper">
    <div class="so_container">
      <div class="so_header">
        <i></i>
        <div class="so_header_deta">
          <p>账务就 161321545132</p>
          <div class="so_header_place">
            <mu-select v-model="v_params.addressInfo" :solo="true" placeholder="请先选择收货地址">
              <mu-option v-for="(v,i) in v_house" :key="i" :label="v.name" :value="v.name"></mu-option>
            </mu-select>
          </div>
        </div>
      </div>
      <div class="so_content">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v_params: {
        addressInfo: ''
      },
      v_house: []
    }
  },
  methods: {
    
  }
}
</script>

<style lang='scss' scoped>
.so_wrapper{
  background-color: #efeff4;
  height: 100%;
  .so_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;

  }
}
</style>
