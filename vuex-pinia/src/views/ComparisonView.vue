<template>
  <div class="comparison-table">
    <h2>📊 详细对比</h2>
    <table>
      <thead>
        <tr>
          <th>特性</th>
          <th>Vuex</th>
          <th>Pinia</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>TypeScript 支持</td>
          <td>需要额外配置</td>
          <td>原生支持，类型推断优秀</td>
        </tr>
        <tr>
          <td>代码结构</td>
          <td>单一 store，需要 modules</td>
          <td>多个独立 stores</td>
        </tr>
        <tr>
          <td>Mutations</td>
          <td>必须通过 mutations 修改状态</td>
          <td>可直接修改状态</td>
        </tr>
        <tr>
          <td>异步操作</td>
          <td>Actions</td>
          <td>Actions（更简洁）</td>
        </tr>
        <tr>
          <td>DevTools</td>
          <td>Vue DevTools</td>
          <td>Vue DevTools（更好的体验）</td>
        </tr>
        <tr>
          <td>包大小</td>
          <td>较大</td>
          <td>更小，按需加载</td>
        </tr>
        <tr>
          <td>学习曲线</td>
          <td>概念较多</td>
          <td>更简单直观</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.comparison-table {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.comparison-table h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #f8f9fa;
  font-weight: bold;
  color: #333;
}

tr:hover {
  background: #f8f9fa;
}

@media (max-width: 768px) {
  table {
    font-size: 14px;
  }
  
  th, td {
    padding: 10px;
  }
}
</style>