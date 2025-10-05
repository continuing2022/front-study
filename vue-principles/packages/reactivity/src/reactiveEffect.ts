// 收集依赖
import { activeEffect,trackEffect,trackEffects } from "./effect";
let targetMap = new WeakMap()
// 清理函数
export const createDep=(cleanup,key)=>{
  const dep=new Map() as any
  dep.cleanup=cleanup
  dep.name=key
  return dep
}
// 依赖收集
export function track(target,key){
  if(!activeEffect) return
  let depsMap = targetMap.get(target)
  if(!depsMap){
    depsMap = new Map()
    targetMap.set(target,depsMap)
  }
  let dep = depsMap.get(key)
  if(!dep){
    depsMap.set(
      key,
      dep=createDep(()=>{depsMap.delete(key)},key)
    )
  }
  // 添加依赖
  trackEffect(activeEffect,dep)
}

export function trigger(target,key,newValue,oldValue){
  const depsMap = targetMap.get(target)
  if(!depsMap) return
  const dep = depsMap.get(key)
  if(dep){
    // 副作用函数执行
    trackEffects(dep)
  }
}
console.log(targetMap)