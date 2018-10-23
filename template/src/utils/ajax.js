/* =====================================================================
 * @desc 封装请求接口
 * @param uri {string}
 * @param data {object} post直接传值，get添加params字段{params:{字段1:值}}
 * @param config {object} 配置文件
 * @autor zhangweidong
 * =====================================================================
 * 1 根据process.env.NODE_ENV 获取对应的apiDomain
 * 2 处理ajax库axios，为了以后不重复引用，挂在原型对象上
 * 3 组件里面使用this.$axios.get/post(url,data,config)
 * 4 config参数如有需要可以参照https://www.kancloud.cn/yunye/axios/234845，或axios官网自己配置
 * 5 前置登录请在config里配置 isCheckLogin:true
 * 6 请求数据序列化，如果需要请在config传入{isForm:true}
 *----------------------------------------------------------------------
 * （1）post/get 例子
		this.$ajax.post("/user/checkLogin.htm", {id:2222}
		).then((res)=>{
				console.log(res.data)
		})
 *---------------------------------------------------------------------
 */

import axios from 'axios';
const axiosIns = axios.create();

// 设置默认返回数据类型
axiosIns.defaults.responseType = 'json';
axiosIns.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' };
// 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
axiosIns.defaults.validateStatus = function (status) {
	return true;
};
// 前置序列化表单默认为false
axiosIns.defaults.isForm = false;
// axios 请求拦截器，前置登录
axiosIns.interceptors.request.use(function (config) {
	// 配置config
	config.headers.Accept = 'application/json';
	const configs = config.data || {};
	if (config.isForm || configs.isForm) {
		config.transformRequest = [function (data) {
			return JSON.stringify(data);
		}];
	}
	return config;
});

// axios 响应拦截器，状态码判断
axiosIns.interceptors.response.use(function (response) {
	const status = response.status;
	if (status === 200) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(response);
	}
});

/*
 * @desc 封装请求接口
 * @param url {string}
 * @param data {object}
 * @param config {object} 配置文件
 */
const ajaxMethod = ['get', 'post'];
const api = {};
ajaxMethod.forEach((method) => {
	// 数组取值的两种方式
	api[method] = async (url, data, config) => {
		if (process.env.NODE_ENV === 'development') {
			if (config.dev) {
				axiosIns.defaults.baseURL = `/${config.dev}`;
			} else {
				axiosIns.defaults.baseURL = '/api';
			}
		}
		return new Promise(function (resolve, reject) {
			let data_ = {};
			if (method === 'get') {
				data_.params = data;
			} else {
				data_ = data;
			}
			if (config) {
				Object.keys(config).forEach(key => {
					key !== 'dev' && (data_[key] = config[key]);
				});
			}
			axiosIns[method](url, data_, config).then((response) => {
			/* 根据后台数据进行处理
				*code===200   正常数据+错误数据     code!==200   网络异常等
			*/
				// resolve(response);
				resolve(response.data);
			}).catch((err) => {
				console.error(err);
				reject(err);
			});
		});
	};
});

export default api;
