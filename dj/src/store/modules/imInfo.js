
import {Message} from 'element-ui'

const imInfo = {
  namespaced: true,
  state: {
    current: Date.now(), // 当前时间
    intervalID: 0,
    message: undefined,
    currentUserProfile: {},
    isLogin: false,
    isSDKReady: false, // TIM SDK 是否 ready
    userID: 0,
    userSig: '',
    sdkAppID: 0,
  },
  mutations: {
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
      },
      updateCurrentUserProfile(state, userProfile) {
        state.currentUserProfile = userProfile
      },
      toggleIsLogin(state, isLogin) {
        console.log(state,isLogin)
        state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
      },
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
  },
  actions: {
    logout(context) {
      // 若有当前会话，在退出登录时已读上报
      if (context.rootState.conversation.currentConversation.conversationID) {
        tim.setMessageRead({ conversationID: context.rootState.conversation.currentConversation.conversationID })
      }
      // tim.logout().then(() => {
      //   context.commit('toggleIsLogin')
      //   context.commit('stopComputeCurrent')
      //   context.commit('reset')
      // })
    }

  }
}

export default imInfo
