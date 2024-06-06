<template>
	<view>
		<u-navbar leftText="商户信息核实提示" :fixed="false" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			:border="true" @leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<view class="content">
			<view class="detail padding-top" v-html="detail">

			</view>
			<view class="action-btn">
				<u-button @click="$tab.navigateTo('/pages/signature/index')" :customStyle="{'border-radius': '44rpx'}"
					size="large" type="primary" text="点击进行信息确认">
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {getXieyidetail} from '@/api/system/user.js'
	export default {
		data() {
			return {
				detail: ''
			};
		},
		onLoad() {
			this.getXieyi()
		},
		methods: {
			getXieyi() {
				getXieyidetail().then((res) => {
					if(res.code == '00') {
						this.detail = res.xydetail.body
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 58rpx 160rpx 58rpx;
		.detail{
			
		}
	}

	.action-btn {
		margin-top: 80rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 150rpx;
		background: #fff;
		/deep/ .u-button{
			width: 80%;
			
		}
	}
</style>