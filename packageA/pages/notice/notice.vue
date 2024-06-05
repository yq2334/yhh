<template>
	<view class="notice">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view class="common-content">
			<view class="notice-content">
				<view class="list">
					<view class="item flex align-center justify-between" v-for="(item,index) in list" :key="index"
						@click="$tab.navigateTo('/packageA/pages/notice/detail?id='+item.Id)">
						<view class="flex align-center">
							<view class="msg margin-right-sm">
								<u--image class="arrow " :showLoading="true" src="/static/images/msg.png" width="28rpx"
									height="27rpx" mode="aspectFit"></u--image>
							</view>
							<text>{{item.title}}</text>
						</view>
						<u-icon class="margin-left-sm" color="#696969" size="18" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getNewList
	} from "@/api/system/user.js"
	import {
		getToken
	} from '@/utils/auth';
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				getNewList({
					fid: this.globalConfig.api.fid,
					fkey: this.globalConfig.api.fkey,
					apiname: 'ysh.newslist',
					token: getToken()
				}).then((res) => {
					console.log(res)
					this.list = res.newslist
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

			.list {
				background: #FFFFFF;
				box-shadow: inset 0rpx 45rpx 110rpx 0rpx rgba(154, 55, 238, 0.2);
				border-radius: 17rpx;
				padding: 0 44rpx;

				.item {
					color: #282828;
					font-size: 29rpx;
					font-family: 'AlibabaPuHuiTiM';
					padding: 29rpx 0;
					border-bottom: 1rpx solid rgba(169, 169, 169, 0.3);

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
				}
			}
		}
	}
</style>