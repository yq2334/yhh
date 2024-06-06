<template>
	<view class="home">
		<view class="home-top">
			<view class="home-top-l">
				<!-- <u--image :showLoading="true" src="/static/images/home/avatar.png" width="64rpx" height="64rpx"
					mode="aspectFit"></u--image> -->
				<view class="pd">
					<h1>{{user.mingcheng ?user.mingcheng : '未认证用户' }} </h1>
					<!-- <view class="vip-box">
						<view class="vip">
							<image src="/static/images/home/v.png" mode=""></image>
							<text>3</text>
						</view>
						<text>{{user.mobile}}</text>
					</view> -->
				</view>
			</view>
			<!-- <image @click="$tab.navigateTo('/pages/notice/notice')" class="bell" src="/static/images/home/bell.png"
				mode="aspectFit"></image> -->
		</view>
		<view class="swiper">
			<u-swiper height="160" radius="8" :list="bannerList"></u-swiper>
		</view>
		<view class="notice-bar flex align-center">
			<u--image src="/static/images/home/bell.png" width="40rpx" height="40rpx" mode="aspectFit"></u--image>
			<u-notice-bar bgColor="transparent" :icon="false" color="#393939" :text="text1" direction="column"
				@click="clickNoticeItem" speed="250" url="/pages/home/index"></u-notice-bar>
		</view>
		<view class="menu-wrapper">

			<view class="flex align-center justify-between flex-wrap menu-list">
				<view class="flex align-center basis-df-divider margin-bottom" @click="handleIdentify"
					v-if="homeData.isshanghu != '00'">
					<u--image class="margin-right-xs" src="/static/images/home/shsq.png" width="84rpx" height="84rpx"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1">商户申请</h1>
						<p>立即入驻</p>
					</view>
				</view>
				<view class="flex align-center basis-df-divider margin-bottom" @click="navTo('/pages/merchant/info')">
					<u--image class="margin-right-xs" src="/static/images/home/wdsh.png" width="84rpx" height="84rpx"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1">我的商户</h1>
						<p>商户管理</p>
					</view>
				</view>
				<view class="flex align-center basis-df-divider margin-bottom"
					@click="navTo('/packageA/pages/finance/merchant-up')">
					<u--image class="margin-right-xs" src="/static/images/home/zdbd.png" width="84rpx" height="84rpx"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1">交易提额</h1>
						<p>四要素提额</p>
					</view>
				</view>
				<view class="flex align-center basis-df-divider margin-bottom"
					@click="navTo('/pages/mine/info-change')">
					<u--image class="margin-right-xs" src="/static/images/home/cygj.png" width="84rpx" height="84rpx"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1">常用工具</h1>
						<p>工作提效</p>
					</view>
				</view>
				<view class="flex align-center basis-df-divider margin-bottom"
					@click="navTo('/pages/merchant/merchant?tab=0')">
					<u--image class="margin-right-xs" src="/static/images/home/jyjl.png" width="84rpx" height="84rpx"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1">交易记录</h1>
						<p>结算查询</p>
					</view>
				</view>
				<view class="flex align-center basis-df-divider margin-bottom"
					@click="navTo('/packageA/pages/finance/card-identify')">
					<u--image class="margin-right-xs" src="/static/images/home/jsjl.png" width="84rpx" height="84rpx"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1">磁条卡认证</h1>
						<p>在线提交</p>
					</view>
				</view>
				<!-- <view class="flex align-center basis-df-divider margin-bottom"
					@click="navTo('/packageA/pages/question/question')">
					<u--image class="margin-right-xs" src="/static/images/home/cjwt.png" width="84rpx" height="84rpx"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1">常见问题</h1>
						<p>问题解答</p>
					</view>
				</view> -->
				<view class="flex align-center basis-df-divider margin-bottom"
					@click="navTo('/packageA/pages/finance/my-card')">
					<u--image class="margin-right-xs" src="/static/images/home/czsc.png" width="84rpx" height="84rpx"
						mode="aspectFit"></u--image>
					<view class="margin-left-sm">
						<h1 class="text-black-1">结算卡变更</h1>
						<p>在线提交</p>
					</view>
				</view>
			</view>
		
		</view>
		<!-- <p class="tips">不要相信陌生电话短信 拒绝更换机具谨防上当</p> -->
		<u-popup class="noticePop" :show="homeData.istankuang1 == 'N'" :round="10" bgColor="transparent"
			@close="showNoticePop = false" mode="center">
			<view class="newsBox">
				<!-- <image class="icon" src="/static/images/home/notice_icon.png" mode=""></image> -->
				<view class="news">
					<span>系统通知</span>
				</view>
				<view class="content" v-html="homeData.tkremark1">

				</view>
				<view class="xieyi flex align-center ">
					<uni-data-checkbox v-model="checked" multiple :localdata="agree" />
					<!-- <image class="checked margin-right-xs" src="/static/images/store/checked.png" mode=""></image> -->
					<!-- <text>已知悉</text> -->
					<text class="text-red" @click="showNoticePop = true">《重要提示》</text>
				</view>
				<view class="action-btn">

					<u-button @click="handleSetTz('showNoticePop', 'tongzhi1')" :loading="loading"
						:customStyle="{'border-radius': '10rpx'}" size="large" type="primary" text="我已知悉">
					</u-button>
				</view>
			</view>
		</u-popup>
		<u-popup class="noticePop" :show="showNoticePop" :round="10" bgColor="transparent"
			@close="showNoticePop = false" mode="center">
			<view class="newsBox newsBox2">
				<!-- <image class="icon" src="/static/images/home/notice_icon.png" mode=""></image> -->
				<view class="news" style="background-color: transparent;">
					<span>重要提示</span>
				</view>
				<view class="content" v-html="homeData.tkremark2">

				</view>

				<view class="action-btn">

					<u-button @click="handleSetTz('showNoticePop', 'tongzhi2')" :loading="loading"
						:customStyle="{'border-radius': '10rpx'}" size="large" type="primary" text="我已知悉">
					</u-button>
				</view>
			</view>
		</u-popup>
		<!-- <u-modal :show="showTipsModal" title="提示" :content='tips' :showCancelButton="false" :showConfirmButton="false"></u-modal> -->
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
					{{homeData.auditremark || tips}}
				</view>
				
				<view class="action-btn flex justify-between align-center">
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


		</u-popup>
		<WXLogin ref="WXLogin"></WXLogin>
	</view>
