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
  then(onFullfilled,onRejected){
    let promise2=new Promise((resolve,reject)=>{
      if(this.status==="fullfilled"){
        const value=onFullfilled(this.value)
        resolve(value)
      }
      if(this.status==="rejected"){
        const reason=onRejected(this.reason)
        reject(reason)
      }
      if(this.status==='pedding'){
        this.onFullfilledCallback.push(()=>{
          const value=onFullfilled(this.value)
          resolve(value)
        })
        this.onRejectedCallback.push(()=>{
          const reason=onRejected(this.reason)
          reject(reason)
        })
      }
    })
    return promise2
  }
}
