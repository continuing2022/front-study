const express=require('express');

const app=express();
const port=3001; // 改为 3001 端口

app.get('/user',(req,res)=>{
    res.json({name:'张三',age:20});
});

app.listen(port,()=>{
    console.log(`服务器运行在 http://localhost:${port}`);
});