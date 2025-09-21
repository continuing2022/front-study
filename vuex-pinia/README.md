# 🚀 Vuex vs Pinia 状态管理对比项目

这个项目展示了 Vue 3 中两种主要状态管理工具 **Vuex** 和 **Pinia** 的区别和优势，帮助你在面试中更好地回答相关问题。

## 📋 项目结构

```
src/
├── App.vue                 # 主应用组件
├── main.js                # 应用入口
├── components/
│   ├── VuexDemo.vue       # Vuex 示例组件
│   └── PiniaDemo.vue      # Pinia 示例组件
├── store-vuex/
│   └── index.js           # Vuex store 配置
└── store-pinia/
    └── index.js           # Pinia stores 配置
```

## 🎯 功能特性

### 共同实现的功能
- ✅ 计数器（同步/异步操作）
- ✅ 用户信息管理
- ✅ Todo 列表管理
- ✅ 状态持久化演示

### 对比展示
- 📊 并排对比两种实现方式
- 🔄 可切换单独查看某一种实现
- 📈 详细的特性对比表格

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🔍 核心区别分析

### 1. 代码结构对比

#### Vuex (传统方式)
```javascript
// 单一 store，需要 modules 来组织
const store = createStore({
  state: { count: 0 },
  mutations: {
    INCREMENT(state) { state.count++ }
  },
  actions: {
    increment({ commit }) { commit('INCREMENT') }
  },
  getters: {
    double: state => state.count * 2
  }
})
```

#### Pinia (现代方式)
```javascript
// 多个独立的 stores
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++ }  // 直接修改状态
  },
  getters: {
    double: (state) => state.count * 2
  }
})
```

### 2. 使用方式对比

#### Vuex
```vue
<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapActions(['increment'])
  }
}
</script>
```

#### Pinia
```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
// 直接使用: counter.count, counter.increment()
</script>
```

## 📊 详细对比表

| 特性 | Vuex | Pinia |
|------|------|-------|
| **TypeScript 支持** | 需要额外配置，类型推断较弱 | 原生支持，优秀的类型推断 |
| **代码结构** | 单一 store + modules | 多个独立 stores |
| **状态修改** | 必须通过 mutations | 可直接修改（actions 中） |
| **异步操作** | Actions + Mutations | 仅需 Actions |
| **DevTools** | 支持 Vue DevTools | 更好的 DevTools 体验 |
| **包大小** | ~2.5kb (gzipped) | ~1.3kb (gzipped) |
| **学习曲线** | 概念较多（state/mutations/actions/getters） | 更简单直观 |
| **Composition API** | 需要额外适配 | 原生支持 |
| **模块化** | 需要 modules 配置 | 天然模块化 |
| **SSR 支持** | 需要额外配置 | 开箱即用 |

## 🎯 面试重点

### Vuex 的优势
1. **成熟稳定**: Vue 2/3 都支持，生态完善
2. **严格的数据流**: mutations 确保状态变更可追踪
3. **时间旅行调试**: 优秀的调试体验
4. **大型项目**: 适合复杂的大型应用

### Pinia 的优势
1. **现代化设计**: 专为 Vue 3 和 Composition API 设计
2. **TypeScript 友好**: 无需额外配置即可获得完整类型支持
3. **更简洁的 API**: 减少样板代码，提高开发效率
4. **更好的代码分割**: 支持自动代码分割和懒加载
5. **更小的包体积**: 更轻量，性能更好

### 何时选择哪个？

#### 选择 Vuex 的场景：
- 现有项目使用 Vue 2
- 团队对 Vuex 已经很熟悉
- 需要严格的状态变更控制

#### 选择 Pinia 的场景：
- 新项目使用 Vue 3
- 重视 TypeScript 支持
- 希望更简洁的代码和更好的开发体验
- 需要更好的性能和更小的包体积

## 🔧 技术栈

- **Vue 3**: 渐进式 JavaScript 框架
- **Vuex 4**: Vue 的官方状态管理库
- **Pinia**: Vue 的新一代状态管理库
- **Vite**: 现代化的构建工具

## 📚 学习资源

- [Vuex 官方文档](https://vuex.vuejs.org/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vue 3 官方文档](https://vuejs.org/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License