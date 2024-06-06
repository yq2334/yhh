<template>
	<view>
		<u-navbar leftText="常见问题" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000000" leftIcon="arrow-left" leftIconSize="25"
			:titleStyle="{color: '#000000',fontSize: '32rpx'}">
			<!-- <view class="search flex align-center" slot="right">
				<u--image :showLoading="true" src="/static/images/store/more.png" width="43rpx" height="41rpx"
					mode="aspectFit"></u--image>
			</view> -->
		</u-navbar>
		<common-view>


			<view class="question ">
				<!-- 	<view class="question-top">
				<u-search v-model="keyword" :showAction="true" bgColor="#EDF1F4" :actionStyle="{'color': '#473BD9'}" actionText="搜索" ></u-search>

			</view> -->
				<view class="question-list">
					<view class="item" v-for="(item,index) in list" :key="index"
						@click="$tab.navigateTo('/packageA/pages/question/detail?id='+item.Id)">
						<h1>
							{{item.title}}
						</h1>
						<p>
							{{item.title}}
						</p>
						<view class="bottom">
							<span class="flex">
								<i class="icon-eyes"></i>
								{{item.addtime}}
							</span>
							<span class="flex">
								查看全文
								<u-icon size="15" color="#979899" name="arrow-right"></u-icon>
							</span>
						</view>
					</view>
				</view>
			</view>
		</common-view>
	</view>
</template>

<script>
	import {
		get_qalist
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				list: [],
				page: 1,
				pageSize: 10,
				total: 0,
				pageNumber: 0,
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
			this.page++;
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
				get_qalist({
					page: this.page,
					pageSize: this.pageSize
				}).then((res) => {
					uni.stopPullDownRefresh()
					this.total = res.totalnum

					this.pageNumber = Math.ceil(Number(res.totalnum) / this.pageSize)
					console.log(this.pageNumber)
					if (this.page == 1) {
						this.list = res.newslist
					} else {
						this.list = this.list.concat(res.newslist)

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
				this.page++;
				this.getList()
			},
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FAFAFB;
	}

	.question {
		// border-top: 1px solid #f1f1f1;

		&-top {
			padding: 20rpx 36rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;


		}

		&-search {
			width: 85%;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #edf1f4;
			border-radius: 60rpx;
			padding: 0 48rpx;

			.icon-search {
				width: 53rpx;
				height: 53rpx;
				background: url(~@/static/images/store/search.png) no-repeat;
				background-size: 100% 100%;
				display: inline-block;
			}

			input {
				flex: auto;
				padding-top: 0;
				padding-bottom: 0;
				padding-left: 12rpx;
				background: transparent;
				border-radius: 60rpx;
				border: 1px solid transparent;
				font-size: 40rpx;
				margin: 0;
				padding-left: 22rpx;

				// color: #000;
				&::placeholder {
					color: #c5c8c9;
					font-size: 40rpx;
				}

				&:focus {}
			}
		}

		.search2 {
			height: 130rpx;
			background-color: #edf1f4;
			border-radius: 20rpx;
		}

		&-list {
			padding: 0 30rpx;

			.title {
				display: flex;
				align-items: center;
				color: #141519;
				font-size: 40rpx;
				padding: 30rpx 0 48rpx 0;

				.icon-hot {
					width: 53rpx;
					height: 58rpx;
					// background: url(~@/static/images/store/hot.png) no-repeat;
					// background-size: 100% 100%;
					display: inline-block;
					margin-right: 10rpx;
				}
			}

			.mui-table-view-cell {
				padding: 60rpx 0;

				&::after {
					left: 0;
					background-color: #f1f1f1;
				}

				&::before {
					position: absolute;
					right: 0;
					top: 0;
					left: 0;
					height: 1px;
					content: '';
					transform: scaleY(.5);
					background-color: #f1f1f1;
				}
			}

			.mui-table-view-cell>a:not(.mui-btn) {
				margin: -11px 0;
			}

			.mui-navigate-right {
				color: #141519;
				font-size: 40rpx;
				font-weight: bold;
			}

			.mui-navigate-right:after {
				color: #979797;
				font-size: 48rpx;
			}

			.mui-table-view-cell.mui-active {
				background-color: transparent;
			}

			.icon-eyes {
				width: 26rpx;
				height: 18rpx;
				background: url(~@/static/images/store/eyes.png) no-repeat;
				background-size: 100% 100%;
				display: inline-block;
			}

			.item {
				background-color: #ffffff;
				border-radius: 7rpx;
				padding: 24rpx 20rpx;
				margin-top: 20rpx;

				h1 {
					color: #333333;
					font-size: 31rpx;
					margin-bottom: 18rpx;
				}

				p {
					color: #999999;
					font-size: 27rpx;
					margin: 20rpx 0;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}

			.bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.flex {
					display: flex;
					align-items: center;
					color: #666666;
					font-size: 25rpx;

					&:nth-of-type(1) {
						i {
							margin-right: 10rpx;
						}
					}

					&:nth-of-type(2) {}
				}
			}
		}
	}
</style>