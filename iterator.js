const arr=[1,2,3,4,5]
const str='hello'
const objs={name:'zhangsan',age:20}

for(const item of arr){
  console.log('arr',item)
}
for(const char of str){
  console.log('str',char)
}
// obj无法使用for...of 去迭代
for(const obj of objs){
  console.log('obj',obj)
}
// 在数组和string中有一个内置的迭代器接口
const itor=arr[Symbol.iterator]()
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
// 实现一个自定义迭代器
const myIterator=function(data){
  let index=0
  return {
    next:function(){
      return {
        value:data[index++],
        done:index>data.length
      }
    }
  }
}

const myArr=[1,2,3,4,5]
const myIt=myIterator(myArr)
console.log(myIt.next())
console.log(myIt.next())
console.log(myIt.next())