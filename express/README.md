# Express 后端服务器

这是一个基于 Node.js 和 Express 的简单后端服务器框架。

## 功能特性

- ✅ RESTful API 设计
- ✅ CORS 跨域支持
- ✅ JSON 请求体解析
- ✅ 静态文件服务
- ✅ 错误处理中间件
- ✅ 健康检查接口
- ✅ 用户 CRUD 操作示例

## 安装依赖

```bash
npm install
```

## 启动服务器

### 开发模式（自动重启）
```bash
npm run dev
```

### 生产模式
```bash
npm start
```

## API 接口

### 基础接口
- `GET /` - 服务器状态信息
- `GET /health` - 健康检查

### 用户管理接口
- `GET /api/users` - 获取用户列表
- `GET /api/users/:id` - 获取指定用户信息
- `POST /api/users` - 创建新用户
- `PUT /api/users/:id` - 更新用户信息
- `DELETE /api/users/:id` - 删除用户

## 请求示例

### 获取用户列表
```bash
curl http://localhost:3000/api/users
```

### 创建用户
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"新用户","age":25,"email":"user@example.com"}'
```

### 更新用户
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"更新用户","age":30}'
```

### 删除用户
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## 项目结构

```
express/
├── package.json      # 项目配置
├── server.js         # 服务器主文件
├── README.md         # 说明文档
└── public/           # 静态文件目录
```

## 环境变量

- `PORT` - 服务器端口号（默认：3000）
- `NODE_ENV` - 环境模式（development/production）