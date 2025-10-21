class myPromise{
  constructor(exector){
    this.status="pedding"
    this.value=undefined
    this.reason=undefined
    this.onFullfilledCallback=[]
    this.onRejectedCallback=[]
    const resolve=(value)=>{
      if(this.status==="pedding"){
        this.value=value
        this.status="fullfilled"
        this.onFullfilledCallback.forEach((fn)=>{
          fn()
        })
      }
    }
    const reject=(reason)=>{
      if(this.status==="pedding"){
        this.reason=reason
        this.status="rejected"
        this.onRejectedCallback.forEach((fn)=>{
          fn()
        })
      }
    }
    // 执行迭代器
    try {
      exector(resolve,reject)
    } catch (error) {
      reject(error)
    }

  }
  resolvePromise(resolve,reject,value){
    try {
      if(value instanceof myPromise){
        value.then(resolve,reject)
      }else{
        resolve(value)
      }
    } catch (error) {
      reject(error)
    }
  }
  then(onFullfilled,onRejected){
    if(!(onFullfilled instanceof Function)){
      onFullfilled=()=>this.value
    }
    if(!(onRejected instanceof Function)){
      onRejected=()=>this.reason
    }
    let promise2=new myPromise((resolve,reject)=>{
      if(this.status==="fullfilled"){
        const value=onFullfilled(this.value)
        // value可能是一个普通值也可能是一个promise
        this.resolvePromise(resolve,reject,value)
      }
      if(this.status==="rejected"){
        const reason=onRejected(this.reason)
        this.resolvePromise(resolve,reject,reason)
      }
      if(this.status==='pedding'){
        this.onFullfilledCallback.push(()=>{
          const value=onFullfilled(this.value)
          this.resolvePromise(resolve,reject,value)
        })
        this.onRejectedCallback.push(()=>{
          const reason=onRejected(this.reason)
          this.resolvePromise(resolve,reject,reason)
        })
      }
    })
    return promise2
  }
  catch(onRejected){
    this.then("",onRejected)
  }
}
