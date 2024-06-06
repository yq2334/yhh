<template>
	<view class="">
		<u-navbar leftText="商户信息" :fixed="false" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<view class="personSetting">
			<view class="title">
				基础信息
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
						<span>机具号</span>
					</view>
					<view class="right ">
						<span id="text1">{{userInfo.jcinfo.jijuhao}}</span>
						<span id="copy1" class="icon-copy" @click="copy(userInfo.jcinfo.jijuhao)"></span>
				
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
						<span>经营范围</span>
					</view>
					<view class="right ">
						<span>{{userInfo.jcinfo.jingying}} </span>
					</view>
				</view>
				<view href="" class="flex noBorder-Bottom">
					<view class="left">

						<span>所属地址</span>
					</view>
					<view class="right ">
						<span>{{userInfo.jcinfo.address}}</span>


					</view>
				</view>




			</view>
			<view class="title">
				账户信息
			</view>

			<view class="personSetting-list">
				<view class="flex">
					<view class="left">
						<span>结算户名</span>
					</view>
					<view class="right ">
						<span id="text1">{{userInfo.zhanghu.bankname}}</span>

					</view>
				</view>
				<view class="flex">
					<view class="left">
						<span>结算卡号</span>
					</view>
					<view class="right ">
						<span id="text1">{{userInfo.zhanghu.banknum}}</span>

					</view>
				</view>
				<view class="flex">
					<view class="left">
						<span>身份证号</span>
					</view>
					<view class="right ">
						<span id="text1">{{userInfo.zhanghu.cardnum}}</span>

					</view>
				</view>
				<view class="flex">
					<view class="left">
						<span>结算类型</span>
					</view>
					<view class="right ">
						<span id="text1">{{userInfo.zhanghu.jstype}}</span>

					</view>
				</view>
				<view class="flex">
					<view class="left">
						<span>认证状态</span>
					</view>
					<view class="right ">
						<span id="text1">{{userInfo.zhanghu.zhuangtai}}</span>

					</view>
				</view>
			</view>
			<!-- <view class="title">
				额度
			</view>

			<view class="personSetting-list">
				<view class="flex">
					<view class="left">
						<span>单笔限额</span>
					</view>
					<view class="right ">
						<span id="text1">{{userInfo.edu.danbi}}</span>

					</view>
				</view>
				<view class="flex">
					<view class="left">
						<span>单日限额</span>
					</view>
					<view class="right ">
						<span id="text1">{{userInfo.edu.danri}}</span>

					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		getMyInfo
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				userInfo: {
					jcinfo: {
						shanghuno: '',
						jijuhao: '',
						shname: '',
						jingying: '',
						address: ''
					},
					edu: {
						
					},
					zhanghu: {
						bankname: '',
						banknum: '',
						cardnum: '',
						jstype: '',
						zhuangtai: ''
					}
				}
			};
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				getMyInfo().then((res) => {
					if (res.code == '00') {
						this.userInfo = res
					}else{
						setTimeout(() => {
							this.$tab.switchTab('/pages/home/home')
						}, 2000)
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
<style lang="scss">
	page {
		background-color: #F4F2F5;
	}
</style>
<style lang="scss" scoped>
	

	.personSetting {
		.flex {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.title {
			padding: 28rpx 31rpx;
			font-size: 28rpx;
			color: #6239DF;
		}

		&-list {
			padding: 0 33rpx;
			background-color: #ffffff;

			// margin-top: 28rpx;
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
						// margin-left: 30rpx;
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