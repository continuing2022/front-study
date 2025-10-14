<template>
  <div 
    class="pull-refresh-container"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <!-- 下拉刷新指示器 -->
    <div 
      class="pull-refresh-indicator" 
      :class="{ 'refreshing': isRefreshing, 'can-refresh': canRefresh }"
      :style="{ transform: `translateY(${pullDistance}px)` }"
    >
      <div class="refresh-icon" :class="{ 'rotating': isRefreshing }">
        {{ isRefreshing ? '🔄' : (canRefresh ? '↑' : '↓') }}
      </div>
      <div class="refresh-text">
        {{ refreshText }}
      </div>
    </div>

    <!-- 图片容器 -->
    <div 
      class="comparison-table" 
      :style="{ transform: `translateY(${pullDistance}px)` }"
    >
      <img
        v-for="(image, index) in imageList"
        :key="index"
        v-image="image"
        alt="图片"
        class="image-item"
      />
      
      <!-- 加载状态 -->
      <div v-if="loading && !isRefreshing" class="loading-indicator">
        <div class="loading-spinner">⏳</div>
        <div>加载中...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const menu = ['fengjian', 'dai', 'guangzhi', 'meiya', 'nini']
const imageList = ref([])
const loading = ref(false)

// 下拉刷新相关状态
const pullDistance = ref(0)
const isRefreshing = ref(false)
const isPulling = ref(false)
const startY = ref(0)
const currentY = ref(0)
const isMouseDown = ref(false)

// 下拉刷新配置
const PULL_THRESHOLD = 60 // 触发刷新的阈值
const MAX_PULL_DISTANCE = 100 // 最大下拉距离

// 计算属性
const canRefresh = computed(() => pullDistance.value >= PULL_THRESHOLD)

const refreshText = computed(() => {
  if (isRefreshing.value) return '正在刷新...'
  if (canRefresh.value) return '松开刷新'
  return '下拉刷新'
})

function getImageRandom(pageSize = 12) {
  const result = []
  for (let i = 0; i < pageSize; i++) {
    const index = Math.floor(Math.random() * menu.length)
    result.push(`/images/${menu[index]}.png`)
  }
  return result
}

async function getImageList(isRefresh = false) {
  if (loading.value && !isRefresh) return
  loading.value = true
  
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: getImageRandom(20) })
    }, 500)
  })
  
  if (isRefresh) {
    // 刷新时替换数据
    imageList.value = res.data
  } else {
    // 加载更多时追加数据
    imageList.value.push(...res.data)
  }
  
  loading.value = false
}

// 触摸事件处理
function handleTouchStart(e) {
  if (isRefreshing.value || loading.value) return
  
  const container = e.currentTarget
  if (container.scrollTop > 0) return // 不在顶部时不处理
  
  isPulling.value = true
  startY.value = e.touches[0].clientY
  currentY.value = startY.value
}

function handleTouchMove(e) {
  if (!isPulling.value || isRefreshing.value) return
  
  currentY.value = e.touches[0].clientY
  const deltaY = currentY.value - startY.value
  
  if (deltaY > 0) {
    e.preventDefault() // 阻止默认滚动行为
    const distance = Math.min(deltaY * 0.5, MAX_PULL_DISTANCE)
    pullDistance.value = Math.max(0, distance)
  }
}

function handleTouchEnd() {
  if (!isPulling.value) return
  
  isPulling.value = false
  
  if (canRefresh.value && !isRefreshing.value) {
    triggerRefresh()
  } else {
    resetPull()
  }
}

// 鼠标事件处理（用于桌面端测试）
function handleMouseDown(e) {
  if (isRefreshing.value || loading.value) return
  
  const container = e.currentTarget
  if (container.scrollTop > 0) return
  
  isMouseDown.value = true
  isPulling.value = true
  startY.value = e.clientY
  currentY.value = startY.value
  
  e.preventDefault()
}

function handleMouseMove(e) {
  if (!isPulling.value || !isMouseDown.value || isRefreshing.value) return
  
  currentY.value = e.clientY
  const deltaY = currentY.value - startY.value
  
  if (deltaY > 0) {
    const distance = Math.min(deltaY * 0.5, MAX_PULL_DISTANCE)
    pullDistance.value = Math.max(0, distance)
  }
}

function handleMouseUp() {
  if (!isPulling.value || !isMouseDown.value) return
  
  isMouseDown.value = false
  isPulling.value = false
  
  if (canRefresh.value && !isRefreshing.value) {
    triggerRefresh()
  } else {
    resetPull()
  }
}

// 触发刷新
async function triggerRefresh() {
  isRefreshing.value = true
  
  try {
    await getImageList(true) // 传入 true 表示是刷新操作
    
    // 添加一点延迟让用户看到刷新动画
    await new Promise(resolve => setTimeout(resolve, 300))
  } catch (error) {
    console.error('刷新失败:', error)
  } finally {
    isRefreshing.value = false
    resetPull()
  }
}

// 重置下拉状态
function resetPull() {
  pullDistance.value = 0
}

onMounted(() => {
  getImageList()
})
</script>

<style scoped>
.pull-refresh-container {
  position: relative;
  max-width: 800px;
  max-height: 600px;
  overflow: auto;
  margin: 0 auto;
  user-select: none;
  -webkit-overflow-scrolling: touch;
}

.pull-refresh-indicator {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 10;
}

.pull-refresh-indicator.can-refresh {
  background: rgba(64, 158, 255, 0.1);
}

.pull-refresh-indicator.refreshing {
  background: rgba(103, 194, 58, 0.1);
}

.refresh-icon {
  font-size: 20px;
  margin-bottom: 5px;
  transition: transform 0.3s ease;
}

.refresh-icon.rotating {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.refresh-text {
  font-size: 12px;
  color: #666;
  text-align: center;
}

.comparison-table {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  transition: transform 0.3s ease;
  min-height: 100%;
}

.image-item {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  transition: transform 0.2s ease;
}

.image-item:hover {
  transform: scale(1.05);
}

.loading-indicator {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #666;
}

.loading-spinner {
  font-size: 24px;
  margin-bottom: 10px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 移动端优化 */
@media (max-width: 768px) {
  .pull-refresh-container {
    max-width: 100%;
    margin: 0;
  }
  
  .comparison-table {
    padding: 10px;
    gap: 8px;
  }
  
  .image-item {
    width: calc(50vw - 20px);
    height: calc(50vw - 20px);
    max-width: 150px;
    max-height: 150px;
  }
}
</style>