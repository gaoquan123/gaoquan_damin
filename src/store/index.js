import Vue from 'vue'
import Vuex from 'vuex'
import login from './ModelStore/login'
import allassetslist from './ModelStore/allassetslist'





Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        login,allassetslist
    }
    
})