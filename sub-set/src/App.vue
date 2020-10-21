<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // 引入element-ui样式表
  import '../node_modules/element-ui/lib/theme-chalk/index.css';
  
  export default {
    watch: {
      $route(to, from, next) {
        //console.log(to)
      }
    }
  }
</script>