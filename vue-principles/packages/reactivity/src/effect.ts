
export function effect(fn,options={}){
  // 保存还未执行的副作用函数
  const _effect = new ReactiveEffect(fn,()=>{
    _effect.run();
  })
  _effect.run()
  return _effect
}
export let activeEffect = undefined // 当前正在执行的副作用函数
class ReactiveEffect{
  _trackId=0
  deps=[] // 依赖集合
  depLength=0
  public active = true // 是否激活
  constructor(public fn: () => any,public scheduler: () => void){
    this.fn = fn
    this.scheduler = scheduler
  }
  run(){
    if(!this.active){
      return this.fn()
    }
    let lastEffect = activeEffect
    try {
      activeEffect = this
      return this.fn()
    } finally  {
      activeEffect=lastEffect
    }
  }
}
// 依赖收集
export function trackEffect(effect,dep){
  dep.set(effect,effect._trackId)
  effect.deps[effect.depLength++]=dep
}
// 触发依赖
export function trackEffects(dep){
  dep.forEach((_,effectId)=>{
    effectId.scheduler()
  })
}