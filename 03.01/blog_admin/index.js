const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const app = express()

/**
 * 上传配置
 */
// 上传文件存储目录（该目录一定放在静态目中）
let uploadPath = `${__dirname}/static/upload/`
// 上传对象
const upload = multer({
    dest: uploadPath, // 上传文件存储目录配置
    limits: {
        fieldSize: 1, // 上传文件的大小限制在 20M 以内
        files: 5 // 多文件上传，最大上传文件数
    }
})

// 视图引擎配置
app.set('view engine', 'html')
app.set('views', `${__dirname}/views`)
app.engine('html', require('ejs').renderFile)

// 静态资源加载
app.use(express.static('static'))

// POST请求处理
app.use(express.urlencoded({ extended: true }))



// 后台管理-文章管理
app.use('/admin/article', require('./router/admin/article'))


/**
 * ckeditor-图片上传
 */
app.use('/admin/upload', upload.single('upload'), (req, res) => {
    let file = req.file
    console.log(file)
    if (file) {
        let extname = path.extname(file.originalname) // 上传文件的后缀
        fs.renameSync(file.path, `${uploadPath}${file.filename}${extname}`)// 上传文件的重命名

        // 返回上传的结果
        res.json({
            uploaded: true, // 上传成功还是失败
            url: `/upload/${file.filename}${extname}` // 上传成功后的文件路径（给的是URL，不是文件物理路径）
        })
    }else{
        res.json({
            uploaded: false, // 上传成功还是失败
            error: { message: '上传失败' }, // 错误消息
        })
    }
})



app.listen(3000)