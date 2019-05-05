import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: '首页'
      },
      component: () => import('../views/index/Index.vue')
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
  console.log(to)
  document.title = to.meta.title
})

export default router
