import Vue from 'vue'
import Vuex from 'vuex'
import login from './ModelStore/login'
import allassetslist from './ModelStore/allassetslist'
import subjects from './ModelStore/subjects'
import vuexAlong  from 'vuex-along'




Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        login,allassetslist,subjects
    },
    plugins:[vuexAlong]
    
})