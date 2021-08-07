import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import Home from "./views/HelloUser.vue";
import Cate from "./views/CategoryMgr.vue";
import Member from "./views/Member.vue";
import Logout from "./views/Logout.vue";
import Branch from "./views/BranchMgr.vue";
// import MemGroup from "./views/GroupMgr.vue";
import store from "./store/index";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login, meta: { requireUnAuth: true } },
    {
      path: "/home",
      component: Home,
      meta: {
        requireAuth: true,
        requireHome:true,
      },
    },
    {
      path: "/brch",
      component: Branch,
      meta: {
        requireAuth: true,
        requireBranch:true,
      },
    },
    {
      path: "/category",
      component: Cate,
      meta: {
        requireAuth: true,
        requireCategory:true,
      },
    },
    {
      path: "/sale",
      component: () =>
        import(/* webpackChuckName:"Sale" */ "./views/SalePad.vue"),
      meta: {
        requireAuth: true,
        requireSale:true,
      },
    },
    {
      path: "/salelimit",
      component: () =>
        import(/* webpackChuckName:"SaleLimit" */ "./views/SaleLimit.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
        requireLimited:true,
      },
    },
    {
      path: "/prizemgr",
      component: () =>
        import(/* webpackChuckName:"PayRate" */ "./views/PayRateMgr.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
        requirePrized:true,
      },
    },
    {
      path: "/salereport",
      component: () =>
        import(/* webpackChuckName:"SaleReport" */ "./views/SaleReport.vue"),
      meta: {
        requireAuth: true,
        requireSaleRe:true,
      },
    },
    {
      path: "/winreport",
      component: () =>
        import(/* webpackChuckName:"WinReport" */ "./views/WinReport.vue"),
      meta: {
        requireAuth: true,
        requireWinRe:true,
      },
    },
    {
      path: "/lotterymgr",
      component: () =>
        import(/* webpackChuckName:"LotteryMgr" */ "./views/LotteryMgr.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
        requireISM:true,
      },
    },
    {
      path: "/memgroup",
      component: () =>
        import(/* webpackChuckName:"Member" */ "./views/GroupMgr.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
        requireGroup:true,
      },
    },
    {
      path: "/member",
      component: () =>
        import(/* webpackChuckName:"Member" */ "./views/Member.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
        requireMemberCreate:true,
      },
    },
    
    {
      path: "/member/:userid",
      component: Member,
      meta: {
        requireAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: "/memberlist",
      component: () =>
        import(/* webpackChuckName:"MemberList" */ "./views/MemberList.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
        requireMemberList:true,
      },
    },
    {
      path: "/logout",
      component: Logout,
      meta: {
        requireAuth: true,
      },
    },

    { path: "/:notFound(.*)", redirect: "/home" }, //Handle invalid enter route
  ],
});
router.beforeEach(function(to, _, next) {
  if (to.meta.requireAuth && !store.getters.isAuth) {
    next("/");
  }else if(to.meta.requireISM&&store.getters.rights['m_home']!=1){
    console.log("+++++++CHECK+++++"+store.getters.rights['m_home']);
    next("/home");
  }else if(to.meta.requireBranch&&store.getters.rights['m_branch']!=1){
    console.log("+++++++CHECK+++++"+store.getters.rights['m_branch']);
    next("/home");
  }else if(to.meta.requireMemberList&&store.getters.rights['m_list_member']!=1){
    console.log("+++++++CHECK+++++"+store.getters.rights['m_list_member']);
    next("/home");
  }else if(to.meta.requireGroup&&store.getters.rights['m_group']!=1){
    console.log("+++++++CHECK+++++"+store.getters.rights['m_group']);
    next("/home");
  }else if(to.meta.requireWinRe&&store.getters.rights['m_re_win']!=1){
    console.log("+++++++CHECK+++++"+store.getters.rights['m_re_win']);
    next("/home");
  }else if(to.meta.requireSaleRe&&store.getters.rights['m_re_sale']!=1){
    console.log("+++++++CHECK+++++"+store.getters.rights['m_re_sale']);
    next("/home");
  }else if(to.meta.requirePrized&&store.getters.rights['m_pay_rate']!=1){
    console.log("+++++++CHECK+++++"+store.getters.rights['m_pay_rate']);
    next("/home");
  }else if(to.meta.requireLimited&&store.getters.rights['m_limited_price']!=1){
    console.log("+++++++CHECK+++++"+store.getters.rights['m_limited_price']);
    next("/home");
  }else if(to.meta.requireSale&&store.getters.rights['m_sale']!=1){
    console.log("+++++++CHECK+++++"+store.getters.rights['m_sale']);
    next("/home");
  }else if(to.meta.requireCategory&&store.getters.rights['m_category']!=1){
    console.log("+++++++CHECK+++++"+store.getters.rights['m_category']);
    next("/home");
  }else if(to.meta.requireMemberCreate&&store.getters.rights['m_add_member']!=1){
    console.log("+++++++CHECK+++++"+store.getters.rights['m_add_member']);
    next("/home");
  } else if (to.meta.requireUnAuth && store.getters.isAuth) {
    next("/home");
  } else if (to.meta.requireAuth && to.meta.requireAdmin &&  store.getters.isAdmin !== "true") {
    next("/sale");
  } else {
    next();
  }
});

export default router;
