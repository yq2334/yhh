import request from '@/utils/request'
import {
	getToken
} from '@/utils/auth';
import globalConfig from '@/config'
// 登录方法
export function login(data) {
	return request({
		'url': '/api_Login.ashx',
		headers: {
			isToken: false
		},
		// header: {
		// 	"Content-Type": "application/x-www-form-urlencoded"
		// },
		
		'method': 'post',
		params: data,
		loading: "正在登录...."
	})
}


export function isLogin(data) {
	return request({
		'url': '/api_islogin.ashx',
		
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		
		'method': 'post',
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.islogin',
			
		}, data),
		loading: false
	})
}

export function register(data) {
	return request({
		'url': '/api_register.ashx',
		headers: {
			isToken: false
		},
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.register',
			
		}, data),
		loading: "正在注册...."
	})
}
export function logout(data) {
	return request({
		'url': '/api_logout.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.logout',
			token: getToken()
		}, data),
		loading: "正在退出...."
	})
}
export function loginClose(data) {
	return request({
		'url': '/api_Login_Close.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.Login_Close',
			token: getToken()
		}, data),
		loading: "正在注销...."
	})
}
export function setPwd(data) {
	return request({
		'url': '/api_setpwd.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.setpwd',
			token: getToken()
		}, data),
		loading: "正在修改...."
	})
}
export function findPwd(data) {
	return request({
		'url': '/api_find_pwd.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.find_pwd',
		}, data),
		loading: "正在提交...."
	})
}
export function mobileLogin(data) {
	return request({
		'url': '/api_Login_code.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.Login_code',
		}, data),
		loading: "正在提交...."
	})
}
export function getVerifyCode(data) {
	return request({
		'url': '/api_yzcode.ashx',
		'method': 'post',
		headers: {
			isToken: false
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.yzcode',
		
		}, data),
		loading: "正在发送...."
	})
}

export function getWeixinConfig(data) {
	return request({
		'url': '/api_XiaoChengXu_token.ashx',
		'method': 'post',
		headers: {
			isToken: false
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.XiaoChengXu_token',
		
		}, data),
		loading: "获取中...."
	})
}
export function weiXinlogin(data) {
	return request({
		'url': '/api_XiaoChengXu_info.ashx',
		'method': 'post',
		headers: {
			isToken: false
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		params: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.XiaoChengXu_info',
		
		}, data),
		loading: "登录中...."
	})
}
// 获取appId
export function getWxAppId() {
	return request({
		'url': '/CmLogin/GetWxAppId',
		'method': 'get'
	})
}
// 获取用户详细信息
export function getInfo() {
	return request({
		'url': '/CmUser/GetUserInfo',
		'method': 'get'
	})
}

// 退出方法


// 发送验证码
export function sendCode(data) {
	return request({
		'url': '/CmLogin/SendCode',
		headers: {
			isToken: false,

		},
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		method: 'post',
		timeout: 20000,
		data: data,
	})
}

///Cm/CmLogin/BindIdCard 绑定身份证
export function bindIdCard(data) {
	return request({
		'url': '/CmLogin/BindIdCard',
		method: 'post',
		timeout: 20000,
		data: data,
	})
}
// 获取验证码
export function getCodeImg() {
	return request({
		'url': '/captchaImage',
		headers: {
			isToken: false
		},
		method: 'get',
		timeout: 20000
	})
}

//小程序登录
export function miniLogin(data) {
	return request({
		url: '/miniLogin',
		headers: {
			isToken: false
		},
		method: 'post',
		data: data
	})
}