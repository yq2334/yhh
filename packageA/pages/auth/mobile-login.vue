<template>
	<view class="register">
		<u-navbar  :fixed="true" bgColor="#fff"  :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636"  leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
	<!-- 	<view class="register-title text-black-1  text-center">
			欢迎使用
		</view>
		<view class="register-sub-title text-orange text-M text-center">
			翼宏惠
		</view> -->
		<view class="login-top">
			<image class="login-logo" src="/static/logo.png" alt=""></image>
			<!-- <h3 class="login-title">欢迎使用翼宏惠商户端</h3> -->
		</view>
		<view class="register-form">
			<u--form :model="form" ref="form">
				
				<u-form-item  prop="mobile" class="input-item margin-bottom-m">
					<u--input v-model="form.mobile" type="number"  placeholder="请输入手机号" fontSize="20" color="#181818" shape="circle"
						border="none" clearable>
					</u--input>
				</u-form-item>
				<u-form-item  prop="validate" class="input-item margin-bottom-m">
					<u-input v-model="form.validate" type="number" placeholder="请输入验证码" fontSize="20" color="#181818" shape="circle"
						border="none" clearable>
						<view class="" slot="suffix">
							<u-button @tap="getCode" :text="tips" type="text" size="mid" shape="circle"
								:disabled="disabled1"></u-button>
						</view>
					</u-input>
				</u-form-item>
			

			</u--form>
		
			<view class="action-btn">
			
				<u-button   @click="submit" :loading="loading" :loadingText="loading?'登录中..':''"
					:customStyle="{'border-radius': '10rpx'}" size="large" type="primary" text="登录">
				</u-button>
			</view>
		</view>
		<view class="xieyi text-center" >
		
			<uni-data-checkbox v-model="checked" multiple :localdata="agree" @change="change" />
			<!-- <text class="text-grey1">登录即代表同意</text> -->
			<text @click="handleStoreAgrement" class="text-orange">《钱宝科技线下收单业务服务合作协议》</text>
				<text @click="handleUserAgrement" class="text-orange">《商户移动应用端商户注册协议》</text>
			<text @click="handlePrivacy" class="text-orange">《隐私保护政策》</text>
		</view>
	<u-code ref="uCode" @change="codeChange" seconds="60" @start="disabled1 = true" startText="发送验证码"
		@end="disabled1 = false"></u-code>
	</view>

</template>

<script>
	import {getVerifyCode, mobileLogin} from '@/api/login.js';
	export default {
		data() {
			return {
				form: {
				
					mobile: '',
					password: '',
					validate: ''
				},
				rules: {
					
					"mobile": [{
						required: true,
						message: '请输入手机号',
						trigger: ['blur', 'change']
					},
					{
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// uni.$u.test.mobile()就是返回true或者false的
							return uni.$u.test.mobile(value);
						},
						message: '请输入正确的手机号',
						// 触发器可以同时用blur和change
						trigger: ['blur','change'],
					}],
					"password": [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}],
					"validate": [{
						required: true,
						message: '请输入验证码',
						trigger: ['blur', 'change']
					}]
				},
				checked: [],
				disabled1: false,
				tips: "获取验证码",
				show: {
					password: false
				},
				loading: false,
				agree: [{
					text: "我已阅读并同意",
					value: 0,
				}, ],
				windowHeight: 0,
				tabbar: true
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.windowHeight = res.windowHeight;
				}
			});
			uni.onWindowResize((res) => {
				if (res.size.windowHeight < this.windowHeight) {
					this.tabbar = false
				} else {
					this.tabbar = true
				}
			})
		},
		methods: {
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					// uni.showLoading({
					// 	title: "正在获取验证码",
					// });
					// uni.$u.toast("验证码已发送");
					getVerifyCode({
					  mobile: this.form.mobile,
					  type: 'login'
					}).then((res) => {
					
					  if (res.code == '00') {
					    uni.hideLoading();
					    // 这里此提示会被this.start()方法中的提示覆盖
					    uni.$u.toast("验证码已发送");
					    // 通知验证码组件内部开始倒计时
					    this.$refs.uCode.start();
					  }else{
						    uni.$u.toast(res.msg);
					  }
					});
				} else {
					uni.$u.toast("倒计时结束后再发送");
				}
			},
			codeChange(text) {
				console.log(text)
				this.tips = text;
			},
			handlePrivacy() {
				let site = this.globalConfig.appInfo.agreements[0];
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
			submit() {
				if(!this.checked.length) {
					this.$toast("请先勾选用户协议!");
					return;
				}
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					// uni.$u.toast('校验通过')
					mobileLogin({
						uesid: this.form.mobile,
						uescode: this.form.validate,
					}).then((res) => {
						if(res.code == '00') {
							uni.showToast({
								title:'登录成功,正在跳转!',
								icon:'success'
							})
							this.$store.commit("SET_TOKEN", res.token);
							uni.switchTab({
								url: "/pages/home/home"
							})
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			reset() {
				const validateList = ['mobile', 'validate']
				this.$refs.form.resetFields()
				this.$refs.form.clearValidate()
				setTimeout(() => {
					this.$refs.form.clearValidate(validateList)
					// 或者使用 this.$refs.form1.clearValidate()
				}, 10)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.register {
		&-title {
		font-size: 70rpx;
			padding-top: 250rpx;
			line-height: 1;
		}

		&-sub-title {
			font-size: 70rpx;
			
			padding-top: 30rpx;
			line-height: 1;
		}
		.login-top {
			padding-top: 180rpx;
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
		
		&-form {
			width: 568rpx;
			margin: 105rpx auto 0 auto;

			.input-item {
				/deep/ .u-input__content__prefix-icon {
					margin-right: 18rpx;
				}

				/deep/ .u-icon {
					// width: 80rpx;
				}

				/deep/ .u-input {
					height: 85rpx;
					font-size: 36rpx !important;
					padding: 0 47rpx !important;
					background: #EEEFF3;
				}

				/deep/ .input-placeholder {
					font-size: 36rpx;
					color: #C7CBD2;
				}

				/deep/ .u-form-item__body {
					padding: 0;
				}
			}

			/deep/ .u-button--text .u-button__text {
				color: #463bd8;
				font-size: 28rpx;
				font-family: 'AlibabaPuHuiTiR';
			}
		}
		
	}
	.xieyi{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			margin-top: 150rpx;
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

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checklist-text[data-v-84d5d996] {
		color: #9A9FAF;

	}
</style>

<style lang="scss">
	/deep/ .u-input__content__prefix-icon {
		margin-right: 18rpx;
	}
		
	/deep/ .u-icon {
		// width: 80rpx;
	}
		
	/deep/ .u-input { 
		height: 85rpx !important;
		font-size: 36rpx !important;
		padding: 0 47rpx !important;
		background: #EEEFF3 !important;
	}
	/deep/ .u-input__content__field-wrapper__field {
		height: 85rpx !important;
	
	}	
	/deep/ .input-placeholder {
		font-size: 36rpx;
		color: #C7CBD2;
	}
		
	/deep/ .u-form-item__body {
		padding: 0;
	}
</style>