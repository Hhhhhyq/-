var express = require('express');
var router = express.Router();
// const dbConnect = require('../sql/db')
const sqlApi = require('../sql/manageSql.js')

router.post('/getAllUser',function(req,res,next){
    let pageInfo = req.body
    console.log(pageInfo);
    sqlApi.getAllUser(res,pageInfo)
})
router.post('/getRelease',function(req,res,next){
    let pageInfo = req.body
    sqlApi.getRelease(res,pageInfo)
})
router.post('/getFind',function(req,res,next){
    let pageInfo = req.body
    sqlApi.getFind(res,pageInfo)
})
//审批
router.post('/approvalGoods',function(req,res,next){
    let item = req.body
    sqlApi.approvalGoods(res,item)
})
//拒绝审批
router.post('/rejectApproval',function(req,res,next){
    let item = req.body
    sqlApi.rejectApproval(res,item)
})
//获取所有文章
router.post('/getAllArtical',function(req,res,next){
    let page = req.body
    sqlApi.getAllArtical(res,page)
})
//删除用户
router.post('/deleteUser',function(req,res,next){
    let id = req.body.id
    sqlApi.deleteUser(res,id)
})
//获取饼图1信息
router.get('/release',function(req,res,next){
    sqlApi.release(res)
})
//获取饼图2信息
router.get('/find',function(req,res,next){
    sqlApi.find(res)
})
//删除文章
router.post('/deleteArtical',function(req,res,next){
    let id = req.body.id
    sqlApi.deleteArtical(res,id)
})
//获取所有物品管理
router.post('/getAllRelease',function(req,res,next){
    let pageInfo = req.body
    sqlApi.getAllRelease(res,pageInfo)
})
router.post('/getAllFind',function(req,res,next){
    let pageInfo = req.body
    console.log(pageInfo);
    sqlApi.getAllFind(res,pageInfo)
})
//删除已审批物品
router.post('/deleteGoodsItem',function(req,res,next){
    let obj = req.body
    console.log(obj);
    sqlApi.deleteGoodsItem(res,obj)
})

router.post('/updateType',function(req,res,next){
    let obj = req.body
    sqlApi.updateType(res,obj)
})
router.get('/getCountNum',function(req,res,next){
    sqlApi.getCountNum(res)
})

module.exports = router;