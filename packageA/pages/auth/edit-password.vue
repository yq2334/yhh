<template>
	<view class="register">
		<u-navbar  :fixed="true" bgColor="#fff" title="修改密码" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636"  leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view class="register-form common-content">
			<u--form :model="form" ref="form">
				<u-form-item prop="oldpwd" class="input-item margin-bottom-m">
					<u-input :type="show.oldpwd ? 'text' : 'password'  " v-model="form.oldpwd" border="none"
						fontSize="20" color="#181818" shape="circle" placeholder="请输入旧密码">
						<view class="" slot="suffix">
							<u--image v-if="show.oldpwd" @click="show.oldpwd = false" class="opne-eyes" mode="aspectFit"
								:showLoading="true" src="/static/images/show-icon.png" width="22px"
								height="22px"></u--image>

							<u--image v-else @click="show.oldpwd = true" class="close-eyes" mode="aspectFit"
								:showLoading="true" src="/static/images/hide-icon.png" width="22px"
								height="22px"></u--image>
						</view>

					</u-input>
				</u-form-item>
				<u-form-item  prop="newpwd" class="input-item margin-bottom-m">
					<u-input :type="show.newpwd ? 'text' : 'password'  " v-model="form.newpwd" border="none"
						fontSize="20" color="#181818" shape="circle" placeholder="请确认新密码">
						<view class="" slot="suffix">
							<u--image v-if="show.newpwd" @click="show.newpwd = false" class="opne-eyes" mode="aspectFit"
								:showLoading="true" src="/static/images/show-icon.png" width="22px"
								height="22px"></u--image>
				
							<u--image v-else @click="show.newpwd = true" class="close-eyes" mode="aspectFit"
								:showLoading="true" src="/static/images/hide-icon.png" width="22px"
								height="22px"></u--image>
				
						</view>
				
					</u-input>
				</u-form-item>
				<u-form-item  prop="confirmPwd" class="input-item margin-bottom-m">
					<u-input :type="show.confirmPwd ? 'text' : 'password'  " v-model="form.confirmPwd" border="none"
						fontSize="20" color="#181818" shape="circle" placeholder="请输入新密码">
						<view class="" slot="suffix">
							<u--image v-if="show.confirmPwd" @click="show.confirmPwd = false" class="opne-eyes"
								mode="aspectFit" :showLoading="true" src="/static/images/show-icon.png" width="22px"
								height="22px"></u--image>

							<u--image v-else @click="show.confirmPwd = true" class="close-eyes" mode="aspectFit"
								:showLoading="true" src="/static/images/hide-icon.png" width="22px"
								height="22px"></u--image>

						</view>

					</u-input>
				</u-form-item>
				
			</u--form>

			<view class="action-btn">
				<u-button @click="submit" :loading="loading" :loadingText="loading?'设置中..':''"
					:customStyle="{'border-radius': '10rpx'}" size="large" type="primary" text="设置新密码">
				</u-button>
			</view>
		</view>

	</view>

</template>

<script>
	import {
		setPwd
	} from '@/api/login.js'
	export default {
		data() {
			return {
				form: {
					oldpwd: '',
					newpwd: '',
					confirmPwd: ''
				},
				rules: {
					"oldpwd": [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}],
					"newpwd": [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}],
					"confirmPwd": [{
							required: true,
							message: '请确认密码',
							trigger: ['blur']
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return this.form.newpwd == value;
							},
							message: '请确认密码正确',
							// 触发器可以同时用blur和change
							trigger: ['blur','change'],
						}
					],

				},
				checked: [0],
				disabled1: false,
				tips: "获取验证码",
				show: {
					oldpwd: false,
					newpwd: false,
					confirmPwd: false
				},
				loading: false,
				agree: [{
					text: "我已阅读并同意",
					value: 0,
				}, ],
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: "正在获取验证码",
					});
					uni.$u.toast("验证码已发送");
					// sendCode({
					//   phone: this.loginForm.phone,
					// }).then((res) => {
					//   const { code, data } = res;
					//   if (code == 200) {
					//     uni.hideLoading();
					//     // 这里此提示会被this.start()方法中的提示覆盖
					//     uni.$u.toast("验证码已发送");
					//     // 通知验证码组件内部开始倒计时
					//     this.$refs.uCode.start();
					//   }
					// });
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
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					// uni.$u.toast('校验通过')
					this.loading = true
					setPwd(this.form).then((res) => {
						uni.showToast({
							title: '修改成功',
							icon: 'success'
						})
						this.reset()
						this.loading = false
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			reset() {
				const validateList = ['oldpwd', 'newpwd']
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
			font-size: 48rpx;
			padding-top: 250rpx;
			line-height: 1;
		}

		&-sub-title {
			font-size: 24rpx;
			opacity: 0.7;
			padding-top: 30rpx;
			line-height: 1;
		}

		&-form {
			width: 568rpx;
			margin: 106rpx auto 0 auto;

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
			/deep/ .u-form-item__body__right__message{
				margin-left: 20rpx !important;
			}
		}

		.xieyi {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			margin-bottom: 47rpx;
		}
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