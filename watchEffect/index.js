import {reactive,watch,watchEffect,computed} from './mine/index.js'

  const obj=reactive({
    a:1,
    b:{
      c:2
    }
  })
console.log('初始obj:',obj)
const btnA=document.getElementById('btnA')
const btnB=document.getElementById('btnB')
const btnC=document.getElementById('btnC')

btnA.onclick=()=>{
  obj.a=10
}
btnB.onclick=()=>{
  obj.b.c=20
}
btnC.onclick=()=>{
  obj.b={c:30}
}
const Com=computed(()=>{
  return obj.a+obj.b.c
})
watch(() => obj.a, (newVal) => {
  console.log('AAAAA:',newVal)
  console.log('computed.AAAA:',Com.value)
})
watch(() => obj.b.c,(newVal)=>{
  console.log('BBBBB:',newVal)
  console.log('computed.BBBB:',Com.value)
})
watch(() => obj.b,(newVal)=>{
  console.log('CCCCC:',newVal)
})
watchEffect(()=>{
  console.log('AAAAA:',obj.a)
})
watchEffect(()=>{
  console.log('BBBBB:',obj.b.c)
})
watchEffect(()=>{
  console.log('CCCCC:',obj.b)
})
