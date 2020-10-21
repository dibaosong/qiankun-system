import Vue from 'vue'
import App from './App.vue'

// 引入初始化样式表
import './assets/css/lib/reset';

//router
import router from './router/index'

//vuex
import store from './vuex/store'


//echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;



//引入ElementUI
import ElementUI from 'element-ui';
Vue.use(ElementUI);

//引入fly组件
import fly from './components/index';
Vue.use(fly);

import './system/permission' //权限控制


//注册qiankun
import {
  registerMicroApps, // 注册子应用方法
  runAfterFirstMounted, // 首个子应用加载完毕回调
  start, // 启动qiankun
  addGlobalUncaughtErrorHandler, // 添加全局未捕获异常处理器
  // initGlobalState, // 官方应用间通信
} from "qiankun";


registerMicroApps([
  {
    name: 'sub-set',
    entry: '//localhost:8001',
    container: '#subView',
    activeRule: '/system',
  }
]);


// 第一个子应用加载完毕回调
runAfterFirstMounted((app) => {
    console.log('首个应用加载完成')
});
// 启动微服务
start({ prefetch: true });
// 设置全局未捕获一场处理器
addGlobalUncaughtErrorHandler(event => console.log(event));



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#container')