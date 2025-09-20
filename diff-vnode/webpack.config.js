const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// 定义源文件和输出目录的路径常量，方便后续维护
const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  // 指定模式，开发环境使用development，会启用相应的优化
  mode: 'development',
  
  // 入口文件配置
  entry: path.join(SRC_DIR, 'js', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    clean: true,
    publicPath: '/'
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, 'index.html'),
      filename: 'index.html',
      inject: 'body',
      cache: false
    })
  ],
  
  // 开发服务器配置（Webpack 5 语法）
  devServer: {
    // 静态资源目录配置
    static: {
      directory: DIST_DIR,
      // 额外的静态资源目录
      watch: true // 监听静态文件变化
    },
    // 自动打开浏览器
    open: true,
    // 启用热模块替换
    hot: true,
    // 端口号
    port: 8080,
    // 主机地址，设为0.0.0.0可外部访问
    host: '0.0.0.0',
    // 启用gzip压缩
    compress: true,
    // 解决SPA路由问题，所有404请求都返回index.html
    historyApiFallback: true,
    // 客户端日志级别
    client: {
      logging: 'warn',
      overlay: true // 错误信息全屏覆盖显示
    }
  },
  
  // 模块解析配置
  resolve: {
    // 自动解析的扩展名
    extensions: ['.js', '.json'],
    // 路径别名，简化导入
    alias: {
      '@': SRC_DIR,
      '@js': path.join(SRC_DIR, 'js')
    }
  }
};
