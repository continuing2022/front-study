<template>
  <div class="home">
    <div class="demo-grid">
      <div class="demo-section">
        <VuexDemo />
      </div>
      <div class="demo-section">
        <PiniaDemo />
      </div>
    </div>
  </div>
</template>

<script setup>
import VuexDemo from '../components/VuexDemo.vue'
import PiniaDemo from '../components/PiniaDemo.vue'
</script>

<style scoped>
.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.demo-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>