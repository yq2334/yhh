<template>
	<view>
		<u-navbar leftText="实名认证" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<view class="register common-content">
			
			
		
			<view class="pannel">
				<view class="pannel-body">
					<view class="title text-center">
						店面门头照上传
					</view>
					<view class="upload">
						<!-- <view id="upload_front" class="uploadImg">
							<image id="uploadImg_front" src="/static/images/store/back.png" mode=""></image>
						</view> -->
						<view class="example">示例</view>
						<u-upload :fileList="fileList2"  @afterRead="afterRead2"
							@delete="deletePic2" name="6" multiple :maxCount="1" width="250" height="150">
							<image src="/packageA/static/images/shop-h.png" mode="widthFix"
								style="width: 483rpx;height: 304rpx;margin: 0 auto;display: block;"></image>
						</u-upload>

						<view class="flex justify-center align-center">
							<u--image class="margin-right-xs" :showLoading="true"  src="/static/images/camera.png" width="35rpx"
								height="31rpx"></u--image>
							<text class="upload-name">点击上传店面门头图片</text>
						</view>
					</view>


				</view>
			</view>
			
			<view class="action-btn padding-lr-xl ">

				<u-button @click="submit" :customStyle="{'border-radius': '10rpx'}" size="large" type="primary"
					text="下一步">
				</u-button>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		getCardIdDateInfo,
		uploadComIng_mentou
	} from '@/api/system/user.js'
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue'
	export default {
		data() {
			return {
				form: {
					cardname: '',
					cardid: '',
					address: '',
					expire: '是',
					city: '',
					fromdate: '',
					todate: '',
					orderno: '',
					cardimg: '',
					cardprovince: '',
					cardcity: '',
					cardarea: '',
					cardaddress: '',
				},
				expireList: [{
						name: '有效期',
						val: '是',
						disabled: false
					},
					{
						name: '长期',
						val: '否',
						disabled: false
					},

				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				rwtype: '',
				fileList: [],
				fileList2: [],
				imgBase64URL: '',
				imgBase64URL2: '',
				imgUp: '',
				showCity: false,
				showStartDate: false,
				showEndDate: false,
				rules: {
					"cardname": [{
						required: true,
						message: '请输入真实姓名',
						trigger: ['blur', 'change']
					}],
					"cardid": [{
						required: true,
						message: '请输入身份证号',
						trigger: ['blur', 'change']
					},
					{
					
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// uni.$u.test.idCard()就是返回true或者false的
							return uni.$u.test.idCard(value);
						},
						message: '请输入正确的身份证号',
						// 触发器可以同时用blur和change
						trigger: ['blur', 'change'],
					}],
					"address": [{
						required: true,
						message: '请输入详细地址',
						trigger: ['blur', 'change']
					}],
					"expire": [{
						required: true,
						message: '请选择证件类型',
						trigger: ['blur', 'change']
					}],
				},
			};
		},
		components: {
			pickerAddress
		},
		onLoad(options) {
			this.form.orderno = options.orderno
			this.rwtype = options.rwtype
			this.form = Object.assign(this.form, JSON.parse(options.info))
			
			console.log(this.form)
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1)

			},
			deletePic2(event) {
				this.fileList2.splice(event.index, 1)

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

				// const result = await this.uploadFilePromise(event.file[0].url)

			},
			async afterRead2(event) {
				console.log(event)
				this.fileList2.push({
					...event.file[0],
					status: 'success',
					message: ''
				})
				this.imgBase64URL2 = await this.ploadFilePromise(event.file[0].url)
				console.log(this.imgBase64URL2)

				// const result = await this.uploadFilePromise(event.file[0].url)

			},
			getCardInfoData() {
				getCardIdDateInfo({
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
			change(data) {
				this.form.city = data.data.join('')
				this.form.cardprovince = data.code[0]
				this.form.cardcity = data.code[1]
				this.form.cardarea = data.code[2]
				console.log(this.form)
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				
				if (!this.imgBase64URL2) {
					uni.$u.toast('请上传店面门头照')
					return;
				}
				uploadComIng_mentou({
					orderno: this.form.orderno,
					basecode_title: this.imgBase64URL2,
				}).then((res) => {
					if (res.code == '00') { 

						this.$tab.navigateTo('/packageA/pages/indentify/identify-shop?orderno=' + this.form.orderno + '&rwtype=' + this.rwtype)
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
		},
	}
</script>
<style lang="scss" >
	page {
		background-color: #F7F7F7;
	}
</style>
<style lang="scss" scoped>
	

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
			padding: 37rpx 50rpx 0 50rpx;
		}

		.pannel {
			padding: 17rpx 39rpx 0 39rpx;
			
			.title{
				color: #474D61;
				font-size: 38rpx;
				font-weight: 600;
				padding-bottom: 30rpx;
			}
			// margin-top: 35rpx;
		}

		.flex {
			// display: flex;
			// justify-content: flex-start;
			// align-items: center;
		}

		.upload {
			// display: flex;
			// justify-content: center;
			// align-items: center;
			flex-wrap: wrap;
			background: url(~@/static/images/border.png) no-repeat;
			background-size: 100% 100%;
			// background-color: rgba($color: #000000, $alpha: 0.22);
			// border-radius: 33rpx;
			// padding: 17rpx 0 0 0;
			position: relative;

			&-name {
				color: #878CA2;
				font-size: 28rpx;
			
				text-align: center;
				padding: 33rpx 0;
				// padding-bottom: 22rpx;
			}
		}

		.example {
			// position: absolute;
			// top: 24rpx;
			// right: 28rpx;
			// color: #fff;
			font-size: 28rpx;

			text-align: right;

			padding: 15rpx 42rpx;
			color: #878CA2;
		}

		.uploadImg {
			width: 494rpx;
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
			font-size: 28rpx;

			color: #878CA2;
			padding: 33rpx 0;

		}

		.action-btn {
			margin-top: 80rpx;
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
				color: #999999 !important;
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