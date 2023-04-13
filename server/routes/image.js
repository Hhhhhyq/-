// var express = require('express');
// var router = express.Router();

// var multer = require('multer')
// // const storage = multer.diskStorage({
// //     destination:function(req,file,cb){
// //         cb(null,'/data/photo')
// //     },
// //     filename:function(req,file,cb){
// //         let type = file.originalname.replace(/.+\./,".")
// //         cb(null,file,filename+'-'+Date.now()+type)
// //     }
// // })

// const upload = multer({dest:'../data'})

// router.post('/upload',upload.single('file'), function(req, res, next) {
//   res.send('ok');
// });

const express = require('express');
const router = express.Router();
const multer = require('multer');
var fs = require("fs");
// const { resSuccess } = require('../../utils/response');
// const random = require('string-random');
router.post("/upload", multer({
    dest: "./public/upload/avatar"
}).single("file"), (req, res) => {
    // var url = "http://192.168.196.127:3000/";
    var url = "http://192.168.100.13:3000/";
    // var url = "http://192.168.3.129:3000/"
    var file = req.file;
    var time = Date.now();
    try {
        var name=file.originalname.split('.')
        name = "."+name[name.length - 1];
        fs.renameSync(file.path, `./public/upload/avatar/${time+name}`)
        file.path = url + `upload/avatar/${time+name}`;
        console.log(file.path);
        res.json({
			"status":200,
			"message":"success",
			"data":{"url":file.path}}
		);
        // res.sendStatus(200)
    } catch (e) {
        res.send(e)
        console.log(e)
    }
})
router.post("/findupload", multer({
    dest: "./public/upload/findAvatar"
}).single("file"), (req, res) => {
    console.log(req.file);
    // var url = "http://192.168.196.127:3000/";
    var url = "http://192.168.100.13:3000/";
    // var url = "http://192.168.3.129:3000/"
    var file = req.file;
    var time = Date.now();
    try {
        var name=file.originalname.split('.')
        name = "."+name[name.length - 1];
        fs.renameSync(file.path, `./public/upload/findAvatar/${time+name}`)
        file.path = url + `upload/findAvatar/${time+name}`;
        console.log(file.path);
        res.json({
			"status":200,
			"message":"success",
			"data":{"url":file.path}}
		);
        // res.sendStatus(200)
    } catch (e) {
        res.send(e)
        console.log(e)
    }
})
//头像上传
router.post("/sculptureUpload", multer({
    dest: "./public/upload/users"
}).single("file"), (req, res) => {
    console.log(req.file);
    // var url = "http://192.168.196.127:3000/";
    var url = "http://192.168.100.13:3000/";
    // var url = "http://192.168.3.129:3000/"
    var file = req.file;
    var time = Date.now();
    try {
        var name=file.originalname.split('.')
        name = "."+name[name.length - 1];
        fs.renameSync(file.path, `./public/upload/users/${time+name}`)
        file.path = url + `upload/users/${time+name}`;
        console.log(file.path);
        res.json({
			"status":200,
			"message":"success",
			"data":{"url":file.path}}
		);
        // res.sendStatus(200)
    } catch (e) {
        res.send(e)
        console.log(e)
    }
})
//社区文章图片上传
router.post("/articalUpload", multer({
    dest: "./public/upload/artical"
}).single("file"), (req, res) => {
    // var url = "http://192.168.196.127:3000/";
    var url = "http://192.168.100.13:3000/";
    // var url = "http://192.168.3.129:3000/"
    var file = req.file;
    var time = Date.now();
    try {
        var name=file.originalname.split('.')
        name = "."+name[name.length - 1];
        fs.renameSync(file.path, `./public/upload/artical/${time+name}`)
        file.path = url + `upload/artical/${time+name}`;
        console.log(file.path);
        res.json({
			"status":200,
			"message":"success",
			"data":{"url":file.path}}
		);
        // res.sendStatus(200)
    } catch (e) {
        res.send(e)
        console.log(e)
    }
})
router.post("/uploadBanner", multer({
    dest: "./public/upload/banner"
}).single("file"), (req, res) => {
    // var url = "http://192.168.196.127:3000/";
    var url = "http://192.168.100.13:3000/";
    // var url = "http://192.168.3.129:3000/"
    var file = req.file;
    var time = Date.now();
    try {
        var name=file.originalname.split('.')
        name = "."+name[name.length - 1];
        fs.renameSync(file.path, `./public/upload/banner/${time+name}`)
        file.path = url + `upload/banner/${time+name}`;
        console.log(file.path);
        res.json({
			"status":200,
			"message":"success",
			"data":{"url":file.path}}
		);
        // res.sendStatus(200)
    } catch (e) {
        res.send(e)
        console.log(e)
    }
})
module.exports = router;
