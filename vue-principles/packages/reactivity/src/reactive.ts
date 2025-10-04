
import { mutableHandlers,ReactiveFlags } from "./baseHandle";
import { isObject } from "@vue/shared"
// reactive的实现
export function reactive(obj){
  const proxy=createReactiveObject(obj);
  return proxy
}
const reactiveMap = new WeakMap(); // 原始对象到代理对象的映射

function createReactiveObject(target){
  if (typeof target !== "object" || target === null) {
    return target;
  }
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target // 已经是响应式对象了
  }
  if(reactiveMap.get(target)){
    return reactiveMap.get(target)//存在缓存关系
  }
  const observed = new Proxy(target,mutableHandlers);
  reactiveMap.set(target,observed)// 建立缓存关系
  return observed
}
export function toReactive(value){
  return isObject(value)?reactive(value):value
}