const connection = require("./db.js");
const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");
const sqlApi = {};
//注册
sqlApi.register = (req, res) => {
  let sqlStr1 = "select * from user where email=?";
  let paramsArr1 = [req.email];
  connection.sqlConnect(sqlStr1, paramsArr1, (err, data) => {
    if (err) {
      console.log(err);
      conn.release();
    } else {
      console.log(data.length);
      if (data.length !== 0) {
        res.send({
          status: 401,
          message: "该账号已被注册",
        });
      } else {
        let sqlStr = "INSERT INTO user(email,password,name) VALUES(?,?,?)";
        let paramsArr = [req.email, req.password, req.name];
        let callback = (err, data) => {
          if (err) {
            console.log("222");
          } else {
            console.log("插入成功");
            res.send({
              status: 200,
              message: "success",
            });
          }
        };
        connection.sqlConnect(sqlStr, paramsArr, callback);
      }
    }
  });
};

//登录
sqlApi.login = (req, res) => {
  let sqlStr = "select * from user where email=?";
  let paramsArr = [req.email];
  let callback = (err, data) => {
    if (err) {
      console.log("222");
    } else {
      console.log("插入成功", data[0].password);
      if (data[0].password == req.password) {
        const token = jwt.sign({ username: "用户名" }, "secret12345", {
          expiresIn: 3600 * 24 * 3,
        });
        data[0].password = "";
        res.send({
          status: 200,
          message: "success",
          data: { token: token, userInfo: data[0] },
        });
      } else {
        // res.send({
        //     status:403,
        //     message:'error'
        // })
      }
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

//发布物品信息
sqlApi.release = (req, res) => {
  console.log(req);
  let sqlStr =
    "INSERT INTO releasegoods(type,publisher,publishername,title,selectType,address,longitude,latitude,remarks,location,remarkContactMe,pickInfo,collection,status,time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  let paramsArr = [
    req.type,
    req.publisher,
    req.publishername,
    req.title,
    req.selectType,
    req.address,
    req.longitude,
    req.latitude,
    req.remarks,
    req.location,
    req.remarkContactMe,
    req.pickInfo,
    req.collection,
    req.status,
    req.time,
  ];
  let length = req.fileList.length;
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // console.log('data',data);
      let sqlStr1 = "INSERT INTO releaseimg(id,url) VALUES(?,?)";
      let paramsArr1 = [];
      paramsArr1.push(data.insertId);
      let index = 0;
      req.fileList.forEach((item) => {
        index++;
        paramsArr1.push(item.url);
        connection.sqlConnect(sqlStr1, paramsArr1, (err, data) => {
          paramsArr1.pop();
          if (err) {
            console.log(err);
            res.send({
              status: 300,
              message: "发布失败",
            });
          } else {
            if (index >= length) {
              res.send({
                status: 200,
                message: "发布成功",
              });
            }
          }
        });
      });
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

//个人->获取所有发布物品信息
sqlApi.getMyRelease = (req, res) => {
  let sqlStr = "SELECT * from releasegoods where publisher=?";
  let sqlStr1 = "SELECT * FROM releaseimg where id=?";
  let paramsArr = [req];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        message: "获取发布物品信息失败",
      });
    } else {
      let result = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < result.length; i++) {
        connection.sqlConnect(sqlStr1, result[i].id, (err1, data1) => {
          if (err) {
            console.log(err1);
          } else {
            data1 = JSON.parse(JSON.stringify(data1));
            result[i].goodsList = data1;
            if (i >= result.length - 1) {
              res.send({
                status: 200,
                message: "success",
                releaseGoods: result,
              });
            }
          }
        });
      }
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
//获取所有release物品信息
sqlApi.getAllRelease = (res) => {
  let sqlStr = "SELECT * from releasegoods where status=?";
  let sqlStr1 = "SELECT * from releaseimg where id=?";
  let paramsArr = ["1"];
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
              });
            }
          }
        });
      }
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

