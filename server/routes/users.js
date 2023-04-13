const express = require('express');
const router = express.Router();

const sqlApi = require('../sql/sql')
// 登录
router.post('/login', function(req, res, next) {
  let data =  req.body.params
  sqlApi.login(data,res)
});

// 修改密码
router.post('/checkPass',function(req,res,next){
  let data = req.body.params
  sqlApi.checkPass(res,data)
})

// 编辑个人资料
router.post('/editInfo',function(req,res,next){
  let data = req.body.params.userInfo
  sqlApi.updateInfo(res,data)
})

// 聊天列表信息
router.post('/getCharList',function(req,res,next){
  let id = req.body.params.id
  sqlApi.charList(res,id)
})

//获取聊天历史信息
router.post('/getHistoryChat',function(req,res,next){
  let obj = req.body.params
  sqlApi.getHistoryChat(res,obj)
})

//获取搜索记录
router.post('/addSearchHistory',function(req,res,next){
  let obj = req.body.params.obj
  sqlApi.addSearchHistory(res,obj)
})
//聊天记录置为已读
router.post('/toRead',function(req,res,next){
  let obj = req.body.params.obj
  console.log(obj);
  // sqlApi.toRead(res,obj)
})
module.exports = router;
