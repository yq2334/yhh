<template>
	<view>
		<u-navbar leftText="结算账户" :fixed="false" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<view class="pannel">
			<u--form :model="form" ref="form" labelPosition="left" labelWidth="80" :borderBottom="true">

				<u-form-item label="开户姓名" prop="address" class="input-item" :borderBottom="true">
					<u--input v-model="form.address" type="text" fontSize="14" placeholder="请输入开户姓名" color="#333333"
						border="none">
					</u--input>
				</u-form-item>
				<u-form-item label="开户账号" prop="address" class="input-item" :borderBottom="true">
					<u--input v-model="form.address" type="text" fontSize="14" placeholder="请填写开户账号" color="#333333"
						border="none">
					</u--input>
				</u-form-item>

				<view class="gap">

				</view>
				<u-form-item label="开户银行" prop="bank" borderBottom ref="item1">
					<u--input v-model="form.address" type="text" fontSize="14" placeholder="请填写开户银行" color="#333333"
						border="none">
					</u--input>
				</u-form-item>
				<picker-address @change="change">
					<u-form-item label="所在地区" prop="city" borderBottom @click="showCity = true; hideKeyboard()"
						ref="item1">
						<u--input v-model="form.city" disabled disabledColor="#ffffff" placeholder="请选择地区"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</picker-address>

				<u-form-item label="银行网点" prop="bank" borderBottom @click="showBank = true; hideKeyboard()" ref="item1">
					<u--input v-model="form.bank" disabled disabledColor="#ffffff" placeholder="请选择地区"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
					<u-picker :show="showBank" :columns="bankList" keyName="name" title="请选择银行网店"
						@close="showBank = false" @cancel="showBank = false" @confirm="bankSelect"></u-picker>

				</u-form-item>

			</u--form>

		</view>

		<view class="action-btn padding-lr-xl ">

			<u-button @click="submit" :customStyle="{'border-radius': '10rpx'}" size="large" type="primary" text="修改结算账户">
			</u-button>
		</view>

	</view>
</template>

<script>
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue'
	export default {
		data() {
			return {
				form: {
					name: '',
					idCrad: '',
					expire: '有效期',
					city: '',
					address: '',
					startDate: '',
					endDate: '',
					bank: ''
				},
				expireList: [{
						name: '有效期',
						disabled: false
					},
					{
						name: '长期',
						disabled: false
					},

				],
				bankList: [
					[{
							name: '长沙支行'
						},
						{
							name: '雨花区支行'
						}
					]
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中

				fileList: [],
				imgUp: '',
				showCity: false,
				showBank: false,
				showStartDate: false,
				showEndDate: false
			};
		},
		components: {
			pickerAddress
		},
		methods: {
			// 删除图片
			deletePic(event) {

			},
			// 新增图片
			async afterRead(event) {
				console.log(event)
				this.fileList.push({
					...event.file[0],
					status: 'uploading',
					message: '上传中'
				})

				const result = await this.uploadFilePromise(event.file[0].url)

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
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			change(data) {
				this.form.city = data.data.join('')
				console.log(data)
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
				this.form.bank = e.value[0].name;
				this.showBank = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FAFAFB;
	}

	.action-btn {
		margin-top: 80rpx;
	}

	.pannel {
		padding: 32rpx 39rpx 0 39rpx;
		background-color: #fff;
		margin-top: 35rpx;
	}

	.u-form {




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
	.gap{
		height: 27rpx;
		background-color: #FAFAFB;
		margin-left: -39rpx;
		width: 750rpx;
	}
</style>