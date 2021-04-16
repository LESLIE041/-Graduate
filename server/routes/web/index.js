// 手机端的接口路由
//下文注释部分用于新闻内容通过json方式整体输入的方法。

module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    // const db = require('../../plugins/db')
    // // const Article = require('../../models/Article')
    const Article = mongoose.model('Article')
    const Data = mongoose.model('Data')
    const Category = mongoose.model('Category')
    // // 可以实现新闻通过js方式整体传入
    // router.get('/news/init', async(req, res) => {
    //     const parent = await Category.findOne({
    //         namw: '新闻分类'
    //     })
    //     // lean()方法表示取纯粹的json
    //     const cats = await Category.find().where({
    //         parent: parent
    //     }).lean()
    //     // 如果有需要的录入的新闻数据，只需将需要的json数据放入以下数组中
    //     const newsTitles = []
    //     const newsList = newsTitles.map(title =>{
    //          // 对于sort（）而言，只要结果大于0.5
    //         const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5),
    //         return{

    //             categories: randomCats.slice(0,2),
    //             title: title
    //         }
    //     })
    //     res.send(newsList)
    //     await Article.deleteMany({})
    //     await Article.insertMany(newsList)
        
    // })

    // news/list用于显示新闻列表，用于前端调用
    router.get('/news/list', async(req, res) => {
        // // 先找到一级分类
        // // 可以通过populate（）寻找子分类/子级
        // const parent = await Category.findOne({
        //     name: '新闻分类'
        // }).populate({
        //     path: 'children',
        //     populate({
        //         path: 'newsList',
        //     })
        // }).lean()
        const parent = await Category.findOne({
                name: '新闻分类'
            })
            // 聚合查询
        const cats = await Category.aggregate([
            {$match: {parent: parent._id}},
            {
                $lookup: {
                    // from代表关联哪张表
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'

                }
            },
            {
                $addFields: {
                    newsList: {
                        // 一个newsList只需要五条数据
                        $slice: ['$newsList', 5]
                    }
                }
            }
        ]
        )

        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                // 因为热门的分类不固定，因此利用$in
                categories: {$in: subCats}
            }).populate('categories').limit(5).lean()
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                if(cat.name === '热门'){
                     i = news.categories
                    news.categoryName = i.name
                }
                else{
                    news.categoryName = cat.name
                }

                return news
            })
            return cat
        })
        res.send(cats)
    });
    // 文章详情
    router.get('/articles/:id',async(req, res) => {
        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().where({
            categories: {$in: data.categories}
        }).limit(2)
        res.send(data)
    })

// 提取数据
router.get('/datas/init', async(req, res)=>{
    const cats = await Category.find().lean()
    const datasYears = ['2006']
    const datasYear = datasYears.map(year =>{
        return {
            year: year
        }
    })
    res.send(datasYear)
})
router.get('/datas/list', async(req, res) => {
    const parent = await Category.findOne({
        name: 'Data'
    }).populate({
        path: 'children',
        populate:{
            path: 'datasList'
        }
    }).lean()
    res.send(parent)
})

router.get('/datas/list/1', async(req, res) => {
    const data =await Data.find({
        categories: '60785a6455edfa34d8a57422',
        month: '0',
        // data: true,
    },
    {data:1}).lean()
    res.send(data)
})
    app.use('/web/api', router)
}
