import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue');
const Regist = () => import(/* webpackChunkName: "Regist" */ '../views/Regist.vue');
const Board = () => import(/* webpackChunkName: "Board" */ '../views/Board.vue');
const Card = () => import(/* webpackChunkName: "Card" */ '../views/Card.vue');
const NotFound = () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue');


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
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
    path: '/board/:id(\\d+)',
    name: 'Board',
    component: Board,
    children: [
      {
        path: '/card/listId(\\d+)/list/:listId(\\d+)',
        name: 'Card',
        component: Card
      }
    ]
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: NotFound
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
