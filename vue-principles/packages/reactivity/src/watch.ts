
import { ReactiveEffect } from "./effect";
export function watch(source, cb: any, options?) {
  return doWatch(source, cb, options)
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
  if (typeof source === 'function') {
    getter = source
  } else {
      getter = () => traverse(source, options?.deep)
  }
  let oldValue
  const effect = new ReactiveEffect(getter, () => {
    const newVal = effect.run()
    cb(newVal, oldValue)
    oldValue = newVal
  })
  oldValue = effect.run()
  // 返回停止监听的方法
  return () => effect.active = false
}