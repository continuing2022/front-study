
// Object.entries(objs)返回一个二维数组
const objs={
  a:1,
  b:2,
  c:3,
  [Symbol.iterator]:function(){
    const map=Object.entries(this)
      let index=0
    return {
      next:()=>{
        return {
          value:map[index++],
          done:index>map.length
        }
      }
    }
  }
}
const it=objs[Symbol.iterator]()
console.log(it.next())
console.log(it.next())  
console.log(it.next())
console.log(it.next())
for(const item of objs){
  console.log(item)
}