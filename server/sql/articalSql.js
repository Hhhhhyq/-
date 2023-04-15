const connection = require('./db.js')
const moment = require('moment')
const sqlApi = {}
//文章上传
sqlApi.articalUpload = (data,res)=>{
    let time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss') 
    // console.log(data);
    let contentimg = ''
    data.image.forEach(item=>{
        contentimg += item.url +','
    })
    let sqlStr = 'INSERT INTO artical(publisherId,name,img,time,college,title,content,contentimg) VALUES(?,?,?,?,?,?,?,?)'
    let paramsArr = [data.publisherId,data.name,data.img,time,data.college,data.title,data.content,contentimg]
    let callback = (err,data1)=>{
        if(err){
            console.log(err);
        }else {
            res.send({
                status:200,
                message:'发布成功！'
            })
        }
    }
    connection.sqlConnect(sqlStr,paramsArr,callback)
}

//获取文章，分页获取
sqlApi.getAllArtical = (res,page)=>{
    console.log(page);
    let pageStart = (page - 1)*10
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

//获取artical对应的评论
sqlApi.getComment = (res,id)=>{
    console.log(id);
    //获取评论
    let sqlStr = 'SELECT * from comment where articalId=?'
    let paramsArr = [id]
    //根据评论获取回复
    let sqlStr1 = 'SELECT * from reply where id=?'
    let callback = (err,data)=>{
        if(err){
            console.log(err);
        }else {
            data = JSON.parse(JSON.stringify(data))
            if(!data.length){
                res.send({
                    status:200,
                    message:'获取评论成功',
                    data:[]
                })
                return ;
            }
            for(let i=0;i<data.length;i++){
                connection.sqlConnect(sqlStr1,data[i].id,(err1,data1)=>{
                    if(err1){
                        console.log(err1);
                    }else {
                        data1 = JSON.parse(JSON.stringify(data1));
                        data[i].children = JSON.parse(JSON.stringify(data1));
                        data[i] = JSON.parse(JSON.stringify(data[i]));
                        if(i >= data.length -1){
                            res.send({
                                status:200,
                                message:'获取评论成功',
                                data:{
                                    count:data.length,
                                    data:data
                                }
                            })
                        }
                    }
                })
            }
        }
    }

    connection.sqlConnect(sqlStr,paramsArr,callback)
}
//文章浏览
sqlApi.saw = (res,data)=>{
    console.log(data);
    let sqlStr = 'UPDATE artical SET saw=? where id=?'
    let paramsArr = [data.saw,data.id]
    let callback = (err,data1)=>{
        if(err){
            console.log(err);
        }else {
            res.send({
                status:200,
                message:'浏览成功'
            })
        }
    }
    connection.sqlConnect(sqlStr,paramsArr,callback)
}
//文章点赞
sqlApi.thumbsUp = (res,data)=>{
    let sqlStr = 'UPDATE artical SET likes=? where id=?;UPDATE user SET likes=? where id=?'
    let paramsArr = [data.likes,data.id,data.userLikes,data.userId]
    let callback = (err,data1)=>{
        if(err){
            console.log(err);
        }else {
            res.send({
                status:200,
                message:'点赞成功'
            })
        }
    }
    connection.sqlConnect(sqlStr,paramsArr,callback)
}

//评论点赞
sqlApi.commentThumbsUp = (res,data)=>{
    console.log(data);
    let sqlStr = 'UPDATE comment SET likes=? where id=?;UPDATE user SET likeComment=? where id=?'
    let paramsArr = [data.likes,data.id,data.likeComment,data.userId]
    let callback = (err,data1)=>{
        if(err){
            console.log(err)
        }else {
            res.send({
                status:200,
                message:'点赞成功'
            })
        }
    }
    connection.sqlConnect(sqlStr,paramsArr,callback)
}

//发表评论
sqlApi.sendComment = (res,data)=>{
    console.log(data)
    let time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let sqlStr = 'INSERT INTO comment(articalId,publisherId,publisherName,publisherImg,publisherCollege,content,time) VALUES(?,?,?,?,?,?,?)'
    let paramsArr = [data.articalId,data.publisherId,data.publisherName,data.publisherImg,data.publisherCollege,data.content,time]
    let callback = (err,data1)=>{
        if(err){
            console.log(err);
        }else {
            res.send({
                status:200,
                message:'评论成功'
            })
        }
    }

    connection.sqlConnect(sqlStr,paramsArr,callback)
}
sqlApi.sendReply = (res,data)=>{
    console.log(data);
    let time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let sqlStr = 'INSERT INTO reply(id,publishername,content,time) VALUES(?,?,?,?)'
    let paramsArr = [data.id,data.publishername,data.content,time]
    let callback = (err,data1)=>{
        if(err){
            console.log(err);
        }else {
            res.send({
                status:200,
                message:'回复成功'
            })
        }
    }
    connection.sqlConnect(sqlStr,paramsArr,callback)
}
module.exports = sqlApi