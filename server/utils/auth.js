//token验证中间件

const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { token } = require('morgan')

function verifyToken(token){
    jwt.verify(token,'secret12345',(err,data)=>{
        if(err){
            return err
        }else{
            return data
        }
    })
}

const auth = (req,res,next)=>{
    const verifyResult = verifyToken(token)
    if(verifyResult){
        res.locals.currentUser = verifyResult;
        next()
    }else{
        res.render('notLogin',{
            data:JSON.stringify("请登录")
        })
    }
}

exports.auth = auth
