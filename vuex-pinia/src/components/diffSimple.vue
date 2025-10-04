<template>
  <div class="monaco-diff-container">
    <!-- Monaco 差异编辑器 -->
    <div class="header">
      <h1 class="title">代码差异对比 (Monaco Editor)</h1>
      <div class="button-group">
        <button class="theme-btn" @click="toggleFullScreen">
          {{ isOpen ? '退出全屏' : '全屏' }}
        </button>
        <button @click="handleCopy(oldCode)" class="copy-btn" :disabled="copying">
          {{ copying ? '复制中...' : '复制旧代码' }}
        </button>
        <button @click="handleCopy(newCode)" class="copy-btn" :disabled="copying">
          {{ copying ? '复制中...' : '复制新代码' }}
        </button>
        <button @click="toggleTheme" class="theme-btn">
          {{ isDark ? '浅色主题' : '深色主题' }}  
        </button>
      </div>
    </div>
    <!-- Monaco Diff Editor -->
    <div class="editor-wrapper">
      <!-- 调试信息 -->
      <div v-if="!editorReady" class="loading-info">
        <p>正在加载 Monaco Editor...</p>
        <p>如果长时间没有加载，请检查控制台错误信息</p>
      </div>
      <!-- Monaco 差异编辑器容器 -->
      <div 
        ref="editorContainer" 
        class="diff-editor"
        :style="{ height: isOpen ? '800px' : '500px' }"
        v-show="editorReady"
      ></div>
      <!-- 降级显示 -->
      <div v-if="!editorReady" class="fallback-display">
        <div class="code-comparison">
          <div class="old-code-section">
            <h4>旧代码</h4>
            <pre><code>{{ oldCode }}</code></pre>
          </div>
          <div class="new-code-section">
            <h4>新代码</h4>
            <pre><code>{{ newCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>
    <!-- 统计信息与说明 -->
    <div class="info-panel">
      <div class="stats">
        <h3>文件统计</h3>
        <div class="stat-items">
          <div class="stat-item added">
            <span class="indicator"></span>
            <span>新增行数: {{ stats.added }}</span>
          </div>
          <div class="stat-item removed">
            <span class="indicator"></span>
            <span>删除行数: {{ stats.removed }}</span>
          </div>
          <div class="stat-item modified">
            <span class="indicator"></span>
            <span>修改行数: {{ stats.modified }}</span>
          </div>
        </div>
      </div>

      <div class="code-info">
        <h3>代码示例说明</h3>
        <ul>
          <li><strong>旧代码:</strong> 使用传统的 for 循环计算总价</li>
          <li><strong>新代码:</strong> 使用现代的 reduce 方法，更简洁高效</li>
          <li><strong>改进点:</strong> 减少代码行数，提高可读性，使用函数式编程</li>
        </ul>
      </div>
    </div>
    <!-- 复制成功提示 -->
    <div v-if="copySuccess" class="copy-toast">
      复制成功！
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import monaco from '../monaco.js'
const isOpen = ref(false)
const editorContainer = ref(null)
const copying = ref(false)
const copySuccess = ref(false)
const isDark = ref(true)
const editorReady = ref(false)
let diffEditor = null

// 示例代码 - 确保是字符串类型
const oldCode = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

const user = {
  name: 'John',
  age: 30
};

// 计算订单总价
const orderTotal = calculateTotal(orderItems);
console.log('订单总价:', orderTotal);

// 显示用户信息
console.log('用户:', user.name, '年龄:', user.age);`

const newCode = `function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com',
  country: 'USA'
};
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com',
  country: 'USA'
};
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com',
  country: 'USA'
};
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com',
  country: 'USA'
};

// 计算订单总价
const orderTotal = calculateTotal(orderItems);
console.log('订单总价:', orderTotal);