</template>

<script>
	import WXLogin from '@/components/wxLogin/index.vue'
	import {
		mapGetters
	} from 'vuex';
	import {
		logout,
		weiXinlogin,
		getWeixinConfig
	} from '@/api/login.js'
	import configService from '@/api/config.service'

	import storage from '@/utils/storage'
	import {
		getHomeData,
		getHomeDataUnlogin,
		setTongZhi
	} from "@/api/system/user.js"

	import {
		getToken
	} from '../../utils/auth';
	import {
		checkUpdate
	} from '@/utils/common.js'
	export default {
		data() {
			return {
				user: {

				},
				homeData: {},
				yeji: {},
				list: [],
				bindCardUrl: '',
				current: 'team',
				tabs: [{
						name: '团队业绩',
						key: 'team'
					},
					{
						name: '个人业绩',
						key: 'person'
					}
				],
				text1: [],
				bannerList: [],
				newslist: [],
				showNoticePop: false,
				checked: [],
				agree: [{
					text: "已知悉",
					value: 0,
				}, ],
				showTipsModal: false,
				showBindModal: false,
				tips: '',
				showLoginModal: false,
				AppId: 'wxc123dbf7119ba95c',
				AppSecret: '276f6a991e795d40925535ed5a483a55',
				session_key: '',
				weixinUserInfo: {
					avatarUrl: '',
					nickName: '',
					mobile: ''
				},

			}
		},
		components: {
			WXLogin
		},
		computed: {
			...mapGetters(['userInfo', 'snConfig'])
		},
		onLoad() {
			console.log(this.globalConfig.appInfo)
			

		},
		onShow() {
			// #ifdef APP-PLUS
			checkUpdate()
			// #endif
			if (!getToken()) {

				this.getGroupUnlogin()
				// #ifdef MP-WEIXIN
					// this.showLoginModal = true
					this.$refs.WXLogin.open()
				// #endif
				
				return
			}

			this.getGroup()
		},


		methods: {
			changeTab(item) {
				this.current = item.key
			},
			getGroup() {
				getHomeData({
					fid: this.globalConfig.api.fid,
					fkey: this.globalConfig.api.fkey,
					apiname: 'ysh.default',
					token: getToken()
				}).then((res) => {
					console.log(res)
					this.homeData = res
					this.$store.dispatch('setSNConfig', {
						maxsn: res.maxsn,
						minsn: res.minsn,
						isshanghu: res.isshanghu,
						auditremark: res.auditremark,

					})

					this.yeji = res.yeji
					this.user = res.myinfo
					this.text1 = [];
					this.newslist = res.newslist
					res.newslist.forEach((item) => {
						this.text1.push(item.title)
					})
					res.imglist.forEach((item) => {
						this.bannerList.push(item.imurl)
					})
					this.handelSigneTips()

				})
			},

			getGroupUnlogin() {
				getHomeDataUnlogin({
					fid: this.globalConfig.api.fid,
					fkey: this.globalConfig.api.fkey,
					apiname: 'ysh.Default_home',
					token: getToken()
				}).then((res) => {
					console.log(res)
					this.homeData = res

					this.yeji = res.yeji
					this.user = res.myinfo
					this.text1 = [];
					this.newslist = res.newslist
					res.newslist.forEach((item) => {
						this.text1.push(item.title)
					})
					res.imglist.forEach((item) => {
						this.bannerList.push(item.imurl)
					})
					this.handelSigneTips()
				})
			},
			clickNoticeItem(index) {
				let item = this.newslist[index]
				this.$tab.navigateTo('/pages/notice/detail?id=' + item.Id)
			},

			handelSigneTips() {
				if (this.homeData.isshanghu == '01') {
					this.showTipsModal = true

				}
				if (this.homeData.isshanghu == '02' || this.homeData.isshanghu == '04') {
					this.showTipsModal = true

				}
				if (this.homeData.isshanghu == '03') {
					this.tips = '为不影响功能正常使用，请您仔细阅读并签署相关商户收单协议。'
					this.showTipsModal = true
					// uni.showModal({
					// 	title: '提示',
					// 	content: '为不影响功能正常使用，请您仔细阅读并签署相关商户收单协议。',
					// 	showCancel: true,
					// 	success: (event) => {
					// 		if (event.confirm) {
					// 			this.$tab.navigateTo('/pages/signature/tips');
					// 		}
					// 	}
					// })
				}
			},
			handleTipsActions() {
				if (this.homeData.isshanghu == '01') {
					// this.doLogout();
					this.showTipsModal = false
				}
				if (this.homeData.isshanghu == '02' || this.homeData.isshanghu == '04') {
					this.showTipsModal = false
					this.$tab.navigateTo('/packageA/pages/indentify/identify-terminal');
					// this.$tab.navigateTo('/packageA/pages/indentify/index');
				}
				if (this.homeData.isshanghu == '03') {
					this.$tab.navigateTo('/pages/signature/tips');
				}
			},
			handleTipsClose() {
				this.showTipsModal = false
				// if (this.homeData.isshanghu == '01') {
				// 	this.showTipsModal = false
				// 	this.doLogout();
				// }
				// if (this.homeData.isshanghu == '02' || this.homeData.isshanghu == '04') {
				// this.showTipsModal = false
				// 	this.doLogout();
				// }
				// if (this.homeData.isshanghu == '03') {
				// 	this.showTipsModal = false
				// }
			},
			handleIdentify() {
				if (!getToken()) {
					this.$modal.msgError('请先登录')
					uni.reLaunch({
						url: "/pages/login"
					})
					return;
				}
				this.handelSigneTips()
				if (this.homeData.isshanghu == '99') {
					// this.$tab.navigateTo('/pages/signature/index');
					this.$tab.navigateTo('/packageA/pages/indentify/identify-terminal');
					// this.$tab.navigateTo('/packageA/pages/indentify/index');
				}

				if (this.homeData.isshanghu == '01') {
					uni.showModal({
						title: '提示',
						content: '商户入网审核中',
						showCancel: false,
						success: (event) => {

						}
					})
				}
			},
			handleSetTz(pop, type) {
				if (!this.checked.length && type == 'tongzhi1') {
					this.$toast('请先勾选已知悉重要提示！')
					return;
				}
				setTongZhi({
					type: type
				}).then((res) => {
					if (res.code == '00') {
						this[pop] = false
						this.getGroup()
					}
				})
			},
			navTo(url) {
				if (!getToken()) {
					this.$modal.msgError('请先登录')
					uni.reLaunch({
						url: "/pages/login"
					})
					return;
				}
				if (this.homeData.isshanghu == '01') {
					this.showTipsModal = true
					return;

				}
				if (this.homeData.isshanghu == '02' || this.homeData.isshanghu == '04') {
					this.showTipsModal = true;
					return;

				}
				if (this.homeData.isshanghu == '03') {
					this.tips = '为不影响功能正常使用，请您仔细阅读并签署相关商户收单协议。'
					this.showTipsModal = true;
					return;

				}
				this.$tab.navigateTo(url);
			},



			doLogout() {

				logout().then((res) => {
					this.$store.dispatch('LogOut')
					uni.reLaunch({
						url: "/pages/login"
					})
				})
			},

		}
	}
