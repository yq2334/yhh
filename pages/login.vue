<template>
	<view class="login-container">
		<view class="login-top">
			<image class="login-logo" src="/static/logo.png" alt=""></image>
			<h3 class="login-title">欢迎使用翼宏惠商户端</h3>
			
		</view>
		<view class="login-item margin-top-xxl">
			<u-input v-model="userInfo.userName" type="text" placeholder="登录手机号" fontSize="20" color="#181818"
				border="bottom" clearable>
				<u--image :showLoading="true" slot="prefix" src="/static/images/user.png" width="18px"
					height="18px"></u--image>
			</u-input>
		</view>
		<view class="login-item">
			<u-input v-model="userInfo.password" type="password" placeholder="登录密码" fontSize="20" color="#181818"
				border="bottom" clearable>
				<u--image :showLoading="true" slot="prefix" src="/static/images/password.png" width="18px"
					height="18px"></u--image>
			</u-input>
		</view>
		<!-- 	<view class="login-item login-code">
			<u--input v-model="userInfo.verificationCode" placeholder="请输入验证码" prefixIcon="scan" shape="circle"
				border="bottom" clearable prefixIconStyle="font-size: 22px;color: #909399"></u--input>
			<image class="img" @click="getVierificationCode" :src="codeSrc"></image>
		</view> -->
		<view class="flex align-center justify-between margin-top">
			<view class="remember">
				<u-checkbox-group v-model="checkedRemenber" @change="checkboxChange">
					<u-checkbox activeColor="#463bd8" label="记住我" name="记住我"></u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="tips ">
				还没有账号？<text @click="navTo('/pages/register')">立即注册</text>
			</view>
		</view>
		<view class="login-btn">
			<u-button @click="login" :loading="loading" :loadingText="loading?'登录中..':''"
				:customStyle="{'border-radius': '10rpx'}" size="large" type="primary" text="登录">
			</u-button>
		</view>
		<view class="login-mobile">
			<text @click="openWXlogin" style="color: #39b54a;-webkit-text-fill-color: #39b54a;">获取手机号登录</text> <text class="split"></text>
			<text @click="navTo('/packageA/pages/auth/mobile-login')">手机快捷登录</text> <text class="split"></text> <span
				@click="navTo('/packageA/pages/auth/find-password')">忘记密码？</span>
		</view>
		<view class="xieyi text-center">

			<uni-data-checkbox v-model="checked" multiple :localdata="agree" />
			<!-- <text class="text-grey1">登录即代表同意</text> -->
			<text @click="handleStoreAgrement" class="text-orange">《钱宝科技线下收单业务服务合作协议》</text>
			<text @click="handleUserAgrement" class="text-orange">《商户移动应用端商户注册协议》</text>
			<text @click="handlePrivacy" class="text-orange">《隐私保护政策》</text>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<WXLogin ref="WXLogin" :showAccountLogin="false" :closeOnClickOverlay="true"></WXLogin>
		<!-- #endif -->
			
	</view>
</template>

