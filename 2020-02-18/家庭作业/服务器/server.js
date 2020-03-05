//引入http模块
const http=require('http')
//引入url模块
const url=require('url')
//引入fs模块
const fs=require('fs')

const server= http.createServer((req,res) => {

     if(req.url=='/favicon.ico'){
         return
     }

     //将url字符串 转换成 url对象
     let myUrl=url.parse(req.url)

     //获取用户请求的 URL 地址
     console.log(myUrl.pathname)
    
     //静态路由
     if(myUrl.pathname == '/' || myUrl.pathname=='/bk.html'){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
        //读取文件
        //err => 如果读取文件失败，失败的消息封装到err对象中
        // data => 读取文件的内容
        fs.readFile('../bk.html',(err,data)=>{
            //读取文件失败的操作
            if(err){
               console.log(`读取页面失败：${err.message}`)
               return
            }
            res.end(data)
        })
     }else if(myUrl.pathname=='/img/genjismm.jpg'){
         res.writeHead(200,{'Content-Types':'image/jpg'})
         fs.readFile('../img/genjismm.jpg',(err,data)=>{
             if(err){
               console.log(`读取图片失败：${err.message}`)
               return
             }
             res.end(data)
         })
     }else{
         res.end('404')
     }
    // //请求的URl
    // let urlString=req.url

    // let myUrl=url.parse(urlString)
    // res.end()
})

server.listen(3000,'127.0.0.1',()=>{
    console.log('请访问：http://127.0.0.1:3000')
})

