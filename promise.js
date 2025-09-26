class MyPromise{
  constructor(executor){
    this.status='pending'
    this.value=undefined
    this.reason=undefined
    this.onFulfilledBack=[]
    this.onRejectedBack=[]
    const resolve=(value)=>{
      if(this.status==='pending'){  
        this.status='fulfilled'
        this.value=value
        this.onFulfilledBack.forEach(fn=>fn())
      }
    }
    const reject=(reason)=>{
      if(this.status==='pending'){
        this.status='rejected'
        this.reason=reason
        this.onRejectedBack.forEach(fn=>fn())
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
    if(this.status==='pending'){
      this.onFulfilledBack.push(()=>{onFulfilled(this.value)})
      this.onRejectedBack.push(()=>{onRejected(this.reason)})
    }
  }
}

const promise=new MyPromise((resolve,reject)=>{
  // resolve('成功')
  // reject('失败')
  setTimeout(() => {
    resolve('成功')
  }, 1000);
  // throw new Error('执行器错误')
})
promise.then(value=>{
  console.log('value1',value)
},reason=>{
  console.log('reason1',reason)
})
promise.then(value=>{
  console.log('value2',value)
},reason=>{
  console.log('reason2',reason)
})