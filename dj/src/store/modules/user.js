import { getBalance } from "../../common/api/user"
import {Message} from 'element-ui'

const user = {
  namespaced: true,
  state: {
    isLogin: false,
    userData: '',
    type: 1,//默认游戏 1 lol 2 云顶
    balance: 0,
    userInfo: '',
    currentUserProfile: {},
    isSDKReady: false, // TIM SDK 是否 ready
    userID: 0,
    userSig: '',
    sdkAppID: 0,
    current: Date.now(), // 当前时间
    intervalID: 0,
    message: undefined
  },
  mutations: {
    SET_LOGIN_FLAG(state, bool) {
      state.isLogin = bool
    },
    SET_USER_DATA(state, data) {
      state.userData = data
    },
    SET_TYPE(state, num) {
      state.type = num
      sessionStorage.setItem('type', num);
    },
    SET_BLANCE(state, num) {
      state.balance = num
    },
    SET_USER_INFO(state, info) {
      state.userInfo = info
    },
    updateCurrentUserProfile(state, userProfile) {
      state.currentUserProfile = userProfile
    },
    // toggleIsLogin(state, isLogin) {
    //   state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
    // },
    toggleIsSDKReady(state, isSDKReady) {
      state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
    },
    reset(state) {
      Object.assign(state, {
        currentUserProfile: {},
        isLogin: false,
        isSDKReady: false // TIM SDK 是否 ready
      })
    },
    GET_USER_INFO(state, payload) {
      state.userID = payload.userID
      state.userSig = payload.userSig
      state.sdkAppID = payload.sdkAppID
    },
    startComputeCurrent(state) {
      state.intervalID = setInterval(() => {
        state.current = Date.now()
      }, 500)
    },
    stopComputeCurrent(state) {
      clearInterval(state.intervalID)
      state.intervalID = 0
    },
    showMessage(state, options) {
      if (state.message) {
        state.message.close()
      }
      state.message = Message({
        message: options.message,
        type: options.type || 'success',
        duration: options.duration || 2000,
        offset: 40
      })
    }
  },
  actions: {
    getBalance({ commit }, userId) {
      if (!userId) return
      getBalance(userId).then(res => {
        if (res.resultCode == '0000') {
          commit('SET_BLANCE', res.data)
        }
      })
    },
    logout(context) {
      // 若有当前会话，在退出登录时已读上报
      if (context.rootState.conversation.currentConversation.conversationID) {
        tim.setMessageRead({ conversationID: context.rootState.conversation.currentConversation.conversationID })
      }
      tim.logout().then(() => {
        // context.commit('toggleIsLogin')
        context.commit('stopComputeCurrent')
        context.commit('reset')
      })
    },
   

  }
}

export default user
