<template>
	<view class="merchant ">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
			<view class="search flex align-center" :style="{marginRight: rightX + 'px'}" slot="right" @click="openSearchPop">
				<text style="fontSize: 34rpx">筛选查询</text>
				<u-icon size="30" color="#363636" name="search"></u-icon>
			</view>
		</u-navbar>
		
		<common-view>
			<view class="merchant-content ">
				<view class="tabs">
					<view class="item " :class="current == 0 && 'active'" @click="changeTab(0)">
						<text>交易查询</text>
					</view>
					<view class="item" :class="current == 1 && 'active'" @click="changeTab(1)">
						<text>结算查询</text>

					</view>
				</view>
				<view class="list">
					<view class="item " v-for="(item,index) in list" :key="index">
						<view class="flex justify-between align-center">
							<view class="left flex align-center">
								<image v-if="current == 0" class="icon" src="/static/images/wallet/pay.png" mode="">
								</image>
								<view v-else class="ttype">
									T0
								</view>
								<view class="margin-left-xs">
									<h1>{{item.jiaoyitype}}</h1>
									<h3>{{item.jiaoyitime}}</h3>
								</view>
							</view>
							<view class="right">
								<h1>
									<span>¥</span>
									{{item.jiaoyijine}}
								</h1>
								<h3>
									{{item.zhuangtai}}
								</h3>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" @loadmore="loadmore" />
			</view>
		</common-view>
		<search-pop ref="searchPop" :columns="columns" @submit="doSearch"></search-pop>
	</view>
</template>

<script>
	import {
		getJiaoyiList,
		getJiesuanList
	} from '@/api/system/user.js'
	import SearchPop from '../search/index.vue'
	export default {
		data() {
			return {
				current: 0,
				rightX: 0,
				list: [],
				page: 1,
				pageSize: 10,
				total: 0,
				pageNumber: 0,
				status: 'loadmore',
				columns: [

					{
						type: 'date',
						label: '开通日期',
						model: 'date',
						dateZone: [{
								model: 'startDate',
								showModel: 'DataFrom',
								placeholder: '请选择开始日期',
								showStartDate: false
							},
							{
								model: 'endDate',
								showModel: 'DataTo',
								placeholder: '请选择结束日期',
								showEndDate: false
							}
						]
					},
				],
				searh: {
					DataFrom: uni.$u.timeFormat(new Date(), 'yyyy-mm-dd'),
					DataTo: uni.$u.timeFormat(new Date(), 'yyyy-mm-dd')
				}
			};
		},
		components: {
			SearchPop
		},
		onLoad(options) {
			this.current = options.tab
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
		onReady() {
			// #ifdef MP-WEIXIN
			let res = uni.getMenuButtonBoundingClientRect()
			console.log(res)
			this.rightX = res.width
			// #endif
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getList();
			// #ifndef MP-WEIXIN
			uni.startPullDownRefresh({
			
			})
			// #endif
			
		},
		methods: {
			changeTab(tab) {
				this.page = 1;
				this.current = tab
				this.getList()
			},
			getList() {
				this.current == 0 ? this.getDirectList() : this.getTeamList()
			},
			getDirectList() {
				getJiaoyiList({
					page: this.page,
					pageSize: this.pageSize,
					DataFrom: this.searh.DataFrom,
					DataTo: this.searh.DataTo,
				}).then((res) => {
					uni.stopPullDownRefresh()
					this.total = res.totalnum

					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.jiaoyilist
					} else {
						this.list = this.list.concat(res.jiaoyilist)

					}
					if (this.page >= this.pageNumber) {
						this.status = 'nomore';
					} else {
						this.status = 'loadmore';
					}


				})
			},
			getTeamList() {
				getJiesuanList({
					page: this.page,
					pageSize: this.pageSize,
					DataFrom: this.searh.DataFrom,
					DataTo: this.searh.DataTo,
				}).then((res) => {
					this.total = res.totalnum

					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.jiaoyilist
					} else {
						this.list = this.list.concat(res.jiaoyilist)

					}
					if (this.page >= this.pageNumber) {
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

			},
			openSearchPop() {
				this.$refs.searchPop.show = true
			},
			doSearch(form) {

				this.searh.DataFrom = uni.$u.timeFormat(form.startDate, 'yyyy-mm-dd')
				this.searh.DataTo = uni.$u.timeFormat(form.endDate, 'yyyy-mm-dd')
				this.page = 1;
				this.getList()
				console.log(this.searh)
			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F6F5F8
	}

	// $status-bar: var(--status-bar-height);
	.merchant {

		// padding-top: calc(48px + #{$status-bar});
		&-content {
			padding: 25rpx;
		}

		.tabs {
			padding: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #FFFFFF;
			border-radius: 12rpx;

			.item {
				width: 50%;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				color: #545454;
				font-size: 32rpx;

				&.active {
					background: #fff;
					border-radius: 12rpx;
					position: relative;

					&::after {
						content: '';
						position: absolute;
						width: 137rpx;
						height: 4rpx;
						background: linear-gradient(0deg, #9838EE, #4A3BE2);
						border-radius: 2rpx;
						left: 50%;
						transform: translateX(-50%);
						bottom: 0;
					}

					text {
						background: linear-gradient(-41deg, #9838EE 0%, #4A3BE2 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}
			}
		}

		.list {
			background: #FFFFFF;
			padding: 0 22rpx;
			margin-top: 25rpx;

			.item {

				border-radius: 12rpx;
				padding: 32rpx 0;
				font-size: 28rpx;
				color: rgba(0, 0, 0, 1);
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

				.top {
					padding: 18rpx 0;

					.left {
						color: #1B1B1B;
						font-size: 30rpx;

						text {
							color: #747474;
							margin-left: 18rpx;
						}
					}

					.detail {
						width: 129rpx;
						height: 37rpx;
						background: #FFF8ED;
						border-radius: 12rpx;
						text-align: center;
						line-height: 37rpx;
						color: #F49441;
						font-size: 26rpx;
					}
				}

				.left {
					.icon {
						width: 64rpx;
						height: 64rpx;
					}

					.ttype {
						width: 64rpx;
						height: 64rpx;
						font-size: 32rpx;
						color: #FFFFFF;
						font-weight: bold;
						text-align: center;
						line-height: 64rpx;
						border-radius: 50%;
						background: linear-gradient(180deg, #32B4FF, #16A7FC);
					}

					h1 {
						color: #010204;
						font-weight: bold;
						font-size: 30rpx;
					}

					h3 {
						font-size: 25rpx;
						color: #A9ADAF;
					}
				}

				.right {
					text-align: right;

					h1 {
						span {
							font-size: 28rpx;
						}

						color: #000000;
						font-weight: bold;
						font-size: 40rpx;
					}

					h3 {
						font-size: 24rpx;
						color: #010204;
					}
				}

				.label {
					color: rgba(63, 63, 63, 0.8);
					font-size: 26rpx;
				}

				.split {
					height: 1rpx;
					background: #000000;
					opacity: 0.1;
				}

				.bottom {
					padding-bottom: 25rpx;

					&>view {
						width: 33.33%;
					}

					h3 {
						font-size: 28rpx;
						color: rgba(63, 63, 63, 0.8);
						margin-bottom: 10rpx;
					}

					h1 {
						color: #000000;
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>