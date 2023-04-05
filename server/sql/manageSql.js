// 管理端接口
const connection = require("./db.js");
const moment = require("moment");
const JSONTransport = require("nodemailer/lib/json-transport/index.js");
const sqlApi = {};

//登录
sqlApi.articalUpload = (data, res) => {
  let time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  console.log(data);
  let sqlStr =
    "INSERT INTO artical(publisherId,name,img,time,content) VALUES(?,?,?,?,?)";

  let callback = (err, data) => {};
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

//用户管理
sqlApi.getAllUser = (res, pageInfo) => {
  let pageStart = (pageInfo.page - 1) * 10;
  let sqlStr = "SELECT * FROM user LIMIT ?,?";
  let paramsArr = [pageStart, pageInfo.pageSize];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(JSON.stringify(data));
      console.log(data);
      if (data && !data.length) {
        res.send({
          status: 200,
          message: "获取成功",
          data: [],
        });
      } else {
        res.send({
          status: 200,
          message: "获取成功",
          data: data,
        });
      }
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
//获取release
sqlApi.getRelease = (res, pageInfo) => {
  //获取总数
  let all = 0;
  connection.sqlConnect(
    "SELECT * from releasegoods where status=?",
    ["0"],
    (err, dataAll) => {
      if (err) {
        console.log(err);
      } else {
        all = dataAll.length;
      }
    }
  );
  let pageStart = (pageInfo.currentPage - 1) * pageInfo.pageSize;
  let sqlStr = "SELECT * from releasegoods WHERE status=? LIMIT ?,?";
  let sqlStr1 = "SELECT * from releaseimg where id=?";
  let paramsArr = ["0", pageStart, pageInfo.pageSize];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        status: 301,
        message: "获取失败",
      });
    } else {
      let result = JSON.parse(JSON.stringify(data));
      if (!result.length) {
        res.send({
          status: 200,
          message: "success",
          data: [],
          total: all,
        });
        return;
      }
      for (let i = 0; i < result.length; i++) {
        connection.sqlConnect(sqlStr1, result[i].id, (err1, data1) => {
          if (err) {
            console.log(err1);
          } else {
            data1 = JSON.parse(JSON.stringify(data1));
            result[i].goodsList = JSON.parse(JSON.stringify(data1));
            result[i] = JSON.parse(JSON.stringify(result[i]));
            if (i >= result.length - 1) {
              result = JSON.parse(JSON.stringify(result));
              res.send({
                status: 200,
                message: "success",
                data: result,
                total: all,
              });
            }
          }
        });
      }
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
sqlApi.getFind = (res, pageInfo) => {
  //获取总数
  let all = 0;
  connection.sqlConnect(
    "SELECT * from findgoods where status=?",
    ["0"],
    (err, dataAll) => {
      if (err) {
        console.log(err);
      } else {
        all = dataAll.length;
      }
    }
  );
  let pageStart = (pageInfo.currentPage - 1) * pageInfo.pageSize;
  let sqlStr = "SELECT * from findgoods WHERE status=? LIMIT ?,?";
  let sqlStr1 = "SELECT * from findimg where id=?";
  let paramsArr = ["0", pageStart, pageInfo.pageSize];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        status: 301,
        message: "获取失败",
      });
    } else {
      let result = JSON.parse(JSON.stringify(data));
      if (!result.length) {
        res.send({
          status: 200,
          message: "success",
          data: [],
          total: all,
        });
        return;
      }
      for (let i = 0; i < result.length; i++) {
        connection.sqlConnect(sqlStr1, result[i].id, (err1, data1) => {
          if (err) {
            console.log(err1);
          } else {
            data1 = JSON.parse(JSON.stringify(data1));
            result[i].goodsList = JSON.parse(JSON.stringify(data1));
            result[i] = JSON.parse(JSON.stringify(result[i]));
            if (i >= result.length - 1) {
              result = JSON.parse(JSON.stringify(result));
              res.send({
                status: 200,
                message: "success",
                data: result,
                total: all,
              });
            }
          }
        });
      }
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

//审批
sqlApi.approvalGoods = (res, item) => {
  if (item.type == 1) {
    let sqlStr = "UPDATE releasegoods set status=? where id=?";
    let paramsArr = ["1", item.id];
    let callback = (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: 200,
          message: "审批成功",
        });
      }
    };
    connection.sqlConnect(sqlStr, paramsArr, callback);
  } else {
    let sqlStr = "UPDATE findgoods set status=? where id=?";
    let paramsArr = ["1", item.id];
    let callback = (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: 200,
          message: "审批成功",
        });
      }
    };
    connection.sqlConnect(sqlStr, paramsArr, callback);
  }
};
//拒绝审批 status=2
sqlApi.rejectApproval = (res,item) =>{
  console.log(item);
  if(item.info.type == 1){
    let sqlStr = 'UPDATE releasegoods set status=?,rejectText=? where id=?'
    let paramsArr = ['2',item.rejectText,item.info.id]
    let callback = (err,data)=>{
      if(err){
        console.log(err);
      }else {
        res.send({
          status:'200',
          message:'已拒绝审批'
        })
      }
    }
    connection.sqlConnect(sqlStr, paramsArr, callback);
  }else{
    let sqlStr = 'UPDATE findgoods set status=?,rejectText=? where id=?'
    let paramsArr = ['2',item.rejectText,item.info.id]
    let callback = (err,data)=>{
      if(err){
        console.log(err);
      }else {
        res.send({
          status:'200',
          message:'已拒绝审批'
        })
      }
    }
    connection.sqlConnect(sqlStr, paramsArr, callback);
  }
}
//获取文章，分页获取
sqlApi.getAllArtical = (res,pageInfo)=>{
  let pageStart = (pageInfo.currentPage - 1)*10
  let sqlStr = 'SELECT * FROM artical LIMIT ?,10'
  let paramsArr = [pageStart]
  let callback = (err,data)=>{
      if(err){
          console.log(err);
      }else {
          data =JSON.parse(JSON.stringify(data))
          data.forEach(item=>{
              if(item.contentimg !== null){
                  item.imgList = item.contentimg.split(',')
              }
          })
          res.send({
              status:200,
              message:'获取成功！',
              data:data
          })
      }
  }
  connection.sqlConnect(sqlStr,paramsArr,callback)
}
module.exports = sqlApi;
