<template>
	<view class="notice">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view class="common-content">
			<view class="notice-content">
				<view class="wrapper">
					<view class="flex align-start">
						<view class="msg margin-right-sm">
							<u--image class="arrow " :showLoading="true" src="/static/images/msg.png" width="28rpx"
								height="27rpx" mode="aspectFit"></u--image>
						</view>
						<view class="">
							<h1>{{detail.title}}</h1>
							<p>{{detail.addtime}}</p>
						</view>
					</view>
					<view class="detail" v-html="detail.body">
						<!-- 	<p> 当消费者进店或即将进店时，店员可以适当的进行引导，在消费者进店后与消费者及时沟通，适时的温馨提醒，可能消费者就会在店员的引导中，选择自己想喝的饮品。同时，促销也是通过感情拉动的，通过有效的引导和沟通，让消费者想要购买的欲望增强。
					</p>
					<p>
						       能留住顾客试喝，是获取潜在顾客进一步沟通的机会。顾客驻足、停留品尝试喝饮品，已经表示顾客接受了你的服务。
					</p> -->
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		getNewListDetail
	} from "@/api/system/user.js"
	import {
		getToken
	} from '@/utils/auth';
	export default {
		data() {
			return {
				id: '',
				detail: {}
			};
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
		},
		methods: {
			getDetail() {
				getNewListDetail({
					fid: this.globalConfig.api.fid,
					fkey: this.globalConfig.api.fkey,
					apiname: 'ysh.newsdetail',
					token: getToken(),
					Id: this.id
				}).then((res) => {
					console.log(res)
					this.detail = res.tzdetail
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F8F8F8;
	}

	.notice {
		&-content {
			padding: 41rpx 22rpx;

			.wrapper {
				background: #FFFFFF;
				box-shadow: inset 0rpx 45rpx 110rpx 0rpx rgba(154, 55, 238, 0.2);
				border-radius: 17rpx;
				padding: 34rpx;

				.msg {
					width: 47rpx;
					height: 47rpx;
					background: linear-gradient(-10deg, rgba(154, 55, 238, 0.9), rgba(65, 59, 224, 0.9));
					box-shadow: 2rpx 2rpx 4rpx 0rpx #141414;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				h1 {
					font-size: 31rpx;
					color: #252525;
				}

				h3 {
					color: #999999;
					font-size: 24rpx;

				}

				.detail {
					font-size: 29rpx;
					color: #8E8E8E;
					text-indent: 40rpx;

					/deep/ p {
						margin-top: 38rpx !important;
					}
				}
			}

		}
	}
</style>