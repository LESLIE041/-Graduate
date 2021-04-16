const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {type: String},
    // 声明id类型为数据库自带id类型，与此同时将它关联到自身，:被关联的model的 type 必须是 ObjectId, Number, String, 和 Buffer 才有效)。
    categories: {type: mongoose.SchemaTypes.ObjectId, ref:'Category'},  
    body: {type: String},
},{
    timestamps: true
}
)

module.exports = mongoose.model('Article', schema)
