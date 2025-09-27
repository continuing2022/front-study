
<template>
  <div class="img-list">
    <div v-for="img in images" :key="img" class="img-item">
      <img
        v-image-lazy="img"
        :alt="img.split('/').pop()"
        :src="placeholder"
        class="lazy-img"
        width="180"
        height="180"
        @click="handleClick"
      />
      <div class="img-name">{{ img.split('/').pop() }}</div>
    </div>
  </div>
</template>

<script setup>
import imageLazy from '../directives/imageLazy'
import { onMounted, ref, reactive, watch, watchEffect } from 'vue'

const inputValue=ref('')
const objs=reactive({
  a:1,
  b:{
    c:2
  }
})
// watch需要指定监听的对象
watch(objs.b.c,(newVal)=>{
  console.log('watch:',newVal)
},{deep:false,immediate:true})
// watch 立即执行 
watchEffect(()=>{
  console.log('watchEffect:',objs.b.c)
})
// 注册自定义指令
defineOptions({
  directives: {
    imageLazy
  }
})
const handleClick=()=>{
  objs.b.c+=1
}
const images = ref([])
// 占位图（灰色 base64）
const placeholder =
  'data:image/svg+xml;base64,' + btoa('<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#eee"/></svg>')

onMounted(() => {
  // 自动收集 images 文件夹下所有图片
  const context = import.meta.glob('../views/images/*.{png,jpg,jpeg,gif}', { eager: true })
  images.value = Object.values(context).map(mod => mod.default)
})
</script>

<style scoped >
.img-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.img-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
}
.lazy-img {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: #eee;
  object-fit: cover;
}
.img-name {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}
</style>