//引入http模块
const http=require('http')
//引入url模块
const url=require('url')
//引入 fs 模块
const fs=require('fs')

http.createServer((req,res)=>{
    let myUrl=url.parse(req.url)
    if(req.method.toLocaleLowerCase()=='post'){
        if(myUrl.pathname=='/login.html'){
            //客户端发来的所有请求数据
            let params=''

            //接收客户端发来的POST请求数据
            //第一次接收：username=admin
            //第二次接收：&password=123456
            req.on('data',(chunk)=>{
                params+=chunk
            })

            //接收结束
            req.on('end',()=>{
                let param=new URLSearchParams(params.toString())
                let username=param.get('username')
                let password=param.get('password')
                if(username=='admin' && password=='123456'){
                    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
                    fs.readFile('./html/index.html',(err,data)=>{
                        res.end(data)
                    })
                }else{
                    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
                    fs.readFile('./erro.html',(err,data)=>{
                        res.end(data)
                    })
                }
            })
        }else{
            res.end()
        }
    }else if(req.method.toLocaleLowerCase()=='get'){
        if(myUrl.pathname=='/favicon.ico'){
            return
        }
        if(myUrl.pathname=='/do_login.html'){
            //get请求参数读取
            //res.end(myUrl.query.username)
            let params=new URLSearchParams(myUrl.query)
            res.end(params.get('username'))
        }else{
            res.writeHead(405,{'Content-Type':'text/html;charset=utf-8'})
            fs.readFile('./html'+myUrl.pathname,(err,data)=>{
                if(err){
                    console.log(err.message)
                    return
                }
                res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
                res.end(data)
            })
        }
    }else{
        fs.readFile('./html/405.html',(err,data)=>{
            if(err){
               console.log(err.message)
               return
            }
            res.writeHead(405,{'Content-Type':'text/html;charset=utf-8'})
            res.end(data)
        })
    }
}).listen(3000,'127.0.0.1',()=>{
    console.log('请访问：http://127.0.0.1:3000')
})