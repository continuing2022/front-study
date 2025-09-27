import {reactive,watch,watchEffect} from './mine/index.js'

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
const btnD=document.getElementById('btnD')

btnA.onclick=()=>{
  obj.a=10
}
btnB.onclick=()=>{
  obj.b.c=20
}
btnC.onclick=()=>{
  obj.b={c:30}
}

watch(() => obj.a, (newVal) => {
  console.log('AAAAA:',newVal)
})
watch(() => obj.b.c,(newVal)=>{
  console.log('BBBBB:',newVal)
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
