<template>
	<view >
		<web-view ref="webview" :webview-styles="webviewStyles" :src="`${params.url}`"
			@message="handleMessage"></web-view>
	</view>
</template>

<script>
	import {

		getRenLianResult
	} from '@/api/system/user.js'

	export default {
		data() {
			return {
				params: {
					url: '',
					rwtype: ''
				},
				webviewStyles: {
					progress: {
						color: "#FF3333"
					}
				},
				wvNode: null,
				webV: {},
					
			}
		},
		props: {
			src: {
				type: [String],
				default: null
			}
		},
		onReady() {
			// #ifdef APP-PLUS 

			setTimeout(() => {
				this.getVw()
			}, 1000)
			// #endif
			
			// #ifdef MP-WEIXIN
			// setInterval(() => {
			// 	this.getIdentifyStatus()
			// }, 2000)
			// #endif
		},


		onLoad(event) {
			// #ifdef MP-WEIXIN
			this.params.url = decodeURIComponent(event.url)
			console.log(this.params.url)
			this.params.orderno = event.orderno;
			this.params.token_rl = event.token_rl;
			this.params.rwtype = event.rwtype
			// #endif
			
			
			console.log(this.params)
			// if (event.title) {
			// 	uni.setNavigationBarTitle({
			// 		title: event.title
			// 	})
			// }
			// this.requestPermissions()
			// console.log(plus.os.name )
			// #ifdef H5
				this.params = event;
				window.addEventListener('message', event => {
					this.webV = event.source // window的对象
					console.log(event.origin)
					 if (event.origin !== "https://jlsh.globebill.com") return;
					 this.getIdentifyStatus()
					// this.getIdentifyStatus()
				}, false)
			// #endif
			// #ifdef APP-PLUS
			this.params = event
			this.checkPermission()
			// #endif
			// #ifdef MP-WEIXIN
			this.checkMpPermission()
			// #endif
		},
		onUnload() {
			// #ifdef MP-WEIXIN
			this.getIdentifyStatus()
			// #endif
		},
		methods: {
			getVw() {
				const pages = getCurrentPages()
				// 找到路由栈里的最后一位
				this.wvNode = pages[pages.length - 1].$getAppWebview().children()[0]

				// 使用 evalJS 方法，调用子应用里的事件
				// receiveData 是在子应用里定义的事件
				// 最后需要注意，evalJS 传入的是一个字符串。
				this.wvNode.evalJS("window.location.replace(window.location.href)")
			},

			async checkPermission() {
				let system = uni.getSystemInfoSync()
				if (system.platform === 'ios') {
					var result = false;
					var AVCaptureDevice = plus.ios.import("AVCaptureDevice");
					var authStatus = AVCaptureDevice.authorizationStatusForMediaType('vide');
					console.log("authStatus:" + authStatus);
					if (authStatus == 3 || authStatus == 0) {
						//authStatus == 0 时为初次打开相机  ios系统有默认授权弹窗
						result = true;
						return result
					} else {
						uni.showModal({
							title: '提示',
							content: '请打开相机权限',
							success(res) {
								if (res.confirm) {
									var UIApplication = plus.ios.import("UIApplication");
									var application2 = UIApplication.sharedApplication();
									var NSURL2 = plus.ios.import("NSURL");
									var setting2 = NSURL2.URLWithString("app-settings:");
									application2.openURL(setting2);
									plus.ios.deleteObject(setting2);
									plus.ios.deleteObject(NSURL2);
									plus.ios.deleteObject(application2);
								}
							}
						});
					}
					plus.ios.deleteObject(AVCaptureDevice);
					return result;
				} else {
					plus.android.requestPermissions(['android.permission.CAMERA'], (e) => {
						if (e.deniedAlways.length > 0) { //权限被永久拒绝  
							// 弹出提示框解释为何需要权限，引导用户打开设置页面开启  
							uni.showModal({
								title: '提示',
								content: '请打开手机相机功能（点击确定后在权限中授权相机功能）',
								// showCancel: false, // 不显示取消按钮
								success(res) {
									if (res.confirm) {
										var Intent = plus.android.importClass(
											"android.content.Intent");
										var Settings = plus.android.importClass(
											"android.provider.Settings");
										var Uri = plus.android.importClass("android.net.Uri");
										var mainActivity = plus.android.runtimeMainActivity();
										var intent = new Intent();
										intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
										var uri = Uri.fromParts("package", mainActivity
											.getPackageName(),
											null);
										intent.setData(uri);
										mainActivity.startActivity(intent);
									}
								}
							});
						} else if (e.deniedPresent.length > 0) { //权限被临时拒绝  
							// 弹出提示框解释为何需要权限，可再次调用plus.android.requestPermissions申请权限  
							uni.showModal({
								title: '提示',
								content: '请打开手机相机功能（点击确定后在权限中授权相机功能）',
								// showCancel: false, // 不显示取消按钮
								success(res) {
									if (res.confirm) {
										var Intent = plus.android.importClass(
											"android.content.Intent");
										var Settings = plus.android.importClass(
											"android.provider.Settings");
										var Uri = plus.android.importClass("android.net.Uri");
										var mainActivity = plus.android.runtimeMainActivity();
										var intent = new Intent();
										intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
										var uri = Uri.fromParts("package", mainActivity
											.getPackageName(),
											null);
										intent.setData(uri);
										mainActivity.startActivity(intent);
									}
								}
							});
						} else {
							console.log('已有权限！');
							return true
						}
					}, (e) => {
						// console.log(e);
						return true
						console.log('Request Permissions error:' + JSON.stringify(e))
					})
				}
			},
			// #ifdef MP-WEIXIN


			checkMpPermission() {
				uni.getSetting({
					success: (res) => {
						let authStatus =  res.authSetting['scope.camera'];
						// 如果没有授权相册
						if (!authStatus) {
							//向用户发起授权请求
							uni.authorize({
								scope: "scope.camera",
								success: () => {
									
								},
								fail: () => {
									uni.showModal({
										title: '授权失败',
										content: '请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							})
						} 
					}
				})
			},
			// #endif
			

			handleMessage(evt) {
				console.log(evt);
				console.log('接收Html发送过来的消息：' + JSON.stringify(evt.detail.data[0]));
				// uni.showModal({
				// 	content: JSON.stringify(event.detail),
				// 	showCancel: false
				// });
				this.getIdentifyStatus()
			},
			
			getIdentifyStatus(token_rl) {
				getRenLianResult({
					token_rl: this.params.token_rl,
					orderno: this.params.orderno
				}).then((res) => {
					console.log(res)
					if (res.code == '00') {
						uni.showModal({
							title: '提示',
							content: '人脸识别成功',
							showCancel: false,
							success: (event) => {
								this.$tab.navigateTo(
									'/packageA/pages/indentify/identify-success?orderno=' +this.params.orderno + '&rwtype=' + this.params.rwtype)
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
									// this.getOpenUrl(res)
									// uni.navigateBack()
									this.$router.go(0) 
								} else if (event.cancel) {
									console.log('用户点击取消');
								}

							}
						})
						// clearInterval(this.Timer)
					}
				})
			},
			
		
			// 调用 webview 内部逻辑
			evalJs: function() {
				const pages = getCurrentPages()


				this.$refs.webview.evalJs("document.body.style.background ='#00FF00'");
			}
		},
	}
</script>