export class Dep{
  constructor(){
    this.deps=new WeakMap()
  }
  setEffect(target,key){
    // 先判断当前target是否存在
    const depMap=this.deps.get(target)
    if(!depMap){
      // 如果不存在就为这个target创建一个depMap
      this.deps.set(target,new Map([[key,new Set()]]))
    }
    // 再判断对应key是否存在
    const keySet=this.deps.get(target).get(key)
    if(!keySet){
      // 同理
      this.deps.get(target).set(key,new Set())
    }
    // 最后把当前的回调函数存到对应的key中
    if(Dep.callBack){
      this.deps.get(target).get(key).add(Dep.callBack)
    }
  }
  notify(target,key,newVal,oldVal){
    // 触发依赖 只有存在才执行
    const keySet=this.deps.get(target)?.get(key)
    if(keySet){
      keySet.forEach(fn=>{
          const newValue=fn(newVal,oldVal)
          if(fn.computedRef){
            fn.computedRef.value=newValue
          }
      })
    }
  }
  static callBack=null//为啥一定要挂载到类上?因为我们需要在静态方法中访问它
}