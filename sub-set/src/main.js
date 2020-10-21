import Vue from 'vue'
import App from './App.vue'

import VueRouter from "vue-router";

import './publicPath'

// 引入初始化样式表
import './assets/css/lib/reset';

//router
import routes from './router/index'

//vuex
import store from './vuex/store'


//echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;



//引入ElementUI
import ElementUI from 'element-ui';
Vue.use(ElementUI);

//引入fly组件
// import fly from './components/index';
// Vue.use(fly);




Vue.config.productionTip = false


let router = null;
let instance = null;
const __qiankun__ = window.__POWERED_BY_QIANKUN__;

export async function bootstrap({ components, utils, emitFnc, pager, actions }) {
    


    console.log('???')
}

export async function mount({ data = {}, ROUTES, routerBase, state } = {}) {
    router = new VueRouter({
        base: __qiankun__ ? "/system" : '/',
        mode: "history",
        routes: routes
    });
    
    instance = new Vue({
        router,
        store,
        render: h => h(App, {
            props: {...data, ...state }
        })
    }).$mount("#app");
}

export async function unmount() {
    instance.$destroy();
    instance = null;
    router = null;
}

// 单独开发环境
__qiankun__ || mount();
