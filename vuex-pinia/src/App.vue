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

    <nav class="navigation">
      <router-link to="/" :class="{ active: $route.path === '/' }">
        并排对比
      </router-link>
      <router-link to="/comparison" :class="{ active: $route.path === '/comparison' }">
        详细对比
      </router-link>
      <router-link to="/images" :class="{ active: $route.path === '/images' }">
        图片展示
      </router-link>
      <router-link to="/diff" :class="{ active: $route.path === '/diff' }">
        代码差异
      </router-link>
    </nav>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const i18nValue = ref(localStorage.getItem("locale") === "en" ? true : false)
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

.navigation {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.navigation a {
  padding: 12px 24px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.navigation a:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.navigation a.active {
  background: white;
  color: #667eea;
}

.content {
  display: grid;
  gap: 20px;
  margin-bottom: 40px;
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
  .header h1 {
    font-size: 2rem;
  }
  
  .navigation {
    flex-direction: column;
    align-items: center;
  }
  
  .navigation a {
    width: 200px;
    text-align: center;
  }
  
  table {
    font-size: 14px;
  }
  
  th, td {
    padding: 10px;
  }
}
</style>
