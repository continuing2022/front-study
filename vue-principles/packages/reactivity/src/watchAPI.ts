import { isReactive } from "./reactive";
import { ReactiveEffect } from "./effect";
import { isRef } from "./ref";
export function watch(source, cb: any, options?) {
  return doWatch(source, cb, options)
}
export function watchEffect(effectFn) {
  return doWatch(effectFn, () => {}, { immediate: true })
}
function traverse(value, deep = true, current = 0, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return value
  if (!deep && current >= 1) return value //当前是浅监听
  seen.add(value)
  for (const k in value) {
    traverse(value[k], deep, current + 1, seen)
  }
  return value
}

function doWatch(source, cb, options?) {
  let getter
  if (typeof source === 'function' ) {
    getter = source
  } else  if (isReactive(source)) {
      getter = () => traverse(source, options?.deep)
  }else if(isRef(source)){
      getter = () => traverse(source.value, options?.deep)
  }
  let oldValue
  const effect = new ReactiveEffect(getter, () => {
    const newVal = effect.run()
    cb(newVal, oldValue)
    oldValue = newVal
  })
  oldValue = effect.run()
  if(options?.immediate){
    cb(oldValue, undefined)
  }
  // 返回停止监听的方法
  return () => effect.active = false
}