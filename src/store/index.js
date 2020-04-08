import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutation'
import actions from '@/store/action'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations,
  actions,
  modules: {}
})