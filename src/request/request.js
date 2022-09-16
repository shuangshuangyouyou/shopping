// 封装

// 引入axios
import store from "@/store";
import axios from "axios";

// 给当前请求添加一些其他配置
const ins = axios.create({
  //配置url(请求地址)
  baseURL: "http://kumanxuan1.f3322.net:8001",

  // 请求超时时间 , 单位是毫秒
  timeout: 5000,
});

// 请求拦截
ins.defaults.headers.common["Authentication-Token"] = store.state.token;

ins.interceptors.request.use((config) => {
  /* 
            token
            登录=> 账号,密码
            正确的账号密码,去登录接口中获取登录信息
            此时登录信息中包含了token 
            可以把token的值的值存储起来
            localStorege.setItem('token',res.data.token)

            在请求拦截的位置获取token,
            let
             token=localStorage.getItem('token);
             if(token){
                //如果有token,证明登录过,
                把token设置到请求头中
                config.headers[X-Nideshop-Token]=token
             }
        */
  // console.log('每次请求前都会执行这里的代码');

  //   if (store.state.token) {
  //     config.headers.common["Authentication-Token"] = store.state.token;
  //   }
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
}),
  (error) => {
    return Promise.reject(error);
  };

// 响应拦截
ins.interceptors.response.use((res) => {
  // console.log('每一次响应都会执行这里的代码');
  // 这里的res就是你请求到的数据
  return res.data;
});
// (error) => {
//   if (error.res) {
//     switch (error.res.state) {
//       case 401:
//         this.$store.commit("delToken");
//         router.replace({
//           path: "/person",
//           query: { redirect: router.currentRoute.fullPath },
//         });
//     }
//   }
//   return Promise.reject(error.rse.data);
// };

// 将ins开放(导出)出去
export default ins;
