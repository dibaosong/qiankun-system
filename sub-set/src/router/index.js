import Vue from 'vue'
import Router from 'vue-router'

import Password from '@/views/system/password';

//同步路由
const routes = [
  {
    path: '/', //默认路由重定向至登录页
    redirect: 'password'
  },
  {
    path: '/password',
    name: 'password',
    component: Password
  }
];

Vue.use(Router)


export default routes