</script>
<style lang="scss">
	page {
		background-color: #F6F8FA;
	}
</style>
<style lang="scss" scoped>
	.home {
		background: url(~@/static/images/home/bg-top.jpg) no-repeat;
		background-size: 100% 100%;
		padding: 0 30rpx;
		padding-top: var(--status-bar-height);

		&-top {

			padding-top: 55rpx;
			padding-bottom: 38rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-l {
				display: flex;
				align-items: center;

				.pd {
					padding-left: 21rpx;
				}

				h1 {
					font-size: 36rpx;
					font-family: 'AlibabaPuHuiTiM';

					color: #000000;
				}

				.vip-box {
					// width: 150rpx;
					padding: 0 8rpx;
					height: 42rpx;
					margin-top: 13rpx;
					background: linear-gradient(-39deg, rgba(250, 139, 24, 0.95), rgba(255, 167, 75, 0.95));
					border-radius: 21rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.vip {
						position: relative;
						margin-right: 8rpx;

						image {
							width: 18.75rpx;
							height: 15.97rpx;
						}

						text {
							color: #000000;
							font-size: 12rpx;
							zoom: 0.6;
							font-style: italic;
							position: absolute;
							bottom: -5rpx;
							right: -2rpx;
							font-family: 'AlibabaPuHuiTiM';
						}
					}

					font-size: 21rpx;
					color: #000000;
				}
			}

			.bell {
				width: 36.11rpx;
				height: 34.72rpx;
			}
		}

		&-data {
			background: #FFFFFF;
			border-radius: 24rpx;
			padding: 38rpx 40rpx;

			.tab {
				width: 550rpx;
				margin: 0 auto;
				height: 56rpx;
				background: #EFEFEF;
				border-radius: 28rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.item {
					width: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 29rpx;
					color: #4A4439;

					text {
						margin-right: 18rpx;
					}

					&.active {
						background: #FAC663;
						border: 1rpx solid #CF982F;
						border-radius: 28rpx;
						height: 56rpx;
					}
				}
			}

			.data-box {
				padding-top: 40rpx;

				.item {
					width: 50%;
				}

				h3 {
					font-size: 26rpx;
					color: #929399;
					font-weight: 400;
				}

				h1 {
					font-size: 51rpx;
					color: #252833;
					font-family: 'AlimamaFangYuanTiVF';
				}
			}

			.data-box2 {
				padding-top: 68rpx;
				text-align: center;

				.split {
					width: 1rpx;
					height: 50rpx;
					background: #252833;
					opacity: 0.4;
				}

				h3 {
					font-size: 26rpx;
					color: #929399;
					font-weight: 400;
				}

				h1 {
					font-size: 51rpx;
					color: #252833;
					font-family: 'AlimamaFangYuanTiVF';
				}
			}
		}

		.notice-bar {
			background: linear-gradient(90deg, rgba(0, 131, 255, 0.1) 0%, rgba(0, 131, 255, 0.04) 100%), #FFFFFF;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			border: 1rpx solid rgba(255, 255, 255, 0.2);

			padding: 14rpx 20rpx;
			margin-top: 40rpx;
		}

		.menu-wrapper {
			// padding: 38rpx 0;
			// background: #FFFFFF;
			border-radius: 24rpx;
			// margin-top: 28rpx;
		}

		.menu-list {
			margin-top: 40rpx;

			&>view {
				// background: url(/static/images/home/menu-bg.png) no-repeat;
				// background-size: 100% 100%;
				height: 156rpx;
				background: #FFFFFF;
				border-radius: 13rpx;
				padding: 0 0 0 32rpx;
				width: 48%;

				h1 {
					font-weight: 500;
					font-size: 32rpx;
					color: #393939;
				}

				p {
					font-size: 24rpx;
					color: rgba(57, 57, 57, 0.4);
				}

				h3 {
					color: #929399;
					font-size: 22rpx;
					font-weight: 400;
					padding-top: 8rpx;
				}
			}
		}

		.swiper {
			// margin-top: 60rpx;
			// padding-bottom: 60rpx;
		}
	}

	.tips {
		text-align: center;
		color: #A9ADAF;
		font-size: 24rpx;
		margin-top: 50rpx;
	}

	.team-content {
		// background: #FFFFFF;
		// border: 1px solid #B6B5B9;
		// border-radius: 15rpx;

		.table-head {
			padding: 0 53rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			height: 117rpx;
			background: #FAFAFA;
			border-radius: 15rpx;

			// background: url(../images/bg-4.png) no-repeat;
			// background-size: 100% 100%;
			.item {
				text-align: center;

				color: #3C3B44;

				font-family: 'AlibabaPuHuiTiM';
				font-size: 28rpx;

				// .fs1 {
				// 	font-size: 72rpx;
				// }
			}

			.split {
				width: 1rpx;
				height: 53rpx;
				background-color: #626162;
				border: solid 1rpx #c7d0f7;
			}
		}

		.scroll {
			height: calc(100vh-187rpx) !important;
		}

		.table-body {

			.item {
				padding: 0 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: solid 1rpx #f1f1f1;
				border-radius: 12rpx;

				&:nth-of-type(even) {
					background: #FAFAFA;
				}

				.td {
					text-align: center;
					font-size: 38rpx;
					font-family: AlimamaFangYuanTiVF;
					font-size: 28rpx;
					color: #1D1D1D;
					padding: 36rpx 0;
					font-weight: 400;
				}

				.name {
					width: 96rpx;
					height: 96rpx;
					text-align: center;
					line-height: 96rpx;
					// background-image: linear-gradient(263deg, #8e19ff 0%, #7876ff 100%), linear-gradient( #000000, #000000);
					// background-blend-mode: normal, normal;
					// background: url(../images/circle.png) no-repeat;
					background-size: 100% 100%;
					border-radius: 50%;
					color: #fff;
					font-size: 48rpx;
				}

				.tl {
					text-align: left;
					padding-left: 35rpx;
					flex: 1;

				}

				.fx {
					display: flex;
					align-items: center;
					// justify-content: center;
				}

				.jlx {
					justify-content: flex-end;
				}

				.mg {
					margin-left: 27rpx;
					// margin-right: 53rpx;
				}

				.fs1 {
					color: #000000;
				}

				.fs2 {
					color: #010101;
					font-size: 48rpx;
				}

				.fs3 {
					color: #999999;
					font-size: 38rpx;
				}

				.fs4 {
					color: #ff8c00;
					font-size: 38rpx;
				}

				.fs5 {
					color: #666;
					font-size: 38rpx;
				}

				.icon-you {
					color: #1D1D1D;
					font-size: 52rpx;
				}
			}
		}

		.w5 {
			width: 50%;
		}

		.w2 {
			width: 20%;
		}

		.w25 {
			width: 32%;
		}
	}



	.xieyi {
		// display: flex;
		// align-items: center;
		// justify-content: center;
		// font-size: 28rpx;
		// margin-bottom: 47rpx;
		// position: fixed;
		// width: 100%;
		// left: 0;
		// bottom: 30rpx;
	}

	.close-circle {
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-60%);
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box {
		margin-right: 0px;
	}

	/deep/ .uni-data-checklist {
		flex: none;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box .checkbox__inner {
		// border-radius: 50%;
		width: 16px;
		height: 16px;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checkbox__inner {
		background-color: #fff;
		border-color: #EB4619;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checkbox__inner .checkbox__inner-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		background: url(~@/static/images/store/checked.png) no-repeat;
		background-size: 100% 100%;
		// border-radius: 50%;
		transform: translate(-50%, -50%);
		width: 16px;
		height: 16px;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box .checklist-content .checklist-text {
		font-size: 17px;
		color: #353535;
	}

	/deep/ .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checklist-text[data-v-84d5d996] {
		font-size: 17px;
		color: #353535;

	}

	.weixinBtn {
		background-color: #6FCF97;
		color: #fff;
		border-radius: 200rpx;
	}

	.avatar-wrapper {
		border: 0;
		background-color: transparent;
		outline: none;
	}
</style>