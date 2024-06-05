<template>
	<view>
		<u-navbar leftText="认证成功" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			:border="true" @leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-left"
			leftIconSize="25" :titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view class="personSetting expand common-content">
			<view class="avatar">
				<image v-if="isSucess" src="../../static/images/store/success.png" mode=""></image>
				<image v-else src="../../static/images/store/failed.jpg" mode=""></image>
			</view>
			<h1>{{isSucess ? '已提交审核' : '入网失败'}}</h1>
			<p>{{subText}}
			</p>
			<!-- <u-button @click="$tab.navigateTo('/pages/login')" class="btn btn-primary fs56" text="知道了"></u-button> -->
			<view class="action-btn padding-lr-xl">

				<u-button @click="handleNav()" :customStyle="{'border-radius': '10rpx'}"
					size="large" type="primary" :text="text">
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ruWangSubmit,
		ruWangSubmitGeTi
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				orderno: '',
				rwtype: '',
				text: '商户入网中...',
				isSucess: true,
				subText: ''
			};
		},
		onLoad(options) {
			this.orderno = options.orderno;
			this.rwtype = options.rwtype;
			if(options.rwtype == 'geti') {
				this.getRuWangGeti();
				return;
			}
			this.getRuWang()
		},
		methods: {
			getRuWang() {
				ruWangSubmit({
					orderno: this.orderno
				}).then((res) => {
					this.subText = res.msg
					if (res.code == '00') {
						this.isSucess = true
						this.text = '入网成功'
						uni.showToast({
							title:this.text,
							icon:'success'
						})
						// uni.showModal({
						// 	title: '提示',
						// 	content: '入网成功',
						// 	showCancel: false,
						// 	success: (event) => {
						// 		// this.$tab.navigateTo('/pages/home/home')
						// 	}
						// })
					} else if (res.code == '099') {
						this.isSucess = false
						this.text = '我已知晓'
						uni.showToast({
							title:this.text,
							icon:'error'
						})
						// uni.showModal({
						// 	title: '提示',
						// 	content: '入网失败',
						// 	showCancel: false,
						// 	success: (event) => {
						// 		// this.$tab.navigateTo('/pages/home/home')
						// 	}
						// })
					} else {
						this.isSucess = false
						this.text = '入网失败'
					}

				})
			},
			getRuWangGeti() {
				ruWangSubmitGeTi({
					orderno: this.orderno
				}).then((res) => {
					this.subText = res.msg
					if (res.code == '00') {
						this.isSucess = true
						this.text = '入网成功'
						uni.showToast({
							title:this.text,
							icon:'success'
						})
						// uni.showModal({
						// 	title: '提示',
						// 	content: '入网成功',
						// 	showCancel: false,
						// 	success: (event) => {
						// 		// this.$tab.navigateTo('/pages/home/home')
						// 	}
						// })
					} else if (res.code == '099') {
						this.isSucess = false
						this.text = '我已知晓'
						uni.showToast({
							title:this.text,
							icon:'error'
						})
						// uni.showModal({
						// 	title: '提示',
						// 	content: '入网失败',
						// 	showCancel: false,
						// 	success: (event) => {
						// 		// this.$tab.navigateTo('/pages/home/home')
						// 	}
						// })
					} else {
						this.isSucess = false
						this.text = '入网失败'
					}
				
				})
			},
			handleNav() {
				if(this.isSucess) {
					this.$tab.switchTab('/pages/home/home')
				}else{
					uni.showToast({
						title: '入网失败',
						icon:'error'
					})
					this.$tab.switchTab('/pages/home/home')
				}
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.expand {
		.avatar {
			padding: 129rpx 0 50rpx 0;
			background-color: #fff;

			image {
				width: 242rpx;
				height: 279rpx;
				display: block;
				margin: 0 auto;
			}
		}

		h1 {
			text-align: center;
			font-size: 45rpx;
			color: #000;
		}

		p {
			text-align: center;
			color: #999999;
			font-size: 32rpx;
			padding: 50rpx 100rpx;
		}

		.action-btn {
			margin-top: 100rpx;
		}

		.btn-primary {
			display: block;
			text-align: center;
			line-height: 134rpx;
			font-size: 48rpx;
		}
	}
</style>