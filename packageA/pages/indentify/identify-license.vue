<template>
	<view>
		<u-navbar leftText="营业执照认证" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<view class="register common-content">
			<!-- 	<view class="register-step">
				<view class="step active">
					<span class="round">1</span>
					<span>身份资料</span>
				</view>
				<view class="step ">
					<span class="round">2</span>
					<span>收款资料</span>
				</view>
			</view> -->
			<!-- <p class="pannel-title">填写基本信息，以便完成身份认证</p> -->
			<view class="pannel">
				<view class="pannel-body">
					<view class="upload">
						<!-- <view id="upload_front" class="uploadImg">
							<image id="uploadImg_front" src="/static/images/store/back.png" mode=""></image>
						</view> -->
						<u-upload :fileList="fileList"  @afterRead="afterRead" @delete="deletePic"
							name="6" multiple :maxCount="1" width="250" height="150">
							<image src="/packageA/static/images/license.jpg" mode="widthFix"
								style="width: 483rpx;height: 304rpx;margin: 0 auto;display: block;"></image>
						</u-upload>
						<span class="example">示例</span>

					</view>

					<p class="upload-name">上传营业执照</p>
				</view>
			</view>
			<view class="pannel">
				<u--form :model="form" ref="form" labelPosition="left" labelWidth="80" :borderBottom="true">
					<u-form-item label="营业执照名" prop="zhizhaoname" class="input-item" :borderBottom="true">
						<u--input v-model="form.zhizhaoname" type="text" fontSize="14"  maxlength="20" class="input-h" placeholder="请输入营业执照名" color="#333333"
							border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="结算类型 " prop="farenjiesuan" borderBottom labelWidth="80"
						@click="showTypeList = true; hideKeyboard()" ref="item1">
						<u--input v-model="zhizhaoType" readonly disabledColor="#ffffff" placeholder="请选择经结算类型"  :style="{pointerEvents: 'none'}"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
						<u-picker :show="showTypeList" :columns="typeList" keyName="name" title="请选择经营内容"
							@close="showTypeList = false" @cancel="showTypeList = false"
							@confirm="typeSelect"></u-picker>
					</u-form-item>
					<u-form-item label="营业执照号" prop="zhizhaonum" class="input-item" :borderBottom="true">
						<u--input v-model="form.zhizhaonum" type="text" fontSize="14" class="input-h" placeholder="请输入营业执照证件号" color="#333333"
							border="none">
						</u--input>
					</u-form-item>
					<!-- <u-form-item label="注册资本" prop="zhizhaomoney" class="input-item" :borderBottom="true">
						<u--input v-model="form.zhizhaomoney" type="number" fontSize="14" class="input-h" placeholder="请输入数字" color="#333333"
							border="none">
							<view class="" slot="suffix">
								<text class="text-lg">(万元)</text>
							</view>
						</u--input>
					</u-form-item> -->
					<u-form-item label="注册地址" prop="zhizhaoaddress" class="input-item" :borderBottom="true">
						<u--input v-model="form.zhizhaoaddress" type="text" fontSize="14" class="input-h" placeholder="请输入注册详细地址" color="#333333"
							border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="类型" prop="expire" class="input-item" :borderBottom="true">
						<u-radio-group v-model="form.expire" placement="row" @change="groupChange">
							<u-radio :customStyle="{marginRight: '55rpx'}" activeColor="#943EE6"
								v-for="(item, index) in expireList" :key="index" :label="item.name" :name="item.val"
								@change="radioChange">
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="有效期限" prop="fromdate" class="input-item" :borderBottom="true" v-if="form.expire != '是' ">
						<view class="  selectDate" @click="  showEndDate = true " style="width: 100%;">
							<!-- <text v-if="form.fromdate" @click="showStartDate = true">
								{{ form.fromdate | date('yyyy-mm-dd')}} </text>
							<text class="place" @click="showStartDate = true" v-else>请选择</text>
							<text class="fs margin-left margin-right">至</text> -->
							<text v-if="form.zhizhaotime" >{{form.zhizhaotime | date('yyyy-mm-dd')}}</text>
							<text class="place" @click="showEndDate = true" v-else> 请选择</text>
						</view>
					<!-- 	<u-datetime-picker :show="showStartDate" v-model="form.fromdate"
							@confirm="selectStartTime;showStartDate = false" @cancel="showStartDate = false" mode="date" :maxDate="4070880000000"></u-datetime-picker> -->
						<u-datetime-picker :show="showEndDate " v-model="form.zhizhaotime" mode="date"
							@confirm="selectEndTime;showEndDate =false"  @cancel="showEndDate = false" :maxDate="4070880000000"></u-datetime-picker>
					</u-form-item> 

				
					<!-- 	<picker-address @change="change">
						<u-form-item label="所在地区" prop="city" borderBottom @click="hideKeyboard()"
							ref="item1">
							<u--input v-model="form.city"  disabledColor="#ffffff"  placeholder="请选择地区"
								border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
					</picker-address> -->

			<!-- 		<u-form-item label="详细地址" prop="address" class="input-item" :borderBottom="true">
						<u--input v-model="form.address" type="text" fontSize="14" class="input-h" placeholder="请具体填写至街道、楼牌号、小区、单元 门牌号等" color="#333333"
							border="none">
						</u--input>
					</u-form-item> -->
				<!-- 	<u-form-item label="账号昵称" prop="cardname" class="input-item " :borderBottom="true">
						<u--input v-model="form.cardname" type="text" fontSize="14" placeholder="请输入账号昵称" color="#333333"
							border="none" clearable>
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
		getZhiZhaoInfo,
		ruWang_Two_ZhiZhao
	} from '@/api/system/user.js'
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue'
	export default {
		data() {
			return {
				form: {
					zhizhaonum: '',
					zhizhaomoney: '1W',
					zhizhaoaddress: '',
					expire: '否',
					city: '',
					address: '',
					fromdate: '',
					todate: '',
					orderno: '',
					zhizhaoimg: '',
					zhizhaotime: '',
					zhizhaoname: '',
					farenjiesuan: 'Y'
				},
				showTypeList: false,
				zhizhaoType: '请选择',
				jiesuanType: '',
				typeList: [
					[
						{
							name: '请选择',
							val: '',
							type: ''
						},
						{
							name: '法人结算',
							val: 'Y',
							type: 'faren'
						},
						{
							name: '非法人结算',
							val: 'N',
							type: 'feifaren'
						}
					]
				],
				expireList: [{
						name: '有效期',
						val: '否',
						disabled: false
					},
					{
						name: '长期',
						val: '是',
						disabled: false
					},

				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中

				fileList: [],
				imgUp: '',
				showCity: false,
				showStartDate: false,
				showEndDate: false,
				rules: {

					"zhizhaonum": [{
						required: true,
						message: '请输入营业执照证件号',
						trigger: ['blur', 'change']
					}],
					// "zhizhaomoney": [{
					// 	required: true,
					// 	message: '请输入注册资本',
					// 	trigger: ['blur', 'change']
					// }],
					"jiesuanType": [{
						required: true,
						message: '请选择结算类型',
						trigger: ['blur', 'change']
					}],
					"zhizhaoaddress": [{
						required: true,
						message: '请输入注册详细地址',
						trigger: ['blur', 'change']
					}],
					"expire": [{
						required: true,
						message: '请选择证件类型',
						trigger: ['blur', 'change']
					}],
					// "zhizhaotime": [{
					// 	required: true,
					// 	message: '请选择有效期限',
					// 	trigger: ['blur', 'change']
					// }],
				},
			};
		},
		components: {
			pickerAddress
		},
		onLoad(options) {
			this.form.orderno = options.orderno
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
				getZhiZhaoInfo({
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
				this.form.fromdate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				// this.showStartTime = false

			},
			selectEndTime(e) {
				console.log(e.value)
				// this.date2 = e.value
				this.form.zhizhaotime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				// this.showEndTime = false
			},
			change(data) {
				this.form.city = data.data.join('')
				this.form.cardprovince = data.code[0]
				this.form.cardcity = data.code[1]
				this.form.cardarea = data.code[2]
				console.log(this.form)
			},
			typeSelect(e) {
				this.zhizhaoType = e.value[0].name
				this.form.farenjiesuan =  e.value[0].val
				this.jiesuanType = e.value[0].type
				this.showTypeList = false;
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					ruWang_Two_ZhiZhao({
						orderno: this.form.orderno,
						zhizhaonum   : this.form.zhizhaonum,
						ischangqi: this.form.expire,
						// address: this.form.address,
						// zhizhaomoney  : this.form.zhizhaomoney,
						zhizhaoimg   : this.form.zhizhaoimg, 
						zhizhaoaddress   : this.form.zhizhaoaddress,
						farenjiesuan:  this.form.farenjiesuan,
						zhizhaoname: this.form.zhizhaoname,
						zhizhaotime   : uni.$u.timeFormat(this.form.zhizhaotime, 'yyyy-mm-dd') ,
					}).then((res) => {
						if (res.code == '00') {

							this.$tab.navigateTo('/packageA/pages/indentify/indentify-step-1?orderno=' + res.orderno + '&rwtype=geti' + '&jiesunType=faren')
						} else {
							uni.$u.toast(res.msg)
						}
					})
					// this.$tab.navigateTo('/pages/indentify/indentify-step-2?info='+JSON.stringify(this.form))
				}).catch(errors => {
					// uni.$u.toast('校验失败')
				})
			},
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
			padding: 37rpx 50rpx 0 50rpx;
		}

		.pannel {
			padding: 32rpx 39rpx 0 39rpx;
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
				padding-top: 12rpx;
				text-align: center;
				// padding-bottom: 22rpx;
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
			padding-top: 12rpx;

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