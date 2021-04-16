
    // 对token进行校验，因此加入一个中间件
    //split()完变为一个数组， pop()用于提取数组的最后一个元素

module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const Adminuser = require('../models/AdminUser') 
    return  async (req,res,next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
        const {id} = jwt.verify(token,req.app.get('secret'))
        assert(id, 401, '请先登录')
        req.user = Adminuser.findById(id)
        assert(req.user, 401, '请先登录')
        await next()
    }
}
