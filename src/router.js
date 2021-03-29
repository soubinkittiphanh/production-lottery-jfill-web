import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import Home from "./views/HelloUser.vue";
// import Sale from "./components/SalePad.vue";
// import SaleReport from "./views/SaleReport.vue";
// import WinReport from "./views/WinReport.vue";
// import LotteryMgr from "./views/LotteryMgr.vue";
import Member from "./views/Member.vue";
// import MemberList from "./views/MemberList.vue";
// import SaleLimit from "./views/SaleLimit.vue";
// import PayRate from "./views/PayRateMgr.vue";
// import Esc from "./views/EscPos.vue";
import Logout from "./views/Logout.vue";
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
      },
    },
    // {
    //   path: "/esc",
    //   component: Esc,
    //   meta: {
    //     requireAuth: true,
    //   },
    // },
    {
      path: "/sale",
      component: ()=>import (/* webpackChuckName:"Sale" */"./views/SalePad.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/salelimit",
      component: ()=>import (/* webpackChuckName:"SaleLimit" */"./views/SaleLimit.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: "/prizemgr",
      component: ()=>import (/* webpackChuckName:"PayRate" */"./views/PayRateMgr.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: "/salereport",
      component: ()=>import (/* webpackChuckName:"SaleReport" */"./views/SaleReport.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/winreport",
      component:()=>import (/* webpackChuckName:"WinReport" */"./views/WinReport.vue") ,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/lotterymgr",
      component: ()=>import (/* webpackChuckName:"LotteryMgr" */"./views/LotteryMgr.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: "/member",
      component: ()=>import (/* webpackChuckName:"Member" */"./views/Member.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
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
      component: ()=>import (/* webpackChuckName:"MemberList" */"./views/MemberList.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
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
  } else if (to.meta.requireUnAuth && store.getters.isAuth) {
    next("/home");
  } else if (
    to.meta.requireAuth &&
    to.meta.requireAdmin &&
    store.getters.isAdmin !== "true"
  ) {
    next("/sale");
  } else {
    next();
  }
});

export default router;
