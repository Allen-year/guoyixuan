//引入mysql
const mysql=require('mysql')

//创建数据库链接对象
const connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'ok',
    database:'blogg'
})

//链接数据库
connection.connect()
console.log('dakai')

let sql='INSERT into user (username,password) values(?,?)'

connection.query(sql,['大锤','123332'],(err,results)=>{
    if(err){
        console.log(err.message)
        return
    }
    if(results.affectedRows !=0 ){
        console.log('插入成功,插入Id为'+results.insertId)
    }else{
        console.log('插入失败')
    }
})

//关闭数据库
connection.end()
console.log('guanb')
