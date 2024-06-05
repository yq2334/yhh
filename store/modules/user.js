import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import {
	login,
	logout,
	getInfo,
	miniLogin
} from '@/api/login'
import {
	getSystemConfig
} from '@/api/setting/index.js'
import {
	getToken,
	setToken,
	removeToken
} from '@/utils/auth'

const user = {
	state: {
		token: getToken(),
		name: storage.get(constant.name),
		avatar: storage.get(constant.avatar),
		roles: storage.get(constant.roles),
		permissions: storage.get(constant.permissions),
		userInfo: storage.get(constant.userInfo),
		sysConfig: storage.get(constant.sysConfig),
		snConfig: storage.get(constant.snConfig),
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			setToken(token)
			state.token = token
		},
		SET_NAME: (state, name) => {
			state.name = name
			storage.set(constant.name, name)
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
			storage.set(constant.avatar, avatar)
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
			storage.set(constant.roles, roles)
		},
		SET_PERMISSIONS: (state, permissions) => {
			state.permissions = permissions
			storage.set(constant.permissions, permissions)
		},
		SET_USERINFO: (state, value) => {

			state.userInfo = value
			storage.set(constant.userInfo, value)
		},
		SET_SYSCONFIG: (state, value) => {
			state.sysConfig = value
			storage.set(constant.sysConfig, value)
		},
		SET_SNSCONFIG: (state, value) => {
			state.snConfig = value
			storage.set(constant.snConfig, value)
		},
	},

	actions: {
		// 登录
		Login({
			commit
		}, userInfo) {
			// const username = userInfo.username.trim()
			const phone = userInfo.phone
			const code = userInfo.code

			return new Promise((resolve, reject) => {
				login(phone, code).then(res => {
					if (res.code == 200) {
						setToken(res.data.token)
						commit('SET_TOKEN', res.data.token)
						// commit('SET_NAME', res.data.username)
						// commit('SET_AVATAR', avatar)
						// commit('SET_USERINFO',  res.data.dto) //新加
						resolve()
					} else {
						reject(res)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 获取用户信息
		GetInfo({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				getInfo().then(res => {
					const data = res.data
					const user = res.data
					const avatar = (user == null || user.headimgUrl == "" || user.headimgUrl ==
						null) ? require(
						"@/static/images/profile.jpg") : user.headimgUrl
					const username = (user == null || user.userName == "" || user.userName ==
						null) ? "" : user.userName
					if (data.roles && data.roles.length > 0) {
						commit('SET_ROLES', data.roles)
						commit('SET_PERMISSIONS', data.permissions)
					} else {
						commit('SET_ROLES', ['ROLE_DEFAULT'])
					}
					commit('SET_NAME', username)
					commit('SET_AVATAR', avatar)

					commit('SET_USERINFO', data) //新加

					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetSysConfig({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				getSystemConfig().then(res => {
					const data = res.data
					commit('SET_SYSCONFIG', data) //新加
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 退出系统
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				// logout(state.token).then(() => {
				//   commit('SET_TOKEN', '')
				//   commit('SET_ROLES', [])
				//   commit('SET_PERMISSIONS', [])
				//   removeToken()
				//   storage.clean()
				//   resolve()
				// }).catch(error => {
				//   reject(error)
				// })

				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				commit('SET_PERMISSIONS', [])
				removeToken()
				storage.clean()
				resolve()
			})
		},
		setSNConfig({
			commit,
			state
		}, data) {
			
			commit('SET_SNSCONFIG', data)
		},
		// 微信登录
		MiniLogin({
			commit
		}, userInfo) {

			return new Promise((resolve, reject) => {
				miniLogin(userInfo).then(res => {
					if (res.code == 200) {
						setToken(res.data)
						commit('SET_TOKEN', res.data)
						resolve()
					} else {
						reject(res)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},
	},

}

export default user