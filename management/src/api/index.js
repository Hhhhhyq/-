import request from '../utils/axios.js'

export function login(){

}
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
export function getAllArtical(param){
    return request({
        url: '/manage/getAllArtical',
        method: 'post',
        data:param
    })
}