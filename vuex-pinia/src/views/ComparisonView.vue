<template>
  <div class="comparison-table" @scroll="handleScroll" ref="scrollContainer">
    <img
      v-for="(image, index) in imageList"
      :key="index"
      v-image="image"
      alt="图片"
      class="image-item"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const menu = ['fengjian', 'dai', 'guangzhi', 'meiya', 'nini']
const imageList = ref([])
const scrollContainer = ref(null)
const loading = ref(false)

function getImageRandom(pageSize = 12) {
  const result = []
  for (let i = 0; i < pageSize; i++) {
    const index = Math.floor(Math.random() * menu.length)
    result.push(`/images/${menu[index]}.png`)
  }
  return result
}

async function getImageList() {
  if (loading.value) return
  loading.value = true
  
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: getImageRandom(20) })
    }, 500)
  })
  imageList.value.push(...res.data)
  loading.value = false
}

function handleScroll() {
  const container = scrollContainer.value
  if (!container) return
  
  const scrollTop = container.scrollTop //滑动高度
  const scrollHeight = container.scrollHeight //内容高度
  const clientHeight = container.clientHeight //容器高度
  console.log(scrollTop, scrollHeight, clientHeight)
  
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    getImageList()
  }
}

onMounted(() => {
  getImageList()
})
</script>

<style scoped>
.comparison-table {
  max-width: 800px;
  max-height: 600px;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  margin: 0 auto;
}
.image-item {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
}
</style>