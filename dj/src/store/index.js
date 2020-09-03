import Vue from 'vue'
import Vuex from 'vuex'
import conversation from './modules/conversation'
import group from './modules/group'
import imInfo from './modules/imInfo'
import friend from './modules/friend'
import blacklist from './modules/blacklist'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters,
  modules: {
    user,
    conversation,
    group,
    imInfo,
    friend,
    blacklist
  }
})