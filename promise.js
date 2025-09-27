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
    onFulfilled=typeof onFulfilled==='function'?onFulfilled:value=>value
    onRejected=typeof onRejected==='function'?onRejected:reason=>{throw reason}
    let promise2=new MyPromise((resolve,reject)=>{
      if(this.status==='fulfilled'){
        try {
          let x=onFulfilled(this.value)
          setTimeout(()=>{
            this.promiseType(x,promise2,resolve,reject)
          })
        }catch (error) {
          reject(error)
        }
      }
      if(this.status==='rejected'){
        try {
          let x=onRejected(this.reason)
          setTimeout(()=>{
            this.promiseType(x,promise2,resolve,reject)
          })
        }catch (error) {
          reject(error)
        }
      }
      if(this.status==='pending'){
        this.onFulfilledBack.push(
          ()=>{
            try{
              let x=onFulfilled(this.value)
              this.promiseType(x,promise2,resolve,reject)
            }catch(error){
              reject(error)
            }
          }
        )
        this.onRejectedBack.push(
          ()=>{
            try{
              let x=onRejected(this.reason) 
              this.promiseType(x,promise2,resolve,reject)
            }catch(error){
              reject(error)
            }
          }
        )
      }
      })
    return promise2
  } 
  // 判断当前的x是普通值还是promise
  promiseType(x,promise2,resolve,reject){ 
    if(x===promise2){
      return reject(new TypeError('循环引用'))
    }
    if(x instanceof MyPromise){
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(x, y => {
            this.promiseType(y, promise2, resolve, reject)
          }, reject)
        } else {
          resolve(x)
        }
      } catch (error) {
         reject(error)
      }
    }else{
      resolve(x)
    }
  }
}

const promise=new MyPromise((resolve,reject)=>{
  // resolve('成功')
  // reject('失败')
  setTimeout(() => {
    resolve('成功')
  }, 1000);
  // new Error('执行器错误')
})
promise.then(value=>{
  console.log('value1',value)
  return new MyPromise((resolve,reject)=>{
    setTimeout(() => {
      reject('失败2')
    }, 1000);
  })
},reason=>{
  console.log('reason1',reason)
  return reason
}).then(value=>{
  console.log('value2',value)
},reason=>{
  console.log('reason2',reason)
})