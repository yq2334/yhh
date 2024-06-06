<template>
	<view class="mine">

		<view class="mine-top flex">
			<view class="left">
				<view class="avater">
					<image src="/static/images/avatar.png" mode=""></image>

				</view>
				<view class="info">
					<h1 class="margin-bottom-xs">{{ userInfo.mingcheng }}</h1>
					<p> {{userInfo.mobile}}</p>



				</view>
			</view>

		</view>

		<view class="mine-menu ">
			<view class="item " @click="$tab.navigateTo('/pages/merchant/info')">
				<view class="img-wrapper">
					<image class="img1" src="/static/images/store/11.png" mode=""></image>
				</view>

				<view>
					<p>商户查询</p>

				</view>
			</view>
			<view class="item " @click="$tab.navigateTo('/packageA/pages/finance/my-card')">
				<view class="img-wrapper">
					<image class="img1" src="/static/images/store/13.png" mode=""></image>
				</view>

				<view>
					<p>结算账户</p>

				</view>
			</view>
			<view class="item " @click="$tab.navigateTo('/packageA/pages/notice/notice')">

				<view class="img-wrapper">
					<image class="img3" src="/static/images/store/5.png" mode=""></image>
				</view>
				<view>
					<p>通知消息</p>

				</view>
			</view>
		</view>

		<view class="mine-list pannel">

			<u-cell-group :border="false">
				<!-- <u-cell title="手机验证"  :isLink="true" url="/pages/safeCenter/phoneVerify" :border="false"></u-cell> -->
				<!-- <u-cell :isLink="true" url="/packageA/pages/question/question">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/man.png" width="40rpx" height="40rpx"
							mode="aspectFit"></u--image>
						<text class="u-cell-text">常见问题</text>

						</u-tag>
					</view>
				</u-cell> -->
				<u-cell :isLink="true" url="/packageA/pages/feedback/index">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/msg.png" width="40rpx" height="40rpx"
							mode="aspectFit"></u--image>
						<text class="u-cell-text">意见反馈</text>

						</u-tag>
					</view>
				</u-cell>
			<!-- 	<u-cell :isLink="true" url="/pages/mine/service">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/service.png" width="40rpx"
							height="40rpx" mode="aspectFit"></u--image>
						<text class="u-cell-text">客服中心</text>

						</u-tag>
					</view>
				</u-cell> -->
				<u-cell :isLink="true" url="/packageA/pages/auth/edit-password">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/pwd.png" width="40rpx" height="40rpx"
							mode="aspectFit"></u--image>
						<text class="u-cell-text">修改密码</text>

						</u-tag>
					</view>
				</u-cell>
				<u-cell :isLink="true" url="/pages/safeCenter/changeLoginPwd" @click="doLogout()">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/logout.png" width="40rpx" height="40rpx"
							mode="aspectFit"></u--image>
						<text class="u-cell-text">安全退出</text>

						</u-tag>
					</view>
				</u-cell>
				<u-cell :isLink="true"  @click="doLoginClose()">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/logout.png" width="40rpx" height="40rpx"
							mode="aspectFit"></u--image>
						<text class="u-cell-text">注销帐号</text>
				
						</u-tag>
					</view>
				</u-cell>
				<u-cell :isLink="false" url="/pages/safeCenter/changeLoginPwd" :border="false">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/version.png" width="40rpx"
							height="40rpx" mode="aspectFit"></u--image>
						<!-- #ifdef H5 || MP-WEIXIN -->
						<text class="u-cell-text">当前版本：V{{userInfo.vno || ''}}</text>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<text class="u-cell-text">当前版本：V{{ platform == 'IOS' ? userInfo.ios_vno : userInfo.vno}}</text>
						<!-- #endif -->

						</u-tag>
					</view>
				</u-cell>
			</u-cell-group>

		</view>
		<u-popup class="noticePop" :show="showTipsModal" :round="10" bgColor="transparent"
			@close="showTipsModal = false" mode="center">
			<view class="newsBox newsBox2">
				<!-- <image class="icon" src="/static/images/home/notice_icon.png" mode=""></image> -->
				<view class="flex justify-center padding-tb-lg" style="background-color: transparent;position: relative;">
					<span style="font-size: 40rpx;">提示</span>
					<view class="close-circle">
						<u-icon name="close-circle" color="#393939" size="28" @click="handleTipsClose"></u-icon>
					</view>
				</view>
				
				<view class="content " style="font-size: 34rpx;">
					{{snConfig.auditremark || tips}}
				</view>

				<view class="action-btn flex align-center justify-between">
					<u-button @click="doLogout()" :loading="loading" :customStyle="{'border-radius': '10rpx'}"
						size="large" type="default" text="退出登录">
					</u-button>
					<view class="" style="width: 30rpx;">
						
					</view>
					<u-button @click="handleTipsActions" :loading="loading" :customStyle="{'border-radius': '10rpx'}"
						size="large" type="primary" text="确认">
					</u-button>
				</view>
			</view>
			<!-- 	<view class="flex justify-center margin-top-xxl" >
				
			</view> -->

		</u-popup>
		<WXLogin ref="WXLogin"></WXLogin>
	</view>
