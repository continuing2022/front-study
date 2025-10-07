
import { mutableHandlers } from "./baseHandle";
import { isObject } from "@vue/shared"
import { ReactiveFlags } from "./constants";
// reactive的实现
export function reactive(obj){
  const proxy=createReactiveObject(obj);
  return proxy
}
// 原始对象到代理对象的映射 用于缓存
const reactiveMap = new WeakMap();

function createReactiveObject(target){
  // 不是对象或者null直接返回
  if (typeof target !== "object" || target === null) {
    return target;
  }
  // 一开始执行这个函数时 传入的target是原始对象 原生对象中不存在ReactiveFlags.IS_REACTIVE属性
  // 如果传入的target是一个代理对象 直接返回这个代理对象
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target // 已经是响应式对象了
  }
  // 查看缓存中是否存在这个对象的代理对象
  if(reactiveMap.get(target)){
    return reactiveMap.get(target)//存在缓存关系
  }
  // 创建代理对象
  const observed = new Proxy(target,mutableHandlers);
  reactiveMap.set(target,observed)// 建立缓存关系
  return observed
}
// ref中调用  如果value是对象 则转为响应式对象 否则直接返回value 
export function toReactive(value){
  return isObject(value)?reactive(value):value
}
export function isReactive(value){
  return !!(value && value[ReactiveFlags.IS_REACTIVE])
}