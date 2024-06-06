<template>
	<view class="team">
		<u-navbar leftText="返回" :fixed="false" bgColor="transparent" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636"  leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" slot="right">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>
		
			</view>
		</u-navbar>
		<view class="team-content">
			<view class="wrapper margin-bottom-sm" v-for="(item,index) in list" :key="index">
				<view class="top flex align-center justify-between">
					<text>代理商</text>
					<text>下级</text>
					<text>团队激活</text>
					<text>本月交易</text>
				</view>
				<view class="split">
					
				</view>
				<view class="bottom flex align-center justify-between">
					<text>{{item.mingchneg}}</text>
					<text>{{item.xjnum}}</text>
					<text>{{item.jhnum}}</text>
					<text>{{item.jiaoyi}}</text>
				</view>
				<image   @click="$tab.navigateTo('/pages/team/detail?bianhao='+item.bianhao)" src="/static/images/wallet/tag-op.png" mode=""></image>
			</view>
			<u-loadmore :status="status" @loadmore="loadmore" />
			
		</view>
	</view>
</template>

<script>
	import {getFriendList} from '@/api/system/user.js'
	export default {
		data() {
			return {
				list: [],
				page: 1,
				pageSize: 10,
				total: 0,
				pageNumber:0,
				status: 'loadmore',
			};
		},
		onLoad() {
			this.getList()
		},
		
		onReachBottom() {
			console.log('我滚动到底部了~')
			if (this.page >= this.pageNumber) {
				this.status = 'nomore';
				return;
			} else {
				this.status = "loading"
			}
			// this.page++;
			this.pageSize += this.pageSize
			this.getList()
			// console.log('我滚动到底部了~')
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getList();
			uni.startPullDownRefresh({
				
			})
		},
		methods: {
			getList() {
				getFriendList({
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
					uni.stopPullDownRefresh()
					this.total = res.totalnum
					
					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize) 
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.huobanlist
					} else {
						this.list = this.list.concat(res.huobanlist)
						
					}
					if (this.page >= 	this.pageNumber) {
						this.status = 'nomore';
					} else {
						this.status = 'loadmore';
					}
					
					
				})
			},
			loadmore() {
				if (this.page >= this.pageNumber) {
					this.status = 'nomore';
					return;
				} else {
					this.status = "loading"
				}
				// this.page++;
				this.pageSize += this.pageSize
				this.getList()
			},
		},
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F6F5F8;
	}
.team{
	background: url(~@/static/images/wallet/bg-7.png) no-repeat top;
	background-size: 100% 372rpx;
	&-content{
		padding: 22rpx;
		.wrapper{
			background: #FFFFFF;
			border-radius: 18rpx;
			padding: 32rpx;
			position: relative;
			padding-right: 71rpx;
			image{
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 49rpx;
				height: 113rpx;
			}
			.top{
				font-size: 26rpx;
				color: rgba(63, 63, 63, 0.8);
				
				text{
					width: 25%;
					text-align: center;
				}
			}
			.split{
				height: 1rpx;
				background: rgba(174, 174, 174, 0.3);
				margin: 20rpx 0;
			}
			.bottom{
				color: #000000;
				font-size: 32rpx;
				
				text{
					width: 25%;
					text-align: center;
				}
			}
		}
	}
}
</style>
