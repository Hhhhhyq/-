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
//获取release，待审批，status=0
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
sqlApi.rejectApproval = (res, item) => {
  console.log(item);
  if (item.info.type == 1) {
    let sqlStr = "UPDATE releasegoods set status=?,rejectText=? where id=?";
    let paramsArr = ["2", item.rejectText, item.info.id];
    let callback = (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: "200",
          message: "已拒绝审批",
        });
      }
    };
    connection.sqlConnect(sqlStr, paramsArr, callback);
  } else {
    let sqlStr = "UPDATE findgoods set status=?,rejectText=? where id=?";
    let paramsArr = ["2", item.rejectText, item.info.id];
    let callback = (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: "200",
          message: "已拒绝审批",
        });
      }
    };
    connection.sqlConnect(sqlStr, paramsArr, callback);
  }
};
//获取文章，分页获取
sqlApi.getAllArtical = (res, pageInfo) => {
  console.log(pageInfo);
  let pageStart = 0;
  let sqlStr = "";
  let paramsArr = [];
  if (pageInfo.searchVal == "") {
    pageStart = (pageInfo.currentPage - 1) * 10;
    sqlStr = "SELECT * FROM artical LIMIT ?,10";
    paramsArr = [pageStart];
  } else {
    pageStart = (pageInfo.currentPage - 1) * 10;
    sqlStr =
      "SELECT * FROM artical WHERE title LIKE ? OR content LIKE ? LIMIT ?,10";
    let searchVal = "%" + pageInfo.searchVal + "%";
    paramsArr = [searchVal, searchVal, pageStart];
  }

  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(JSON.stringify(data));
      data.forEach((item) => {
        if (item.contentimg !== null) {
          item.imgList = item.contentimg.split(",");
        }
      });
      res.send({
        status: 200,
        message: "获取成功！",
        data: data,
      });
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

//图标数据
sqlApi.release = (res) => {
  let sqlStr = "SELECT * from releasegoods where status=?";
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
      let map = new Map();
      result.forEach((item) => {
        if (item.selectType == "" || item.selectType == null) {
          item.selectType = "其他";
        }
        if (!map.has(item.selectType)) {
          map.set(item.selectType, 1);
        } else {
          let num = map.get(item.selectType);
          num = num + 1;
          map.set(item.selectType, num);
        }
      });
      let arr = [];
      for (let i of map) {
        let obj = {
          name: i[0],
          value: i[1],
        };
        arr.push(obj);
      }
      res.send({
        status: 200,
        message: "获取成功",
        data: arr,
      });
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
sqlApi.find = (res) => {
  let sqlStr = "SELECT * from findgoods where status=?";
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
      let map = new Map();
      result.forEach((item) => {
        if (item.selectType == "" || item.selectType == null) {
          item.selectType = "其他";
        }
        if (!map.has(item.selectType)) {
          map.set(item.selectType, 1);
        } else {
          let num = map.get(item.selectType);
          num = num + 1;
          map.set(item.selectType, num);
        }
      });
      let arr = [];
      for (let i of map) {
        let obj = {
          name: i[0],
          value: i[1],
        };
        arr.push(obj);
      }
      res.send({
        status: 200,
        message: "获取成功",
        data: arr,
      });
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};

//删除文章
sqlApi.deleteArtical = (res, id) => {
  console.log(id);
  let sqlStr = "DELETE FROM artical WHERE id=?";
  let paramsArr = [id];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        status: 200,
        message: "删除成功",
      });
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
//删除用户
sqlApi.deleteUser = (res, id) => {
  let sqlStr = "DELETE FROM user WHERE id=?";
  let paramsArr = [id];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        status: 200,
        message: "删除成功",
      });
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
//获取所有物品,物品管理
sqlApi.getAllRelease = (res, pageInfo) => {
  //获取总数
  let all = 0;
  if (pageInfo.searchVal == "" && pageInfo.command == "") {
    connection.sqlConnect("SELECT * from releasegoods", [], (err, dataAll) => {
      if (err) {
        console.log(err);
      } else {
        all = dataAll.length;2
      }
    });
    let pageStart = (pageInfo.currentPage - 1) * pageInfo.pageSize;
    let sqlStr = "SELECT * from releasegoods LIMIT ?,?";
    let sqlStr1 = "SELECT * from releaseimg where id=?";
    let paramsArr = [pageStart, pageInfo.pageSize];
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
  }
  else if(pageInfo.searchVal !== '' && pageInfo.command == ""){
    let searchVal = "%" + pageInfo.searchVal + "%";
    connection.sqlConnect("SELECT * from releasegoods WHERE title LIKE ?", [searchVal], (err, dataAll) => {
      if (err) {
        console.log(err);
      } else {
        all = dataAll.length;
      }
    });
    let pageStart = (pageInfo.currentPage - 1) * pageInfo.pageSize;
    let sqlStr = "SELECT * from releasegoods WHERE title LIKE ? LIMIT ?,?";
    let sqlStr1 = "SELECT * from releaseimg where id=?";
    let paramsArr = [searchVal,pageStart, pageInfo.pageSize];
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
  }
  else if(pageInfo.searchVal == '' && pageInfo.command !== ''){
    connection.sqlConnect("SELECT * from releasegoods WHERE status=?", [pageInfo.command], (err, dataAll) => {
      if (err) {
        console.log(err);
      } else {
        all = dataAll.length;
      }
    });
    let pageStart = (pageInfo.currentPage - 1) * pageInfo.pageSize;
    let sqlStr = "SELECT * from releasegoods WHERE status=? LIMIT ?,?";
    let sqlStr1 = "SELECT * from releaseimg where id=?";
    let paramsArr = [pageInfo.command,pageStart, pageInfo.pageSize];
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
  }else {
    let searchVal = "%" + pageInfo.searchVal + "%";
    connection.sqlConnect("SELECT * from releasegoods WHERE title LIKE ? AND status=?", [pageInfo.command,searchVal], (err, dataAll) => {
      if (err) {
        console.log(err);
      } else {
        all = dataAll.length;
      }
    });
    let pageStart = (pageInfo.currentPage - 1) * pageInfo.pageSize;
    let sqlStr = "SELECT * from releasegoods WHERE status=? AND title LIKE ? LIMIT ?,?";
    let sqlStr1 = "SELECT * from releaseimg where id=?";
    let paramsArr = [pageInfo.command,searchVal,pageStart, pageInfo.pageSize];
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
  }
  // connection.sqlConnect("SELECT * from releasegoods", [], (err, dataAll) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     all = dataAll.length;
  //   }
  // });
  // let pageStart = (pageInfo.currentPage - 1) * pageInfo.pageSize;
  // let sqlStr = "SELECT * from releasegoods LIMIT ?,?";
  // let sqlStr1 = "SELECT * from releaseimg where id=?";
  // let paramsArr = [pageStart, pageInfo.pageSize];
  // let callback = (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.send({
  //       status: 301,
  //       message: "获取失败",
  //     });
  //   } else {
  //     let result = JSON.parse(JSON.stringify(data));
  //     if (!result.length) {
  //       res.send({
  //         status: 200,
  //         message: "success",
  //         data: [],
  //         total: all,
  //       });
  //       return;
  //     }
  //     for (let i = 0; i < result.length; i++) {
  //       connection.sqlConnect(sqlStr1, result[i].id, (err1, data1) => {
  //         if (err) {
  //           console.log(err1);
  //         } else {
  //           data1 = JSON.parse(JSON.stringify(data1));
  //           result[i].goodsList = JSON.parse(JSON.stringify(data1));
  //           result[i] = JSON.parse(JSON.stringify(result[i]));
  //           if (i >= result.length - 1) {
  //             result = JSON.parse(JSON.stringify(result));
  //             res.send({
  //               status: 200,
  //               message: "success",
  //               data: result,
  //               total: all,
  //             });
  //           }
  //         }
  //       });
  //     }
  //   }
  // };
  // connection.sqlConnect(sqlStr, paramsArr, callback);
};
sqlApi.getAllFind = (res, pageInfo) => {
  //获取总数
  let all = 0;
  if (pageInfo.searchVal == "" && pageInfo.command == "") {
    connection.sqlConnect("SELECT * from findgoods", [], (err, dataAll) => {
      if (err) {
        console.log(err);
      } else {
        all = dataAll.length;2
      }
    });
    let pageStart = (pageInfo.currentPage - 1) * pageInfo.pageSize;
    let sqlStr = "SELECT * from findgoods LIMIT ?,?";
    let sqlStr1 = "SELECT * from findimg where id=?";
    let paramsArr = [pageStart, pageInfo.pageSize];
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
  }
  else if(pageInfo.searchVal !== '' && pageInfo.command == ""){
    let searchVal = "%" + pageInfo.searchVal + "%";
    connection.sqlConnect("SELECT * from findgoods WHERE title LIKE ?", [searchVal], (err, dataAll) => {
      if (err) {
        console.log(err);
      } else {
        all = dataAll.length;
      }
    });
    let pageStart = (pageInfo.currentPage - 1) * pageInfo.pageSize;
    let sqlStr = "SELECT * from findgoods WHERE title LIKE ? LIMIT ?,?";
    let sqlStr1 = "SELECT * from findimg where id=?";
    let paramsArr = [searchVal,pageStart, pageInfo.pageSize];
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
  }
  else if(pageInfo.searchVal == '' && pageInfo.command !== ''){
    connection.sqlConnect("SELECT * from findgoods WHERE status=?", [pageInfo.command], (err, dataAll) => {
      if (err) {
        console.log(err);
      } else {
        all = dataAll.length;
      }
    });
    let pageStart = (pageInfo.currentPage - 1) * pageInfo.pageSize;
    let sqlStr = "SELECT * from findgoods WHERE status=? LIMIT ?,?";
    let sqlStr1 = "SELECT * from findimg where id=?";
    let paramsArr = [pageInfo.command,pageStart, pageInfo.pageSize];
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
  }else {
    let searchVal = "%" + pageInfo.searchVal + "%";
    connection.sqlConnect("SELECT * from findgoods WHERE title LIKE ? AND status=?", [pageInfo.command,searchVal], (err, dataAll) => {
      if (err) {
        console.log(err);
      } else {
        all = dataAll.length;
      }
    });
    let pageStart = (pageInfo.currentPage - 1) * pageInfo.pageSize;
    let sqlStr = "SELECT * from findgoods WHERE status=? AND title LIKE ? LIMIT ?,?";
    let sqlStr1 = "SELECT * from findimg where id=?";
    let paramsArr = [pageInfo.command,searchVal,pageStart, pageInfo.pageSize];
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
  }
};
//删除已审批物品
sqlApi.deleteGoodsItem = (res, obj) => {
  let sqlStr = "";
  if (obj.type == "find") {
    sqlStr = "DELETE FROM findgoods WHERE id=?;DELETE FROM findimg WHERE id=?";
  } else {
    sqlStr =
      "DELETE FROM releasegoods WHERE id=?;DELETE FROM releaseimg WHERE id=?";
  }
  let paramsArr = [obj.id, obj.id];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        status: 200,
        message: "删除成功",
      });
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
sqlApi.updateType = (res, obj) => {
  let sqlStr = "";
  if (obj.type == "goodstype") {
    sqlStr = "UPDATE common set typelist=? where id=?";
  } else if (obj.type == "collection") {
    sqlStr = "UPDATE common set colectionlist=? where id=?";
  } else if (obj.type == "banner") {
    sqlStr = "UPDATE common set bannerlist=? where id=?";
  } else {
    sqlStr = "UPDATE common set college=? where id=?";
  }
  let paramsArr = [obj.data, 1];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        status: 200,
        message: "更新成功",
      });
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
sqlApi.getCountNum = (res) => {
  let sqlStr =
    "SELECT * FROM releasegoods;SELECT * FROM artical;SELECT * FROM user;SELECT * FROM findgoods";
  let paramsArr = [];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(JSON.stringify(data));
      let obj = {
        userCount: 0,
        goodsCount: 0,
        articalCount: 0,
        countRate: 0,
      };
      obj.articalCount = data[1].length;
      obj.userCount = data[2].length;

      let index1 = 0;
      let index2 = 0;
      let index3 = 0;
      let index4 = 0;
      data[0].forEach((item) => {
        if (item.status && item.status == "1") {
          index1++;
        }
        if (item.status == "3") {
          index2++;
        }
      });
      data[3].forEach((item) => {
        if (item.status && item.status == "1") {
          index3++;
        }
        if (item.status == "3") {
          index4++;
        }
      });
      obj.countRate = Number(((index2 + index4) * 100) / (index1 + index3));
      obj.goodsCount = index1 + index2 + index3 + index4;
      res.send({
        status: 200,
        message: "获取成功",
        data: obj,
      });
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
sqlApi.getArticals = (res) => {
  let sqlStr = "SELECT * FROM artical";
  let paramsArr = [];
  let callback = (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(JSON.stringify(data));
      data.forEach((item) => {
        if (item.contentimg !== null) {
          item.imgList = item.contentimg.split(",");
        }
      });
      res.send({
        status: 200,
        message: "获取成功！",
        data: data,
      });
    }
  };
  connection.sqlConnect(sqlStr, paramsArr, callback);
};
module.exports = sqlApi;
