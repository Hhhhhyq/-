const sqlApi = require('../sql/sql.js')
// 日期格式转化
const moment = require('moment')
module.exports = function (io) {
  var users={}
  io.on('connection', (socket) => {
    //用户登录
    socket.on('login',(id)=>{
      console.log(id,socket.id,'当前用户')
      socket.name=id
      users[id]=socket.id
      console.log(users);
      socket.emit('login',socket.id)
    })
    //消息发送
    socket.on('msg',(msg,fromid,toid)=>{
      console.log(users[toid],'发送给',fromid)
      if(users[toid]){
        let data = {
          id:fromid,
          value:msg
        }
        socket.to(users[toid]).emit('msg',data)
      }
      let data={
        sendid:fromid,
        reciveid:toid,
        content: msg,
        sendtime:moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        isRead:1
      }
      sqlApi.chatRecord(data)
    })
    //用户离开
    socket.on('disconnecting',()=>{
      if(users.hasOwnProperty(socket.name)){
        delete users[socket.name]
        console.log(socket.id,'离开')
      }
    })
  })
}