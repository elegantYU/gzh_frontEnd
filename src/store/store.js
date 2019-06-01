import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wxcode: '',
    user: {},         // id name phoneNum headIcon
    villageCode: '330105001001001',  // 小区id
    house: [],
    neighbor: {
      router: ''
    },
    village: '' // 小区名
  },
  mutations: {
    setWxcode (state, code) {
      state.wxcode = code
    },
    setUser (state, obj) {
      state.user = Object.assign({}, obj)
    },
    setVillageCode (state, str) {
      state.villageCode = str
    },
    setVillage (state, str) {
      state.village = str
    },
    setHouse (state, obj) {
      state.house = obj.map(v => v)
    },
    neighborRouter (state, r) {
      state.neighbor.router = r
    }
  },
  actions: {
    setUser (context, obj) {
      context.commit('setUser', obj)
    },
    setHouse (context, obj) {
      context.commit('setHouse', obj)
    },
    setVillageCode (context, str) {
      context.commit('setVillageCode', str)
    },
    setVillage (context, str) {
      context.commit('setVillage', str)
    }
  }
})
