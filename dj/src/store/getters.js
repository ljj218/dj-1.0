const getters = {
    userData: state => {
        return state.user.userData
    },
    isLogin: state => {
        return state.user.isLogin
    },
    type: state => {
        return state.user.type
    },
    balance: state => {
        return state.user.balance
    },
    userInfo: state => {
        return state.user.userInfo
    },
    hidden: (state) => {
        // eslint-disable-next-line no-unused-vars
        const temp = state.user.current
        if (typeof document.hasFocus !== 'function') {
            return document.hidden
        }
        return !document.hasFocus()
    },
    currentUserProfile: state => {
        return state.user.currentUserProfile
    },
    isSDKReady: state => {
        return state.user.isSDKReady
    },

    currentConversation: state => {
        return state.user.currentConversation
    },

    isBusy: state => {
        return state.user.isBusy
    },
    userID: state => {
        return state.user.userID
    }
}
export default getters

