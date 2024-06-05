<template>
	<view>
		<u-navbar leftText="现有额度限额" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" border="bottom" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<view class="common-content">
			<view class="limit padding-top padding-lr">
				<view class="cell flex align-center justify-between">
					<text>单笔：</text>
					<text>￥{{edu_info.creditSingleAmt}}</text>
				</view>
				<view class="cell flex align-center justify-between">
					<text>单日：</text>
					<text>￥{{edu_info.creditDayAmt}}</text>
				</view>
				<view class="cell flex align-center justify-between">
					<text>单月：</text>
					<text>￥{{edu_info.creditMonAmt}}</text>
				</view>
				<view class="action-btn  margin-top-lg">
					<u-button @click="$tab.navigateTo('/packageA/pages/finance/merchant-up')"
						:customStyle="{'border-radius': '10rpx'}" size="large" type="primary" text="验证四要素提额">
					</u-button>
				</view>
				<view class="tips text-red margin-top text-right">
					您还可以做<text class="text-green">{{edu_info.canLiftQuotaTimes}}</text>次验证提额
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getEdu_info
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				edu_info: {}
			};
		},
		onLoad() {
			this.getEduInfo()
		},
		methods: {
			getEduInfo() {
				getEdu_info().then((res) => {

					this.edu_info = res
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.cell {
		padding: 40rpx 0;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
		color: #333;
		font-size: 32rpx;
	}
</style>