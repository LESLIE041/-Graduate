// 用于存放admin端的接口路由
// 导出函数用于接收app对象
module.exports = app => {

    const express = require('express')
    // 用于生成token
    const jwt = require('jsonwebtoken')
    // assert用于校验
    const assert = require('http-assert')
    const auth = require('../../middleware/auth')
    // 子路由
    const router = express.Router()
    const Category = require('../../models/Category')
    const Article = require('../../models/Article')
    const Ad = require('../../models/Ad')
    const Adminuser = require('../../models/AdminUser')
    const Data = require('../../models/Data')


    // 分类
    router.post('/categories',auth(), async (req,res) => {
        // req.body指的是由客户端传来的数据
        const model = await Category.create(req.body)
        // 将模型传回客户端
        res.send(model)
    })

    router.put('/categories/:id', auth(),async (req,res) => {
        // req.body指的是由客户端传来的数据
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        // 将模型传回客户端
        res.send(model)
    })

    router.delete('/categories/:id',auth(), async (req,res) => {
        // req.body指的是由客户端传来的数据
        await Category.findByIdAndDelete(req.params.id,req.body)
        // 将模型传回客户端
        res.send({
            success: true
        })
    })

    router.get('/categories',auth(), async (req,res) => {
        // req.body指的是由客户端传来的数据
        // const model = await Category.find().limit(10)
        // populate()代表将parent变成一个对象
        const items = await Category.find().populate('parent')
        // 将模型传回客户端
        res.send(items)
    })

    router.get('/categories/:id',auth(), async (req,res) => {
        // req.body指的是由客户端传来的数据
        // const model = await Category.find().limit(10)
        const model = await Category.findById(req.params.id)
        // 将模型传回客户端
        res.send(model)
    })   

// 文章
    router.post('/articles',auth(), async (req,res) => {
        const model = await Article.create(req.body)
        res.send(model)
    })

    router.get('/articles', auth(),async (req,res) => {
        const items = await Article.find()
        res.send(items)
    })

    router.delete('/articles/:id',auth(), async (req,res) => {
        await Article.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })

    router.put('/articles/:id',auth(), async (req,res) => {
        const model = await Article.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    router.get('/articles/:id',auth(), async (req,res) => {
        const model = await Article.findById(req.params.id)
        res.send(model)
    })

    // 广告
    router.post('/ads',auth(), async (req,res) => {
        // req.body指的是由客户端传来的数据
        const model = await Ad.create(req.body)
        // 将模型传回客户端
        res.send(model)
    })  

    router.put('/ads/:id',auth(),async (req,res) => {
        const model = await Ad.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    router.get('/ads/:id',auth(), async (req,res) => {
        const model = await Ad.findById(req.params.id)
        res.send(model)
    })

    router.get('/ads',auth(), async (req,res) => {
        const items = await Ad.find()
        res.send(items)
    })

    router.delete('/ads/:id',auth(), async (req,res) => {
        await Ad.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })

    // 数据
    router.post('/datas',auth(), async (req,res) => {
        // req.body指的是由客户端传来的数据
        const model = await Data.create(req.body)
        // 将模型传回客户端
        res.send(model)
    })  

    router.put('/datas/:id',auth(),async (req,res) => {
        const model = await Data.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    router.get('/datas/:id',auth(), async (req,res) => {
        const model = await Data.findById(req.params.id)
        res.send(model)
    })

    router.get('/datas',auth(), async (req,res) => {
        const items = await Data.find()
        res.send(items)
    })

    router.delete('/datas/:id',auth(), async (req,res) => {
        await Data.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })

    // 管理员
    router.post('/admin_users',auth(), async (req,res) => {
        // req.body指的是由客户端传来的数据
        const model = await Adminuser.create(req.body)
        // 将模型传回客户端
        res.send(model)
    })  

    router.put('/admin_users/:id',auth(), async (req,res) => {
        const model = await Adminuser.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    router.get('/admin_users/:id',auth(), async (req,res) => {
        const model = await Adminuser.findById(req.params.id)
        res.send(model)
    })

    router.get('/admin_users',auth(), async (req,res) => {
        const items = await Adminuser.find()
        res.send(items)
    })

    router.delete('/admin_users/:id', auth(),async (req,res) => {
        await Adminuser.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })

    app.use('/admin/api', router)

// 实现图片上传，利用中间件multer
const multer = require('multer')
const upload = multer({dest: __dirname + '/../../uploads'})
app.post('/admin/api/upload',auth(),upload.single('file'), async(req,res) =>{
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
})

// 登陆路由
app.post('/admin/api/login', async (req,res) => {
    const { username, password} = req.body
    // 根据用户名找用户
    const user = await Adminuser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')
    // 校验密码
    const isValid = require('bcryptjs').compareSync(password,user.password)
    assert(isValid, 422, '密码错误')
    // 返回token
    const token = jwt.sign({
        id: user._id,
    },app.get('secret'))
    res.send({token})
})

// 错误处理
app.use(async (err, req, res, next) =>{
    res.status(err.statusCode).send({
        message: err.message
    })
})
}
