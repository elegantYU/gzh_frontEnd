<template>
  <div class="pet_wrapper">
    <div class="pet_container">
      <h6>{{ place }}</h6>
      <ul>
        <li
          class="pet_item"
          v-for="(v, i) in v_list"
          :key="i"
          @click="f_getDetail(v)"
        >
          <div>
            <span>{{ v.raiser }}</span>
            <span>{{ v.petBreed }}</span>
          </div>
          <div>
            <span>{{ v.address }}</span>
            <span>{{ v.createTime }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pet',
  data () {
    return {
      v_list: []
    }
  },
  computed: {
    place () {
      return this.$store.state.village
    }
  },
  mounted () {
    this.f_getList()
  },
  methods: {
    f_getList () {
      let params = {
        villageCode: this.$store.state.villageCode,
        page: 1,
        rows: 100
      }

      this.$http
        .get('/admin/member/pet/system/wx/getAllPetList', { params })
        .then(res => {
          this.v_list = res.data.rows
        })
    },
    f_getDetail (v) {
      this.$router.push({ name: 'petDetail', query: { id: v.id }})
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
      padding: 0.2rem 0 0;
      margin-bottom: 1rem;
      .pet_item{
        height: 1.2rem;
        background-color: white;
        margin: 0 auto 0.5rem;
        div{
          height: 0.6rem;
          line-height: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.2rem;
          span{
            font-size: 0.28rem;
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
