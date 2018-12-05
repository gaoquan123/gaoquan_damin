import axios from 'axios'
const state = {
        token:''
}
const getters = {

}
const mutations = {
    // 登陆储存
    set_token(state,token){
        state.token = token.token
        sessionStorage.token = token.token
    },
    del_token(state) {
        state.token = ''
        sessionStorage.removeItem('token')
     }
  
}
const actions = {
 
}

export default{
    state,getters,mutations, actions
}