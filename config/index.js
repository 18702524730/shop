// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {

  //网站模块名，例如 http://192.168.0.216:8089/module/app/initlayer.html 中的
  //【views】，默认为views，修改这里的配置的同时，也要同时重命名/src/views的这个文件夹名称
  moduleName:'pages',

  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../shop/index.html'),
    assetsRoot: path.resolve(__dirname, '../shop'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8083,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
    	//微信二维码
      '/weixin': {
        target: 'https://testwechat.ipsebe.com',
        changeOrigin: true,
        pathRewrite: {
          '^/weixin': '/weixin'
        },
        cookieDomainRewrite: "",
      },
      '/iprp_portal': {
        //target: 'http://192.168.1.117:8380',
        target: 'https://testuser.ipsebe.com',
        changeOrigin: true,
        pathRewrite: {
          '^/iprp_portal': ''
        },
        cookieDomainRewrite: "",
      },
      '/portalsite-cnsebe': {
        target: 'https://testcart.ipsebe.com',
        // target: 'http://192.168.1.7:8080',
        changeOrigin: true,
        pathRewrite: { '^/portalsite-cnsebe': '' },
        cookieDomainRewrite: "",
      },
      '/pay': {
        target: 'https://testiprp.ipsebe.com',
        //target: 'http://192.168.1.117:8980',
        changeOrigin: true,
        pathRewrite: { '^/pay': '' },
        cookieDomainRewrite: "",
      },
      '/createOrder': {
        target: 'https://testwww.ipsebe.com',
        changeOrigin: true,
        pathRewrite: { '^/createOrder': 'createOrder' },
        cookieDomainRewrite: "",
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
