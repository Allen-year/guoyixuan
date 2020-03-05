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

let sql='DELETE FROM user WHERE id=?'

connection.query(sql,9,(err,results)=>{
    if(err){
        console.log(err.message)
        return
    }
    if(results.affectedRows !=0 ){
        console.log('删除成功')
    }else{
        console.log('删除失败')
    }
})

//关闭数据库
connection.end()
console.log('guanb')
