import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home/home.vue'
import NotFound from '../views/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    component: NotFound
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      component: Home2
    }, {
      path: 'comment',
      component: () => import('../views/home/comment/comment.vue')// 按需加载
    }, {
      path: 'material',
      component: () => import('../views/home/material')
    }, {
      path: 'articles',
      component: () => import('../views/home/article/index.vue')
    }, {
      path: 'publish',
      component: () => import('../views/home/publish')
    },
    {
      path: 'publish/:articleId',
      component: () => import('../views/home/publish')
    },
    {
      path: 'accountInfo',
      component: () => import('../views/home/account')
    }]
  },
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   // 按需加载 => 只有需要访问的时候 才进行js的请求,否则不请求
  // }
]

const router = new VueRouter({
  routes
})

export default router
