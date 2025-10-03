import { track,trigger } from "./reactiveEffect"
export enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}
// get和set的处理
export const mutableHandlers: ProxyHandler<any> = {
  get(target,key,receiver){
    if(key===ReactiveFlags.IS_REACTIVE){
      return true
    }
    track(target,key)
    return Reflect.get(target,key,receiver)
  },
  set(target,key,value,receiver){
    const oldValue= target[key]
    const result = Reflect.set(target,key,value,receiver)
    if(oldValue!==value){
      trigger(target,key,value,oldValue)
    }
    return result
  }
}