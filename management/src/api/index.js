import request from '../utils/axios.js'

export function login(){

}
//获取所有用户
export function getAllUser(param){
    console.log(param);
    return request({
        url: '/manage/getAllUser',
        method: 'post',
        data:param
    })
}
export function getRelease(param){
    return request({
        url: '/manage/getRelease',
        method: 'post',
        data:param
    })
}
export function getFind(param){
    return request({
        url: '/manage/getFind',
        method: 'post',
        data:param
    })
}
//审批
export function approvalGoods(param){
    return request({
        url: '/manage/approvalGoods',
        method: 'post',
        data:param
    })
}
//拒绝审批
export function rejectApproval(param){
    return request({
        url: '/manage/rejectApproval',
        method: 'post',
        data:param
    })
}
//获取所有文章
export function getAllArtical(param){
    return request({
        url: '/manage/getAllArtical',
        method: 'post',
        data:param
    })
}
//删除用户
export function deleteUser(param){
    return request({
        url: '/manage/deleteUser',
        method: 'post',
        data:param
    })
}
//删除文章
export function deleteArticals(param){
    return request({
        url: '/manage/deleteArtical',
        method: 'post',
        data:param
    })
}
//获取所有物品信息，release
export function release(){
    return request({
        url: '/manage/release',
        method: 'get',
    })
}
export function find(){
    return request({
        url: '/manage/find',
        method: 'get',
    })
}
//获取所有物品信息
export function getAllRelease(){
    return request({
        url:'/goods/getAllRelease',
        method:'get',
    })
}
export function getAllFind(){
    return request({
        url:'/goods/getAllFind',
        method:'get',
    })
}
//管理获取信息
export function getAllOfRelease(param){
    return request({
        url:'/manage/getAllRelease',
        method:'post',
        data:param
    })
}
export function getAllOfFind(param){
    return request({
        url:'/manage/getAllFind',
        method:'post',
        data:param
    })
}
//物品管理，删除已经审批的物品
export function deleteGoodsItem(param){
    return request({
        url:'/manage/deleteGoodsItem',
        method:'post',
        data:param
    })
}
//获取公共数据
export function getAllType(){
    return request({
        url:'/goods/getAllType',
        method:'get',
    })
}
//更新公共类型
export function updateType(param){
    return request({
        url:'/manage/updateType',
        method:'post',
        data:param
    })
}
//获取数量统计
export function getCountNum(param){
    return request({
        url:'/manage/getCountNum',
        method:'get'
    })
}

// 首页文章
export function getArticals(){
    return request({
        url:'/manage/getArticals',
        method:'get'
    })
}
