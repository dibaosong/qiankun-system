import router from '@/router/index'

import { asyncRouterMap } from '@/router/index'

import { cancelPending } from '@/api/api'

//验证登录状态
let flag = 0;
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token');
    if(!!token){
        if(to.name == 'login'){ //如果是登录页，则跳转至系统主页
            router.push({'name': 'System'});
        }else{ //否则根据请求到的动态菜单过滤出异步路由
            cancelPending();
            next();
        }
    }else{
        //如果是需要登录权限的
        if(to.matched.some(record => record.meta.requireAuth)){
            next({'name': 'login', 'query': {'redirect': to.fullPath}});
        }else{
            next();
        }
    }
});