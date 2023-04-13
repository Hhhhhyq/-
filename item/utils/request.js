import Request from 'luch-request'
// import config from "@/config"

const service = new Request();
// let baseURL = config.baseURL;
// let baseURL = 'http://192.168.196.127:3000'
// let baseURL = 'http://10.20.187.192:3000'
let baseURL = 'http://192.168.100.13:3000'
service.setConfig((config)=>{
	
	// #ifndef H5
	// config.baseURL = 'http://192.168.100.9:3000/api'
	// #endif
	 // #ifdef  APP-PLUS || MP-ALIPAY || MP-WEIXIN
	 config.baseURL = baseURL
	config.timeout=5555000
	// #endif
	return config;
})
// h15736987280@163.com
service.interceptors.request.use((config) => {
  let token = uni.getStorageSync('token');
  if (token) {
	  config.header["Authorization"] = `Bearer ${token}`;
  }
  console.log('req',config);
  return config
}, config => {
	console.log(config) // for debug
	uni.showToast({
	    title: "请求超时",
	    icon: 'none'
	})
  return Promise.reject(config)
})

// respone拦截器
service.interceptors.response.use(
    response => {
		console.log('res',response);
		return response.data
    //     // const res = response.data
    //     if (res.code && res.code !== 200) {
    //         // 登录超时,重新登录
    //         if (res.code === 50014) {
    //             if (count == 1) {
    //                 return Promise.resolve(handleRefresh())
    //             } else {
    //                 count = 1;
    //                 return Promise.resolve(handleOtherRefresh())
    //             }
      
    // }
    //         return Promise.resolve(response)
    //     } else {
    //         return Promise.resolve(response)
    //     }
    // },
    // error => {
        // Toast.clear()
   //      if (error.response) {
			// console.log(error.response);
   //          const code = error.response.code;
   //          uni.hideToast();
   //          if (code == 500) {
   //              Toast('接口错误，请联系管理员')
   //              uni.showToast({
   //                  title: "接口错误，请联系管理员",
   //                  icon: "none"
   //              })
   //              // utils.notice("接口错误，请联系管理员", 'error');
   //          }
   //          if (code == 404) {
   //              uni.showToast({
   //                  title: "404 NOT FOUND",
   //                  icon: "none"
   //              })
   //          }
   //          console.log('err' + error) // for debug
   //      }
   //      return Promise.reject(error)
    }
)

let count = 1;
//登录失效处理
function handleLoginFail() {
    uni.setStorageSync('access_token', '')
	uni.removeStorageSync('access_token');
    uni.showToast({
        title: "登录失效",
        icon: "none",
        duration: 1000
    })
	var pages = getCurrentPages(); //获取页面
	var beforePage = pages[pages.length - 1]; //上个页面
	let path = beforePage.route;
    setTimeout(() => {
        uni.reLaunch({
            url: `/pages/login/login?path=/${path}`
        });
    }, 1000)
}
async function handleRefresh(response) {
    count = count + 1
    try {
        // let res = await service.request({url:})
		let res={};
		res.code=100;
        if (res.code == 200) {
            if (res.data.access_token) {
                uni.setStorageSync('access_token', res.data.access_token)
                let config = response.config;
                config.headers['Authorization'] = 'Bearer ' + res.data.access_token;
                const data = await service.request(config);
                count = 1;
                return data;
            }
        } else {
            count = 1;
            //清token
            handleLoginFail();
        }
    } catch (err) {
        //清token
        handleLoginFail();
        console.log(err);
    }
}
async function handleOtherRefresh(response) {
    let config = response.config;
    let access_token = uni.getStorageSync('access_token');

    if (access_token) {
        config.headers['Authorization'] = 'Bearer ' + access_token;
        const data = await service.request(config);
        return data;
    } else {
        //todo 没有token不刷新 具体逻辑再碰下
        handleLoginFail();
    }
}

export default service;