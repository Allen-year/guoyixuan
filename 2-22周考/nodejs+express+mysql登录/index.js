const express=require('express')
//引入mysql模板
const mysql=require('mysql')
// 创建数据库链接对象
const connection=mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'ok',
  database: 'weektest'
})
//创建应用程序
const app=express()
//引入http模块
const http=require('http')
//引入url模块
const url=require('url')
//引入fs模块
const fs=require('fs')
// http.createServer((req,res)=>{

// })

// 打开登录页面
app.get('/',(req,res)=>{
  console.log(__dirname)
res.sendFile(`${__dirname}/html/index.html`)
})



// const sercer=http.createServer((req,res)=>{
//    let _url=url.parse(req.url);
//    let pathname=_url.pathname

//对登录页信息进行验证

app.get('/login.html',(req,res)=>{
  
//  接收客户端发来的所有请求数据

  connection.connect()
  console.log('链接数据库成功')


  let sql='select username,password from users where username = ? and password = ?';
  connection.query(sql,['admin',1233],(err,results)=>{
    // var param=req.query
    // var UserName=param.username
    // var PassWord=param.password
    if(err){
       console.log(err.message)
       return
    }
 
    console.log(results)
  })

  connection.end()
  console.log('关闭数据库')

  console.log(__dirname)

res.sendFile(`${__dirname}/html/succ.html`)

})

// })




//监听服务端口
app.listen(3000,'127.0.0.1',()=>{
      console.log('请登录：http://127.0.0.1:3000')
})