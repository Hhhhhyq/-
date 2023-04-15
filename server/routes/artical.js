var express = require('express');
var router = express.Router();
// const dbConnect = require('../sql/db')
const sqlApi = require('../sql/articalSql.js')
router.post('/articalUpload',function(req,res,next){
    let data = req.body.params.data
    sqlApi.articalUpload(data,res)
})
router.post('/getAllArtical',function(req,res,next){
    let page = req.body.params.page
    sqlApi.getAllArtical(res,page)
})
//获取评论
router.post('/getComment',function(req,res,next){
    let id = req.body.params.id
    sqlApi.getComment(res,id)
})

//文章点赞
router.post('/thumbsUp',function(req,res,next){
    let data = req.body.params.obj
    sqlApi.thumbsUp(res,data)
})
//浏览记录
router.post('/saw',function(req,res,next){
    let data = req.body.params
    sqlApi.saw(res,data)
})
//评论点赞
router.post('/commentThumbsUp',function(req,res,next){
    let data = req.body.params.obj
    sqlApi.commentThumbsUp(res,data)
})
//发表评论
router.post('/sendComment',function(req,res,next){
    let data = req.body.params.obj
    sqlApi.sendComment(res,data)
})
//发表回复
router.post('/sendReply',function(req,res,next){
    let data = req.body.params.obj
    sqlApi.sendReply(res,data)
})
module.exports = router;