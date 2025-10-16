export default function(el,binding){
  const observer=new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
      el.src = binding.value
      observer.unobserve(el)
      console.log('图片已加载')
    }
  })
  // 3. 开始观察当前元素
  observer.observe(el)
}