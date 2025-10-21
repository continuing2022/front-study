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
    if(!(onFullfilled instanceof Function)){
      onFullfilled=()=>this.value
    }
    if(!(onRejected instanceof Function)){
      onRejected=()=>this.reason
    }
    function resolvePromise(resolve,reject,value){
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
    let promise2=new myPromise((resolve,reject)=>{
      if(this.status==="fullfilled"){
        const value=onFullfilled(this.value)
        // value可能是一个普通值也可能是一个promise
        resolvePromise(resolve,reject,value)
      }
      if(this.status==="rejected"){
        const reason=onRejected(this.reason)
        resolvePromise(resolve,reject,reason)
      }
      if(this.status==='pedding'){
        this.onFullfilledCallback.push(()=>{
          const value=onFullfilled(this.value)
          resolvePromise(resolve,reject,value)
        })
        this.onRejectedCallback.push(()=>{
          const reason=onRejected(this.reason)
          resolvePromise(resolve,reject,reason)
        })
      }
    })
    return promise2
  }
  catch(onRejected){
    this.then("",onRejected)
  }
  static resolve(value) {
    return new myPromise((resolve, reject) => {
      if (value instanceof myPromise) {
        value.then(resolve, reject)
      } else if (value && typeof value.then === 'function') {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }
}
const promise=myPromise.resolve(new myPromise((resolve,reject)=>{
  reject("promise")
}))
promise.then((value)=>{
  console.log("success:"+value)
},(reason)=>{
  console.log("error:"+reason)
})


// const promise=new myPromise((resolve,reject)=>{
//   resolve("成功")
// })

// promise.then((value)=>{
//   console.log("1:"+value)
//   // throw new Error(value)
//   return new myPromise((resolve,reject)=>{
//     reject('promise错误')
//   })
//   // return value
// }).then((value)=>{
//   console.log("2:"+value)
//   return value
// },(reason)=>{
//   console.log("error21:"+reason)
// })
