import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import conversation from './modules/conversation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  
  },

  mutations: {
   
  },
  getters,
  modules: {
    user,
    conversation
  }
})