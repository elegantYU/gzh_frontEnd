import Vue from 'vue'
import Router from 'vue-router'
import wxsdk from '../utils/wxsdk'

Vue.use(Router)
const baseUrl = 'http://zjphtech.com'

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL, // process.env.BASE_URL
  routes: [
    { path: '/', name: 'app', meta: { title: '首页' }, components: () => import('../App.vue') },
    { path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      children: [
        { path: '/home/index', name: 'index', meta: { title: '物业首页' }, component: () => import('../views/index/IndexProperty.vue') },
        // 报修
        { path: '/home/repair', name: 'repair', meta: { title: '物业维修' }, component: () => import('../views/index/repair/repair.vue') },
        // 预警
        { path: '/home/earlyWarning', name: 'earlyWarning', meta: { title: '预警处理' }, component: () => import('../views/index/earlyWarning/index.vue') },
        // 小区头条
        { path: '/home/topic', name: 'topic', meta: { title: '小区头条' }, component: () => import('../views/index/topic/index.vue') },
        // 邻里共享
        { path: '/home/neighbor', name: 'neighbor', component: () => import('../views/index/neighbor/index.vue') },
        // 失物招领
        { path: '/home/lostFuond', name: 'lostFound', meta: { title: '失物招领' }, component: () => import('../views/index/lostFound/index.vue') },
        // 超市
        { path: '/shop',
          name: 'shop',
          meta: { title: '生活超市' },
          component: () => import('../views/index/shop/index.vue'),
          children: [
            { path: '/shop/more', name: 'shopMore', meta: { title: '生活超市' }, component: () => import('../views/index/shop/more.vue') },
            { path: '/shop/category', name: 'shopCategory', meta: { title: '生活超市' }, component: () => import('../views/index/shop/category.vue') },
            { path: '/shop/search', name: 'shopSearch', meta: { title: '生活超市' }, component: () => import('../views/index/shop/search.vue') }
          ]
        },
        // 联系物业
        { path: '/home/contact', name: 'contact', meta: { title: '联系物业' }, component: () => import('../views/index/contactProperty/contact.vue') }
      ]
    },
    // 选择地址
    { path: '/home/pickads', name: 'pickads', meta: { title: '选择地址' }, component: () => import('../views/index/pickads.vue') },
    // 发布
    { path: '/publish', name: 'publish', meta: { title: '发布' }, component: () => import('../views/index/publish.vue') },
    // 报修详情
    { path: '/home/repair/details', name: 'repairDetail', meta: { title: '详情页' }, component: () => import('../views/index/repair/repairDetail.vue') },
    // 预警事件详情
    { path: '/home/earlyWarning/equipment', name: 'equipment', meta: { title: '详情页' }, component: () => import('../views/index/earlyWarning/earlyDetail.vue') },
    { path: '/home/earlyWarning/detailIn', name: 'detailIn', meta: { title: '详情页' }, component: () => import('../views/index/earlyWarning/detailIn.vue') },
    // 头条
    { path: '/topic/detail', name: 'topicDetail', meta: { title: '详情' }, component: () => import('../views/index/topic/detail.vue') },
    { path: '/topic/otherDetail', name: 'noticeDetail', meta: { title: '详情' }, component: () => import('../views/index/topic/policyDetail.vue') },
    { path: '/topic/policydetail', name: 'policyDetail', meta: { title: '详情' }, component: () => import('../views/index/topic/policyDetail.vue') },
    { path: '/topic/publish', name: 'topicPublish', meta: { title: '发布头条' }, component: () => import('../views/index/topic/publish.vue') },
    // 共享
    { path: '/neighbor/self', name: 'neighborSelf', meta: { title: '我要共享' }, component: () => import('../views/index/neighbor/self.vue') },
    { path: '/neighbor/detail', name: 'neighborDetail', meta: { title: '共享详情' }, component: () => import('../views/index/neighbor/detail.vue') },
    // 失物招领
    { path: '/lostFound/publish', name: 'lfPublish', meta: { title: '我要发布' }, component: () => import('../views/index/lostFound/publish.vue') },
    { path: '/lostFound/detail', name: 'lfDetail', meta: { title: '详情页' }, component: () => import('../views/index/lostFound/detail.vue') },
    // 停车服务
    { path: '/park/service', name: 'parkService', meta: { title: '停车服务' }, component: () => import('../views/index/park/index.vue') },
    { path: '/park/detail', name: 'parkDetail', meta: { title: '详情页' }, component: () => import('../views/index/park/detail.vue') },
    // 超市
    { path: '/shop/detail', name: 'shopItemDetail', meta: { title: '商品详情' }, component: () => import('../views/index/shop/detail.vue') },
    { path: '/shop/car', name: 'shopCar', meta: { title: '购物车' }, component: () => import('../views/index/shop/shopCar.vue') },
    { path: '/shop/order', name: 'shopOrderList', meta: { title: '订单' }, component: () => import('../views/index/shop/orderList.vue') },
    // 宠物
    { path: '/pet', name: 'pet', meta: { title: '我的宠物' }, component: () => import('../views/index/pet/index.vue') },
    { path: '/pet/detail', name: 'petDetail', meta: { title: '宠物详情' }, component: () => import('../views/index/pet/detail.vue') },
    // 智慧停车
    { path: '/home/smartPark', name: 'smartPark', meta: { title: '智慧停车' }, component: () => import('../views/index/smartPark/index.vue') },
    // 登录注册
    { path: '/login', name: 'login', meta: { title: '登录' }, component: () => import('../views/login/Login.vue') },
    { path: '/register', name: 'register', meta: { title: '注册' }, component: () => import('../views/login/Register.vue') }
  ]
})

router.afterEach((to, from, next) => {
  document.title = to.meta.title
  // 每个页面都注册config
  wxsdk.init(`${baseUrl}${to.fullPath}`)
})

export default router
