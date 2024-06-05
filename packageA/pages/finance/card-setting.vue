<template>
	<view class="finance">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636"  leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view class="finance-content common-content">
			<u--form :model="form" ref="form" labelPosition="left" labelWidth="120" :borderBottom="true">
				<u-form-item label="开户行" prop="bank" class="input-item " :borderBottom="true"
					@click="showBank = true">
					<u--input v-model="form.bank" disabled disabledColor="#ffffff" placeholder="请选择开户行"
						inputAlign="right" fontSize="18" color="#3F3F3F" border="none"></u--input>
					<u-icon slot="right" class="margin-left-sm" name="arrow-down"></u-icon>

				</u-form-item>
				<u-form-item label="户名" prop="huming" class="input-item " :borderBottom="true">
					<u--input v-model="form.huming" placeholder="输入用户名" :readonly="cardInfo.huming != null || cardInfo.huming != ''" inputAlign="right" fontSize="18" color="#3F3F3F"
						border="none" clearable>
					</u--input>
				</u-form-item>
				<u-form-item label="身份证" prop="cardid" class="input-item " :borderBottom="true">
					<u--input v-model="form.cardid" placeholder="输入身份证信息" inputAlign="right" fontSize="18"
						color="#3F3F3F" border="none" clearable>
					</u--input>
				</u-form-item>
				<u-form-item label="卡号" prop="kahao" class="input-item " :borderBottom="true">
					<u--input v-model="form.kahao" placeholder="输入银行卡号" inputAlign="right" fontSize="18"
						color="#3F3F3F" border="none" clearable>
					</u--input>
				</u-form-item>
				<u-form-item label="手机号" prop="mobile" class="input-item " :borderBottom="true">
					<u--input v-model="form.mobile" placeholder="输入手机号" inputAlign="right" fontSize="18" color="#3F3F3F"
						border="none" clearable>
					</u--input>
				</u-form-item>
			</u--form>
			<view class="bottom-wrapper">
				<view class="tips">
					*请正确输入您的结算卡信息
				</view>
				<view class="action-btn margin-top  flex flex-direction align-center justify-center">
					<u-button :disabled="!checked.length" :customStyle="{'border-radius': '13rpx','height': '104rpx', 'font-size': '34rpx'}" size="large" type="primary"
						@click="submit" text="确认提交修改">
					</u-button>
				</view>
				
			</view>

			<!-- <u-action-sheet :show="showBank" :actions="actions" keyName="bankname" title="请选择开户行" @close="showBank = false"
				@select="bankSelect">
			</u-action-sheet> -->
			    <u-picker :show="showBank" :columns="actions" keyName="bankname" title="请选择开户行" @close="showBank = false" @confirm="bankSelect" ></u-picker>
	
		</view>
	</view>
</template>

<script>
	import {getBank, setBank, getCardBank} from '@/api/system/user.js'
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				form: {
					huming: '',
					bank: '',
					mobile: '',
					kahao: '',
					cardid: ''
				},
				cardInfo: {},
				showBank: false,
				actions: [{
						name: '中国银行',
					},
					{
						name: '建设银行',
					},
					{
						name: '招商银行',
					},
				],
				selectPlatforms: [],
				rules: {
					"huming": [{
						required: true,
						message: '请输入用户名',
						trigger: ['blur', 'change']
					}],
					"bank": [{
						required: true,
						message: '请选择开户行',
						trigger: ['blur', 'change']
					}],
					"mobile": [{
						required: true,
						message: '请输入手机号码',
						trigger: ['blur', 'change']
					},{
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
					"kahao": [{
						required: true,
						message: '请输入银行卡号',
						trigger: ['blur', 'change']
					}],
					"cardid": [{
						required: true,
						message: '请输入身份证信息',
						trigger: ['blur', 'change']
					}],

				},

				loading: false,
				showPlatForms: false,
				checked: ['agree'],
				disabled1: false,
				agree: [{
					text: "已阅读并同意",
					value: 0,
				}, ],
				platformList: [

				]
			}
		},
		computed: {
			...mapGetters(['userInfo', 'sysConfig'])
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
			let platform = this.sysConfig.platformTypes
			platform.forEach((item) => {
				let obj = {
					text: item.text,
					value: item.code
				}
				this.platformList.push(obj)
			})
		},
		onLoad() {
			this.getBankList()
			this.getCardBankInfo()
		},
		methods: {
			getCardBankInfo() {
				getCardBank().then((res) => {
					this.form = res.mybank
					this.cardInfo = res.mybank
				})
			},
			getBankList() {
				this.actions = []
				getBank().then((res) => {
					this.actions.push(res.banklist)
					// res.banklist.forEach((item) => {
					// 	let obj = {
					// 		name: item.bankname,
					// 		code: item.bankno
					// 	}
					// 	this.actions.push(obj)
					// })
				})
			},
			bankSelect(e) {
				console.log(e.value[0].bankno)
				this.form.bank = e.value[0].bankno
				this.showBank = false
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					// uni.$u.toast('校验通过')
					setBank(this.form).then((res) => {
						uni.showToast({
							title: '提交成功',
							icon: 'success'
						})
						this.getCardBankInfo()
						this.reset()
						
					})
				}).catch(errors => {
					uni.$u.toast(this.$t('Data verification failed'))
				})
			},
			reset() {
				this.selectPlatforms = [];
				const validateList = ['huming', 'bank', 'mobile', 'cardid', 'kahao']
				this.$refs.form.resetFields()
				this.$refs.form.clearValidate()
				setTimeout(() => {
					this.$refs.form.clearValidate(validateList)
					// 或者使用 this.$refs.form1.clearValidate()
				}, 10)
			},
			handleChange(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F6F5F8;
	}

	.finance {
		&-content {
			padding: 16rpx 18rpx;

			/deep/ .u-button--primary {
				border-radius: 13rpx !important;
			}
			.bottom-wrapper{
				margin-top: 63rpx;
				padding: 0 37rpx;
				.tips{
					color: #3F3F3F;
					font-size: 24rpx;
					opacity: 0.8;
				}
			}
			.xieyi {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				
				margin-bottom: 47rpx;
				color: #3F3F3F;
				font-size: 24rpx;
			}
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

	.u-form {

		background: #FFFFFF;
		border-radius: 18rpx;
		padding: 0 40rpx;

		/deep/ .u-line {
			border-bottom: 1rpx solid rgba(174, 174, 174, 0.3) !important;

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
			padding-left: 26rpx;
		}

		/deep/ .u-form-item__body__left__content__label {
			color: #3F3F3F;
			font-size: 36rpx;
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
			color: #AEAEAE;
			font-size: 36rpx;
		}

		/deep/ .uni-input-placeholder {
			color: #AEAEAE !important;
			font-size: 36rpx;
			// font-family: 'AlibabaPuHuiTiR';
			// font-weight: 400;
		}

		/deep/ .u-textarea {
			background-color: transparent;
			color: #EFEFEF;

			.u-form-item__body__right__message {
				text-align: left;
			}
		}

		/deep/ .u-textarea__field {
			color: #EFEFEF;
		}
	}
</style>