<template>
	<view>
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<view class="pos common-content">
			<view class="tips margin-top-xl padding-left-xl">
				<!-- <text class="text-bold text-black">{{form.rwtype == 'geren' ? '小微商户申请' : '标准商户申请'}}</text> ： -->
				请确认机具号从未绑定过：
			</view>

			<view class="pannel">
				<u--form :model="form" ref="form" labelPosition="left" labelWidth="130" :borderBottom="true">
					<u-form-item label="机具号" prop="sn" class="input-item" labelWidth="80" :borderBottom="true">
						<view class=" flex align-center justify-between" style="flex: auto;">
							<u--input v-model="form.sn" placeholder="扫描机身背后条形码或手输机器号"
								:placeholderStyle="{color: '#999999'}" border="none"></u--input>
							<u--image class="img" @click="scan" :showLoading="true" src="/static/images/store/scan.png"
								width="44rpx" height="54rpx" mode="aspectFit"></u--image>

						</view>

					</u-form-item>
					<u-form-item label="商户类型" prop="typename" class="input-item" :borderBottom="true"
						@click="showTypeList = true; hideKeyboard()" labelWidth="80">
						<u--input v-model="typename" readonly type="text" fontSize="14" placeholder="请选择商户类型"
							:style="{pointerEvents: 'none'}" color="#333333" border="none">
						</u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
						<u-picker :show="showTypeList" :columns="typeList" keyName="label" title="请选择商户类型"
							@close="showTypeList = false" @cancel="showTypeList = false"
							@confirm="typeSelect"></u-picker>

					</u-form-item>
					<u-form-item label="行业名称" prop="mcc" class="input-item" :borderBottom="true"
						@click="showMccList = true; hideKeyboard()" labelWidth="80">
						<u--input v-model="form.mccname" readonly type="text" fontSize="14" placeholder="请选择行业名称"
							:style="{pointerEvents: 'none'}" color="#333333" border="none">
						</u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
						<u-picker :show="showMccList" :columns="mcclist" keyName="mccname" title="请选择商户类型"
							@close="showMccList = false" @cancel="showMccList = false" @confirm="mccSelect"></u-picker>

					</u-form-item>
					<u-form-item label="经营内容" prop="mccExt" borderBottom labelWidth="80"
						@click="showMccExtList = true; hideKeyboard()" ref="item1">
						<u--input v-model="form.mccExtname" readonly disabledColor="#ffffff" placeholder="请选择经营内容"
							:style="{pointerEvents: 'none'}" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
						<u-picker :show="showMccExtList" :columns="mccExtlist" keyName="mccname" title="请选择经营内容"
							@close="showMccExtList = false" @cancel="showMccExtList = false"
							@confirm="mccExtListSelect"></u-picker>
					</u-form-item>
					<u-form-item v-if="form.rwtype == 'geren'" label="商户名称" prop="shname" class="input-item"
						labelWidth="80" :borderBottom="true">
						<u--input v-model="form.shname" type="text" maxlength="20" fontSize="14" placeholder="请输入商户名称"
							color="#333333" border="none">
						</u--input>
					</u-form-item>
					<picker-address @change="change">
						<u-form-item label="装机地区" prop="provinceca" borderBottom labelWidth="80" @click="hideKeyboard()"
							ref="item1">
							<u--input v-model="form.provinceca" readonly disabledColor="#ffffff" placeholder="请选择地区"
								:style="{pointerEvents: 'none'}" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
					</picker-address>
					<u-form-item label="装机地址" prop="posaddress" class="input-item" labelWidth="80" :borderBottom="true">
						<u--input v-model="form.posaddress" type="text" fontSize="14" class="input-h"
							placeholder="请具体填写至街道、楼牌号、小区、单元 门牌号等" color="#333333" border="none">
						</u--input>
					</u-form-item>
					<!-- 	<u-form-item label="联系人" prop="contactus" class="input-item" labelWidth="80" :borderBottom="true">
						<u--input v-model="form.contactus" type="text" fontSize="14" placeholder="请输入商户联系人"
							color="#333333" border="none">
						</u--input>
					</u-form-item>

					<u-form-item label="联系电话" prop="mobile" class="input-item" labelWidth="80" :borderBottom="true">
						<u--input v-model="form.mobile" type="number" maxlength="11" fontSize="14" placeholder="请输入联系电话"
							color="#333333" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="验证码" prop="yzcode" class="input-item " labelWidth="80">
						<u-input v-model="form.yzcode" type="number" placeholder="请输入验证码" fontSize="14" color="#333333"
							border="none">
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
			<view class="action-btn padding-lr-xl margin-top-xl">

				<u-button @click="submit" :customStyle="{'border-radius': '10rpx'}" size="large" type="primary"
					text="下一步">
				</u-button>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		getMcc,
		getMccExt,
		ruWang_One,
		getWx_SaoMa
	} from '@/api/system/user.js'
	import {
		getVerifyCode
	} from '@/api/login.js'
	// #ifdef APP-PLUS
	var mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module")
	// #endif
	// #ifdef H5
	import wx from 'jweixin-module';
	// #endif
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue'

	export default {
		data() {
			return {
				rwtype: '',
				pos: '',
				form: {
					mcc: '',
					mccname: '',
					mccExt: '',
					mccExtname: '',
					sn: '',
					shname: '',
					rwtype: '',
					provinceca: '',
					posprovince: '',
					poscity: '',
					posarea: '',
					posaddress: '',
					// contactus: '',
					// mobile: '',
					// yzcode: ''
				},
				typename: '',
				disabled1: false,
				tips: "获取验证码",
				showBank: false,
				bankList: [
					[{
							name: '长沙支行'
						},
						{
							name: '雨花区支行'
						}
					]
				],
				mcclist: [],
				showMccList: false,
				mccExtlist: [],
				showMccExtList: false,
				showTypeList: false,
				typeList: [
					[{
							label: '无营业执照 小微商户',
							type: 'geren'
						},
						{
							label: '有营业执照 标准商户',
							type: 'geti'
						}
					]
				],
				rules: {

					"mcc": [{
						required: true,
						message: '请选择行业名称',
						trigger: ['blur', 'change']
					}],
					"mccExt": [{
						required: true,
						message: '请选择经营内容',
						trigger: ['blur', 'change']
					}],
					"sn": [{
						required: true,
						message: '请填写机具号',
						trigger: ['blur', 'change']
					}],
					"shname": [
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								var reg = /^[\u4e00-\u9fa5]{2,20}$/;
								return reg.test(value);
							},
							message: '请输入2-20个中文字符',
							// 触发器可以同时用blur和change
							trigger: ['blur', 'change'],
						}
					],
					"provinceca": [{
						required: true,
						message: '请选择省市区',
						trigger: ['blur', 'change']
					}],
					"posaddress": [{
						required: true,
						message: '请输入详细地址',
						trigger: ['blur', 'change']
					}],
					// "contactus": [{
					// 	required: true,
					// 	message: '请输入商户联系人',
					// 	trigger: ['blur', 'change']
					// }],
					// "mobile": [{
					// 		required: true,
					// 		message: '请输入联系电话',
					// 		trigger: ['blur', 'change']
					// 	},
					// 	{
					// 		// 自定义验证函数，见上说明
					// 		validator: (rule, value, callback) => {
					// 			// 上面有说，返回true表示校验通过，返回false表示不通过
					// 			// uni.$u.test.mobile()就是返回true或者false的
					// 			return uni.$u.test.mobile(value);
					// 		},
					// 		message: '请输入正确的手机号',
					// 		// 触发器可以同时用blur和change
					// 		trigger: ['blur', 'change'],
					// 	}
					// ],
					// "yzcode": [{
					// 	required: true,
					// 	message: '请输入验证码',
					// 	trigger: ['blur', 'change']
					// }],
				},
			};
		},
		components: {
			pickerAddress
		},
		onReady() {

			this.$refs.form.setRules(this.rules)

		},
		computed: {
			...mapGetters(['userInfo', 'snConfig'])
		},
		onLoad(params) {
			// this.form.rwtype = params.rwtype
			// #ifdef H5
			this.getH5ScanData()
			if (params.code) {
				this.form.sn = params.code;
			}
			// #endif
			this.getMerchantType()

		},
		methods: {
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					getVerifyCode({
						mobile: this.form.mobile,
						type: 'rw1'
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
			change(data) {
				this.form.provinceca = data.data.join('')
				this.form.posprovince = data.code[0]
				this.form.poscity = data.code[1]
				this.form.posarea = data.code[2]
				console.log(this.form)
			},
			getMerchantType() {
				getMcc().then((res) => {
					this.mcclist.push(res.mcclist)

				})

			},
			getJJingyingType() {

				getMccExt({
					mcc: this.form.mcc
				}).then((res) => {
					this.mccExtlist.push(res.mccextlist)

				})

			},
			typeSelect(e) {
				this.typename = e.value[0].label
				this.form.rwtype = e.value[0].type
				this.showTypeList = false;
			},
			mccSelect(e) {
				console.log(e)
				this.form.mccname = e.value[0].mccname
				this.form.mcc = e.value[0].mccno
				this.mccExtlist = []
				this.form.mccExt = ''
				this.form.mccExtname = ''
				this.getJJingyingType()
				this.showMccList = false
			},
			mccExtListSelect(e) {
				this.form.mccExtname = e.value[0].mccname
				this.form.mccExt = e.value[0].mccno

				this.showMccExtList = false
			},
			scan() {
				// #ifdef APP-PLUS	
				mpaasScanModule.mpaasScan({
						// 扫码识别类型，参数可多选，qrCode、barCode，不设置，默认识别所有
						'scanType': ['qrCode', 'barCode'],
						// 是否隐藏相册，默认false不隐藏
						'hideAlbum': false
					},
					(ret) => {
						// uni.showModal({
						// 	title: "弹窗标题",
						// 	// 返回值中，resp_code 表示返回结果值，10：用户取消，11：其他错误，1000：成功
						// 	// 返回值中，resp_message 表示返回结果信息
						// 	// 返回值中，resp_result 表示扫码结果，只有成功才会有返回
						// 	content: JSON.stringify(ret),
						// 	showCancel: false,
						// 	confirmText: "确定"
						// })
						if (ret.resp_code == 1000) {
							if (this.checkSN(ret.resp_result)) {
								this.form.sn = ret.resp_result
							}


						} else {
							uni.showModal({
								title: "扫码提示",
								// 返回值中，resp_code 表示返回结果值，10：用户取消，11：其他错误，1000：成功
								// 返回值中，resp_message 表示返回结果信息
								// 返回值中，resp_result 表示扫码结果，只有成功才会有返回
								content: ret.resp_message,
								showCancel: false,
								confirmText: "确定"
							})
						}

					})
				// #endif
				// #ifdef MP-WEIXIN
				uni.scanCode({
					scanType: ['qrCode', 'barCode'],
					success: (res) => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						if (this.checkSN(res.result)) {
							this.form.sn = res.result
						}

					}
				});
				// #endif
				// #ifdef H5
				this.bindsaoQRcode()
				// #endif
			},
			getH5ScanData() {
				//在onload 中调用，找后台要接口！！！
				var apiUrl = window.location.href.split("#")[0]
				// console.log('apiUrl', location.href)
				getWx_SaoMa({
					url: apiUrl, //当前页面的域名
					api: ['scanQRCode'], //调用的方法去接口列表里找
				}).then((res) => {
					if (res.code == '00') {
						var wxData = res
						this.wx_sanCode(wxData)
					}
				})
				// uni.request({
				// 	url: api.api.getJsSdkConfig,
				// 	data: {
				// 		url: apiUrl, //当前页面的域名
				// 		api: ['scanQRCode'], //调用的方法去接口列表里找
				// 	},
				// 	success: function(res) {

				// 		var wxData = JSON.parse(res.data.data.config)
				// 		that.wx_sanCode(wxData)
				// 	}

				// })
			},
			//扫码
			wx_sanCode: function(wxData) {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: wxData.appId, // 必填，公众号的唯一标识
					timestamp: wxData.timestamp, // 必填，生成签名的时间戳
					nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
					signature: wxData.signature, // 必填，签名
					jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
				})
				wx.ready(function() {
					// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					wx.checkJsApi({
						jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
						success: function(res) {
							// console.log('返回信息')
							// console.log(res)
							// 以键值对的形式返回，可用的api值true，不可用为false
							// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
						}
					});
				});
				wx.error(function(res) {
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					console.log(res, '接口验证失败')
				});

			},
			//扫码
			bindsaoQRcode: function() {
				wx.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: (res) => {
						// console.log(res);

						if (res.resultStr.includes(',')) {

							if (!this.checkSN(res.resultStr.split(',')[1])) return;
							this.form.sn = res.resultStr.split(',')[1];
						} else {
							if (!this.checkSN(res.resultStr)) return;
							this.form.sn = res.resultStr
						}
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						// this.$modal.alert(res)
						// this.$modal.alert(`${window.location.href}'?code='${this.jijuhao}`)
						// console.log(`${window.location.href}'?code='${this.jijuhao}`);
						let _url = window.location.href.split("?")[0] + '?code=' + this.form.sn;
						window.location.replace(_url)
						// 	.jijuhao //安卓机型跳转渲染有问题 所以要加这句
					}
				});
			},
			checkSN(_sn) {
				if (_sn.length < this.snConfig.minsn || _sn.length > this.snConfig.maxsn) {
					uni.showModal({
						content: '机具号有误，请重新扫描',
						showCancel: false
					})
					return false;
				} else {
					return true
				}
			},
			submit() {
				this.$refs.form.validate().then(res => {
					uni.showModal({
						content: '请核对确认您的机具SN编码准确无误',
						success: (res) => {
							if (res.confirm) {
								ruWang_One(this.form).then((res) => {
									if (res.code == '00') {
										if (this.form.rwtype == 'geren') {
											this.$tab.navigateTo(
												'/packageA/pages/indentify/indentify-step-1?orderno=' +
												res
												.orderno + '&rwtype=' + this.form.rwtype)
										} else {
											this.$tab.navigateTo(
												'/packageA/pages/indentify/identify-license?orderno=' +
												res
												.orderno + '&rwtype=' + this.form.rwtype)
										}

									} else {
										// uni.$u.toast(res.msg)
									}
								})
							}
						}
					})

					// this.$tab.navigateTo('/pages/indentify/indentify-step-1?info='+JSON.stringify(this.form))
				}).catch(errors => {
					// uni.$u.toast('校验失败')
				})

				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true

			},
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FAFAFB;
	}

	.pos {
		.tips {
			color: #999999;
			font-size: 25rpx;
			// padding: 0 36rpx 0;
		}

		.scan {
			padding: 38rpx 56rpx;
			background-color: #fff;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #333333;
			font-size: 28rpx;
			margin-top: 34rpx;

			span {
				width: 20%;
			}

			input {
				width: 70%;
				background: transparent;
				padding: 70rpx 0;
				border: 0;
				outline: none;

				&::placeholder {
					color: #999999;
				}
			}

			.icon-scan {
				max-width: 70rpx;
			}
		}

		.btn-primary {
			width: 951rpx;
			display: block;
			margin: 66rpx auto 0;
		}

		.pannel {
			// height: 80rpx;
			background: #FFFFFF;
			border-radius: 13rpx;
			line-height: 80rpx;
			padding: 0 30rpx;
			color: #333333;
			font-size: 28rpx;
		}
	}

	.u-form {
		margin-top: 40rpx;



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

		/deep/ .u-button--text .u-button__text {
			background: linear-gradient(-90deg, #413BD7, #943EE6);
			border-radius: 44rpx;
			color: #FFFFFF;
			padding: 20rpx 18rpx;
			border: 0;
			font-size: 28rpx;
			font-family: 'AlibabaPuHuiTiR';
		}

		/deep/ .uni-select {
			margin-top: 20rpx;
			border: 0;

			// border-bottom: 1rpx solid rgba(255, 255, 255, 0.2) !important;
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