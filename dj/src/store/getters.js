const getters = {
    userData:state=>{
        return state.user.userData
    },
    loginFlag:state=>{
        return state.user.loginFlag
    },
    type:state=>{
        return state.user.type
    },
    balance:state=>{
        return state.user.balance
    },
    userInfo:state=>{
        return state.user.userInfo
    },
}
export default getters
