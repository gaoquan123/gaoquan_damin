import Vue from 'vue'

import Router from 'vue-router'
import Login from '@/components/Login/Login'
import AllAssetsList from '@/components/AllAssetsList/Allassetslist'
import NewSubject from '@/components/AllAssetsList/NewSubject'
import AssetsBIZEdit from '@/components/AllAssetsList/AssetsBIZEdit'
import AssetsPERSONEdit from '@/components/AllAssetsList/AssetsPERSONEdit'


import Subjects from '@/components/Subjects/Subjects'
import Usermanage from '@/components/Usermanage/Usermanage'



Vue.use(Router)
const router = new Router({
    routes: [
          {
            path: '/admin/login',
            name: 'Login',
            component: Login,
            meta: {
                auth: false
            }
          },
          {
            path: '/admin/allassetslist',
            name: 'AllAssetsList',
            component: AllAssetsList,
          },
          {
            path: '/admin/allassetslist/assetsbizedit',
            name: 'AssetsEdit',
            component: AssetsBIZEdit
          },
          {
            path: '/admin/allassetslist/assetspersonedit',
            name: 'AssetsEdit',
            component: AssetsPERSONEdit
          },
          {
            path: '/admin/allassetslist/newsubject',
            name: 'NewSubject',
            component: NewSubject
          },

          {
            path: '/admin/subjects',
            name: 'Subjects',
            component: Subjects
          },
          {
            path: '/admin/usermanage',
            name: 'Usermanage',
            component: Usermanage
          },

      ]
})
router.beforeEach((to, from, next) => {
    var userInfo = sessionStorage.getItem('token');//获取浏览器缓存的用户信息
    if(userInfo){ //如果有就直接到首页
        next();
    } else {
        if(to.path=='/admin/login'){ //如果是登录页面路径，就直接next()
            next();
        } else { //不然就跳转到登录；
            next('/admin/login');
        }

    }
})

export default router;
