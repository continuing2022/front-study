const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileSizePlugin = require('./src/plugin/FileSizePlugin.cjs');
const BuildTimePlugin = require('./src/plugin/BuildTimePlugin.cjs');
module.exports = {
  mode: 'development',
  optimization:{
    minimize:false,
    moduleIds:'named',
    chunkIds:'named'
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // 使用 path.resolve 更规范
  },  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')  // 让 @ 指向 src 目录
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  devServer: {
    port: 8080,
    hot: true,
    open: true,
    proxy: [
      {
        context: ['/user', '/api'], // 需要代理的路径
        target: 'http://localhost:3001', // 目标服务器改为 3001
        changeOrigin: true, // 改变origin头为目标URL
        secure: false, // 如果是https接口，需要配置这个参数
        logLevel: 'debug', // 显示代理日志
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new FileSizePlugin(),
    new BuildTimePlugin()
  ]
};