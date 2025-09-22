<template>
  <div class="app">
    <header class="header">
      <div class="header-title">
        <h1>🚀 Vuex vs Pinia {{ $t("messages.stateComparison") }}</h1>
        <el-switch
          v-model="i18nValue"
          class="ml-2"
          @change="onChangeLang(i18nValue)"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>
      <p>学习两种状态管理工具的区别与优势</p>
    </header>

    <div class="toggle-section">
      <button 
        @click="currentView = 'both'" 
        :class="{ active: currentView === 'both' }"
      >
        并排对比
      </button>
      <button 
        @click="currentView = 'vuex'" 
        :class="{ active: currentView === 'vuex' }"
      >
        只看 Vuex
      </button>
      <button 
        @click="currentView = 'pinia'" 
        :class="{ active: currentView === 'pinia' }"
      >
        只看 Pinia
      </button>
    </div>

    <div class="content" :class="currentView">
      <div v-if="currentView === 'both' || currentView === 'vuex'" class="demo-section">
        <VuexDemo />
      </div>
      
      <div v-if="currentView === 'both' || currentView === 'pinia'" class="demo-section">
        <PiniaDemo />
      </div>
    </div>

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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VuexDemo from './components/VuexDemo.vue'
import PiniaDemo from './components/PiniaDemo.vue'
import { useI18n } from 'vue-i18n'
const currentView = ref('both')
const i18nValue=ref(localStorage.getItem("locale")==="en"?true:false)
const { locale } = useI18n()
const onChangeLang = (val) => {
  i18nValue.value = val
  const lang = val ? "en" : "zh"
  localStorage.setItem("locale", lang)
  locale.value = lang
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.header-title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.toggle-section {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.toggle-section button {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.toggle-section button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.toggle-section button.active {
  background: white;
  color: #667eea;
}

.content {
  display: grid;
  gap: 20px;
  margin-bottom: 40px;
}

.content.both {
  grid-template-columns: 1fr 1fr;
}

.content.vuex,
.content.pinia {
  grid-template-columns: 1fr;
  max-width: 600px;
  margin: 0 auto 40px;
}

.demo-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.comparison-table {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  .content.both {
    grid-template-columns: 1fr;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  .toggle-section {
    flex-direction: column;
    align-items: center;
  }
  
  table {
    font-size: 14px;
  }
  
  th, td {
    padding: 10px;
  }
}
</style>
