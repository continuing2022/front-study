import { activeEffect, trackEffect, trackEffects } from "./effect"
import { toReactive } from "./reactive"
import { createDep } from "./reactiveEffect"

export function ref(value) {
  return new RefImpl(value)
}

class RefImpl {
  __v_isRef = true
  public _value: any
  public _deps: any = null
  
  constructor(public rawValue) {
    this._value = toReactive(rawValue)
  }
  
  get value() {
    // debugger
    trackRefValue(this)
    return this._value
  }
  
  set value(newValue) {
    // 使用 Object.is 进行更精确的比较
    if (Object.is(newValue, this.rawValue)) return
    this.rawValue = newValue
    this._value = toReactive(newValue)
    triggerRefValue(this)
  }
}

function trackRefValue(ref) {
  if (!activeEffect) return
  
  // 只在第一次访问时创建依赖集合
  if (!ref._deps) {
    ref._deps = createDep(() => { ref._deps = null }, "ref")
  }
  
  trackEffect(activeEffect, ref._deps)
}

function triggerRefValue(ref) {
  const dep = ref._deps
  if (!dep) return
  trackEffects(dep)
}