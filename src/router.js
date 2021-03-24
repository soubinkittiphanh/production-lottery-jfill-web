import {createRouter,createWebHistory} from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/HelloUser.vue';
import Sale from './components/SalePad.vue';
import SaleReport from './views/SaleReport.vue';
import WinReport from './views/WinReport.vue';
import LotteryMgr from './views/LotteryMgr.vue';
import Member from './views/Member.vue';
import MemberList  from './views/MemberList.vue';
import SaleLimit  from './views/SaleLimit.vue';
import PayRate  from './views/PayRateMgr.vue';
import Logout  from './views/Logout.vue';
import store from './store/index';
const router=createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',component:Login,meta:{requireUnAuth:true}},
        {path:'/home',component:Home,meta:{
            requireAuth:true
        }},
        {path:'/sale',component:Sale,meta:{
            requireAuth:true,
        }},
        {path:'/salelimit',component:SaleLimit,meta:{
            requireAuth:true,
            requireAdmin:true,
        }},
        {path:'/prizemgr',component:PayRate,meta:{
            requireAuth:true,
            requireAdmin:true,
        }},
        {path:'/salereport',component:SaleReport,meta:{
            requireAuth:true
        }},
        {path:'/winreport',component:WinReport,meta:{
            requireAuth:true
        }},
        {path:'/lotterymgr',component:LotteryMgr,meta:{
            requireAuth:true,
            requireAdmin:true,
        }},
        {path:'/member',component:Member,meta:{
            requireAuth:true,
            requireAdmin:true,
        }},
        {path:'/member/:userid',component:Member,meta:{
            requireAuth:true,
            requireAdmin:true,
        }},
        {path:'/memberlist',component:MemberList,meta:{
            requireAuth:true,
            requireAdmin:true,
        }},
        {path:'/logout',component:Logout,meta:{
            requireAuth:true
        }},
        
        {path:'/:notFound(.*)',redirect:'/home'} //Handle invalid enter route
    ]
});
router.beforeEach(function(to,_,next){
    if(to.meta.requireAuth && !store.getters.isAuth){
        next('/');
    }else if(to.meta.requireUnAuth && store.getters.isAuth){
        next('/home');
    }else if(to.meta.requireAuth && to.meta.requireAdmin && store.getters.isAdmin!=='true'){
        next('/sale');
    }else{
        next();
    }
});

export default router;