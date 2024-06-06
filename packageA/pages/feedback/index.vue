<template>
	<view class="content">
		<u-navbar  :fixed="true" bgColor="#fff" title="意见反馈" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636"  leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<view class="common-content">
			
		
		<view class="padding">
			<u--form labelPosition="left" :model="formData" :rules="rules" ref="form1" >
				<u-form-item prop="remark"  ref="item1">
					<u--textarea v-model="formData.remark" :maxlength="100" border="none" :count="true"
						placeholder="请输入内容">
					</u--textarea>
				</u-form-item>
				
				<view class="action-btn margin-top">
					<u-button @click="submit" 
						:customStyle="{'border-radius': '10rpx'}" size="large" type="primary" text="确认提交">
					</u-button>
				</view>
			</u--form>
		</view>
		</view>
	</view>
</template>

<script>
	import {
		tousu
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				txt: '',
				formData: {
					remark: '',
					
				},
				rules: {
					'remark': {
						type: 'string',
						required: true,
						message: '请输入您的建议',
						trigger: ['blur', 'change']
					},
				}
			}
		},
		methods: {
			submit() {
				this.$refs.form1.validate().then(res => {
					// uni.$u.toast('校验通过' + JSON.stringify(this.formData))
					tousu(this.formData).then((res) => {
						uni.showToast({
							title: '投诉成功',
							icon: 'success'
						})
						this.reset()
					})
				}).catch(errors => {
					uni.$u.toast('表单校验失败')
				})
			},
			reset() {
				const validateList = ['remark']
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
				setTimeout(() => {
					this.$refs.form1.clearValidate(validateList)
					// 或者使用 this.$refs.form1.clearValidate()
				}, 10)
			},
		},

		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background: #fff;
	}

	/deep/ .u-textarea {
		background-color: #EEEFF3;
	
	}
	/deep/ .u-textarea__field{
	color: #333 !important;
	font-size: 36rpx !important;
}
	/deep/ .uni-textarea-placeholder {
		font-size: 36rpx;
		color: #C7CBD2;
	}
	/deep/  .u-button__text {
		color: #fff;
		font-size: 28rpx !important;
		font-family: 'AlibabaPuHuiTiR';
	}
	.btn-wrap {
		margin: 150rpx auto 0 auto;
		width: 80%
	}
</style>