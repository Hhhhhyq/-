import axios from "axios";

let service = axios.create({
  // baseURL: "http://10.20.187.192:3000/api", // api的base_url
  baseURL: "http://192.168.100.13:3000/api", // api的base_url
  // baseURL: "http://192.168.3.129:3000/api", // api的base_url
  timeout: 5000, // 请求超时时间
});

//请求拦截器
service.interceptors.request.use((config) => {
  console.log("req", config);
  return config;
});

//相应拦截器
service.interceptors.response.use((response) => {
  let res = response.data;
  // if (res.status !== 200) {
  //   Message({
  //     message: res.message,
  //     type: "error",
  //     duration: 5 * 1000,
  //   });
  // }
  // else {
  //   return res
  // }
  return res
});
//   // request拦截器
// service.interceptors.request.use(config => {
//     if (localStorage.getItem('token')) {
//       config.headers = {
//         'Authorization' : "Token " + getToken('Token'), //携带权限参数
//        };
//     }
//     return config
//   }, error => {
//     Promise.reject(error)
//   })
// // respone拦截器
// service.interceptors.response.use(
//     response => {
//      /**
//       * code:200,接口正常返回;
//       */
//       const res = response.data
//       if (res.code !== 200) {
//         Message({
//           message: res.message,
//           type: 'error',
//           duration: 5 * 1000
//         })
//         // 根据服务端约定的状态码：5001:非法的token; 5002:其他客户端登录了; 5004:Token 过期了;
//         if (res.code === 5001 || res.code === 5002 || res.code === 5004) {
//             MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//               confirmButtonText: '重新登录',
//               cancelButtonText: '取消',
//               type: 'warning'
//             }).then(() => {
//               store.dispatch('LogOut').then(() => {
//                 location.reload()// 为了重新实例化vue-router对象 避免bug
//               })
//             })
//         }
//         return Promise.reject('error')
//       } else { // res.code === 200,正常返回数据
//           return response.data
//       }
//     },
//     error => {
//       Message({
//         message: error.message,
//         type: 'error',
//         duration: 5 * 1000
//       })
//       return Promise.reject(error)
//     }
//   )
export default service;
