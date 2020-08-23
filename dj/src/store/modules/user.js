import {getBalance} from "../../common/api/user"

const user = {
    namespaced: true,
    state: {
       loginFlag:false,
       userData:'',
       type:1,//默认游戏 1 lol 2 云顶
       balance:0,
       userInfo:''
    },
    mutations: {
       SET_LOGIN_FLAG(state,bool){
        state.loginFlag=bool
       },
       SET_USER_DATA(state,data){
        state.userData=data
       },
       SET_TYPE(state,num){
        state.type=num
        sessionStorage.setItem('type',num);
       },
       SET_BLANCE(state,num){
        state.balance=num
       },
       SET_USER_INFO(state,info){
        state.userInfo=info
       }
    },
    actions: {
        getBalance({ commit }, userId) {
            if(!userId)return
            getBalance(userId).then(res=>{
                if(res.resultCode=='0000'){
                    commit('SET_BLANCE', res.data)
                }
            }) 
        }

    }
}

export default user
