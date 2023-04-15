import moment from 'moment'
let utils = {}
utils.dealTime = function(obj){
    // let time = moment(new Date()).format('YYYY-MM-DD')
    let arr = []
    for(let i=0;i<7;i++){
        arr.push(moment().add(`-${i}`, 'd').format("YYYY-MM-DD"))
    }
    
    let newObj = [0,0,0,0,0,0,0]
    arr = arr.reverse()
    // console.log(arr);
    obj.forEach(item=>{
        arr.forEach((item1,index)=>{
            if(item1 == item.time.split(' ')[0]){
                newObj[index]++
            }
        })
    })
    let dataObj = {
        time:arr,
        data:newObj
    }
    return dataObj
}
export default utils