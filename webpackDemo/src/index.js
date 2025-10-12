import { say22 } from "./2222.js";  // 添加 .js 扩展名
import './style.css'
say22()
console.log('33333')
// 使用相对路径，会被 webpack devServer 代理到 http://localhost:3000/user
fetch('/user').then(res=>res.json()).then(data=>{
    console.log(data);
}).catch(err=>{
    console.error('请求失败:', err);
});
