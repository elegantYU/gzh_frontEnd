<template>
  <div class="pet_wrapper">
    <div class="pet_container">
      <h6>康馨园小区</h6>
      <ul>
        <li
          class="pet_item"
          v-for="(v, i) in v_list"
          :key="i"
        >
          <div class="pet_input">
            <label>宠物品种</label>
            <p>{{ v.petBreed }}</p>
          </div>
          <div class="pet_input">
            <label>昵称</label>
            <p>{{ v.petName }}</p>
          </div>
          <div class="pet_input">
            <label>性别</label>
            <p>{{ v.gender }}</p>
          </div>
          <div class="pet_input">
            <label>健康免疫证编号</label>
            <p>{{ v.exemptionNum }}</p>
          </div>
          <div class="pet_input">
            <label>状态</label>
            <p>{{ v.sts }}</p>
          </div>
        </li>
      </ul>
      <div class="pet_submit" @click="f_submit">添加宠物登记</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pet',
  data () {
    return {
      v_list: [
        { petBreed: '', petName: '', gender: '', exemptionNum: '', sts: '' }
      ]
    }
  },
  methods: {
    f_getList () {
      let params = {
        userId: 1,
        pageNum: 10,
        pageSize: 10
      }
      this.$http
        .get('/admin/member/pet/getMePetListByPage', { params })
        .then(res => {
          console.log(res.data.data)
          this.v_list.concat(res.data.data)
        })
    },
    f_submit () {

    }
  }
}
</script>

<style lang='scss' scoped>
.pet_wrapper{
  background-color: #efeff4;
  height: 100%;
  .pet_container{
    background-color: #efeff4;
    padding-bottom: 1.2rem;
    h6{
      height: 0.9rem;
      color: #999;
      background-color: #fff;
      font-size: 0.36rem;
      line-height: 0.9rem;
    }
    ul{
      padding: 0.2rem 0.25rem 0;
      margin-bottom: 1rem;
      .pet_item{
        width: 7rem;
        height: 4.5rem;
        border-radius: 0.15rem;
        background-color: white;
        box-shadow: 0.1rem 0 0.3rem 0 rgba(0, 0, 0, 0.05);
        margin-bottom: 0.5rem;
        .pet_input{
          border-bottom: 1px solid #e5e5e5;
          height: 0.9rem;
          font-size: 0.34rem;
          padding: 0 0.4rem;
          display: flex;
          &:last-of-type{
            border: none;
          }
          label{
            width: 1.4rem;
            height: 100%;
            line-height: 0.9rem;
            color: #b2b2b2;
            text-align: left;
          }
          p{
            flex: 1;
            height: 100%;
            line-height: 0.9rem;
            text-align: right;
            &.house_unchecked{
              color: #0000ff;
            }
          }
        }
      }
    }
    .pet_submit{
      border-radius: 0.15rem;
      line-height: 0.9rem;
      width: 7rem;
      height: 0.9rem;
      color: #f64682;
      font-size: 0.3rem;
      background-color: #fff;
      box-shadow: 0.1rem 0 0.3rem 0 rgba(0, 0, 0, 0.05);
      cursor: pointer;
      margin: 0 auto;
    }
  }
}
</style>