</template>

<script>
	import WXLogin from '@/components/wxLogin/index.vue'
	import {
		mapGetters
	} from 'vuex';
	import storage from '@/utils/storage'
	import {
		getMemberCenter,

	} from "@/api/system/user.js"
	import {
		logout,
		loginClose
	} from '@/api/login.js'
	import {
		getToken
	} from '../../utils/auth';
	export default {
		data() {
			return {
				userInfo: {
					mingcheng: '',
					mobile: '',
					vno: ''
				},
				bindCardUrl: '',
				platform: '',
				showTipsModal: false,
				tips: ''
			}
		},
		components: {
			WXLogin
		},
		computed: {
			...mapGetters(['userInfo', 'snConfig'])
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			if (!getToken()) {
				// this.showLoginModal = true
				this.$refs.WXLogin.open()
				return
			}
			// #endif
			this.getUserInfo()
			// #ifdef APP-PLUS
			this.platform = uni.getSystemInfoSync().platform;
			console.log(platform)
			// #endif

		},
		onShow() {
			this.handelSigneTips()
		},
		methods: {
			getUserInfo() {
				getMemberCenter().then((res) => {
					if (res.code == '00') {
						this.userInfo = res.myinfo
					}

				})
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			doLogout() {

				logout().then((res) => {
					this.$store.dispatch('LogOut')
					uni.reLaunch({
						url: "/pages/login"
					})
				})
			},
			handelSigneTips() {
				if (this.snConfig.isshanghu == '01') {
					this.showTipsModal = true

				}
				if (this.snConfig.isshanghu == '02' || this.snConfig.isshanghu == '04') {
					this.showTipsModal = true

				}

			},
			handleTipsActions() {
				if (this.snConfig.isshanghu == '01') {
					// this.doLogout();
					this.showTipsModal = false
				}
				if (this.snConfig.isshanghu == '02' || this.snConfig.isshanghu == '04') {
					this.showTipsModal = true
					this.$tab.navigateTo('/packageA/pages/indentify/identify-terminal');
				}

			},
			handleTipsClose() {
				this.showTipsModal = false
				this.$tab.switchTab("/pages/home/home")
			},
			doLoginClose() {
				uni.showModal({
					title:'确定注销？',
					content: '确定要注销吗？注销成功后，帐号将被收回无法登录！',
					confirmText: '确定',
					cancelText:'取消',
					success: (res) => {
						if(res.confirm) {
							loginClose().then((res) => {
								uni.reLaunch({
									url:'/pages/login'
								})
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef H5 */
	uni-page-head {
		display: none !important;
	}

	/* #endif */
	page {
		background-color: #F6F8FA;
		font-size: 27rpx;
	}

	.mine {
		background: url(~@/static/images/bg-mine.jpg) no-repeat;
		background-size: 100% 100%;
		padding: 0 55rpx 180rpx 55rpx;

		// .flex {
		// 	display: flex;
		// 	justify-content: space-between;
		// 	align-items: center;
		// }

		&-top {
			padding-top: 90rpx;

			.left {
				display: flex;
				align-items: center;

				.avater {
					width: 112rpx;
					height: 112rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.info {
					margin-left: 31rpx;

					h1 {
						color: #0A0A0A;
						font-size: 36rpx;
						font-family: AlibabaPuHuiTiM;
					}

					p {
						color: rgba(10, 10, 10, 0.6);
						font-size: 28rpx;
					}
				}

				.level {
					padding: 7rpx 17rpx 7rpx 7rpx;
					background: #E2E2E2;
					border-radius: 23rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 11rpx;

					.level-icon {
						// background: url(~@/static/images/mine/medal.png) no-repeat;
						background-size: 100% 100%;
						width: 36.11rpx;
						height: 36.11rpx;
						display: inline-block;
						margin-right: 9rpx;
					}

					font-size: 19rpx;
					color: #000000;

				}

				.level-icon {}
			}

			.icon {
				font-size: 58rpx;
				color: #979696;
			}

			margin-bottom: 30rpx;
		}

		&-vip {
			height: 149rpx;
			background-image: linear-gradient(90deg, #1b2552 0%, #354273 100%), linear-gradient(#c3c3c3, #c3c3c3);
			background-blend-mode: normal, normal;
			border-radius: 20rpx;
			padding: 0 55rpx 0 24rpx;
			margin-top: 58rpx;

			.left {
				display: flex;
				align-items: center;

				image {
					max-width: 83rpx;
					margin-right: 24rpx;
				}

				color: #c8b274;
				font-size: 38rpx;
			}

			.btn-yellow {
				height: 82rpx;
				background-color: #fedd7c;
				border-radius: 28rpx;
				color: #313c6d;
				font-size: 38rpx;
				border: 0;
				outline: none;
				display: block;
				line-height: 82rpx;
				text-align: center;
				padding: 0 12rpx;
			}
		}

		.pannel {
			background-color: #fff;
			border-radius: 33rpx;
			margin-top: 20rpx;
		}

		&-menu {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 46rpx 0 53rpx 0;
			background: #FFFFFF;
			border-radius: 24rpx;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;

				justify-content: center;
				width: 32%;
				border-radius: 33rpx;

				p {
					font-size: 28rpx;
					color: #09121F;

				}

				.fs2 {
					font-size: 31rpx;
				}



				.img-wrapper {
					height: 78rpx;
					width: 78rpx;
				}

				image {
					max-width: 100%;
					display: block;
					margin-bottom: 18rpx;



					&.img1 {
						width: 64rpx;
						height: 64rpx;
					}

					&.img2 {
						width: 64rpx;
						height: 64rpx;
					}

					&.img3 {
						width: 64rpx;
						height: 64rpx;
					}
				}

				text-align: center;
				color: #151515;
				font-size: 45rpx;
			}

			.item1 {
				background: linear-gradient(0deg, rgba(125, 131, 253, 0.9), rgba(166, 170, 255, 0.9));
			}

			.item2 {
				background: linear-gradient(0deg, rgba(241, 91, 80, 0.9), rgba(255, 151, 143, 0.9));
			}

			.item3 {
				background: linear-gradient(0deg, rgba(255, 175, 67, 0.9), rgba(255, 201, 129, 0.9));
			}
		}

		&-list {
			padding: 0 40rpx;

			/deep/ .u-cell__body {
				padding: 40rpx 26rpx !important;
				color: #333;
				font-size: 28rpx;
				font-family: 'AlibabaPuHuiTiM';
			}

			.u-cell-text {
				font-size: 28rpx;
				color: #09121F;
				margin-left: 25rpx;
			}

			/deep/ .u-icon__icon--info {
				color: #969696;

				font-weight: bold !important;
			}

		}

		.mine-list2 {
			padding: 0 40rpx;

			ul {
				li {
					padding: 0 52rpx;
					border-bottom: solid 1px #f1f1f1;
				}
			}
		}

		.icon-box {
			width: 102rpx;
		}

		.icon-man {
			max-width: 57rpx;
		}

		.icon-jiesuan {
			max-width: 51rpx;
		}

		.icon-address {
			max-width: 53rpx;
		}

		.icon-notice {
			max-width: 54rpx;
		}

		.icon-service {
			max-width: 56rpx;
		}

		.icon-question {
			max-width: 62rpx;
		}

		.icon-msg {
			max-width: 59rpx;
		}

		.icon-edit {
			max-width: 54rpx;
		}

		.icon-logout {
			max-width: 57rpx;
		}

		.icon-setting {
			max-width: 62rpx;
		}

		.icon-tel {
			max-width: 62rpx;
		}
	}

	.noticePop {

		.newsBox {
			width: 680rpx;
			// height: 606rpx;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			border-radius: 25rpx;

			.icon {
				position: absolute;
				top: 122rpx;
				left: 40rpx;

				width: 216rpx;
				height: 110rpx;
			}

			.news {
				display: flex;
				justify-content: center;
				align-items: center;
				border-top-left-radius: 25rpx;
				border-top-right-radius: 25rpx;
				height: 112rpx;
				// margin-left: 40rpx;
				background-color: #EAEAEA;

				span {
					font-family: Microsoft YaHei;
					font-weight: 600;
					font-size: 50rpx;
					color: #000000;
					line-height: 57rpx;

				}
			}

			.content {
				width: auto;
				// height: 522rpx;
				// margin: 60rpx 40rpx 66rpx 40rpx;
				padding: 50rpx 62rpx;
				// background: linear-gradient(0deg, #5581f2, rgba(88, 56, 207, .1));
				// border-radius: 28rpx;
				font-size: 32rpx;

				color: #353535;

				.box {
					height: 400rpx;
					font-size: 32rpx;
					color: #fff;
					word-break: break-all
				}

			}

			.xieyi {
				font-size: 32rpx;
				color: #353535;
				padding-left: 60rpx;

				.checked {
					width: 28rpx;
					height: 28rpx;
				}
			}

			.action-btn {
				padding: 40rpx 60rpx;
			}
		}

		.newsBox2 {
			background: url(~@/static/images/store/n-bg.png) no-repeat;
			background-size: 100% 100%;
		}
	}


	.close-circle {
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-60%);
	}
</style>