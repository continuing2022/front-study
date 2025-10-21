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
        this.onFullfilledCallback.forEach((item)=>{
          item(this.value)
        })
      }
    }
    const reject=(reason)=>{
      if(this.status==="pedding"){
        this.reason=reason
        this.status="rejected"
        this.onFullfilledCallback.forEach((item)=>{
          item(this.reason)
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
    if(this.status==="fullfilled"){
      onFullfilled(this.value)
    }
    if(this.status==="rejected"){
      onRejected(this.reason)
    }
    if(this.status==='pedding'){
      this.onFullfilledCallback.push((value)=>onFullfilled(value))
      this.onRejectedCallback.push((reason)=>onRejected(reason))
    }
    
  }
}

const promise=new myPromise((resolve,reject)=>{
  // resolve("成功")
  // reject("失败") 
  setTimeout(()=>{
    resolve('异步成功')
  },2000)
  // throw new Error('error')
})

promise.then((value)=>{
  console.log("1:"+value)
},(reason)=>{
  console.log("error1:"+reason)
})

promise.then((value)=>{
  console.log("2:"+value)
},(reason)=>{
  console.log("error2:"+reason)
})