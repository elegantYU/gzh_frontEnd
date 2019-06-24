import Vue from 'vue'
import Router from 'vue-router'
import wxsdk from '../utils/wxsdk'

Vue.use(Router)
const baseUrl = 'http://zjphtech.com'

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'app', meta: { title: '首页' }, components: () => import('../App.vue') },
    { path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      children: [
        { path: '/home/index', name: 'index', meta: { title: '物业首页' }, component: () => import('../views/index/IndexProperty.vue') },
        // 报修
        { path: '/home/repair', name: 'repair', meta: { title: '物业维修' }, component: () => import('../views/index/repair/repair.vue') },
        // 小区头条
        { path: '/home/topicProperty', name: 'topicProperty', meta: { title: '小区头条' }, component: () => import('../views/index/topicProperty/index.vue') },
      ]
    },
    // 选择地址
    { path: '/home/pickads', name: 'pickads', meta: { title: '选择地址' }, component: () => import('../views/index/pickads.vue') },
    // 发布
    { path: '/publish', name: 'publish', meta: { title: '发布' }, component: () => import('../views/index/publish.vue') },
    // 报修详情
    { path: '/home/repair/details', name: 'repairDetails', meta: { title: '详情页' }, component: () => import('../views/index/repair/repairDetails.vue') },
    // 首页头条详情
    { path: '/topicProperty/detailProperty', name: 'detailProperty', meta: { title: '详情' }, component: () => import('../views/index/topicProperty/detailProperty.vue') },
    // 登录注册
    { path: '/login', name: 'login', meta: { title: '登录' }, component: () => import('../views/login/Login.vue') },
    { path: '/register', name: 'register', meta: { title: '注册' }, component: () => import('../views/login/Register.vue') }
  ]
})

router.afterEach((to, from, next) => {
  document.title = to.meta.title
  // 每个页面都注册config
  // wxsdk.init(`${baseUrl}${to.fullPath}`)
})

export default router
