const map = new Map()
const wMap = new WeakMap()

;(() => {  // 注意这里添加了分号
  const foo = { foo: 1 }
  const bar = { bar: 2 }

  map.set(foo, 1)
  wMap.set(bar, 1)
  /*
    weakMap和Map对标的其实是原生的"对象"数据类型=>键值对
    weakMap的键只能是弱类型（Array,obj,function）且"弱引用"并不会阻止键对象被垃圾回收。
    "具体的原因"：是因为weakMap中应用的对象不会被计算到垃圾回收机制中的记数
    map是"强引用"只要 `Map` 里存着，键就不会被垃圾回收
    weakMap无法遍历，因为垃圾回收机制的时机不确定，会报错
  */
})()
console.log(map) 
console.log(wMap)
