
export default function patchEvent(el, eventName, handler) {
  const invokers = el._vei || (el._vei = {})
  // 查找(onClick)事件对应的invoker 
  const existingInvoker = invokers[eventName]
  
  if (handler && existingInvoker) {
    // 直接更新函数即可
    existingInvoker.value = handler
  } else if (handler) {
    // 创建新的 invoker
    const event = eventName.slice(2).toLowerCase() // onClick -> click
    const invoker = (invokers[eventName] = (e) => {
      // 真正的事件处理函数
      (invoker as any).value(e)
    }) as any
    invoker.value = handler
    el.addEventListener(event, invoker)
  }
  
  if (!handler && existingInvoker) {
    const event = eventName.slice(2).toLowerCase()
    el.removeEventListener(event, existingInvoker)
    invokers[eventName] = undefined
  }
}