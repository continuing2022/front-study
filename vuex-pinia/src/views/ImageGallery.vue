<template>
  <div class="image-gallery">
    <imageShow />
  </div>
</template>

<script setup>
import imageShow from '../components/imageShow.vue'
</script>

<style scoped>
.image-gallery {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>