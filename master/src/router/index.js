import Vue from 'vue'
import Router from 'vue-router'

import Login from './login/login.js'; //登录

import Layout from '@/views/public/layout';

//异步路由


export const asyncRouterMap = [
  
];

//同步路由
const syncRouterMap = [
  {
    path: '/', //默认路由重定向至登录页
    redirect: 'login'
  },
  Login,
  {
    path: '/main',
    meta: {
      requireAuth: true
    },
    name: 'Main',
    component: Layout
  },
  {
    path: '/system',
    meta: {
      requireAuth: true
    },
    name: 'System',
    component: Layout
  },
  {
    path: "*", //404
    redirect: "login"
  }
];

Vue.use(Router)


const routerConfig = {
  mode: 'history', 
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes: syncRouterMap,
  linkActiveClass: 'active'
};

let router = new Router(routerConfig);
router.selfAddRoutes = function (params){  //解决控制台路由警告提示  https://www.cnblogs.com/fqh123/p/11571688.html
  router.matcher = new Router(routerConfig).matcher; //此处清掉之前的路由，创建新的
  router.addRoutes(params)
}

export default router