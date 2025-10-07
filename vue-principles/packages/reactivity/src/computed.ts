import { isFunction } from "@vue/shared"
import { ReactiveEffect } from "./effect"
import { trackRefValue, triggerRefValue } from "./ref"

export function computed(getterOrOptions){
  const onlyGetter = isFunction(getterOrOptions)
  let getter, setter
  if(onlyGetter){
    getter = getterOrOptions
    setter = () => {
      console.warn("computed value is readonly")
    }
  }else{
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  return new ComputedRefImpl(getter, setter)
}

class ComputedRefImpl<T> {
  public _value: any;
  public effect: any;
  public _deps: any;
  constructor( getter,public setter) {
     this.effect= new ReactiveEffect(
      ()=>getter(this._value),
      ()=>{
        triggerRefValue(this)
      }
    )
  }
  get value() {
    // 脏就执行
    if(this.effect.dirty){
      this._value=this.effect.run()
      // 收集依赖
      trackRefValue(this)
    }
    return this._value
  }
  set value(newValue) {
    this.setter(newValue)
  }
}
