'use strict'
const path = require('path')
module.exports = {
  dev: {
    assetsSubDirectory: 'static', //静态资源文件夹，默认“static”，
    assetsPublicPath: '/', //发布路径
    proxyTable: {
         '/': {
             target: 'http://pc.jia16.com:28088/', // 你请求的第三方接口
             changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
            
         }
    }, //常用来配置代理API的地方
    host: 'localhost',
    port: 8700, // 端口号
    autoOpenBrowser: false, //是否自动打开浏览器
    errorOverlay: true, //查询错误
    notifyOnErrors: true, //通知错误
    poll: false,
    useEslint: false, //关闭校验
    showEslintErrorsInOverlay: false, //ES验证错误提示
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'), //编译后index.html的路径
    assetsRoot: path.resolve(__dirname, '../dist'), //打包后的文件根路径
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false, //是否压缩
    productionGzipExtensions: ['js', 'css'], //模式下需要压缩的文件的扩展名，设置后会对相应扩展名的文件进行压缩
    bundleAnalyzerReport: process.env.npm_config_report //是否开启打包后的分析报告
  }
}
