const path = require('path')
const { name } = require('./package')

const port = 8001; // dev port
const isDev = process.env.NODE_ENV === 'development'


const config = {
	//publicPath: isDev ? `//localhost:${port}` : '/',
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: name,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        '@css': path.resolve('src/assets/css')
      },
      extensions: ['.scss', '.css']
    },
    module: {
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    }
  },
  css: {
    // 启用 CSS modules
    modules: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
  }
};



// 如果是开发环境
if (isDev) {
  config.devServer = {
    port: port,
    // host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true,
    open: true, // 设置为true当启动 npm run serve 时会自动打开浏览器
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}else{
  config.productionSourceMap = false; //去除.map 文件
};

module.exports = config
