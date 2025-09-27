import { Dep } from './Dep.js'
export function watch(target, callback) {
  // 先执行target，再建立联系
  Dep.callBack = callback
  target()//这里会触发getter
  Dep.callBack = null
}
export function watchEffect(effect) {
  Dep.callBack = effect
  effect()//立刻执行一次 并触发getter
  Dep.callBack = null
}