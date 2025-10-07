// reflect操作对象的基本方法
// 1. Reflect.get(target,key,receiver)
// 2. Reflect.set(target,key,value,receiver)  
const obj={
  a:1,
  b:2,
  get c(){
    console.log(this)
    return this.a+this.b
  }
}
Object.defineProperty(obj, 'd', {
  value:4,
  enumerable:false,
  writable:true,
})
// 无法遍历不可枚举对象
// console.log(Object.keys(obj))
// console.log(Reflect.ownKeys(obj))//可以获取不可枚举对象

const handle=new Proxy(obj,{
  get(target,key,receiver){
    console.log('get',key)
    // return target[key]
    return Reflect.get(target,key,receiver)
  },
  set(target,key,value,receiver){
    // target[key]=value
    // return true
    return Reflect.set(target,key,value,receiver)
  }   
})
// 不使用reflect的话 无法拦截到 return this.a+this.b因为当前的this指向obj，其中obj并不是代理对象
console.log(handle.c)//3