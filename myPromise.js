class myPromise{
  constructor(exector){
    this.status="pedding"
    this.value=undefined
    this.reason=undefined
    const resolve=(value)=>{
      if(this.status==="pedding"){
        this.value=value
        this.status="fullfilled"
      }
    }
    const reject=(reason)=>{
      if(this.status==="pedding"){
        this.reason=reason
        this.status="rejected"
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
  }
}

const promise=new myPromise((resolve,reject)=>{
  // resolve("成功")
  // reject("失败") 
  throw new Error('error')
})

promise.then((value)=>{
  console.log(value)
},(reason)=>{
  console.log("error:"+reason)
})