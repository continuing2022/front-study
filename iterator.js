// 迭代器和生成器
// 迭代器是一种接口，为各种不同的数据结构提供统一的访问机制
// 任何数据结构只要部署了Iterator接口，就可以完成遍历操作
// 部署Iterator接口主要是为数据结构添加一个Symbol.iterator属性，该属性的值是一个函数，执行该函数会返回一个迭代器对象
// 迭代器对象具有next方法，next方法返回一个对象，该对象具有value和done两个属性，value表示当前的值，done表示是否遍历结束
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