// 显示用户完整信息
console.log('用户信息:', {
  姓名: user.name,
  年龄: user.age,
  邮箱: user.email,
  国家: user.country
});`

// 统计信息
const stats = reactive({
  added: 0,
  removed: 0,
  modified: 0
})

// 初始化Monaco Editor
const initMonacoEditor = async () => {
  try {
    if (!editorContainer.value) {
      console.error('编辑器容器未找到')
      return
    }

    // 创建差异编辑器
    diffEditor = monaco.editor.createDiffEditor(editorContainer.value, {
      theme: isDark.value ? 'vs-dark' : 'vs',
      readOnly: true,
      renderSideBySide: true,
      automaticLayout: true,
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      enableSplitViewResizing: true,
      renderWhitespace: 'selection',
      ignoreTrimWhitespace: false,
      lineNumbers: 'on',
      glyphMargin: false,
      folding: false
    })
    // 创建模型
    const originalModel = monaco.editor.createModel(oldCode, 'javascript')
    const modifiedModel = monaco.editor.createModel(newCode, 'javascript')
    // 设置模型
    diffEditor.setModel({
      original: originalModel,
      modified: modifiedModel
    })
    editorReady.value = true
    // 计算统计
    setTimeout(() => {
      calculateStats()
    }, 500)
  } catch (error) {
    console.error('Monaco Editor 初始化失败:', error)
    editorReady.value = false
  }
}

// 计算差异统计
const calculateStats = () => {
  try {
    const oldLines = oldCode.split('\n')
    const newLines = newCode.split('\n')
    
    const maxLines = Math.max(oldLines.length, newLines.length)
    let added = 0, removed = 0, modified = 0
    
    for (let i = 0; i < maxLines; i++) {
      const oldLine = oldLines[i] || ''
      const newLine = newLines[i] || ''
      
      if (oldLine && !newLine) {
        removed++
      } else if (!oldLine && newLine) {
        added++
      } else if (oldLine !== newLine && oldLine && newLine) {
        modified++
      }
    }
    
    if (newLines.length > oldLines.length) {
      added += newLines.length - oldLines.length
    }
    
    stats.added = added
    stats.removed = removed
    stats.modified = modified
    
    console.log('统计计算完成:', stats)
  } catch (error) {
    console.error('计算统计失败:', error)
  }
}

// 复制功能
const handleCopy = async (code) => {
  if (copying.value) return
  
  copying.value = true
  try {
    await navigator.clipboard.writeText(code)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } finally {
    copying.value = false
  }
}

// 切换主题
const toggleTheme = () => {
  isDark.value = !isDark.value
  if (diffEditor) {
    monaco.editor.setTheme(isDark.value ? 'vs-dark' : 'vs')
  }
}

const toggleFullScreen = () => {
  isOpen.value = !isOpen.value
  const monacoDiff = document.querySelector('.monaco-diff-container')
  if (isOpen.value) {
    monacoDiff.requestFullscreen().catch(err => {
      isOpen.value = false
    })
  } else {
    document.exitFullscreen().catch(err => {
      isOpen.value = true
    })
  }
} 

onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    initMonacoEditor()
  }, 100)
})
</script>

<style scoped>
.monaco-diff-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
}

.title {
  margin: 0;
  color: #212529;
  font-size: 1.5rem;
  font-weight: 600;
}

.button-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.copy-btn, .theme-btn {
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background: white;
  color: #495057;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 100px;
}

.copy-btn:hover:not(:disabled), .theme-btn:hover {
  background: #e9ecef;
  border-color: #adb5bd;
}

.copy-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.theme-btn {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.theme-btn:hover {
  background: #0056b3;
  border-color: #0056b3;
}

.editor-wrapper {
  flex: 1;
  margin: 16px 24px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  background: white;
}

.diff-editor {
  width: 100%;
}

.loading-info {
  padding: 40px;
  text-align: center;
  color: #6c757d;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.loading-info p {
  margin: 10px 0;
}

.fallback-display {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  max-height: 500px;
  overflow-y: auto;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.old-code-section, .new-code-section {
  background: white;
  border-radius: 6px;
  overflow: hidden;
}

.old-code-section h4 {
  background: #dc3545;
  color: white;
  margin: 0;
  padding: 10px 15px;
  font-size: 14px;
}

.new-code-section h4 {
  background: #28a745;
  color: white;
  margin: 0;
  padding: 10px 15px;
  font-size: 14px;
}

.old-code-section pre, .new-code-section pre {
  margin: 0;
  padding: 15px;
  overflow: auto;
  max-height: 400px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
}

.info-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 16px 24px 24px;
}

.stats, .code-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.stats h3, .code-info h3 {
  margin: 0 0 16px 0;
  color: #212529;
  font-size: 1.1rem;
  font-weight: 600;
}

.stat-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #495057;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stat-item.added .indicator {
  background: #28a745;
}

.stat-item.removed .indicator {
  background: #dc3545;
}

.stat-item.modified .indicator {
  background: #ffc107;
}

.code-info ul {
  margin: 0;
  padding-left: 20px;
  color: #6c757d;
}

.code-info li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.code-info strong {
  color: #495057;
}

.copy-toast {
  position: fixed;
  top: 80px;
  right: 24px;
  background: #28a745;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: slideIn 0.3s ease;
  z-index: 1000;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .button-group {
    justify-content: center;
  }

  .info-panel {
    grid-template-columns: 1fr;
  }

  .diff-editor {
    height: 400px;
  }

  .copy-toast {
    right: 16px;
    left: 16px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .monaco-diff-container {
    padding: 0;
  }

  .editor-wrapper {
    margin: 12px;
  }

  .info-panel {
    padding: 12px;
  }

  .diff-editor {
    height: 350px;
  }
}
</style>