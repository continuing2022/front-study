import { activeEffect, trackEffect, trackEffects } from "./effect"
import { toReactive } from "./reactive"
import { createDep } from "./reactiveEffect"
export function ref(value) {
  return RefImpl(value)
}
function RefImpl(value) {
  const wrapper = new RefImplClass(value)
  return wrapper
}

class RefImplClass {
  __v_isRef = true
  public _value: any
  public _deps = []
  constructor(public rawValue){
    this._value = toReactive(rawValue)
  }
  get value(){
    trackRefValue(this)
    return this._value
  }
  set value(newValue){
    if(newValue===this.rawValue) return
    this._value = newValue
    this.rawValue = newValue
    triggerRefValue(this)
  }
}
function trackRefValue(ref){
  if(!activeEffect) return
  trackEffect(
    activeEffect,
    (ref._deps=createDep((ref._deps),"undefined"))
  ) // 创建依赖集合
}
function triggerRefValue(ref){
  let dep=ref._deps
  if(!dep) return
  trackEffects(dep)
}