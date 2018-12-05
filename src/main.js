// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import validatorPlugin from "./PublicMethods/validatorPlugin"

import Vuex from 'vuex'
import $ from 'jquery'


import store from './store/index'
axios.defaults.headers.common['csrf-token'] = sessionStorage.getItem('token');


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(validatorPlugin)
Vue.use(Vuex)
Vue.prototype.$axios = axios

// 添加请求拦截器
axios.interceptors.request.use(config => {
    //判断是否存在token，如果存在将每个页面header都添加token
    if( sessionStorage.getItem('token')){
        config.headers.common['csrf-token']= sessionStorage.getItem('token');
    }
    return config;
    }, error => {
    // 对请求错误做些什么
       return Promise.reject(error);
    });
    // // http response 拦截器
    axios.interceptors.response.use(
        response => {
                return response;
        },
    error => {
    if (error.response) {
        alert("您的登录已过期，请重新登录")
        sessionStorage.removeItem('token')
        router.replace({path: '/admin/login',})
 
    }
    return Promise.reject(error.response.data)
    });
    


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,validatorPlugin,
  components: { App },
//   created() {
 
//   },
  template: '<App/>'
})
