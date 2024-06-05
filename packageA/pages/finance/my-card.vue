<template>
	<view class="myCard">
		<u-navbar leftText="返回"  bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<common-view>
			<view class="myCard-top flex align-center justify-between ">
				<view class="left">
					结算卡变更
				</view>
				<view class="add flex align-center justify-center"
					@click="$tab.navigateTo('/packageA/pages/finance/jiesuan-change')">
					<image class="" src="/static/images/add.png" mode="aspectFill"></image>
					<text>添加结算卡</text>
				</view>
			</view>
			<view class="card-list">
				<view class="title">
					当前结算卡
				</view>
				<view class="card flex justify-center align-start margin-bottom" 
					>
					<image class="bank-icon margin-right" src="/static/images/bank-icon.png" mode="aspectFill"></image>
					<view class="">
						<h3>{{banktype_use}}</h3>
						<!-- <h3>(银行卡)</h3> -->
						<h3>{{banknum_use}}</h3>
					</view>
					<view class="margin-left-xl">
						<!-- <view class="tag">
						储蓄卡
					</view> -->
					</view>
					<image class="select" src="/static/images/gou.png" mode=""></image>
				
				</view>
				<view class="card flex justify-center align-start margin-bottom disabled" 
					v-for="(item,index) in banklist" :key="index" @click="changeCard(item)">
					<image class="bank-icon margin-right" src="/static/images/bank-icon.png" mode="aspectFill"></image>
					<view class="">
						<h3>{{item.banktype}}</h3>
						<!-- <h3>(银行卡)</h3> -->
						<h3>{{item.banknum}}</h3>
					</view>
					<view class="margin-left-xl">
						<!-- <view class="tag">
						储蓄卡
					</view> -->
					</view>
					

				</view>
			</view>
		</common-view>
	</view>
</template>

<script>
	import {getbank_BianGengList, getbank_BianGengSubmit} from '@/api/system/user.js'
	export default {
		data() {
			return {
				banklist: [],
				banktype_use: '',
				banknum_use: ''
			};
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData() {
				getbank_BianGengList().then((res) => {
					if(res.code == '00') {
						this.banktype_use = res.banktype_use
						this.banknum_use = res.banknum_use
						this.banklist = res.banklist
					}
				})
			},
			changeCard(item){
				uni.showModal({
					title:'提示',
					content:'是否变更当前结算卡？',
					success: (res) => {
						if(res.confirm) {
							getbank_BianGengSubmit({
								bankid: item.bankid
							}).then((res) => {
								if(res.code == '00') {
									uni.showToast({
										title:res.msg,
										icon:'success'
									})
									this.initData()
								}
							})
						}
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.myCard {
		
		&-top {
			padding:  32rpx;
			height: 106rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 3rpx 0rpx rgba(52, 52, 52, 0.1);

			.left {
				font-size: 32rpx;
				color: #323232;
				font-weight: bold;
			}

			.add {
				padding: 0 10rpx;
				height: 58rpx;
				border: 1px solid #863AE5;
				border-radius: 28rpx;
				font-size: 29rpx;
				color: #6239DF;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 2rpx;
				}
			}
		}

		.card-list {
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 3rpx 0rpx rgba(52, 52, 52, 0.1);
			padding: 0 32rpx 27rpx 32rpx;

			.title {
				font-size: 32rpx;
				color: #323232;
				padding: 40rpx 5rpx;
			}

			.card {
				padding: 80rpx 0 57rpx 0;
				border: 6rpx solid rgb(169, 104, 249);
				border-radius: 17rpx;
				background-image: linear-gradient(55deg, rgb(98, 57, 223) 0%, rgb(134, 58, 229) 100%);
				position: relative;

				.bank-icon {
					width: 89.58rpx;
					height: 89.58rpx;
				}

				h3 {
					font-size: 32rpx;
					color: #FFFFFF;
					font-weight: 400;
				}

				.tag {
					width: 98rpx;
					height: 42rpx;
					background: linear-gradient(180deg, #FC5163, #FF8B99);
					border-radius: 21rpx;
					text-align: center;
					line-height: 42rpx;
					font-size: 25rpx;
					color: #FFFFFF;
				}

				.select {
					position: absolute;
					bottom: 0;
					right: 0;
					width: 106rpx;
					height: 78rpx;
				}
			}

			.disabled {
				opacity: 0.4;
			}
		}
	}
</style>