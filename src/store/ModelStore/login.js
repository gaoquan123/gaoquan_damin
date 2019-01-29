const state = {
        token:'',
        id:'',
        roles:{}
}
const getters = {

}
const mutations = {
    // 登陆储存
    set_token(state,token){
        state.token = token.token
        sessionStorage.token = token.token
    },
    // 当前用户ID
    setId(state,id){
        state.id = id.id;
    },
    // 权限
    setroles(state,roles){
        state.roles = roles.roles;
    }
}
const actions = {
 
}

 

export default{
    state,getters,mutations, actions
}