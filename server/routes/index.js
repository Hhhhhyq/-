var express = require('express');
var router = express.Router();
// const dbConnect = require('../sql/db')
const sqlApi = require('../sql/sql.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  // sqlApi.register(req,res)
  res.send('11111')
  // let sql = 'select * from user'
  // var sqlArr = []
  // var callback = function(err,conn){
  //   if(err){
  //     console.log('连接出错');
  //   }else{
  //     res.send(conn)
  //   }
  // }
  // dbConnect.sqlConnect(sql,sqlArr,callback)

});

module.exports = router;
