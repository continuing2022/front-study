const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// 创建 Express 应用
const app = express();
const port = process.env.PORT || 3000;

// 中间件配置
app.use(cors()); // 解决跨域问题
app.use(bodyParser.json()); // 解析 JSON 请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 编码请求体
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件服务

// 基础路由
app.get('/', (req, res) => {
  res.json({
    message: 'Express 服务器运行成功！',
    timestamp: new Date().toISOString(), 
    version: '1.0.0'
  });
});

// 用户相关 API
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
    { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
    { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
  ];
  res.json({
    success: true,
    data: users,
    total: users.length
  });
});

// 获取单个用户
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = { id: userId, name: `用户${userId}`, age: 25 + userId };
  
  res.json({
    success: true,
    data: user
  });
});

// 创建用户
app.post('/api/users', (req, res) => {
  const { name, age, email } = req.body;
  
  if (!name || !age) {
    return res.status(400).json({
      success: false,
      message: '姓名和年龄是必填项'
    });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    age,
    email: email || '',
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    data: newUser,
    message: '用户创建成功'
  });
});

// 更新用户
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, age, email } = req.body;
  
  const updatedUser = {
    id: userId,
    name: name || `用户${userId}`,
    age: age || 25,
    email: email || '',
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: updatedUser,
    message: '用户更新成功'
  });
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  res.json({
    success: true,
    message: `用户 ${userId} 删除成功`
  });
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '接口不存在',
    path: req.originalUrl
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : '请联系管理员'
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`🚀 Express 服务器运行在 http://localhost:${port}`);
});

module.exports = app;