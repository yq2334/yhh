<template>
	<view class="changeCard">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<common-view>
			<view class="content ">
				<view class="card flex align-center">
					<view class="">
						<h3>满额批次结算方式</h3>

						<p>{{myedu}}</p>
					</view>
					<image class="bank-bg" src="/static/images/bank-bg.png" mode=""></image>
				</view>
				<view class="type">
					<!-- <view class="item flex align-center justify-between" @click="changeType(item)"
						:class="item.val == eduno && 'active'" v-for="(item,index) in edulist" :key="index">
						<view class="name">
							{{item.eduname}}
						</view>
						<view class="">
							<image v-if="item.eduno == eduno" class="checked" src="/static/images/checked-1.png"
								mode="">
							</image>
							<view v-else class="uncheck">

							</view>

						</view>
					</view> -->
					<view class="item flex">
						<u-input v-model="eduno" type="number" placeholder="请输入您要设置的到账额度" fontSize="20" color="#181818" shape="circle"
							border="none" clearable>
						</u-input>
					</view>
				</view>
				<view class="intro">
					<view class="title">
						到账说明
					</view>
					<view class="dec flex flex-wrap align-center margin-bottom" v-html="eduremark">

					</view>
					<!-- <view class="dec margin-bottom">
					<view class="margin-bottom">
						<view class="subtitle flex align-center">
							<span class="dot"></span><span>小时批次结算：</span>
						</view><span class="dot"></span>7:00至23:00整点结算前一小时的交易,预计在下个半点到账。
					</view>
					<p class="flex align-center"><span class="dot"></span>23:00至次日7:00间的交易,预计将在8:30左右到账。</p>
				</view>
				<view class="dec margin-bottom">
					<view class="margin-bottom">
						<view class="subtitle flex align-center">
							<span class="dot"></span><span>手工提现：</span>
						</view>切换后的交易可在我的页面发起手工提现。当日未提现金额次日预计9:00至10:00自动到账。
					</view>
					<p class="margin-bottom flex align-center"><span class="dot"></span>手工提现的交易费率保持不变。</p>
					<p class="flex align-center"><span class="dot"></span>可提现时间为7:00至22:50。</p>
				</view> -->

				</view>
				<view class="action-btn padding-lr-xl margin-top-xxl">

					<u-button @click="submit" :customStyle="{'border-radius': '10rpx'}" size="large" type="primary"
						text="提交">
					</u-button>
				</view>
			</view>
		</common-view>
	</view>
</template>

<script>
	import {
		getDaoZhangEd,
		submitDaoZhangEd
	} from '@/api/system/user.js'
	export default {
		data() {
			return {
				eduno: '',
				eduname: '',
				myedu: '',
				edulist: [

				],
				eduremark: ''
			};
		},
		onLoad() {
			this.initData()
		},
		methods: {
			changeType(item) {
				this.eduno = item.eduno
				this.eduname = item.eduname
			},
			initData() {
				getDaoZhangEd().then((res) => {
					this.edulist = res.edulist
					// this.eduno = res.edulist[0].eduno
					this.myedu = res.myedu
					this.eduremark = res.eduremark
				})
			},
			submit() {
				submitDaoZhangEd({
					eduno: this.eduno
				}).then((res) => {
					if(res.code == '00') {
						uni.showToast({
							title: res.msg,
							icon:'success'
						})
						this.initData()
					}
				})
			}
		},
	}
</script>
<style lang="scss">
	page {
		background-color: #F3F3F3;
	}
</style>
<style lang="scss" scoped>
	.changeCard {
		.content {
			padding: 40rpx 30rpx;

			.card {
				color: #FFFFFF;
				background: linear-gradient(-26deg, #24A98E, #33BC6C);
				border-radius: 21rpx;
				height: 241rpx;
				position: relative;
				padding-left: 44rpx;

				.bank-icon {
					width: 80rpx;
					height: 80rpx;
					margin-right: 31rpx;
					margin-left: 44rpx;
				}

				h3 {
					font-size: 36rpx;
					font-weight: 400;
				}

				p {
					font-size: 28rpx;
					margin-top: 32rpx;
				}

				.tag {
					font-size: 20rpx;
					padding: 3rpx 0;
					width: 77rpx;
					border: 2px solid #F3F3F3;
					text-align: center;
					margin-top: 10rpx;
				}

				.bank-bg {
					position: absolute;
					width: 186.81rpx;
					height: 157rpx;
					top: 0;
					right: 8rpx;
				}
			}

			.type {
				.item {
					margin-top: 18rpx;
					height: 141rpx;
					background: #FFFFFF;
					border-radius: 21rpx;
					border: 2px solid #FFFFFF;
					padding: 0 54rpx;

					&.active {
						border: 2px solid #6239DF;
					}

					.name {
						color: #333333;
						font-size: 31rpx;
					}
				}

				.checked {
					width: 40rpx;
					height: 40rpx;
				}

				.uncheck {
					width: 40rpx;
					height: 40rpx;
					border: 1px solid #646464;
					border-radius: 50%;
				}
			}

			.intro {
				background: #FFFFFF;
				border-radius: 21rpx;
				padding: 30rpx 40rpx;
				margin-top: 18rpx;

				.title {
					color: #333333;
					font-size: 31rpx;
					font-weight: bold;
					margin-bottom: 30rpx;
				}

				.subtitle {
					display: inline-flex;
					position: relative;
					top: -6rpx;
				}

				.dec {
					font-size: 22rpx;
					color: #5E5E5E;
					font-weight: 300;

					span {
						font-size: 24rpx;
						color: #5E5E5E;
						font-weight: bold;
					}



					.dot {
						width: 5rpx;
						height: 5rpx;
						background: #5E5E5E;
						border-radius: 50%;
						display: inline-block;
						margin-right: 5rpx;
					}
				}
			}
		}
	}
</style>