import Vue from 'vue'
import Router from 'vue-router'
// 一级路由
import Login from '@/components/Login/Login'
import AllAssetsList from '@/components/AllAssetsList/Allassetslist'
import SubjectInfo from '@/components/AllAssetsList/SubjectInfo'
import AddChannel from '@/components/AllAssetsList/AddChannel'
import Subjects from '@/components/Subjects/Subjects'
import Usermanage from '@/components/Usermanage/Usermanage'
import PowerAdmin from '@/components/PowerAdmin/PowerAdmin'
import SuperAdmin from '@/components/PowerAdmin/SuperAdmin/SuperAdmin'




// 二级路由
import Details from '@/components/AllAssetsList/details/details'
import NewSubject from '@/components/AllAssetsList/asset/NewSubject'
import NewSubjectLoan from '@/components/AllAssetsList/asset/NewSubjectLoan'
import AssetsEdit from '@/components/AllAssetsList/asset/Assetsdit'




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
            path: '/admin/allassetslist/assetsedit',
            name: 'AssetsEdit',
            component: AssetsEdit
          },
          {
            path: '/admin/allassetslist/newsubject',
            name: 'NewSubject',
            component: NewSubject
          },
          {
            path: '/admin/allassetslist/newsubjectloan',
            name: 'NewSubjectLoan',
            component: NewSubjectLoan
          },
          {
            path: '/admin/allassetslist/subjectinfo',
            name: 'SubjectInfo',
            component: SubjectInfo
          },
          {
            path: '/admin/allassetslist/details',
            name: 'details',
            component: Details
          },
          {
            path: '/admin/allassetslist/addhannel',
            name: 'AddChannel',
            component: AddChannel
          },

          {
            path: '/admin/subjects',
            name: 'Subjects',
            component: Subjects,
          },
          {
            path: '/admin/usermanage',
            name: 'Usermanage',
            component: Usermanage
          },
          {
            path: '/admin/poweradmin',
            name: 'PowerAdmin',
            component: PowerAdmin
          },
          {
            path: '/admin/poweradmin/superadmin',
            name: 'SuperAdmin',
            component: SuperAdmin
          },
      ]
})
router.beforeEach((to, from, next) => {
    var userInfo = Cookies.get('_csrf');//获取浏览器缓存的用户信息
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
