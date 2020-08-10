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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/PlayHall.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import('../views/OrderList.vue')
  },
  {
    path: '/comments',
    name: 'comments',
    component: () => import('../views/Comments.vue')
  },
  {
    path: '/refund',
    name: 'refund',
    component: () => import('../views/Refund.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/Mine.vue')
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: () => import('../views/Recharge.vue')
  },
  {
    path: '/findpass',
    name: 'findpass',
    component: () => import('../views/FindPass.vue')
  }, {
    path: '/modifyUserInfo',
    name: 'modifyUserInfo',
    component: () => import('../views/ModifyUserInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router