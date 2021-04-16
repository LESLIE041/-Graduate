const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String},
    // 声明id类型为数据库自带id类型，与此同时将它关联到自身，:被关联的model的 type 必须是 ObjectId, Number, String, 和 Buffer 才有效)。
    parent: {type: mongoose.SchemaTypes.ObjectId, ref:'Category'},  
})

schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})

schema.virtual('datasList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Data'
})

module.exports = mongoose.model('Category', schema)
