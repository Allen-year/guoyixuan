//引入mysql 模块
const  mysql=require('mysql')
//创建数据库链接对象
const contection=mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ok',
    database: 'blogg'
})

//链接数据库
contection.connect()
console.log('数据库链接成功')
//创建SQL语句
let sql='select id,username,password from user'
//执行SQL语句
contection.query(sql,(err,results)=>{
    if(err){
           console.log(err.message)
           return
    }
    console.log(results)
    results.forEach(row => {
        console.log(row.id,row.username,row.password)    
    });
})
//关闭数据库
contection.end()
console.log('数据库已关闭')
