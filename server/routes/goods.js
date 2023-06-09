var express = require('express');
var router = express.Router();
// const dbConnect = require('../sql/db')
const sqlApi = require('../sql/sql.js')
/* 发布物品 */
router.post('/release', function(req, res, next) {
    let data = req.body.params.data
    sqlApi.release(data,res)
})
/*获取所有发布物品信息 */
router.post('/getMyRelease',function(req,res,next){
    let id = req.body.params.id
    sqlApi.getMyRelease(id,res)
})

/*发布寻物 */
router.post('/find', function(req, res, next) {
    let data = req.body.params.data
    sqlApi.find(data,res)
})
/*获取所有寻找物品信息 */
router.post('/getMyFind',function(req,res,next){
    let id = req.body.params.id
    sqlApi.getMyFind(id,res)
})

// 物品页
router.get('/getAllRelease',function(req,res,next){
    sqlApi.getAllRelease(res)
})
router.get('/getAllFind',function(req,res,next){
    sqlApi.getAllFind(res)
})

//筛选物品
router.post('/selectList',function(req,res,next){
    let selectValue = req.body.params
    switch(selectValue.select1){
        case '失物招领':
            selectValue.select1 = '1'
            break;
        case '寻物启事':
            selectValue.select1 = '0'
        default:
            break
    }
    sqlApi.selectApi(res,selectValue)
})

router.get('/getUrgentList',function(req,res,next){
    sqlApi.getUrgentList(res)
})
router.post('/getMore',function(req,res,next){
    let obj = req.body.params.obj
    sqlApi.getMore(res,obj)
})
//删除个人物品信息
router.post('/deleteMyGood',function(req,res,next){
    let obj = req.body.params.obj
    sqlApi.deleteMyGood(res,obj)
})
//归还
router.post('/returnGoods',function(req,res,next){
    let obj = req.body.params.obj
    sqlApi.returnGoods(res,obj)
})
//获取所有类型
router.get('/getAllType',function(req,res,next){
    sqlApi.getAllType(res)
})
module.exports = router;