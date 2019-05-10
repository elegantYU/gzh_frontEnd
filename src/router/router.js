import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'app',
      meta: {
        title: '首页'
      },
      components: () => import('../App.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      children: [
        {
          path: '/home/index',
          name: 'index',
          meta: {
            title: '首页'
          },
          component: () => import('../views/index/Index.vue')
        },
        // 报修
        {
          path: '/home/myrepair',
          name: 'myrepair',
          meta: {
            title: '我的报修'
          },
          component: () => import('../views/index/repair/myRepair.vue')
        },
      ]
    },
    {
      path: '/willrepair',
      name: 'willrepair',
      meta: {
        title: '我要报修'
      },
      component: () => import('../views/index/repair/willRepair.vue')
    },
    {
      path: '/repairdetail/:id',
      name: 'repairdetail',
      meta: {
        title: '报修详情'
      },
      component: () => import('../views/index/repair/repairDetail.vue')
    },
    // 登录注册
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册'
      },
      component: () => import('../views/login/Register.vue')
    }
  ]
})

router.afterEach((to, from, next) => {
  document.title = to.meta.title
})

export default router
