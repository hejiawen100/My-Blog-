
/**
 *  为构建打包文件，会将源码进行构建（编译、压缩等）后打包。
 */

require('./check-versions')()

process.env.NODE_ENV = 'production'

// loading 插件
var ora = require('ora')
// 可以在 node 中执行`rm -rf`的工具
var rm = require('rimraf')
var path = require('path')
// 在终端输出带颜色的文字
var chalk = require('chalk')
var webpack = require('webpack')
// 配置文件
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
// 在终端显示loading效果，并输出提示
var spinner = ora('building for production...')
spinner.start()
// 删除这个文件夹 （递归删除）
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 构建
  webpack(webpackConfig, function (err, stats) {
    // 构建成功

    // 停止 loading动画
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
    ))
  })
})
