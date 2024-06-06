<template>
	<view>
		<u-navbar leftText="终端绑定" :fixed="false" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<view class="pos">
			<view class="tips margin-top-xl padding-left-xl">
				请确认机具号从未绑定过：
			</view>
			<view class="scan flex align-center justify-between">
				<span>机具号</span>
				<u--input v-model="jijuhao" placeholder="扫描机身背后条形码或手输机器号" :placeholderStyle="{'color': '#999999'}"
					border="none"></u--input>
				<u--image class="img" :showLoading="true" src="/static/images/store/scan.png" width="44rpx"
					@click="scan" height="54rpx" mode="aspectFit"></u--image>
			</view>
			<view class="action-btn padding-lr-xl margin-top-xl">

				<u-button @click="submit" :customStyle="{'border-radius': '10rpx'}" size="large" type="primary"
					text="绑定">
				</u-button>
			</view>
			<view class="padding-lr">
				<view class="tips margin-top padding-left">
					已绑定{{list.length}}个设备
				</view>
				<view class="pannel margin-top-sm margin-bottom-xs" v-for="(item,index) in list" :key="index">
					SN：{{item.jijuhao}}
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	// #ifdef APP-PLUS
	var mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module")
	// #endif
	// #ifdef H5
	import wx from 'jweixin-module';
	// #endif
	import {
		getPoslist,
		posSubmit,
		get_myInfo_jiju,
		getMyInfo,
		getWx_SaoMa
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				list: [],
				page: 1,
				pageSize: 10,
				total: 0,
				pageNumber: 0,
				status: 'loadmore',
				jijuhao: ''
			};
		},
		computed: {
			...mapGetters(['userInfo','snConfig'])
		},
		async onLoad(params) {
			// #ifdef H5
			if (params.code) {
				this.jijuhao = params.code;
			}
			// #endif


			await this.getInfo()
			this.getMyJiJuInfo()
			this.getList()

		},
		onReady() {
			// #ifdef H5
			this.getH5ScanData()
			// #endif
		},
		onReachBottom() {
			console.log('我滚动到底部了~')
			if (this.page >= this.pageNumber) {
				this.status = 'nomore';
				return;
			} else {
				this.status = "loading"
			}
			this.page++;
			this.getList()
			// console.log('我滚动到底部了~')
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getList();
			uni.startPullDownRefresh({

			})
		},
		methods: {
			async  getInfo() {
				new Promise((resolve, reject) => {
					getMyInfo().then((res) => {
						if (res.code == '00') {
							resolve()
						} else {
							reject()
							setTimeout(() => {
								this.$tab.switchTab('/pages/home/home')
							}, 2000)
						}
					})
				})
				
			},
			getMyJiJuInfo() {
				get_myInfo_jiju().then((res) => {
					if (res.code == '00') {
						uni.showModal({
							title: '提示',
							content: '您已绑定机具号：' + res.jijuhao,
							showCancel: false,
							success: (event) => {
								if (event.confirm) {
									this.$tab.switchTab('/pages/home/home')
								}

							}
						})
					}
				})
			},
			getList() {
				getPoslist({
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
					uni.stopPullDownRefresh()
					this.total = res.totalnum

					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.jijuhaolist
					} else {
						this.list = this.list.concat(res.jijuhaolist)

					}
					if (this.page >= this.pageNumber) {
						this.status = 'nomore';
					} else {
						this.status = 'loadmore';
					}


				})
			},
			loadmore() {
				if (this.page >= this.pageNumber) {
					this.status = 'nomore';
					return;
				} else {
					this.status = "loading"
				}
				this.page++;
				this.getList()
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
							if(this.checkSN(ret.resp_result)) {
								this.jijuhao = ret.resp_result
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
						if(this.checkSN( res.result)) {
							this.jijuhao = res.result
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
							if(!this.checkSN(res.resultStr.split(',')[1])) return;
							this.jijuhao = res.resultStr.split(',')[1];	
						} else {
							if(!this.checkSN(res.resultStr)) return;
							this.jijuhao = res.resultStr
							
						}
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						// this.$modal.alert(res)
						// this.$modal.alert(`${window.location.href}'?code='${this.jijuhao}`)
						// console.log(`${window.location.href}'?code='${this.jijuhao}`);
						 
						let _url = window.location.href.split("?")[0] + '?code=' + this.jijuhao;
						window.location.replace (_url) 
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
				posSubmit({
					jijuhao: this.jijuhao
				}).then((res) => {
					if (res.code == '00') {
						uni.showToast({
							title: res.msg,
							icon: 'success'
						})
						setTimeout(() => {
							this.getList()
						}, 2000)

					}
				})
			}
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
			height: 80rpx;
			background: #FFFFFF;
			border-radius: 13rpx;
			line-height: 80rpx;
			padding: 0 30rpx;
			color: #333333;
			font-size: 28rpx;
		}
	}
</style>