const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    // 进行密码散列，对密码进行加密，提高安全性
    // 散列函数的指数一般是10-12
    // bcrypt进行加密是不可逆的，并且对于同一密码不同次查看加密的最终结果不同
    // 加入select即在编辑页面，密码不会二次散列
    password: {
        type: String,
        select: false,
        set(val){
            return require('bcryptjs').hashSync(val,10)
9        }
    },
})

module.exports = mongoose.model('AdminUser', schema)
