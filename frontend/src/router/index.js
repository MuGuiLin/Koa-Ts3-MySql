import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import Main from '../views/Main.vue'

const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue');
const Regist = () => import(/* webpackChunkName: "Regist" */ '../views/Regist.vue');
const News = () => import(/* webpackChunkName: "News" */ '../views/News.vue');
const Info = () => import(/* webpackChunkName: "Info" */ '../views/Info.vue');
const Send = () => import(/* webpackChunkName: "Send" */ '../views/Send.vue');
const Card = () => import(/* webpackChunkName: "Card" */ '../views/Card.vue');
const NotFound = () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    meta: {
      userauth: true
    },
    component: Main,
    children: [
      {
        path: '/news/:id(\\d+)',
        name: 'News',
        meta: {
          userauth: true
        },
        component: News,
        children: [
          {
            path: '/card/listId(\\d+)/list/:listId(\\d+)',
            name: 'Card',
            component: Card
          }
        ]
      },
      {
        path: '/info/:id(\\d+)',
        name: 'Info',
        meta: {
          userauth: true
        },
        component: Info
      },
      {
        path: '/send',
        name: 'Send',
        meta: {
          userauth: true
        },
        component: Send
      },
      {
        path: '',
        name: 'News',
        component: News
      }
    ],
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      userauth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 查看本地存储中是否有用户信息
// Store.commit('user/selectUserInfo');  // 注：这里的逻辑改写到plugins插件中的

router.beforeEach((to, from, next) => {

  // 在进入路由前，判断到该路由需要鉴权（用户登录）则验证用户信息(!Store.state.user.userinfo 没有用户信息)，不通过则跳转到登录页
  if (to.matched.some(matched => matched.meta.userauth) && !Store.state.user.userinfo) {

    next({ name: 'Login' })
  } else {

    next()
  }
})

export default router
