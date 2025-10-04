
export function effect(fn,options?){
  // 保存还未执行的副作用函数
  const _effect = new ReactiveEffect(fn,()=>{
    _effect.run();
  })
  _effect.run()
  if(options){
    Object.assign(_effect,options)
  }
  const runner = _effect.run.bind(_effect)
  return runner
}
export let activeEffect = undefined // 当前正在执行的副作用函数
// 清理函数
function preCleanEffect(effect){
  effect._depLength=0
  effect._trackId++
}
// 清理依赖
function cleanDepEffect(effect, dep) {
  dep.delete(effect)
  if (dep.size == 0 && typeof dep.cleanup === 'function') {
    dep.cleanup()
  }
}
// 清理多余的依赖
function postCleanEffect(effect){
  if(effect._depLength<effect.deps.length){
    for(let i=effect._depLength;i<effect.deps.length;i++){
      cleanDepEffect(effect,effect.deps[i])
    }
    effect.deps.length=effect._depLength
  }
}
class ReactiveEffect{
  _trackId=0
  deps=[] // 依赖集合
  _depLength=0
  _isRunning=false
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
      preCleanEffect(this)
      this._isRunning = true
      return this.fn()
    } finally  {
      // debugger
      this._isRunning = false
      postCleanEffect(this)
      activeEffect=lastEffect
    }
  }
  stop(){
    this.active=false
  }
}
// 依赖收集
export function trackEffect(effect,dep){
  // debugger
  if(effect._trackId===dep.get(effect)) return
  dep.set(effect,effect._trackId)
  let oldDep=effect.deps[effect._depLength]
  if(oldDep!==dep){
    if(oldDep){
      cleanDepEffect(effect,oldDep)
    }
    effect.deps[effect._depLength++]=dep
  }else{
    effect._depLength++
  }

}
// 触发依赖
export function trackEffects(dep){
  dep.forEach((_,effectId)=>{
    if(effectId._isRunning) return
    effectId.scheduler()
  })
}