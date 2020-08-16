const user = {
    namespaced: true,
    state: {
       loginFlag:false,
       userData:''
    },
    mutations: {
       SET_LOGIN_FLAG(state,bool){
        state.loginFlag=bool
       },
       SET_USER_DATA(state,data){
        state.userData=data
       }
    },
    actions: {
        // setUserIfo({ commit }, info) {
        //   commit('CLEAR_USER_DATA', info)
        // }

    }
}

export default user
