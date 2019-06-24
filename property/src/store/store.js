import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wxInfo: {},
    user: {}, // id name phoneNum headIcon
    villageCode: '330105001001001', // 小区id
    village: '', // 小区名
    currentPlace: {}, // 当前小区的省市区
    house: [],
    neighbor: { router: '' },
    lostFound: { router: '' },
    orderParams: [], // 订单参数,
    currentRepair: {}
  },
  mutations: {
    setWxInfo: (state, obj) => (state.wxInfo = Object.assign({}, obj)),
    setUser: (state, obj) => (state.user = Object.assign({}, obj)),
    setVillageCode: (state, str) => (state.villageCode = str),
    setVillage: (state, str) => (state.village = str),
    setCurrentPlace: (state, obj) => (state.currentPlace = Object.assign({}, obj)),
    setHouse: (state, arr) => (state.house = arr.slice()),
    neighborRouter: (state, r) => (state.neighbor.router = r),
    lostFoundRouter: (state, r) => (state.lostFound.router = r),
    setOrderParams: (state, arr) => {
      state.orderParams = arr.slice(0)
    },
    setCurrentRepair: (state, obj) => (state.currentRepair = Object.assign({}, obj))
  },
  actions: {
    setUser: ({ commit }, obj) => commit('setUser', obj),
    setHouse: ({ commit }, arr) => commit('setHouse', arr),
    setVillageCode: ({ commit }, str) => commit('setVillageCode', str),
    setVillage: ({ commit }, str) => commit('setVillage', str),
    setCurrentPlace: ({ commit }, obj) => commit('setCurrentPlace', obj)
  }
})
