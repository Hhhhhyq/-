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
module.exports = router;