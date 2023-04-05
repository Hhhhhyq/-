import {
	data
} from "./uni_modules/uview-ui/libs/mixin/mixin";

let utils = {

}
//获取时间戳
utils.getTime = (val, status = 0) => {
	var date = new Date();
	switch (status) {
		case 0:
			return data.getTime()
			break;
	}
	date.setTime(val);
	var month = date.getMonth() + 1;
	var hours = date.getHours();
	if (hours < 10)
		hours = "0" + hours;
	var minutes = date.getMinutes();
	if (minutes < 10)
		minutes = "0" + minutes;
	var time = date.getFullYear() + "-" + month + "-" + date.getDate() +
		" " + hours + ":" + minutes;
	return time;
}
//获取时间差
utils.getTimeDifference = (oldTime) => {
	function nowTime() {
		var current = new Date(); //实例化Date对象
		var nowYear = current.getFullYear(); //获取当前的年份
		var nowMonth = current.getMonth() + 1; //默认显示的是0-11月，比我们正常的月份少一个月，所以要+1
		var nowdates = current.getDate(); //获取日期
		var day = current.getDay(); 
		return nowYear + '年' + nowMonth + '月' + nowdates + '日'
	}

	let data = new Date()
	let now = data.getTime()
	var date3 = now - oldTime; //时间差的毫秒数   
	var days = Math.floor(date3 / (24 * 3600 * 1000))

	var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数  
	var hours = Math.floor(leave1 / (3600 * 1000))
	//计算相差分钟数  
	var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数  
	var minutes = Math.floor(leave2 / (60 * 1000))
	//计算相差秒数  
	var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数  
	var seconds = Math.round(leave3 / 1000)


	var not0 = !!date3,
		d = days,
		h = hours,
		m = minutes,
		s = seconds;
	var absVal = Math.abs(days);
	if (d >= 7) {
		return '1周前'
	} else if (d >= 14) {
		return '2周前'
	} else if (d >= 21) {
		let todayTime = nowTime()
		return todayTime
	} else if (d == 0) {
		return h + "小时" + m + "分" + s + "秒前";
	} else if (h == 0) {
		return m + "分" + s + "秒前";
	} else if (m == 0) {
		return s + "秒前";
	} else if (d == 0 && h == 0 && m == 0 && s <= 10) {
		return '刚刚'
	}
	// return d + "天" + h + "小时" + m + "分" + s + "秒";
}
export default utils
