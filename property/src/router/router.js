import Vue from 'vue'
import Router from 'vue-router'
import wxsdk from '../utils/wxsdk'

Vue.use(Router)
const baseUrl = 'http://zjphtech.com'

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'app', meta: { title: '首页' }, components: () => import('../views/App.vue') },
  ]
})

router.afterEach((to, from, next) => {
  document.title = to.meta.title
  // 每个页面都注册config
  wxsdk.init(`${baseUrl}${to.fullPath}`)
})

export default router