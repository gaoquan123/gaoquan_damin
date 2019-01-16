// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import validatorPlugin from "./PublicMethods/validatorPlugin"
import VueParticles from 'vue-particles'
import base from './assets/base_roles'



import Vuex from 'vuex'
import $ from 'jquery'

// 超时时间
import store from './store/index'
axios.defaults.headers.common['csrf-token'] = Cookies.get('_csrf');

// Vue.directive('has', {
//     bind: function (el, binding) {
//         console.log(this,"220")
//     let roles = binding.value.roles;
//     let val = binding.value.val;
//       if(roles.indexOf(val) < 0){
//           el.parentNode.removeChild(el);
//           return false;
//       }
//     }
//   });
  





let loading;
function startLoading() {    //使用Element loading-start 方法
    loading = ElementUI.Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.2)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(validatorPlugin)
Vue.use(Vuex)
Vue.use(VueParticles)
Vue.use(base)

Vue.prototype.$axios = axios


let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}


//http request 拦截器
axios.interceptors.request.use(
    config => {
        if( sessionStorage.getItem('token')){
                config.headers.common['csrf-token']= sessionStorage.getItem('token');
        }
        showFullScreenLoading()
        return config;
    },
    error => {
        alert("请刷新重试")
        return Promise.reject(error)


    });
//http response 拦截器
axios.interceptors.response.use(
    response => {
        tryHideFullScreenLoading()
        return response;
    },
    error => {
        if (error.response) {
            if(error.response.status ==401 ){
                alert("您的登录已过期，请重新登录")
                router.replace({path: '/admin/login'})
            }
            tryHideFullScreenLoading();
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,validatorPlugin,
  components: { App },
  template: '<App/>'
})