<script>
	import WXLogin from '@/components/wxLogin/index.vue'
	import {
		getVierificationCode,
		login
	} from '@/api/login.js'
	// import regionData from '@/components/wangding-pickerAddress/region_data.js';
	export default {
		data() {
			return {
				loading: false,
				codeSrc: "",
				userInfo: {

					userName: "", //15959224513 
					password: "", //888888 
					UUID: "",
					verificationCode: ""
				},
				icons: [],
				checked: [],
				checkedRemenber: [],
				agree: [{
					text: "我已阅读并同意",
					value: 0,
				}, ],
				windowHeight: 0,
				tabbar: true
			}
		},
		components: {
			WXLogin
		},
		methods: {
			login() {
				// uni.switchTab({
				// 	url: "/pages/home/home"
				// })
				// return;
				if (!this.checked.length) {
					this.$toast("请先勾选用户协议!");
					return;
				}
				if (this.base.isEmpty(this.userInfo.userName))
					return this.$toast("请输入用户名");
				if (this.base.isEmpty(this.userInfo.password))
					return this.$toast("请输入密码");
				// if (this.base.isEmpty(this.userInfo.verificationCode))
				// 	return this.$toast("请输入验证码");
				this.userInfo.userName = this.userInfo.userName.trim();
				this.userInfo.password = this.userInfo.password.trim();
				this.userInfo.verificationCode = this.userInfo.verificationCode.trim();
				this.loading = true;
				login({
					fid: this.globalConfig.api.fid,
					fkey: this.globalConfig.api.fkey,
					apiname: 'ysh.login',
					uesid: this.userInfo.userName,
					uespwd: this.userInfo.password,
				}).then((result) => {
					if (result.code != '00') {
						this.loading = false;
						// this.getVierificationCode();
						return this.$toast(result.msg);
					}
					if (this.checkedRemenber.length > 0) {
						uni.setStorageSync('userName', this.userInfo.userName)
						uni.setStorageSync('password', this.userInfo.password)
					}
					this.loading = false;
					this.$toast("登录成功,正在跳转!");
					// this.$store.commit("SET_USERINFO", result.data);
					this.$store.commit("SET_TOKEN", result.token);

					uni.reLaunch({
						url: "/pages/home/home"
					})
				});

			},
			openWXlogin() {
				this.$refs.WXLogin.open()
			},
			getVierificationCode() {
				getVierificationCode().then(x => {
					this.codeSrc = "data:image/png;base64," + x.img;
					this.userInfo.UUID = x.uuid;
				});

			},
			handlePrivacy() {
				let site = this.globalConfig.appInfo.agreements[2];
				console.log(site)
				// let site = {
				// 	name: '人脸识别', 
				// 	url:'https://face.eval.pw/demo/html-demo/index.html?token=711b37e6a3118edad0cd414d40869b40'
				// }
				this.$tab.navigateTo(
					`/pages/common/webview/index?title=${site.title}&url=${site.url}`
				);
			},
			// 用户协议
			handleUserAgrement() {
				let site = this.globalConfig.appInfo.agreements[1];
				this.$tab.navigateTo(
					`/pages/common/webview/index?title=${site.title}&url=${site.url}`
				);
			},
			handleStoreAgrement() {
				let site = this.globalConfig.appInfo.agreements[0];
				this.$tab.navigateTo(
					`/pages/common/webview/index?title=${site.title}&url=${site.url}`
				);
			},
			wechatLogin() {},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			checkboxChange(n) {
				console.log('change', n);
				// if (n.length > 0) {
				// 	uni.setStorageSync('userName', this.userInfo.userName)
				// 	uni.setStorageSync('password', this.userInfo.password)
				// }
			},
		},
		onShow() {
			let _userName = uni.getStorageSync('userName')
			let _password = uni.getStorageSync('password')
			console.log(_userName, _password)
			if (_userName) {
				this.userInfo.userName = _userName
				this.checkedRemenber = ['记住我']
			}
			if (_password) {
				this.userInfo.password = _password
				this.checkedRemenber = ['记住我']
			}
			// uni.getSystemInfo({
			// 	success: (res) => {
			// 		this.windowHeight = res.windowHeight;
			// 	}
			// });
			// uni.onWindowResize((res) => {
			// 	if (res.size.windowHeight < this.windowHeight) {
			// 		this.tabbar = false
			// 	} else {
			// 		this.tabbar = true
			// 	}
			// })
		},
		onLoad() {
			// console.log(uni.$u.timeFormat('2024-04-28T06:00:01.848Z', 'yyyy-mm-dd hh:MM:ss'))
			// for(var i = 0; i < regionData.length; i++) {
			// 	regionData[i].provinceCode = regionData[i].provinceCode + '0'
				
			// 	let city = regionData[i].children;
			// 	if(city.length > 0) {
				
			// 		for(var j = 0; j < city.length; j++) {
					
			// 			city[j].code = city[j].code + '00'
			// 			let county = city[j].children;
			// 			if(county.length > 0) {
						
			// 				for(var x = 0; x < county.length; x++) {
							
			// 					county[x].code = county[x].code 
								
			// 				}
			// 			}
			// 		}
			// 	}
			// }
			// regionData.map((item) => {
			// 	for (let key in item) {
			// 		item['provinceCode'] = item['code']
			// 		delete  item['code'];
			// 		item['provinceName'] = item['name']
			// 		delete  item['name'];
			// 		item['city'] = item['children']
			// 		delete  item['children'];
			// 		let city = item.city;
			// 		city.map((citys) => {
			// 			for (let key2 in citys) {
			// 				citys['cityCode'] = citys['code']
			// 					delete  citys['code'];
			// 				citys['cityName'] = citys['name']
			// 					delete  citys['name'];
			// 				citys['county'] = citys['children']
			// 					delete  citys['children'];
			// 				let county = citys.county;
			// 				county.map((countys) => {
			// 					for (let key3 in countys) {
			// 						countys['countyCode'] = countys['code']
			// 						delete  countys['code'];
			// 						countys['countyName'] = countys['name']
			// 						delete  countys['name'];
									
			// 					}
			// 				})
							
			// 			}
			// 		})
					
			// 	}
			// })
			
			setTimeout(() => {
				console.log(regionData)
			}, 10000)
		}
	}
