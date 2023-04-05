const mysql = require('mysql')
const db = {}
const config = {
    host:'localhost',
    user:'root',
    password:'admin',
    database:'data',
    port:'3306',
    multipleStatements:true
}
var pool = mysql.createPool(config)
db.sqlConnect = function(sql,sqlArr,callback){
    // var pool = mysql.createPool(this.config)
    pool.getConnection((err,conn)=>{
        if(err){
            console.log('链接失败');
            conn.release()
            return ;
        }
        conn.query(sql,sqlArr,callback)
        //释放连接
        conn.release();
    })
}
module.exports = db
// module.exports = {
//     config:{
//         host:'localhost',
//         user:'root',
//         password:'admin',
//         database:'data',
//         port:'3306'
//     },
//     sqlConnect:function(sql,sqlArr,callback){
//         // var pool = mysql.createPool(this.config)
//         pool.getConnection((err,conn)=>{
//             if(err){
//                 console.log('链接失败');
//                 return ;
//             }
//             conn.query(sql,sqlArr,callback)
//             //释放连接
//             conn.release();
//         })
//     }
// }
// 创建一个数据库连接池
// exports.connection = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'admin',
//     database:'data',
//     port:'3306'
// });

// //连接
// connection.connect(function(err){
//     if(err){
//         console.log('error')
//     }
//     console.log('connect success!')
// });
// exports.query = function(sqlstr,data,cb){
//     connection.query(sqlstr,data,(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         cb(result)
//     })
// }
// // let data = {name:'111',email:'h15736987280@qq.com',password:'123123'}
// let sqlstr = 'INSET INTO user(name,email,password) VALUES(?,?,?)'
//     let datas = [data.name,data.email,data.password]
//     connection.query(sqlstr,datas,(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log(result);
//     })
// module.exports.connection = connection


