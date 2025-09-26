class MyPromise{
  constructor(executor){
    this.status='pending'
    this.value=undefined
    this.reason=undefined
    const resolve=(value)=>{
      if(this.status==='pending'){  
        this.status='fulfilled'
        this.value=value
      }
    }
    const reject=(reason)=>{
      if(this.status==='pending'){
        this.status='rejected'
        this.reason=reason
      }
    }

    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled,onRejected){
    if(this.status==='fulfilled'){
      onFulfilled(this.value)
    }
    if(this.status==='rejected'){
      onRejected(this.reason)
    }
  }
}

const promise=new MyPromise((resolve,reject)=>{
  // resolve('成功')
  // reject('失败')
  throw new Error('执行器错误')
})
console.log(promise)
promise.then(value=>{
  console.log('value',value)
},reason=>{
  console.log('reason',reason)
})