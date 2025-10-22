<template>
  <div class="tip" v-show="localShow">
    <span @click="onClose">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: "Tip",
  props: {
    value: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      localShow: this.show,
      timer: null
    }
  },
  watch: {
    show(newVal) {
      this.localShow = newVal
      if (newVal) {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.onClose()
        }, this.delay)
      }
    }
  },
  methods: {
    onClose() {
      this.localShow = false
      this.$emit('update:show', false) // 通知父组件关闭
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>
.tip {
  z-index: 100;
  width: 200px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
