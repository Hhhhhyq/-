var express = require('express');
var router = express.Router();
const sendEmail = require('../utils/sendEmail.js')
const sqlApi = require('../sql/sql')
router.post('/getMailCode',(req,res)=>{
    // console.log(req.query.email);
    // let emails = req.url.split('=')[1]
    let emails = req.body.params.email
    // console.log(req);
//随机生成6位数字
let emailCode  = (function captchaNumber(){
    let num = [];
    for (let i = 0; i < 6; i++) {
        num[i] = parseInt(Math.random()*10);
    }
    return num.join('');
})() 
//定义邮箱内容模板
let email = {
    title: '失物招领---邮箱验证码',
    body:`
            <h1>您好：</h1>
            <p style="font-size: 18px;color:#000;">
                您的验证码为：
                <span style="font-size: 16px;color:#f00;"> ${ emailCode }， </span>
                您当前正在校园失物招领App注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
            </p>
            <p style="font-size: 1.5rem;color:#999;">60秒内有效</p>
            `
}
let emailContent = {
    from:'452486196@qq.com',
    to:emails,
    subject:email.title,
    html:email.body
}
    sendEmail.send(emailContent)
    res.send({
        status:200,
        message:'success',
        data:{
            code: emailCode
        }
    })
})

router.post('/register',(req,res)=>{
    let data = req.body.params
    sqlApi.register(data,res)
})

module.exports = router;
