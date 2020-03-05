/**
 * 后台管理 - 文章管理
 */
const express = require('express')
const articleApp = express()


articleApp.get('/add',(req,res)=>{
    res.render('admin/article/add')
})

module.exports = articleApp