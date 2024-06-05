<template>
	<view class="">
		<u-navbar leftText="商户基本信息" :fixed="false" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-left" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view class="personSetting">
			<view class="personSetting-list ">
				<view class="noBorder-Bottom">
					<view href="" class="flex ">
						<view class="left">
							<span>我的头像</span>
						</view>
						<view class="padding-tb-sm">
							<image class="avatar" src="/static/images/store/avatar.png" alt=""></image>
						</view>
					</view>
						
				</view>
		
			</view>
			<view class="personSetting-list">
				
					<view class="flex">
						<view class="left">
							<span>商户编号</span>
						</view>
						<view class="right ">
							<span id="text1">{{userInfo.jcinfo.shanghuno}}</span>
							<span id="copy1" class="icon-copy" @click="copy(userInfo.jcinfo.shanghuno)"></span>
							
						</view>
					</view>
					<view class="flex">
						<view class="left">
							<span>商户名称</span>
						</view>
						<view class="right ">
							<span> {{userInfo.jcinfo.shname}}</span>
						</view>
					</view>
		
					<view class="flex">
						<view class="left">
							<span>商户手机</span>
						</view>
						<view class="right ">
							<span>{{userInfo.jcinfo.shname}} </span>
						</view>
					</view>
					<view href="" class="flex noBorder-Bottom">
						<view class="left">
							
							<span>注册时间</span>
						</view>
						<view class="right ">
							<span>2023-03-24 19:00:01</span>
							
							
						</view>
					</view>
		
		
				
		
			</view>
			<view class="personSetting-list">
				<view class="flex flex-start noBorder-Bottom">
					<view class="left">
						<span>注册地址</span>
					</view>
					<view class="block-r">
						<p>广东省-深圳市-天河区</p>  
						<view class="right ">
							<span> 修改地址</span>
							<u-icon class="margin-left-sm" color="#979899" size="18" name="arrow-right"></u-icon>
						</view>
					</view>
						
				</view>
		
			</view>
			<view class="personSetting-list">
				<view class="flex noBorder-Bottom">
					<view class="left">
						<span>受益人</span>
					</view>
					<view class="right ">
						<span class="fa"> *龙</span>
						<u-icon class="margin-left-sm" color="#979899" size="18" name="arrow-right"></u-icon>
					</view>
				</view>
		
			</view>
			<view class="personSetting-list">
				<view class="flex noBorder-Bottom">
					<view class="left">
						<span>微信认证</span>
					</view>
					<view class="right ">
						<span class=""> 查看进度、完成认证</span>
						<u-icon class="margin-left-sm" color="#979899" size="18" name="arrow-right"></u-icon>
					</view>
				</view>
		
			</view>
		</view>
	</view>
</template>

<script>
	import {getMyInfo} from '@/api/system/user.js'
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				getMyInfo().then((res) => {
					if(res.code == '00') {
						this.userInfo = res
					}
				})
			},
			copy(text) {
				// #ifdef H5
				this.$mHelper.h5Copy(text)
				// #endif
				uni.setClipboardData({
					data: text,
					success: () => {
						uni.showToast({
							icon: 'success',
							title: '复制成功'
						});
					}
				});
			
			}
		},
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #FAFAFB;
	}
	.personSetting {
		.flex {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&-list {
			padding: 0 52rpx;
			background-color: #ffffff;
			margin-top: 28rpx;
				&>view {
					position: relative;
					border-bottom: solid 1px #f1f1f1;
					.left {
						padding: 40rpx 0;
						display: flex;
						align-items: center;
						color: #333333;

						span {
							font-size: 28rpx;
							margin-left: 30rpx;
						}
					}

					.avatar {
						width: 115rpx;
						height: 115rpx;
						border-radius: 50%;
					}

					.icon {
						font-size: 28rpx;
						color: #979899;
					}

					.right {
						font-size: 28rpx;
						color: #999999;
						display: flex;
						align-items: center;
					}

					.flex-start {
						align-items: flex-start;
					}

					.fa {
						color: #473bd9;
					}

					.block-r {
						padding-top: 40rpx;
						padding-bottom: 50rpx;

						p {
							color: #999999;
							font-size: 28rpx;
						}

						.right {
							font-size: 28rpx;
							color: #473bd9;
							display: flex;
							align-items: center;
							text-align: right;
							justify-content: flex-end;
						}
					}
				}
			
		}

		.btn-primary {
			width: 951rpx;
			display: block;
			margin: 60rpx auto;
			font-size: 42rpx;
		}

		.icon-copy {
			width: 36.67rpx;
			height: 36.67rpx;
			background: url(~@/static/images/store/copy.png) no-repeat;
			background-size: 100% 100%;
			margin-left: 16rpx;
		}
	}

	.personSetting2 {
		.flex {
			justify-content: flex-start;

			.left {
				width: 40%;
			}

			color: #666666;
		}

		.btn-primary {
			font-size: 56rpx;
		}
	}
</style>