<template>
	<view>
		<u-navbar leftText="实名认证" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<view class="common-content">


			<view class="register ">
				<!-- <view class="register-step">
				<view class="step active">
					<span class="round">1</span>
					<span>身份资料</span>
				</view>
				<view class="step active">
					<span class="round">2</span>
					<span>收款资料</span>
				</view>
			</view> -->
				
				<view class="pannel">
					<view class="pannel-body">
						<view class="upload">
							<!-- <view id="upload_front" class="uploadImg">
							<image id="uploadImg_front" src="/static/images/store/back.png" mode=""></image>
						</view> -->
							<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="6" multiple
								:maxCount="1" width="250" height="150">
								<image src="/packageA/static/images/store/card.png" mode="widthFix"
									style="width: 483rpx;height: 304rpx;margin: 0 auto;display: block;"></image>
							</u-upload>
							<span class="example">示例</span>

						</view>
						<p class="pannel-title text-center">上传本人银行卡（储蓄卡卡号面）照片</p>
						<!-- <p class="upload-name">上传 <span class="active">{{form.bankname}}</span>  的银行卡储蓄卡正面照片</p> -->
					</view>
				</view>
				<view class="pannel">
					<u--form :model="form" ref="form" labelPosition="left" labelWidth="80" :borderBottom="true">
						<u-form-item label="开户行" prop="banktype" class="input-item" :borderBottom="true">
							<u--input v-model="form.banktype" type="text" fontSize="14" placeholder="请输入开户行"
								color="#333333" border="none">
							</u--input>
						</u-form-item>
						<u-form-item label="开户姓名" prop="bankname" class="input-item" :borderBottom="true">
							<u--input v-model="form.bankname" type="text" fontSize="14" placeholder="请输入开户姓名"
								color="#333333" border="none">
							</u--input>
						</u-form-item>
						<u-form-item label="开户账号" prop="banknum" class="input-item" :borderBottom="true">
							<u--input v-model="form.banknum" type="number" fontSize="14" placeholder="请填写开户账号" 
								color="#333333" border="none">
							</u--input>
						</u-form-item>
						<!-- <u-form-item label="开户银行" prop="bank" borderBottom @click="showBank = true; hideKeyboard()"
						ref="item1">
						<u--input v-model="form.bank" disabled disabledColor="#ffffff"  placeholder="请选择地区"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
						<u-picker :show="showBank" :columns="bankList" keyName="name" title="请选择银行网店" @close="showBank = false" @cancel="showBank = false" @confirm="bankSelect" ></u-picker>
						
					</u-form-item> -->
						<picker-address @change="change">
							<u-form-item label="开户省市" prop="city" borderBottom @click="showCity = true; hideKeyboard()" 
								ref="item1">
								<!-- 	<u--input v-model="provinceca" readonly disabledColor="#ffffff" placeholder="请选择地区"
									border="none"></u--input> -->
								<view class="placeholder" :class="provinceca && 'selected'">
									{{provinceca ?   provinceca : '请选择地区'}}
								</view>
								<u-icon slot="right" name="arrow-right"></u-icon>
							</u-form-item>
						</picker-address>

						<u-form-item label="支行名称" prop="ZhName" borderBottom @click="showBank = true; hideKeyboard()"
							ref="item1">
							<!-- <u--input v-model="form.ZhName" disabled disabledColor="#ffffff" placeholder="请选择地区"
								border="none"></u--input> -->
							<view class="placeholder" :class="form.ZhName && 'selected'">
								{{form.ZhName ?   form.ZhName : '请选择支行'}}
							</view>
							<u-icon slot="right" name="arrow-right"></u-icon>

						</u-form-item>
						<u-picker :show="showBank" :columns="bankList" keyName="ZhName" title="请选择银行网店"
							@close="showBank = false" @cancel="showBank = false" @confirm="bankSelect"></u-picker>

					
						<u-form-item label="绑定手机号" prop="bankmobile" borderBottom>
							<u--input v-model="form.bankmobile" type="number" disabledColor="#ffffff"
								placeholder="请填写绑定手机号" border="none"></u--input>
						</u-form-item>
					<!-- 	<u-form-item label="验证码" prop="yzcode" class="input-item " labelWidth="80">
							<u-input v-model="form.yzcode" type="number" placeholder="请输入验证码" fontSize="14"
								color="#333333" border="none">
								<view class="" slot="suffix">
									<u-button @tap="getCode" :text="tips" type="text" size="mid" shape="circle"
										:disabled="disabled1"></u-button>
								</view>
							</u-input>
							<u-code ref="uCode" @change="codeChange" seconds="60" @start="disabled1 = true"
								@end="disabled1 = false"></u-code>
						</u-form-item> -->

					</u--form>

				</view>

				<view class="action-btn padding-lr-xl ">

					<u-button @click="submit" :customStyle="{'border-radius': '10rpx'}" size="large" type="primary"
						text="提交">
					</u-button>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBnakIdInfo,
		ruWang_Four,
		getFaceUrl,
		getRenLianResult,
		getbank_zh
	} from '@/api/system/user.js'
	import {
		getVerifyCode
	} from '@/api/login.js'
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue'
	import {
		getToken
	} from '@/utils/auth';
	export default {
		data() {
			return {
				form: {
					bankimg: '',
					banknum: '',
					bankname: '',
					banktype: '',
					bankmobile: '',
					orderno: '',
					// yzcode: '',
					bankzh: '',
					ZhName: '',
					bankprovince: '',
					bankcity: '',
					bankarea: '',

				},
				rwtype: '',
				showBank: false,
				provinceca: '',
				provincecode: '',
				citycode: '',
				bankList: [],
				disabled1: false,
				tips: "获取验证码",
				imgBase64URL: '',
				fileList: [],
				imgUp: '',
				showCity: false,
				rules: {

					"banknum": [{
						required: true,
						message: '请输入开户账号',
						trigger: ['blur', 'change']
					}],
					"bankname": [{
						required: true,
						message: '请输入开户姓名',
						trigger: ['blur', 'change']
					}],
					"banktype": [{
						required: true,
						message: '请输入银行名称',
						trigger: ['blur', 'change']
					}],
					"bankmobile": [{
							required: true,
							message: '请输入绑定手机号',
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
							trigger: ['blur', 'change'],
						}
					],
					// "yzcode": [{
					// 	required: true,
					// 	message: '请输入验证码',
					// 	trigger: ['blur', 'change']
					// }],
				},
				Timer: null,
				token_rl: ''
			};
		},
		components: {
			pickerAddress
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		onLoad(options) {


			this.form.orderno = options.orderno
			this.rwtype = options.rwtype
			console.log(this.form)
		},
		onHide() {
			// clearInterval(this.Timer)
			// window.clearInterval()
		},
		onShow() {
			// if (this.token_rl) {
			// 	this.getIdentifyStatus(this.token_rl)
			// }
		},
		methods: {
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					getVerifyCode({
						mobile: this.form.bankmobile,
						type: 'rw2'
					}).then((res) => {

						if (res.code == '00') {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							uni.$u.toast("验证码已发送");

							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						} else {
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
			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1)

			},
			// 新增图片
			async afterRead(event) {
				console.log(event)
				this.fileList.push({
					...event.file[0],
					status: 'success',
					message: ''
				})
				this.imgBase64URL = await this.ploadFilePromise(event.file[0].url)
				console.log(this.imgBase64URL)
				this.getCardInfoData()
				// const result = await this.uploadFilePromise(event.file[0].url)

			},
			getCardInfoData() {
				getBnakIdInfo({
					basecode: this.imgBase64URL,
					orderno: this.form.orderno
				}).then((res) => {
					if (res.code == '00') {

						this.form = Object.assign(this.form, res)
					}
				})
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			ploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					// #ifdef MP-WEIXIN
					uni.getFileSystemManager().readFile({
						filePath: url, //选择图片返回的相对路径
						encoding: 'base64', //编码格式
						success: res => { //成功的回调
							let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
							resolve(base64)
							// this.imgBase64URL = base64
						},
						fail: (e) => {
							console.log("图片转换失败");
						}
					})
					// #endif
					// #ifdef H5
					uni.request({
						url: url,
						method: 'GET',
						responseType: 'arraybuffer',
						success: ress => {
							let base64 = uni.arrayBufferToBase64(ress.data); //把arraybuffer转成base64
							base64 = 'data:image/jpeg;base64,' + base64;
							resolve(base64)
							// this.imgBase64URL = base64
							// console.log(this.imgBase64URL)
						},
						fail: (e) => {
							console.log("图片转换失败");
						}
					})
					// #endif
					// #ifdef APP-PLUS
					plus.io.resolveLocalFileSystemURL(url, (entry) => {
						// 可通过entry对象操作test.html文件 
						entry.file((file) => {
							let fileReader = new plus.io.FileReader();
							fileReader.onloadend = (evt) => {
								const base64 = evt.target.result.substr(22);
								resolve(base64)
								// this.imgBase64URL = base64
								// console.log(this.imgBase64URL)
							}
							fileReader.readAsDataURL(file);

						});
					}, (e) => {
						alert("Resolve file URL failed: " + e.message);
					});
					// #endif
				})
			},
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			change(data) {
				// this.form.city = data.data.join('')
				this.provinceca = data.data.join('')
				this.form.bankprovince = data.code[0]
				this.form.bankcity = data.code[1]
				this.form.bankarea = data.code[2]
				console.log(data)
				this.getZhihang()
			},
			getZhihang() {
				this.bankList = [];
				getbank_zh({
					bankname: this.form.banktype,
					province: this.form.bankprovince,
					city: this.form.bankcity
				}).then((res) => {
					this.bankList.push(res.zhlist)
				})
			},
			selectStartTime(e) {
				console.log(uni.$u.timeFormat(e.value, 'yyyy-mm-dd'))
				// this.startTime = e.value
				// this.startTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				// this.showStartTime = false

			},
			selectEndTime(e) {
				console.log(e.value)
				// this.date2 = e.value
				// this.endTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				// this.showEndTime = false
			},
			bankSelect(e) {
				console.log(e)
				this.form.ZhName = e.value[0].ZhName;
				this.form.bankzh = e.value[0].ZhCode

				this.showBank = false
			},

			submit() {
				// let url = 'https://jlsh.globebill.com/face/index.html?token_rl=08f7f31eb1f7e51e0f8174ec8d5bf155&token=9hdQiLq4doJBT7zKjfiyDniCre6bidcX234szz8H963+gqIkyMl+IXOYY15oKmdC&platform=WEIXIN'
				// this.$tab.navigateTo(
				// 	`/packageA/pages/indentify/face-webview?url=${encodeURIComponent(url)}&token_rl=08f7f31eb1f7e51e0f8174ec8d5bf155&orderno=${this.form.orderno}`
				// );
				// return;
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					ruWang_Four(this.form).then((res) => {
						if (res.code == '00') {
							// this.$tab.navigateTo('/pages/indentify/identify-face?orderno='+res.orderno)
							// this.$tab.navigateTo('/pages/indentify/identify-success')
							// if(this.rwtype == 'geti') {
							// 	this.$tab.navigateTo('/packageA/pages/indentify/identify-success?orderno=' + this.form.orderno + '&rwtype=' + this.rwtype)
							// 	return;
							// }
							this.getUrl(res.orderno)
						} else {
							uni.$u.toast(res.msg)
						}
					})
					// this.$tab.navigateTo('/pages/indentify/indentify-step-2?info='+JSON.stringify(this.form))
				}).catch(errors => {
					// uni.$u.toast('校验失败')
				})
			},
			getUrl(orderno) {
				getFaceUrl({
					orderno: orderno
				}).then((res) => {
					// console(JSON.stringify(res))
					// this.getOpenUrl(res)
					if (res.code == '00') {
						this.navToWebview(res)
					}

				})
			},
			getOpenUrl(res) {
				console.log(res.faceurl.split('?token_rl=')[1])
				let token = res.faceurl.split('?token_rl=')[1]
				this.token_rl = token;
				// #ifdef APP-PLUS									
				if (plus.os.name == 'Android') {
					let url = res.faceurl + '&token=' +
						getToken() + '&platform=Android'
					// let url = 'https://face.eval.pw/?token_rl=' + token + '&token=' +
					// 	getToken() + '&platform=Android'
					this.openLink(url)
				} else {
					let url = res.faceurl + '&token=' +
						getToken() + '&platform=ios'
					// let url = 'https://face.eval.pw/?token_rl=' + token + '&token=' + getToken() +
					// 	'&platform=ios'
					this.openLink(url)
				}
				// #endif
				// #ifdef H5
				let url = res.faceurl + '&token=' +
					getToken() + '&platform=H5'
				this.openLink(url)
				// #endif
			},
			navToWebview(res) {
				console.log(res.faceurl.split('?token_rl=')[1])
				let token = res.faceurl.split('?token_rl=')[1]
				this.token_rl = token;
				// #ifdef APP-PLUS									
				if (plus.os.name == 'Android') {
					let url = res.faceurl + '&token=' +
						getToken() + '&platform=Android'
					// let url = 'https://face.eval.pw/?token_rl=' + token + '&token=' +
					// 	getToken() + '&platform=Android'
					this.$tab.navigateTo(
						`/packageA/pages/indentify/face-webview?url=${url}&token_rl=${token}&orderno=${this.form.orderno}&rwtype=${this.rwtype}`
					);
				} else {
					let url = res.faceurl + '&token=' +
						getToken() + '&platform=ios'
					// let url = 'https://face.eval.pw/?token_rl=' + token + '&token=' + getToken() +
					// 	'&platform=ios'
					this.$tab.navigateTo(
						`/packageA/pages/indentify/face-webview?url=${url}&token_rl=${token}&orderno=${this.form.orderno}&rwtype=${this.rwtype}`
					);
				}
				// #endif
				// #ifdef H5 
				let url = res.faceurl + '&token=' +
					getToken() + '&platform=H5'
				this.$tab.navigateTo(
					`/packageA/pages/indentify/face-webview?url=${url}&token_rl=${token}&orderno=${this.form.orderno}&rwtype=${this.rwtype}`
				);
				// #endif
				// #ifdef MP-WEIXIN
				let _url = res.faceurl + '&token=' +
					getToken() + '&platform=WEIXIN'
				this.$tab.navigateTo(
					`/packageA/pages/indentify/face-webview?url=${encodeURIComponent(_url)}&token_rl=${token}&orderno=${this.form.orderno}&rwtype=${this.rwtype}`
				);
				// #endif
			},
			getIdentifyStatus(token_rl) {
				getRenLianResult({
					token_rl: token_rl,
					orderno: this.form.orderno
				}).then((res) => {
					console.log(res)
					if (res.code == '00') {
						uni.showModal({
							title: '提示',
							content: '人脸识别成功',
							showCancel: false,
							success: (event) => {
								this.$tab.navigateTo(
									'/packageA/pages/indentify/identify-success?orderno=' + this
									.form.orderno  + '&rwtype=' + this.rwtype)
							}
						})
					} else if (res.faceurl) {
						uni.showModal({
							title: '提示',
							content: '人脸识别失败，请重试',
							cancelText: '取消',
							confirmText: '确定',
							success: (event) => {
								if (event.confirm) {
									this.getOpenUrl(res)
								} else if (event.cancel) {
									console.log('用户点击取消');
								}

							}
						})
						// clearInterval(this.Timer)
					}
				})
			},
			openLink(href) {
				// #ifdef APP-PLUS
				plus.runtime.openURL(href)
				// #endif
				// #ifdef H5
				window.open(href)
				// #endif
			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FAFAFB;
	}

	.register {
		padding-bottom: 100rpx;

		&-step {
			padding: 0 67rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			position: relative;
			padding-bottom: 40rpx;
			padding-top: 29rpx;

			.step {
				span {
					display: block;
					text-align: center;
					color: #999999;
					font-size: 25rpx;
				}

				.round {
					border-radius: 50%;
					width: 52rpx;
					height: 52rpx;
					background-color: #d8d8d8;
					text-align: center;
					line-height: 52rpx;
					margin: 0 auto 28rpx auto;
				}
			}

			.active {
				span {
					color: #473bd9;
				}

				.round {

					background: linear-gradient(-39deg, #413BD7, #943EE6);
					color: #fff;
				}
			}

			&::after {
				position: absolute;
				content: '';
				width: 409rpx;
				height: 1px;
				background-color: #d8d8d8;
				top: 54rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.pannel-title {
			color: #999999;
			font-size: 25rpx;
			padding: 12rpx 50rpx 0 50rpx;
		}

		.pannel {
			padding: 12rpx 39rpx 0 39rpx;
			background-color: #fff;
			// margin-top: 35rpx;
		}

		.flex {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		.upload {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			background-color: rgba($color: #000000, $alpha: 0.22);
			border-radius: 33rpx;
			padding: 17rpx 0 20rpx 0;
			position: relative;

			&-name {
				color: #010101;
				font-size: 28rpx;
				padding-top: 48rpx;
				text-align: center;
				padding-bottom: 12rpx;
			}
		}

		.example {
			position: absolute;
			top: 24rpx;
			right: 28rpx;
			color: #fff;
			font-size: 28rpx;
		}

		.uploadImg {
			width: 483rpx;
			height: 304rpx;
		}

		.uploadImg image {
			object-fit: cover;
			width: 100%;
			height: 100%;
			display: block;
			margin: 0 auto;
		}

		.tips {
			font-size: 27rpx;
			color: #999999;
			padding-top: 48rpx;

		}

		.action-btn {
			margin-top: 20rpx;
		}

		.u-form {
			// margin-top: 40rpx;



			/deep/ .u-line {
				border-bottom: 2px solid #F7F7F7 !important;

			}

			/deep/ .u-form-item__body__right__content__slot {
				justify-content: flex-end;
			}

			/deep/ .u-input__content__field-wrapper__field {
				// text-align: right !important;
			}

			/deep/ .u-form-item__body__right__message {
				text-align: right;
				margin-left: 0 !important
			}

			/deep/ .u-form-item__body {
				padding: 30rpx 0;
			}

			/deep/ .u-form-item__body__left__content {
				padding-left: 0;
			}

			/deep/ .u-form-item__body__left__content__label {
				color: #333333;
				font-size: 28rpx;
				line-height: 30rpx;
			}

			/deep/ .u-form-item__body__left__content__required {
				font-size: 28rpx;
				color: #ED7F43;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}

			.placeholder {
				color: rgb(192, 196, 204);
				font-size: 28rpx;
			}

			.selected {
				color: rgb(51, 51, 51);
			}

			/deep/ .uni-select {
				margin-top: 20rpx;
				border: 0;

				// border-bottom: 1rpx solid rgba(255, 255, 255, 0.2) !important;
			}

			/deep/ .u-button--text .u-button__text {
				background: linear-gradient(-90deg, #413BD7, #943EE6);
				border-radius: 44rpx;
				color: #FFFFFF;
				padding: 20rpx 18rpx;
				border: 0;
				font-size: 28rpx;
				font-family: 'AlibabaPuHuiTiR';
			}

			/deep/ .uni-select__input-placeholder {
				color: #EFEFEF;
				font-size: 28rpx;
			}

			/deep/ .uni-input-placeholder {
				overflow: auto;
				text-overflow: initial;
				white-space: initial;
				word-break: break-all;
			}

			/deep/ .input-h .u-input__content__field-wrapper__field {
				height: 88rpx;
			}

			/deep/ .u-radio__icon-wrap {}

			.selectDate {
				.place {
					font-size: 28rpx;
					color: #999999;
				}
			}
		}
	}

	.gap {
		height: 27rpx;
		background-color: #FAFAFB;
		margin-left: -39rpx;
		width: 750rpx;
	}

	/deep/ .u-upload {
		align-items: center;
		justify-content: center;
	}
</style>

<style lang="scss">
	/deep/ .u-button--text .u-button__text {
		background: linear-gradient(-90deg, #413BD7, #943EE6);
		border-radius: 44rpx;
		color: #FFFFFF;
		padding: 20rpx 18rpx;
		border: 0;
		font-size: 28rpx;
		font-family: 'AlibabaPuHuiTiR';
	}
</style>