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

let sql='UPDATE user SET password=? where id=?'

connection.query(sql,['0000',3],(err,results)=>{
    if(err){
        console.log(err.message)
        return
    }
    if(results.affectedRows !=0 ){
        console.log('修改成功')
    }else{
        console.log('修改失败')
    }
})

//关闭数据库
connection.end()
console.log('guanb')