//发布用户丢失物品
sqlApi.find = (req, res) => {
  let sqlStr =
    "INSERT INTO findgoods(type,title,publisher,publishername,name,phone,college,intro,selectType,address,longitude,latitude,description,status,time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  let paramsArr = [
    req.type,
    req.title,
    req.publisher,
    req.publishername,
    req.name,
    req.phone,
    req.college,
    req.intro,
    req.selectType,
    req.address,
    req.longitude,
    req.latitude,
    req.description,
    req.status,
    req.time,
  ];
  let length = req.fileList.length;
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let sqlStr1 = "INSERT INTO findimg(id,url) VALUES(?,?)";
      let paramsArr1 = [];
      paramsArr1.push(data.insertId);
      let index = 0;
      req.fileList.forEach((item) => {
        index++;
        paramsArr1.push(item.url);
        connection.sqlConnect(sqlStr1, paramsArr1, (err, data) => {
          console.log("11");
          paramsArr1.pop();
          if (err) {
            console.log(err);
            res.send({
              status: 300,
              message: "发布失败",
            });
          } else {
            if (index >= length) {
              console.log("data", data);
              res.send({
                status: 200,
                message: "发布成功",
              });
            }
          }
        });
      });
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
//个人->获取所有发布物品信息
sqlApi.getMyFind = (req, res) => {
  let sqlStr = "SELECT * from findgoods where publisher=?";
  let sqlStr1 = "SELECT * FROM findimg where id=?";
  let paramsArr = [req];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        status: 500,
        message: "获取丢失物品信息失败",
      });
    } else {
      let result = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < result.length; i++) {
        connection.sqlConnect(sqlStr1, result[i].id, (err1, data1) => {
          if (err) {
            console.log(err1);
          } else {
            data1 = JSON.parse(JSON.stringify(data1));
            result[i].goodsList = data1;
            if (i >= result.length - 1) {
              res.send({
                status: 200,
                message: "success",
                findGoods: result,
              });
            }
          }
        });
      }
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
//获取所有find物品信息
sqlApi.getAllFind = (res) => {
  let sqlStr = "SELECT * from findgoods where status=?";
  let sqlStr1 = "SELECT * from findimg where id=?";
  let paramsArr = ["1"];
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
              });
            }
            // data1 = JSON.parse(JSON.stringify(data1))
            // if(data1.length == 0){
            //     result[i].goodsList = []
            // }else {
            //     result[i].goodsList = data1
            // }
            // if(i>=result.length-1){
            //     res.send({
            //         status: 200,
            //         message:'success',
            //         data:result
            //     })
            // }
          }
        });
      }
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

