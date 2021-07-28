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
      },
    },
    {
      path: "/brch",
      component: Branch,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/category",
      component: Cate,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/sale",
      component: () =>
        import(/* webpackChuckName:"Sale" */ "./views/SalePad.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/salelimit",
      component: () =>
        import(/* webpackChuckName:"SaleLimit" */ "./views/SaleLimit.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: "/prizemgr",
      component: () =>
        import(/* webpackChuckName:"PayRate" */ "./views/PayRateMgr.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: "/salereport",
      component: () =>
        import(/* webpackChuckName:"SaleReport" */ "./views/SaleReport.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/winreport",
      component: () =>
        import(/* webpackChuckName:"WinReport" */ "./views/WinReport.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/lotterymgr",
      component: () =>
        import(/* webpackChuckName:"LotteryMgr" */ "./views/LotteryMgr.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: "/memgroup",
      component: () =>
        import(/* webpackChuckName:"Member" */ "./views/GroupMgr.vue"),
      meta: {
        requireAuth: true,
        requireAdmin: true,
      },
    },
    {
      path: "/member",
      component: () =>
        import(/* webpackChuckName:"Member" */ "./views/Member.vue"),
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
      component: () =>
        import(/* webpackChuckName:"MemberList" */ "./views/MemberList.vue"),
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
