import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wxcode: '',
    user: {},         // id name phoneNum headIcon
    house: [],
    neighbor: {
      router: ''
    }
  },
  mutations: {
    setWxcode (state, code) {
      state.wxcode = code
    },
    setUser (state, obj) {
      state.user = Object.assign({}, obj)
    },
    setHouse (state, obj) {
      obj.map(v => state.house.push(v))
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
    }
  }
})
