import axios from 'axios'
import tokenService from './../services/tokenService'
import qs from 'qs'

// 时间戳
const NewTimeStamp = new Date().getTime();
axios.defaults.timeout = 30000;
// axios.defaults.baseURL = 'https://y1.sz-egoal.cn/';
axios.defaults.baseURL = 'http://192.168.1.64:5000/api';
// axios.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		let data = config.method === 'get' ? config.params : JSON.stringify(config.data)
		const token = tokenService.getToken()
		let header;
		if (token) {
			header = {
				'Authorization': token.token_type + ' ' + token.access_token,
				'Accept-Language': 'zh-CN',
				post: {
					'content-type': 'application/json'
				}
			};
		}
		// wx小程序 发起请求相应 log 就可以看到熟悉的返回啦
		wx.request({
			url: config.url,
			method: config.method,
			data: config.data,
			header: header,
			success: (res) => {
				return resolve(res.data)
			},
			fail: (err) => {
				return reject(err)
			}
		})
	})

}
// axios 拦截器
function Instance() {
	//请求拦截器
	axios.interceptors.request.use(function(request) {
		// request.headers.token = 'token=11124654654687';
		return request
	}, function(error) {
		return Promise.reject(error);
	});

	// 添加响应拦截器
	axios.interceptors.response.use(function(response) {
		return response;
	}, function(error) {
		return Promise.reject(error);
	});
}

Instance()
export default {
	get(url, params) {
		return axios({
			method: 'get',
			url: url,
			params: params
		})
	},
	post(url, params) {
		return axios({
			method: 'post',
			url: url,
			data: params
		})
	}
}
