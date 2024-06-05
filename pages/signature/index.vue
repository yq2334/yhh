<template>
	<view class="sign">
		<u-navbar leftText="签名确认" :fixed="false" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			:border="true" @leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<view class="tips">
			<u--image class="margin-right-xs" :showLoading="true" src="/static/images/faild.png" width="30rpx"
				height="30rpx"></u--image>
			<text>注: 签名时请保证字体清晰。若核查时发现字体不清或非本人姓名，可能会影响您的正常交易。</text>
		</view>
		<ml-signature mode="vertical" :upload="true" @onSign="onSign"></ml-signature>

	</view>
</template>

<script>
	import mlSignature from "@/components/ml-signature/ml-signature.vue"
	import {
		uploadQianMing
	} from '@/api/system/user.js'
	export default {
		data() {
			return {

			};
		},
		components: {
			mlSignature
		},
		onLoad() {

		},
		onReady() {
			// this.$refs.signView.show()
		},
		methods: {
			onSign(e) {
				console.log(e)
				uploadQianMing({
					basecode: e
				}).then((res) => {
					if(res.code == '00') {
						
						uni.showModal({
							title: '提示',
							content: '上传签名成功',
							showCancel: false,
							success: (event) => {
								if(event.confirm) {
									uni.reLaunch({
										url: "/pages/home/home"
									})
									// this.$tab.switchTo('/pages/home/home')
								}
							}
						})
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.sign{
		overflow: hidden
		}
	.tips {
		height: 115rpx;
		display: flex;
		align-items: flex-start;
		color: #B21E17;
		font-size: 25rpx;
		background-color: #FAFAFB;
		padding: 20rpx 45rpx 0 45rpx;
	}
</style>