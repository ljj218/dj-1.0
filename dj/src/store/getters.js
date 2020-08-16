const getters = {
    userData:state=>{
        
        return state.user.userData
    },
    loginFlag:state=>{
        return state.user.loginFlag
    }
}
export default getters
