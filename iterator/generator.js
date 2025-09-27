// yield 暂停函数执行
function* generatorFunction(){
  const value1=yield 1;
  console.log(value1)
  const value2=yield 2;
  console.log(value2)
  const value3=yield 3;
  console.log(value3)
}
// 使用next方法执行
const generator=generatorFunction()
console.log(generator.next('one'))
console.log(generator.next('two'))
console.log(generator.next('three'))
console.log(generator.next('four'))

// 使用生成器去处理objs
const objs={
  a:1,
  b:2,
  c:3,
  [Symbol.iterator]:function*(){
    const map=Object.entries(this)
    for(const item of map){
      yield item
    }
  }
}
for(const item of objs){
  console.log(item)
}