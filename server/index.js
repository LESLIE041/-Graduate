const express = require("express")

// express的实例
const app = express()

// 用于token生成
app.set('secret','iivgiiogoi2oe930')

// 用于实现调用客户端传来的内容
app.use(express.json())
// 引入跨域模块
app.use(require('cors')())
// 实现托管静态文件，同时使得uploads文件夹中的所有文件可以通过/uploads格式调用
app.use('/uploads', express.static(__dirname + '/uploads'))

// 用于内部调用app
require('./routes/admin')(app)
require('./routes/web')(app)
require('./plugins/db')(app)

// 用于监听3000端口并规定回调函数，用于定义接下来需要做什么，并注意结尾引号
app.listen(3000,() =>{
    console.log('http://localhost:3000');
}
)