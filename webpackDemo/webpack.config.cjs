const path = require('path');
const FileStatisticsPlugin = require('./src/FileStatisticsPlugin.cjs');
const DependencyAnalyzerPlugin = require('./src/DependencyAnalyzerPlugin.cjs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  plugins: [
    new FileStatisticsPlugin({
      outputFile: 'file-statistics.json' // 可以自定义输出文件名
    }),
    new DependencyAnalyzerPlugin({
      outputFile: 'dependency-analysis.json' // 可以自定义输出文件名
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    })
  ]
};