</script>
<style lang="scss" scoped>
	.login-container {
		height: auto;

		.login-top {
			padding-top: 10%;
		}

		.login-logo {
			width: 172rpx;
			height: 172rpx;
			margin: 0 auto;
			position: relative;
			display: block;
			// img {
			//     position: absolute;
			//     width: 100%;
			//     height: 100%;
			//     top: 50%;
			//     left: 50%;
			//     transform: translate(-50%, -50%);
			//     object-fit: contain;
			// }
		}

		.login-title {
			font-size: 31rpx;
			color: #2e2e2e;
			text-align: center;
			font-weight: bold;
			margin-top: 71rpx;
		}

		// .login-title {
		// 	text-align: center;
		// 	font-size: 70rpx;
		// 	line-height: 85rpx;
		// 	color: #303030;
		// 	margin-bottom: 26rpx;
		// 	padding-top: 200rpx;
		// }

		.login-sub-title {
			padding-left: 20rpx;
			font-size: 70rpx;
			text-align: center;
			color: #463bd8;
			line-height: 85rpx;
			font-family: 'AlibabaPuHuiTiM';
			margin-bottom: 100rpx;
		}

		padding: 80rpx 60rpx 0 60rpx;

		.login-item {

			// padding: 12rpx 0;
			// border-bottom: 1px solid #eee;
			// margin-bottom: 20rpx;
			/deep/ .u-input__content__prefix-icon {
				margin-right: 18rpx;
			}

			/deep/ .u-icon {
				// width: 80rpx;
			}

			/deep/ .u-input {
				font-size: 36rpx !important;
				padding: 45rpx 18rpx !important;
			}

			/deep/ .input-placeholder {
				font-size: 36rpx;
				color: #C7CBD2;
			}
		}

		.tips {
			// margin-top: 36rpx;
			color: #181818;
			font-size: 27rpx;

			text {
				background: linear-gradient(0deg, #9A37EE 0%, #413BE0 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}

		.login-code {
			border-bottom: none;
			display: flex;

			.img {
				width: 120rpx;
				height: 54rpx;
			}
		}

		.login-btn {
			padding-top: 69rpx;

			.u-button--primary {
				background: linear-gradient(-90deg, #413BD7, #943EE6);
				border-radius: 44rpx !important;
				color: #FFFFFF;
				font-size: 36rpx !important;
				border: 0 !important;
				font-family: 'AlibabaPuHuiTiM';
			}

			margin: 50rpx 0 50rpx 0;
		}

		.login-mobile {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #181818;
			font-size: 27rpx;

			.split {
				width: 1rpx;
				height: 20rpx;
				background: #C7CBD2;
				margin: 0 22rpx;
			}

			text {
				background: linear-gradient(0deg, #9A37EE 0%, #413BE0 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}
	}

	.login-other {
		display: flex;

		.login-other-item {
			flex: 1;
			margin: 0 25rpx;
		}

		.img {
			width: 50px;
			height: 50px;
			margin: 0 30rpx;
		}

		.img:first-child {
			margin-left: 0;
		}
	}

	.login-read {
		// position: fixed;
		// bottom: 5%;
		// width: 100%;
		// left: 0;
		padding-top: 210rpx;
		padding-bottom: 100rpx;

		.check {
			justify-content: center;
		}
	}

	.customcb {
		width: 34rpx;
		height: 34rpx;
		background: transparent;
		border-radius: 50%;
		position: relative;
		border: solid 2rpx #b7b7b7;
	}

	.customcb label.inner {
		display: block;
		width: 22rpx;
		height: 22rpx;
		border-radius: 50%;
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
		cursor: pointer;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		background: #fff;
	}

	.check .outer {
		// margin-left: 35rpx;
		line-height: 2;
		color: #666665;
	}

	.customcb [type=checkbox] {
		display: none
	}

	.red.customcb input[type=checkbox]:checked+label.inner {
		background: #463bd8
	}

	.active {
		font-size: 27rpx;
		color: #463bd8 !important;
	}

	.xieyi {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		margin-top: 97rpx;
		// position: fixed;
		// width: 100%;
		// left: 0;
		// bottom: 30rpx;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box {
		margin-right: 0px;
	}

	/deep/ .uni-data-checklist {
		flex: none;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box .checkbox__inner {
		border-radius: 50%;
		width: 16px;
		height: 16px;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checkbox__inner {
		background-color: #fff;
		border-color: #463bd8;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checkbox__inner .checkbox__inner-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: #463bd8;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		width: 10px;
		height: 10px;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box .checklist-content .checklist-text {
		color: #9A9FAF;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checklist-text[data-v-84d5d996] {
		color: #333;

	}
</style>