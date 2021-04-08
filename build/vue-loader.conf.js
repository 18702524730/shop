var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
  	// postcss 配置文件路径为: webpack内联选项(build/vue-loader.conf.js) > postcss.config.js > .postcssrc.js
    require('autoprefixer')({
      browsers: [
				"ie >= 9",
				"last 2 versions"
			]
    })
  ]
}
