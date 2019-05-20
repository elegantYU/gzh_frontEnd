import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'app', meta: { title: '首页' }, components: () => import('../App.vue') },
    { path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      children: [
        { path: '/home/index', name: 'index', meta: { title: '首页' }, component: () => import('../views/index/Index.vue') },
        // 报修
        { path: '/home/myrepair', name: 'myRepair', meta: { title: '我的报修' }, component: () => import('../views/index/repair/myRepair.vue') },
        // 我的
        { path: '/home/my', name: 'my', meta: { title: '我的' }, component: () => import('../views/my/index.vue') },
        // 邻里共享
        { path: '/home/neighbor', name: 'neighbor', component: () => import('../views/index/neighbor/index.vue') },
        // 环境秩序
        { path: '/home/environment', name: 'environment', meta: { title: '环境秩序' }, component: () => import('../views/index/all/environment/index.vue') },
        // 全部
        { path: '/home/all', name: 'all', meta: { title: '我的' }, component: () => import('../views/index/all/index.vue') }
      ]
    },
    { path: '/willrepair', name: 'willRepair', meta: { title: '我要报修' }, component: () => import('../views/index/repair/willRepair.vue') },
    { path: '/goreport', name: 'goreport', meta: { title: '我要上报' }, component: () => import('../views/index/all/environment/goReport.vue') },
    { path: '/repairdetail/:id', name: 'repairDetail', meta: { title: '报修详情' }, component: () => import('../views/index/repair/repairDetail.vue') },
    { path: '/neighbor/self', name: 'neighborSelf', meta: { title: '我要共享' }, component: () => import('../views/index/neighbor/self.vue') },
    { path: '/neighbor/detail', name: 'neighborDetail', meta: { title: '共享详情' }, component: () => import('../views/index/neighbor/detail.vue') },
    { path: '/neighbor/ordetDetail', name: 'neighborOD', meta: { title: '共享详情' }, component: () => import('../views/index/neighbor/orderDetail.vue') },
    // 宠物
    { path: '/pet', name: 'pet', meta: { title: '我的宠物' }, component: () => import('../views/index/all/pet/index.vue') },
    { path: '/pet/add', name: 'petAdd', meta: { title: '宠物登记' }, component: () => import('../views/index/all/pet/add.vue') },
    // 我的房屋
    { path: '/my/house/index', name: 'house', meta: { title: '我的房屋' }, component: () => import('../views/my/house/index.vue') },
    { path: '/my/house/add', name: 'houseAdd', meta: { title: '房屋认证' }, component: () => import('../views/my/house/add.vue') },
    // 我的车辆
    { path: '/my/car/index', name: 'car', meta: { title: '我的车辆' }, component: () => import('../views/my/car/index.vue') },
    { path: '/my/car/add', name: 'carAdd', meta: { title: '添加车辆' }, component: () => import('../views/my/car/add.vue') },
    // 我的车位
    { path: '/my/park/index', name: 'park', meta: { title: '我的车位' }, component: () => import('../views/my/parking/index.vue') },
    { path: '/my/park/add', name: 'parkAdd', meta: { title: '添加车位' }, component: () => import('../views/my/parking/add.vue') },
    // 帮助中心
    { path: '/my/help/index', name: 'help', meta: { title: '帮助中心' }, component: () => import('../views/my/help/index.vue') },
    { path: '/my/help/question', name: 'helpQues', meta: { title: '常见问题' }, component: () => import('../views/my/help/question.vue') },
    { path: '/my/help/guide', name: 'helpGuide', meta: { title: '新手指引' }, component: () => import('../views/my/help/guide.vue') },
    // 缺省页 用户登录注册但是没有房子就出现这个
    { path: '/my/house/no', name: 'no', meta: { title: '我的房屋' }, component: () => import('../views/my/house/noHouse.vue') },
    // 登录注册
    { path: '/login', name: 'login', meta: { title: '登录' }, component: () => import('../views/login/Login.vue') },
    { path: '/register', name: 'register', meta: { title: '注册' }, component: () => import('../views/login/Register.vue') },
    // 省市选择
    { path: '/pick', name: 'pick', meta: { title: '省市选择' }, component: () => import('../components/picker.vue') },
    // 意见反馈
    { path: '/feedback', name: 'feedback', meta: { title: '意见反馈' }, component: () => import('../views/my/aboutus/feedback.vue') },
    { path: '/success', name: 'success', meta: { title: '反馈成功' }, component: () => import('../views/my/aboutus/success.vue') },
    // 关于我们
    { path: '/aboutus', name: 'aboutus', meta: { title: '关于我们' }, component: () => import('../views/my/aboutus/index.vue') },
    // 功能介绍
    { path: '/function', name: 'function', meta: { title: '功能介绍' }, component: () => import('../views/my/aboutus/function.vue') }

  ]
})

router.afterEach((to, from, next) => {
  document.title = to.meta.title
})

export default router
