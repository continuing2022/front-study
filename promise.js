// 手写promise
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
  catch(onRejected){
    return this.then(null,onRejected)
  }
  // promise.All
  static all(promises){
    return new MyPromise((resolve,reject)=>{
      let results=[]
      let count=0
      promises.forEach((p,index)=>{
        MyPromise.resolve(p).then(value=>{
          results[index]=value
          count++
          if(count===promises.length){
            resolve(results)
          }
        },reject)
      })
    })
  }
  // promise.race
  static race(promises){
    return new MyPromise((resolve,reject)=>{
      promises.forEach(p=>{
        MyPromise.resolve(p).then(resolve,reject)
      })
    })
  }
  // 生成一个rejected状态的promise
  static reject(reason){
    return new MyPromise((resolve,reject)=>{
      reject(reason)
    })
  }
  // 生成一个fulfilled状态的promise
  static resolve(value){
    return new MyPromise((resolve,reject)=>{
      resolve(value)
    })
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
// promise.then(value=>{
//   console.log('value1',value)
//   return new MyPromise((resolve,reject)=>{
//     setTimeout(() => {
//       reject('失败2')
//     }, 1000);
//   })
// }).then(value=>{
//   console.log('value2',value)
// },reason=>{
//   console.log('reason2',reason)
//   return '失败2的返回值'
// }).then(value=>{
//   console.log('catch',value)
// },reason=>{
//   console.log('reason3',reason)
// })