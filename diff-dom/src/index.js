import h from './h.js'
import patch from './patch.js'

let vnode=document.getElementById('container')
let btn =document.getElementById('btn')
let vnode1=h('div',{},'你好1')
let vnode2 = h('ul', {},[ 
    h('li', {key:3}, '3'),
    h('li', {key:4}, '4'),
    h('li', {key:1}, '1'),
    h('li', {key:2}, '2'),
]);
console.log(vnode1,vnode2)
vnode = patch(vnode,vnode1)

btn.addEventListener('click',()=>{
    vnode = patch(vnode,vnode2)
})