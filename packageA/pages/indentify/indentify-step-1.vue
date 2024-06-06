<template>
	<view>
		<u-navbar leftText="实名认证" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true" :border="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<view class="register common-content">
			<!-- <p class="pannel-title">填写基本信息，以便完成身份认证</p> -->
			<view class="pannel">

				<view class="pannel-body">
					<view class="upload-wrapper " :class="type == 'faren' && 'purple'">
						<p v-if="rwtype == 'geti'" class="title text-center text-white text-lg"> {{type == 'faren' ? '法人' : '非法人'}} 身份证正面</p>
						<view class="upload">
							<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="6" multiple
								:maxCount="1" width="250" height="150">
								<image :src="initConfig[type].img" mode="widthFix"
									style="width: 483rpx;height: 304rpx;margin: 0 auto;display: block;"></image>
							</u-upload>
							<span class="example">示例</span>

						</view>
					</view>
					<p class="upload-name">上传身份证人像面</p>
				</view>
			</view>
			<view class="pannel">
				<u--form :model="form" ref="form" labelPosition="left" labelWidth="80" :borderBottom="true">
					<u-form-item label="姓名" prop="cardname" class="input-item" :borderBottom="true">
						<u--input v-model="form.cardname" type="text" fontSize="14" placeholder="请输入真实姓名"
							color="#333333" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="身份证号" prop="cardid" class="input-item " :borderBottom="true">
						<u--input v-model="form.cardid" type="text" fontSize="14" placeholder="请输入身份证号" color="#333333"
							border="none" clearable>
						</u--input>
					</u-form-item>
				<!-- 	<picker-address @change="change">
						<u-form-item label="所在地区" prop="provinceca" borderBottom @click="hideKeyboard()" ref="item1">
							<u--input v-model="form.provinceca" readonly disabledColor="#ffffff" placeholder="请选择地区"
								:style="{pointerEvents: 'none'}" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
					</picker-address>
					<u-form-item label="详细地址" prop="cardaddress" class="input-item" :borderBottom="true">
						<u--input v-model="form.cardaddress" type="text" fontSize="14" class="input-h"
							placeholder="请具体填写至街道、楼牌号、小区、单元 门牌号等" color="#333333" border="none">
						</u--input>
					</u-form-item> -->
				</u--form>

			</view>
			<p class="tips padding-lr-lg">*若信息有误请点击图片重新上传</p>
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
		getCardIdInfo,
		getCardIdInfo_faren,
		getCardIdInfo_feifaren,
		ruWang_Two,
		ruWang_Two_feifaren,
		ruWang_Two_faren
	} from '@/api/system/user.js'
	import {
		getToken
	} from '@/utils/auth'
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue'
	// import normalImg from require('/packageA/static/images/store/front.png') 
	// import feiImg from  require('/packageA/static/images/store/front-fei.jpg') //'@/packageA/static/images/store/front-fei.jpg'
	// import faImg from require('/packageA/static/images/store/front-fa.jpg') // '@/packageA/static/images/store/front-fa.jpg'
	export default {
		data() {
			return {
				form: {
					cardname: '',
					cardid: '',
					address: '',
					cardimg: '',
					// provincecode: '',
					// citycode: '',
					// areacode: '',
					// cardaddress: '',
					orderno: '',
					provinceca: ''
				},
				rwtype: '',
				imgUp: '',
				fileList: [],
				imgBase64URL: '',
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
						}
					],
					// "address": [{
					// 	required: true,
					// 	message: '请输入详细地址',
					// 	trigger: ['blur', 'change']
					// }],

				},
				type: 'normal',
				initConfig: {
					normal: {
						img: '/packageA/static/images/store/front.png',
						api: getCardIdInfo,
						submit: ruWang_Two
					},
					faren: {
						img: '/packageA/static/images/store/front-fa.jpg',
						api: getCardIdInfo_faren,
						submit: ruWang_Two_faren
					},
					feifaren: {
						img: '/packageA/static/images/store/front-fei.jpg',
						api: getCardIdInfo_feifaren,
						submit: ruWang_Two_feifaren
					}
				}
			}
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
			if (options.jiesunType) {
				this.type = options.jiesunType
			}
			console.log(this.form)
		},
		methods: {
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
				this.initConfig[this.type]['api']({
					basecode: this.imgBase64URL,
					orderno: this.form.orderno
				}).then((res) => {
					if (res.code == '00') {
						this.form = Object.assign(this.form, res)
						if (!res.provincecode || !res.areacode || !res.citycode) {
							this.form.provinceca = ''
						}
						this.form.cardaddress = res.address
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
			change(data) {
				this.form.provinceca = data.data.join('')
				this.form.provincecode = data.code[0]
				this.form.citycode = data.code[1]
				this.form.areacode = data.code[2]
				console.log(this.form)
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					this.initConfig[this.type]['submit']({
						orderno: this.form.orderno,
						cardname: this.form.cardname,
						cardnum: this.form.cardid,
						cardimg: this.form.cardimg,
						// cardprovince: this.form.provincecode,
						// cardcity: this.form.citycode,
						// cardarea: this.form.areacode,
						// cardaddress: this.form.address,
					}).then((res) => {
						if (res.code == '00') {

							this.$tab.navigateTo('/packageA/pages/indentify/indentify-step-2?orderno=' +
								res.orderno + '&info=' + JSON.stringify(this.form) + '&rwtype=' + this
								.rwtype + '&jiesunType=' + this.type)
						} else {
							// uni.$u.toast(res.msg)
						}
					})
					// this.$tab.navigateTo('/pages/indentify/indentify-step-2?info='+JSON.stringify(this.form))
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},

		}
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

			.step {
				span {
					display: block;
					text-align: center;
					color: #999999;
					font-size: 25rpx;
				}

				.round {
					border-radius: 50%;
					width: 78rpx;
					height: 78rpx;
					background-color: #d8d8d8;
					text-align: center;
					line-height: 78rpx;
					margin: 0 auto 42rpx auto;
				}
			}

			.active {
				span {
					color: #473bd9;
				}

				.round {
					background-image: linear-gradient(-39deg, #413bd7 0%, #943ee6 100%), linear-gradient(#fe5a54, #fe5a54);
					background-blend-mode: normal, normal;
					color: #fff;
				}
			}

			&::after {
				position: absolute;
				content: '';
				width: 614rpx;
				height: 1px;
				background-color: #d8d8d8;
				top: 37rpx;
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
			padding: 12rpx 39rpx 0 39rpx;
			background-color: #fff;
			position: relative;
			// padding-top: 100rpx;

			// margin-top: 35rpx;
		}

		.flex {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		.upload-wrapper {
			background: linear-gradient(-18deg, #EB4619, #F19735);
			border-radius: 33rpx;
			&.purple{
				background: linear-gradient(-90deg, #413BD7, #943EE6);
			}
			.title{
				padding: 20rpx 0;
			}
		}

		.upload {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			background-color: #dddddd;
			border-radius: 33rpx;
			padding: 17rpx 0 20rpx 0;
			position: relative;
			// &:before{
			// 	content: '';
			// 	position: absolute;
			// 	background: linear-gradient(-136deg, #EB4619, #F19735);
			// 	width: 100%;
			// 	height: 100rpx;
			// 	border-radius: 40rpx 40rpx 0 0;
			// 	top: -80rpx;
			// 	left: 0;

			// }
			&-name {
				color: #010101;
				font-size: 28rpx;
				padding-top: 12rpx;
				text-align: center;
				// padding-bottom: 42rpx;
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
			padding-top: 18rpx;

		}

		.action-btn {
			margin-top: 40rpx;
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


		}
	}

	/deep/ .u-upload {
		align-items: center;
		justify-content: center;
	}
</style>