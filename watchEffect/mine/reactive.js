
import { Dep } from "./Dep.js";
const dep=new Dep()
console.log('dep',dep.deps)
export function reactive(obj){
  return new Proxy(obj,{
    get(target,key){
      const res=Reflect.get(target,key)
      // 设置依赖
      dep.setEffect(target,key)
      // 如果获取的值还是对象的话 继续变成响应式
      return typeof res==='object'&&res!==null?reactive(res):res
    },
    set(target,key,newVal){
      const oldVal=target[key]
      const res=Reflect.set(target,key,newVal)
      if(res){
        // 通知更新
        dep.notify(target,key,newVal,oldVal)
      }
      return res
    }
  })
}