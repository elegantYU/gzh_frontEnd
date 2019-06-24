import Vue from 'vue'
import Router from 'vue-router'
import wxsdk from '../utils/wxsdk'
// import { isIos } from '../utils/utils'

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
        { path: '/home/index', name: 'index', meta: { title: '首页' }, component: () => import('../views/index/Index.vue') },
        // 物业版首页
        { path: '/home/indexProperty', name: 'indexProperty', meta: { title: '物业首页' }, component: () => import('../views/property/IndexProperty.vue') },
        // 街道版首页
        { path: '/home/indexStreet', name: 'indexStreet', meta: { title: '街道首页' }, component: () => import('../views/street/indexStreet.vue') },
        // 报修
        { path: '/home/myrepair', name: 'myRepair', meta: { title: '我的报修' }, component: () => import('../views/index/repair/myRepair.vue') },
        // 物业版报修
        { path: '/home/repair', name: 'repair', meta: { title: '物业维修' }, component: () => import('../views/property/repair/repair.vue') },
        // 访客
        { path: '/home/visitorpass', name: 'visitorpass', meta: { title: '访客通行' }, component: () => import('../views/index/visitorPass/visitorpass.vue') },
        // 我的
        { path: '/home/my', name: 'my', meta: { title: '我的' }, component: () => import('../views/my/index.vue') },
        // 邻里共享
        { path: '/home/neighbor', name: 'neighbor', component: () => import('../views/index/neighbor/index.vue') },
        // 环境秩序
        { path: '/home/environment', name: 'environment', meta: { title: '环境秩序' }, component: () => import('../views/index/all/environment/index.vue') },
        // 失物招领
        { path: '/home/lostFuond', name: 'lostFound', meta: { title: '失物招领' }, component: () => import('../views/index/lostFound/index.vue') },
        // 智慧停车
        { path: '/home/smartPark', name: 'smartPark', meta: { title: '智慧停车' }, component: () => import('../views/index/smartPark/index.vue') },
        // 车位锁
        { path: '/home/parkLock', name: 'parkLock', meta: { title: '车位锁' }, component: () => import('../views/index/all/carLock/index.vue') },
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
        // 全部
        { path: '/home/all', name: 'all', meta: { title: '我的' }, component: () => import('../views/index/all/index.vue') },
        // 头条
        { path: '/home/topic', name: 'topic', meta: { title: '小区头条' }, component: () => import('../views/index/all/topic/index.vue') },
        // 物业版小区头条
        { path: '/home/topicProperty', name: 'topicProperty', meta: { title: '小区头条' }, component: () => import('../views/property/topicProperty/index.vue') },
        // 街道版小区头条
        { path: '/home/topicStreet', name: 'topicStreet', meta: { title: '小区头条' }, component: () => import('../views/street/topicStreet/index.vue') },
        // 联系物业
        { path: '/home/contact', name: 'contact', meta: { title: '联系物业' }, component: () => import('../views/index/all/contactProperty/contact.vue') }
      ]
    },
    // 选择地址
    { path: '/home/pickads', name: 'pickads', meta: { title: '选择地址' }, component: () => import('../views/index/pickads.vue') },
    // 发布
    { path: '/publish', name: 'publish', meta: { title: '发布' }, component: () => import('../views/index/publish.vue') },
    // 报修
    { path: '/willrepair', name: 'willRepair', meta: { title: '我要报修' }, component: () => import('../views/index/repair/willRepair.vue') },
    // 环境秩序 我要上报
    { path: '/goreport', name: 'goreport', meta: { title: '我要上报' }, component: () => import('../views/index/all/environment/goReport.vue') },
    // 环境秩序 详情页面
    { path: '/godetail', name: 'godetail', meta: { title: '详情页面' }, component: () => import('../views/index/all/environment/detail.vue') },
    { path: '/repairdetail/:id', name: 'repairDetail', meta: { title: '报修详情' }, component: () => import('../views/index/repair/repairDetail.vue') },
    // 物业版报修详情
    { path: '/home/repair/details', name: 'repairDetails', meta: { title: '详情页' }, component: () => import('../views/property/repair/repairDetails.vue') },
    // 失物招领 我要发布
    { path: '/lostFound/publish', name: 'lfPublish', meta: { title: '我要发布' }, component: () => import('../views/index/lostFound/publish.vue') },
    { path: '/lostFound/detail', name: 'lfDetail', meta: { title: '详情页' }, component: () => import('../views/index/lostFound/detail.vue') },
    // 停车服务
    { path: '/park/service', name: 'parkService', meta: { title: '停车服务' }, component: () => import('../views/index/all/park/index.vue') },
    { path: '/park/apply', name: 'parkApply', meta: { title: '车位申请' }, component: () => import('../views/index/all/park/add.vue') },
    // 邻里
    { path: '/neighbor/self', name: 'neighborSelf', meta: { title: '我要共享' }, component: () => import('../views/index/neighbor/self.vue') },
    { path: '/neighbor/detail', name: 'neighborDetail', meta: { title: '共享详情' }, component: () => import('../views/index/neighbor/detail.vue') },
    { path: '/neighbor/ordetDetail', name: 'neighborOD', meta: { title: '共享详情' }, component: () => import('../views/index/neighbor/orderDetail.vue') },
    // 头条
    { path: '/topic/detail', name: 'topicDetail', meta: { title: '详情' }, component: () => import('../views/index/all/topic/detail.vue') },
    { path: '/topic/otherDetail', name: 'noticeDetail', meta: { title: '详情' }, component: () => import('../views/index/all/topic/policyDetail.vue') },
    { path: '/topic/policydetail', name: 'policyDetail', meta: { title: '详情' }, component: () => import('../views/index/all/topic/policyDetail.vue') },
    // 物业版头条
    { path: '/topicProperty/detailProperty', name: 'detailProperty', meta: { title: '详情' }, component: () => import('../views/property/topicProperty/detailProperty.vue') },
    // 街道办头条
    { path: '/topicStreet/detailStreet', name: 'detailStreet', meta: { title: '详情' }, component: () => import('../views/street/topicStreet/detailStreet.vue') },
    // 超市
    { path: '/shop/detail', name: 'shopItemDetail', meta: { title: '商品详情' }, component: () => import('../views/index/shop/detail.vue') },
    { path: '/shop/car', name: 'shopCar', meta: { title: '购物车' }, component: () => import('../views/index/shop/shopCar.vue') },
    { path: '/shop/order', name: 'shopOrderList', meta: { title: '订单' }, component: () => import('../views/index/shop/orderList.vue') },
    // 宠物
    { path: '/pet', name: 'pet', meta: { title: '我的宠物' }, component: () => import('../views/index/all/pet/index.vue') },
    { path: '/pet/add', name: 'petAdd', meta: { title: '宠物登记' }, component: () => import('../views/index/all/pet/add.vue') },
    // 政务
    { path: '/home/affairs', name: 'affairs', meta: { title: '智慧政务' }, component: () => import('../views/index/all/affairs/index.vue') },
    { path: '/home/affairs/detailss', name: 'detailss', meta: { title: '详情' }, component: () => import('../views/index/all/affairs/details.vue') },
    // 我的房屋
    { path: '/my/house/index', name: 'house', meta: { title: '我的房屋' }, component: () => import('../views/my/house/index.vue') },
    { path: '/my/house/add', name: 'houseAdd', meta: { title: '房屋认证' }, component: () => import('../views/my/house/add.vue') },
    // 我的车辆
    { path: '/my/car/index', name: 'car', meta: { title: '我的车辆' }, component: () => import('../views/my/car/index.vue') },
    { path: '/my/car/add', name: 'carAdd', meta: { title: '添加车辆' }, component: () => import('../views/my/car/add.vue') },
    // 我的车位
    { path: '/my/park/index', name: 'park', meta: { title: '我的车位' }, component: () => import('../views/my/parking/index.vue') },
    { path: '/my/park/add', name: 'parkAdd', meta: { title: '添加车位' }, component: () => import('../views/my/parking/add.vue') },
    // 我的订单
    { path: '/my/order', name: 'myOrder', meta: { title: '我的订单' }, component: () => import('../views/my/order/list.vue') },
    { path: '/my/orderDetail', name: 'orderList', meta: { title: '订单详情' }, component: () => import('../views/my/order/detail.vue') },
    // 帮助中心
    { path: '/my/help/index', name: 'help', meta: { title: '帮助中心' }, component: () => import('../views/my/help/index.vue') },
    { path: '/my/help/question', name: 'helpQues', meta: { title: '常见问题' }, component: () => import('../views/my/help/question.vue') },
    { path: '/my/help/guide', name: 'helpGuide', meta: { title: '新手指引' }, component: () => import('../views/my/help/guide.vue') },
    // 缺省页 用户登录注册但是没有房子就出现这个
    { path: '/my/house/no', name: 'no', meta: { title: '我的房屋' }, component: () => import('../views/my/house/noHouse.vue') },
    // 登录注册
    { path: '/login', name: 'login', meta: { title: '登录' }, component: () => import('../views/login/Login.vue') },
    { path: '/register', name: 'register', meta: { title: '注册' }, component: () => import('../views/login/Register.vue') },
    // 意见反馈
    { path: '/feedback', name: 'feedback', meta: { title: '意见反馈' }, component: () => import('../views/my/aboutus/feedback.vue') },
    { path: '/success', name: 'success', meta: { title: '反馈成功' }, component: () => import('../views/my/aboutus/success.vue') },
    // 关于我们
    { path: '/aboutus', name: 'aboutus', meta: { title: '关于我们' }, component: () => import('../views/my/aboutus/index.vue') },
    // 功能介绍
    { path: '/function', name: 'function', meta: { title: '功能介绍' }, component: () => import('../views/my/aboutus/function.vue') },
    // 诉求建议
    { path: '/appeal', name: 'appeal', meta: { title: '诉求建议' }, component: () => import('../views/index/all/appealAdvice.vue') },
    //  我的活动
    { path: '/active', name: 'active', meta: { title: '我的活动' }, component: () => import('../views/my/active/index.vue') }
  ]
})

router.afterEach((to, from, next) => {
  document.title = to.meta.title
  // 每个页面都注册config
  wxsdk.init(`${baseUrl}${to.fullPath}`)
})

export default router
