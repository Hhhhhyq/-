import http from  './request.js'



let api = {}

//登录
api.login = (userInfo)=> http.post('/api/users/login',{params:{email:userInfo.email,password:userInfo.password}});
//注册
api.register = (data)=>http.post('/api/register/register',{params:{name:data.name,password:data.password,email:data.email}})
//获取用户信息
api.getUserInfo = (email)=>http.post('/api/users/userInfo',{email:email})
//文件上传
api.imgUpload = (data)=>http.upload('/api/image/upload',{filePath:data.filePath,name:data.name});
//find文件上传
api.findImgUpload = (data)=>http.upload('/api/image/findupload',{filePath:data.filePath,name:data.name});
//注册获取短信验证码
api.getCode = (email)=> http.post('/api/register/getMailCode',{params:{email}});

//发布拾取物品
api.release = (form)=>http.post('/api/goods/release',{params:{data:form}})
//发布寻物品
api.find = (form)=>http.post('/api/goods/find',{params:{data:form}})

//获取发布拾取物品
api.getMyRelease = (id)=>http.post('/api/goods/getMyRelease',{params:{id:id}})
//获取发布find物品
api.getMyFind = (id)=>http.post('/api/goods/getMyFind',{params:{id:id}})

//获取所有物品
api.getAllRelease = ()=>http.get('/api/goods/getAllRelease')
//获取所有find物品
api.getAllFind = ()=>http.get('/api/goods/getAllFind')

//修改密码
api.editPass = (obj)=>http.post('/api/users/checkPass',{params:{id:obj.id,oldPassword:obj.oldPassword,newPassword:obj.newPassword}})
//编辑个人资料
api.editInfo = (obj)=>http.post('/api/users/editInfo',{params:{userInfo:obj}})
//头像上传
api.sculptureUpload = (data)=>http.upload('/api/image/sculptureUpload',{filePath:data.filePath,name:data.name});

// 获取聊天列表信息
api.charList = (id)=>http.post('/api/users/getCharList',{params:{id:id}})
// 获取聊天列表信息
api.getHistoryChat = (id,toId)=>http.post('/api/users/getHistoryChat',{params:{id:id,toId:toId}})

// 文章图片上传data
api.articalImgUpload = (data)=>http.upload('/api/image/articalUpload',{filePath:data.filePath,name:data.name});

//文章上传
api.articalUpload = (data)=>http.post('/api/artical/articalUpload',{params:{data:data}})

//获取文章
api.getAllArtical = (page)=>http.post('/api/artical/getAllArtical',{params:{page:page}})

//筛选物品信息
api.selectGoods = (data)=>http.post('/api/goods/selectList',{params:{select1:data.value1,select2:data.value2}})

//获取评论
api.getComment = (id)=>http.post('/api/artical/getComment',{params:{id:id}})

//文章点赞
api.thumbsUp = (obj)=>http.post('/api/artical/thumbsUp',{params:{obj:obj}})
//浏览文章记录
api.saw = (obj)=>http.post('/api/artical/saw',{params:{id:obj.id,saw:obj.saw}})
//评论点赞
api.commentThumbsUp = (obj)=>http.post('/api/artical/commentThumbsUp',{params:{obj:obj}})
// 发表评论
api.sendComment = (obj)=>http.post('/api/artical/sendComment',{params:{obj:obj}})
export default api