//存储双方聊天记录
sqlApi.chatRecord = (data) => {
  let sqlStr =
    "INSERT INTO chatlist(content,reciveid,sendid,sendtime) VALUES(?,?,?,?)";
  let paramsArr = [data.content, data.reciveid, data.sendid, data.sendtime];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("存储成功");
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
//获取聊天列表信息
sqlApi.charList = (res, id) => {
  let sqlStr = "SELECT * FROM chatlist where reciveid=? OR sendid=?";
  let paramsArr = [id, id];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(JSON.stringify(data));
      let chatList = {};
      // 分离聊天数据
      data.forEach((item, index) => {
        let obj = {
          img: "",
          name: "",
          list: [],
        };
        if (item.reciveid == id) {
          if (chatList[item.sendid] !== undefined) {
            chatList[item.sendid].list.push(item);
          } else {
            obj.list.push(item);
            chatList[item.sendid] = obj;
          }
        } else {
          if (chatList[item.reciveid] !== undefined) {
            chatList[item.reciveid].list.push(item);
          } else {
            obj.list.push(item);
            chatList[item.reciveid] = obj;
          }
        }
      });
      //聊天数据排序
      let i = 0;
      for (let item in chatList) {
        // 获取头像
        let id = Number(item);
        let Str1 = "SELECT * from user where id=?";
        let paramsArr1 = [id];
        let callback1 = (err, data1) => {
          if (err) {
            console.log(err);
          } else {
            chatList[item].img = data1[0].img;
            chatList[item].name = data1[0].name;
            chatList[item].list.sort((a, b) => a.id - b.id);
            chatList[item].list = chatList[item].list.pop();
            if (i == Object.keys(chatList).length - 1) {
              //返回数据
              res.send({
                status: 200,
                message: "获取成功",
                data: chatList,
              });
            }
            i++;
          }
        };
        connection.sqlConnect(Str1, paramsArr1, callback1);
      }
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

//获取聊天记录
sqlApi.getHistoryChat = (res, obj) => {
  let sqlStr = "SELECT * FROM chatlist where reciveid=? OR sendid=?";
  let paramsArr = [obj.id, obj.id];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(JSON.stringify(data));
      let chatList = [];
      data.forEach((item, index) => {
        if (item.reciveid == obj.id) {
          if (item.sendid == obj.toId) {
            chatList.push(item);
          }
        } else {
          if (item.reciveid == obj.toId) {
            chatList.push(item);
          }
        }
      });
      let Str1 = "SELECT * from user where id=?";
      let paramsArr1 = [obj.toId];
      let callback1 = (err, data1) => {
        if (err) {
          console.log(err);
        } else {
          data1 = JSON.parse(JSON.stringify(data1));
          res.send({
            status: 200,
            message: "获取成功",
            data: {
              list: chatList,
              img: data1[0].img,
            },
          });
        }
      };
      connection.sqlConnect(Str1, paramsArr1, callback1);
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

//登录检查密码
sqlApi.checkPass = (res, data) => {
  let sqlStr = "SELECT * from user where id=?";
  let sqlStr1 = "UPDATE user set password=? where id=?";
  let paramsArr = [data.id];
  let paramsArr1 = [data.newPassword, data.id];
  let callback = (err, data1) => {
    if (err) {
      console.log(err);
    } else {
      data1 = JSON.parse(JSON.stringify(data1));
      if (data1[0].password == data.oldPassword) {
        let callback1 = (err, data2) => {
          if (err) {
            console.log(err);
          } else {
            console.log("修改成功");
            res.send({
              status: 200,
              message: "修改成功",
            });
          }
        };
        connection.sqlConnect(sqlStr1, paramsArr1, callback1);
      } else {
        res.send({
          status: 300,
          message: "原密码错误！",
        });
      }
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

// 编辑资料
sqlApi.updateInfo = (res, data) => {
  let sqlStr =
    "UPDATE user set name=?,sex=?,school=?,phone=?,img=?  where id=?";
  let sqlStr1 = "select * from user where id=?";
  let paramsArr1 = [data.id];
  let paramsArr = [
    data.name,
    data.sex,
    data.school,
    data.phone,
    data.img,
    data.id,
  ];
  let callback = (err, data1) => {
    if (err) {
      console.log(err);
      res.send({
        status: 400,
        message: "编辑信息失败！",
      });
    } else {
      let callback1 = (err, data2) => {
        if (err) {
          res.send({
            status: 400,
            message: "更新数据失败！",
          });
        } else {
          data2 = JSON.parse(JSON.stringify(data2));
          data2[0].password = "";
          res.send({
            status: 200,
            message: "编辑信息成功",
            data: data2[0],
          });
        }
      };
      connection.sqlConnect(sqlStr1, paramsArr1, callback1);
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

//物品条件筛选
sqlApi.selectApi = (res, data) => {
  console.log(data);
  let sqlStr1 = "select * from findimg where id=?";
  let sqlStr2 = "select * from releaseimg where id=?";
  if (data.select1 == "寻物启事" || data.select1 == "0") {
    let sqlStra = "SELECT * from findgoods where selectType=? AND status=?";
    connection.sqlConnect(sqlStra, [data.select2, "1"], (err, data1) => {
      if (err) {
        console.log(err);
      } else {
        result = JSON.parse(JSON.stringify(data1));
        if (result.length == 0) {
          res.send({
            status: 200,
            message: "success",
            data: result,
          });
        } else {
          for (let i = 0; i < result.length; i++) {
            connection.sqlConnect(sqlStr1, result[i].id, (err2, data2) => {
              if (err2) {
                console.log(err2);
              } else {
                data2 = JSON.parse(JSON.stringify(data2));
                console.log(data2);
                result[i].goodsList = JSON.parse(JSON.stringify(data2));
                result[i] = JSON.parse(JSON.stringify(result[i]));
                if (i >= result.length - 1) {
                  result = JSON.parse(JSON.stringify(result));
                  console.log(result);
                  res.send({
                    status: 200,
                    message: "success",
                    data: result,
                  });
                }
              }
            });
          }
        }
      }
    });
  }
  if (data.select1 == "失物招领" || data.select1 == "1") {
    let sqlStrb = "SELECT * from releasegoods where selectType=? AND status=?";
    connection.sqlConnect(sqlStrb, [data.select2, "1"], (err, data1) => {
      if (err) {
        console.log(err);
      } else {
        result = JSON.parse(JSON.stringify(data1));
        if (result.length == 0) {
          res.send({
            status: 200,
            message: "success",
            data: result,
          });
        } else {
          for (let i = 0; i < result.length; i++) {
            connection.sqlConnect(sqlStr2, result[i].id, (err2, data2) => {
              if (err2) {
                console.log(err2);
              } else {
                data2 = JSON.parse(JSON.stringify(data2));
                result[i].goodsList = JSON.parse(JSON.stringify(data2));
                result[i] = JSON.parse(JSON.stringify(result[i]));
                if (i >= result.length - 1) {
                  result = JSON.parse(JSON.stringify(result));
                  // console.log(result);
                  res.send({
                    status: 200,
                    message: "success",
                    data: result,
                  });
                }
              }
            });
          }
        }
      }
    });
  }
};



module.exports = sqlApi;
