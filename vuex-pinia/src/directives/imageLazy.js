export default {
  mounted(el, binding) {
    // 1. 定义一个函数，用来真正加载图片
    const loadImage = () => {
      el.src = binding.value  // 把指令传进来的值设置为图片的 src
    }

    // 2. 创建 IntersectionObserver 观察器
    const observer = new IntersectionObserver((entries) => {
      // entries 是被观察元素的交叉情况数组
      if (entries[0].isIntersecting) {
        // 如果图片进入可视区域
        loadImage()            // 加载图片
        observer.unobserve(el) // 取消对当前元素的观察，避免重复触发
        console.log('图片已加载')
      }
    })
    // 3. 开始观察当前元素
    observer.observe(el)
  }
}
  