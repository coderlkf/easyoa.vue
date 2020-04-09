import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutation'
import actions from '@/store/action'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    currentPage: '未知页面'//当前页面标题
  },
  mutations,
  actions,
  modules: {}
})