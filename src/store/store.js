import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wxcode: '',
    user: {},         // id name phoneNum headIcon
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
    neighborRouter (state, r) {
      state.neighbor.router = r
    }
  },
  actions: {
    setUser (context, obj) {
      context.commit('setUser', obj)
    }
  }
})
