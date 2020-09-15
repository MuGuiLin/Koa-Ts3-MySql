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
    // meta: {
    //   userauth: true
    // },
    // 局部路由守卫
    beforeEnter: ((to, from, next) => {
      //是否登录
      if (!Store.state.user.userinfo) {
        next('/login');
      } else {
        next()
      }
    }),
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

// 路由守卫
router.beforeEach((to, from, next) => {

  // 在进入路由前，判断到该路由需要鉴权（用户登录）则验证用户信息(!Store.state.user.userinfo 没有用户信息)，不通过则跳转到登录页
  if (to.matched.some(matched => matched.meta.userauth) && !Store.state.user.userinfo) {

    next({ name: 'Login' })
  } else {

    next()
  }
});

export default router;

/*
 * 用addRoutes动态添加路由，

 * 在以前：一般情况下我们在vue中所访问的所有路由，都是提前配置好的，对于用户鉴权而言就只是判断一下用户登录。
 * 而现在：通过动态添加路由，所有需要用户鉴权(用户登录)的路由，要等用户登录后在动态生成，如果没登录压根就没路由。
 *
 * 在登录组件中先动态添加路由，再进行路由跳转！
 *  this.$router.addRoutes([
    {
      path: "/",
      name: "Main",
      component: () => import('../views/Main.vue'),

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
        }]
    },
    {
      path: '/send',
      name: 'Send',
      meta: {
        userauth: true
      },
      component: Send
    },
  ])
* /


/*

Vue中的3种路由守卫

注：要进行下一步操作一定要加next()方法哦！！！

// 1、全局路由守卫
router.beforeEach((to, from, next) => {
  // 判断路由是否需要守卫
  if(to.meta.auth) {

    //是否登录
    if(true) {
      next();
    } else {
      next('/login?redirect=' + to.fullPath) // redirect to.fullPath 回到之前的页面
    }
  } else {
    next();
  }

});

// 2、局部路由守卫 【进入路由时】 （注：写在router具体路由的配置中）
beforeEnter: ((to, from, next) => {
  //是否登录
  if (false) {
    next();
  } else {
    next('/login?redirect=' + to.fullPath) // redirect to.fullPath 回到之前的页面
  }
});

// 3、组件路由守卫 （注：写在组件中，和data(){}方法平级的任意位置）

// A、组件路由守卫 之 进入路由时，【组件实例还没渲染，this还不能用哦，要用next((vc)=>{})回调函数传回来的 vc === VueComponent】
beforeRouteEnter(to, from, next) {
  next(vc => {
    console.log(vc); // 这里的vc就相当于this
    vc.id = vc.$route.params.id;
    if (vc.id) {
      vc.getInfo();
    }
  });
},

// B、组件路由守卫 之 变化路由时，【组件实例已渲染，this可用】
beforeRouteUpdate(to, from, next) {
  console.log("路由发生变化了！");
  next();
},

// C、组件路由守卫 之 离开路由时，【组件实例已渲染，this可用】
beforeRouteLeave(to, from, next) {
  console.log(to.fullPath);
  next();
},
*/