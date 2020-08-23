import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)


VueRouter.prototype.openPage = function (link, query) {
  // let channel = Vue.prototype.cookies.get('channel') || 'sdxh5';
  // let comeFrom = Vue.prototype.cookies.get('comeFrom') || '';
  this.push({
    path: link,
    query: Object.assign({
      // 'channel': channel,
      // 'comeFrom': comeFrom
    }, query)
  })
}


const routes = [{
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/playHall',
    name: 'PlayHall',
    meta: {
      title: ' 陪玩厅'
    },
    component: () => import( /* webpackChunkName: "about" */ '../views/PlayHall.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: '详情'
    },
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: '我的订单'
    },
    component: () => import('../views/Order.vue')
  },
  {
    path: '/orderList',
    name: 'orderList',
    meta: {
      title: '我的订单列表'
    },
    component: () => import('../views/OrderList.vue')
  },
  {
    path: '/comments',
    name: 'comments',
    meta: {
      title: '评论'
    },
    component: () => import('../views/Comments.vue')
  },
  {
    path: '/refund',
    name: 'refund',
    meta: {
      title: '退款'
    },
    component: () => import('../views/Refund.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    meta: {
      title: '个人中心'
    },
    component: () => import('../views/Mine.vue')
  },
  {
    path: '/recharge',
    name: 'recharge',
    meta: {
      title: '充值'
    },
    component: () => import('../views/Recharge.vue')
  },
  {
    path: '/findpass',
    name: 'findpass',
    meta: {
      title: '找回密码'
    },
    component: () => import('../views/FindPass.vue')
  }, 
  {
    path: '/modifyUserInfo',
    name: 'modifyUserInfo',
    meta: {
      title: '修改用户信息'
    },
    component: () => import('../views/ModifyUserInfo.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    meta: {
      title: '聊天页面'
    },
    component: () => import('../views/Chat.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  // base: process.env.BASE_URL,
  base: '/',
  routes
})

export default router