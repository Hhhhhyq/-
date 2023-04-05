// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     port: 8081, //设置项目端口号这是vue项目端口
//     host: "http://127.0.0.1:8081", //允许所有的主机访问当前项目
//     proxy: {
//       "/api": {
//         //正则匹配到以这个开头的时候 就用代理
//         target: "http://192.168.100.13:3000", // 指向的是目标服务器
//         changOrigin: true, //允许跨域
//         pathRewrite: {
//           "^/api": "",
//         },
//       },
//     },
//   },
//   // chainWebpack: config => {
//   //   config.resolve.alias
//   //     .set('@', resolve('src'))
//   //     .set('assets', resolve('src/assets'))
//   //     .set('components', resolve('src/components'))
//   // }
//   // chainWebpack: (config) => {
//   //   config.entry.app = ['./src/main.js'],
//   //   config.resolve.alias
//   //     .set('@', resolve('src'))
//   // }
// });
