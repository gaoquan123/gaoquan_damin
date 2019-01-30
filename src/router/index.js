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
import LenderDetails from '@/components/Subjects/LenderDetails'




// 二级路由
import Details from '@/components/AllAssetsList/details/details'
import CreateSubject from '@/components/AllAssetsList/asset/CreateSubject'
import modifySubject from '@/components/AllAssetsList/asset/modify-subject'
import CreateSubjectLoan from '@/components/AllAssetsList/asset/CreateSubjectLoan'
import modifyPersionLoanSubject from '@/components/AllAssetsList/asset/modify-personal-loan-subject'
import AssetsEdit from '@/components/AllAssetsList/asset/Assetsdit'
import CreateEnterpriseUser from '@/components/Usermanage/CreateEnterpriseUser'




Vue.use(Router)
const router = new Router({
    // "*":'/admins/login',
    routes: [
           {
            path:"/",
            redirect: "/admins/login",
           },
          {
            path: '/admins/login',
            name: 'Login',
            component: Login,
            meta: {
                auth: false
            }
          },
          {
            path: '/admins/allassetslist',
            name: 'AllAssetsList',
            component: AllAssetsList,
          },
          {
            path: '/admins/allassetslist/assetsedit',
            name: 'AssetsEdit',
            component: AssetsEdit
          },
          {
            path: '/admins/allassetslist/CreateSubject',
            name: 'CreateSubject',
            component: CreateSubject
          },
          {
            path: '/admins/allassetslist/modifySubject',
            name: 'modifySubject',
            component: modifySubject
          },
          {
            path: '/admins/allassetslist/Createsubjectloan',
            name: 'CreateSubjectLoan',
            component: CreateSubjectLoan
          },
          {
            path: '/admins/allassetslist/modifyPersionLoanSubject',
            name:'modifyPersionLoanSubject',
            component: modifyPersionLoanSubject
          },
          {
            path: '/admins/allassetslist/subjectinfo',
            name: 'SubjectInfo',
            component: SubjectInfo
          },
          {
            path: '/admins/allassetslist/details',
            name: 'details',
            component: Details
          },
          {
            path: '/admins/allassetslist/addhannel',
            name: 'AddChannel',
            component: AddChannel
          },

          {
            path: '/admins/subjects',
            name: 'Subjects',
            component: Subjects,
          },
          {
          path: '/admins/subjects/lenderDetails',
          name: 'LenderDetails',
          component: LenderDetails,
          },
          {
            path: '/admins/usermanage',
            name: 'Usermanage',
            component: Usermanage
          },
          {
            path: '/admins/poweradmin',
            name: 'PowerAdmin',
            component: PowerAdmin
          },
          {
            path: '/admins/poweradmin/superadmin',
            name: 'SuperAdmin',
            component: SuperAdmin
          },
          {
            path: '/admins/usermanage/createEnterpriseUser',
            name: 'CreateEnterpriseUser',
            component: CreateEnterpriseUser
          },
      ]
})
router.beforeEach((to, from, next) => {
    var userInfo = Cookies.get('_csrf');//获取浏览器缓存的用户信息
    if(userInfo){ //如果有就直接到首页
        next();
    } else {
        if(to.path=='/admins/login'){ //如果是登录页面路径，就直接next()
            next();
        } else { //不然就跳转到登录；
            next('/admins/login');
        }

    }
})

export default router;
