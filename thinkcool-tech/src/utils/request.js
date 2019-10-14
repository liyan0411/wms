//   在http.js中引入axios
import axios from 'axios'
import { Message, Loading } from 'element-ui'
import api from "./common"
const baseApi = 'http://47.103.73.132:8086/wms-admin/'
// create an axios instance   创建axios实例
const service = axios.create({
  baseURL:baseApi, // api 的 base_url
  timeout: 5000, // request timeout  设置请求超时时间
  responseType: "json",
  // withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})
// post请求参数格式化
function requestFormat(reqData){
	let _user = api.sGetObject('_user');
	let userId;
	let token;
	if(_user){
		userId=_user.id;
		token=_user.token;
	}
	let req = {
		reqData: reqData,
		token: token,
		userId: userId
	}
	return req;
};
// get请求参数格式化
function requestGetFormat(reqData){
	let _user = api.sGetObject('_user')
	let userId;
	if(_user){
		userId=_user.id
	}
	reqData.userId = userId;
	let req = reqData
	return req;
};
function message(type,msg){
	return Message({
		message: msg,
		// duration: 1000,
		showClose: true,
		type:type,
		forbidClick: true
	});
}
// 初始化loading实例
var loadinginstace;
// create an axios instance
service.interceptors.request.use(
  config => {
		 loadinginstace = Loading.service({
			lock: true,
			text: 'Loading',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.3)',
			customClass: 'osloading',
			fullscreen: true
		});
    // if (config.method === "post") {
		// 	config.data=requestFormat(config.data)
    // }else {
		// 	config.params = requestGetFormat(config.data)
    // }
    return config;
  },
  error => {
    // 对请求错误处理
    Message({                  //使用element-ui的message进行信息提示
      showClose: true,
      message: error,
      type: "warning"
    });
    return Promise.reject(error);
	}
);
// response interceptor
service.interceptors.response.use(
	response => {
		let res=response.data;
		if (response.status === 200) {
			// 根据后端响应状态码 处理请求
			loadinginstace.close();

		} else {
			loadinginstace.close()
			return Promise.reject(res);
		}
	},
	error => {
		loadinginstace.close()
		//  判断请求超时
		if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
			message("error","请求超时，请稍后再试！");
			return Promise.reject(error);
			// return service.request(originalRequest);//例如再重复请求一次
		}
		if (error.response) {
			switch (error.response.status) {
				// 按照需求 处理异常
					case 401:
							break;
					case 403:
							message("error","登录过期，请重新登录");
							break;
					case 404:
							message('error', '服务器处理异常，请稍后再试！')
							break;
					default:
							message("error","服务器处理异常，请稍后再试！");
			}
			return Promise.reject(error.response);
		}else{
			message('error', '服务器处理异常，请稍后再试！')
			return Promise.reject(error.response)
		}
	}
);
export default service;
