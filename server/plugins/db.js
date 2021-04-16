// 数据库新建与连接
module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/graduate',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    mongoose.set('useFindAndModify', false)
    // console.log('数据库已建立链接')

    // 引用所有的模型
    require('require-all')(__dirname + '/../models')
}
