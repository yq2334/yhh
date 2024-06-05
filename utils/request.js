import store from '@/store'
import config from '@/config'
import configService from '@/api/config.service'

console.log(configService.apiUrl)
import {
	getToken
} from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import {
	toast,
	showConfirm,
	tansParams,
	delEmptyQueryNodes
} from '@/utils/common'

let timeout = 1000 * 60
const baseUrl = configService.apiUrl

function post(url, data, loading, unShowMsg) {
	return request({
		url: url,
		method: 'POST', 
		data: data,
		loading: loading,
		unShowMsg: unShowMsg
	});
}

async function get(url, data, loading, unShowMsg) {
	return request(url, 'GET', data, loading, unShowMsg);
}


const request = config => {
	// 是否需要设置 token
	const isToken = (config.headers || {}).isToken === false
	config.header = config.header || {}
	if (getToken() && !isToken) {
		config.header['Authorization'] = 'Bearer ' + getToken()
		// config.header['userid'] = store.getters.userId
	}
	if (config.loading) {
		uni.showLoading({
			title: typeof config.loading == 'boolean' ? "正在处理..." : config.loading,
			mask: true
		})
	}
	// get请求映射params参数，uniapp如果是GET请求会自动在url后面添加参数
	if (config.params) {
		let url = config.url + '?' + tansParams(config.params)
		url = url.slice(0, -1)
		config.url = url
	}
	// 移除underfunded、null参数
	if (config.method.toLowerCase() === 'get') {
		config.data = delEmptyQueryNodes(config.data)
	}
	console.log(config)

	return new Promise((resolve, reject) => {
		uni.request({
			method: config.method || 'GET',
			timeout: config.timeout || timeout,
			url: (config.baseUrl || baseUrl) + config.url,
			data: config.data,
			header: config.header,
			success: (res) => {
				if (config.loading) {
					uni.hideLoading();
				}
				console.log(res)

				if (res.statusCode == 500) {
					console.log(JSON.stringify(res))
					uni.showToast({
						icon: "none",
						title: "服务器繁忙，请稍后重试"
					})
					return;
				}

				if (res.statusCode == 404) {
					uni.showToast({
						icon: "none",
						title: "未找到请求接口"
					})
					return
				}
				if (res.statusCode == 202 || res.statusCode == 401) {
					if (res.data && res.data.message && res.data.code != '401') {
						uni.showToast({
							icon: "none",
							title: res.data.message
						})
						return;
					};
					store.dispatch('LogOut')
					uni.reLaunch({
						url: "/pages/login"
					})
					return;
				}
				if (res.statusCode == 200) {

					if (res.data && res.data.msg && (res.data.code == '9999' )) {
						uni.showToast({
							icon: "none",
							title: res.data.msg
						})
						store.dispatch('LogOut')
						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/login"
							})
						}, 2000)

						return;
					};
					if (res.data && res.data.msg && res.data.code != '00' ) {
						console.log(res.data.msg)
						// if(!config.headers.hideErrorMsg) {

						// }	
						
						if(config.unShowMsg && res.data.code == '01') {
							
						}else{
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
						
					};
				}

				resolve(res.data)
			},
			fail: (err) => {
				if (config.loading) {
					uni.hideLoading();
				}
				console.log(JSON.stringify(err))
				if ((err.hasOwnProperty('statusCode') && err.statusCode == 401) ||
					(err.data && err.data.code == 401)) {
					store.dispatch('LogOut')
					uni.reLaunch({
						url: "/pages/login"
					})
					return;
				}
				uni.showToast({
					icon: "none",
					title: "请求接口失败" + JSON.stringify(err)
				})
			}
		})
	})
}

export default request