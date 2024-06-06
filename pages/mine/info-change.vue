<template>
	<view>
		<u-navbar leftText="信息变更" :fixed="false" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-left" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view class="pannel margin-top">
			<u-cell-group :border="false">
				<!-- <u-cell title="手机验证"  :isLink="true" url="/pages/safeCenter/phoneVerify" :border="false"></u-cell> -->
				<u-cell :isLink="true" url="/packageA/pages/finance/my-card">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/jsxx.png" width="73.33rpx"
							height="73.33rpx" mode="aspectFit"></u--image>
						<text class="u-cell-text">结算卡变更</text>

						</u-tag>
					</view>
				</u-cell>
				<!-- <u-cell :isLink="true" url="/">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/dzxx.png" width="73.33rpx"
							height="73.33rpx" mode="aspectFit"></u--image>
						<text class="u-cell-text">地址信息变更</text>

						</u-tag>
					</view>
				</u-cell>
				<u-cell :isLink="true" url="/" value="">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/hylx.png" width="73.33rpx"
							height="73.33rpx" mode="aspectFit"></u--image>
						<text class="u-cell-text">行业类型变更</text>

						</u-tag>
					</view>
				</u-cell> -->
				<u-cell :isLink="true" url="/pages/terminal/bind" value="">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/dzfs.png" width="73.33rpx"
							height="73.33rpx" mode="aspectFit"></u--image>
						<text class="u-cell-text">绑定终端</text>

						</u-tag>
					</view>
				</u-cell>
				<u-cell :isLink="true" url="/packageA/pages/finance/card-identify"  value="">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/hylx.png" width="73.33rpx"
							height="73.33rpx" mode="aspectFit"></u--image>

						<text class="u-cell-text">磁条卡认证</text>
						</u-tag>
					</view>
				</u-cell>
				<u-cell :isLink="true" url="/packageA/pages/finance/combine-setting" :border="false" value="">
					<view slot="title" class="u-slot-title flex justify-start align-center">
						<u--image :showLoading="true" src="/static/images/store/fsjs.png" width="73.33rpx"
							height="73.33rpx" mode="aspectFit"></u--image>
				
						<text class="u-cell-text">合并到账设置</text>
						</u-tag>
					</view>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		getToken
	} from '../../utils/auth';
	import {getMyInfo} from '@/api/system/user.js'
	import {isLogin} from '@/api/login.js'
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			this.do_isLogin()
			this.getInfo()
		},
		methods: {
			do_isLogin() {
				isLogin({
					token: getToken()
				}).then((res) => {
					if(res.code == '05') {
						setTimeout(() =>{
							uni.navigateBack()
						},2000)
					}
				})
			},
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
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FAFAFB;
	}

	.pannel {
		background: #FFFFFF;
	}

	/deep/ .u-cell__body {
		padding: 32rpx 37rpx;
	}

	/deep/ .u-cell__value {
		font-size: 28rpx;
		color: #333333;
	}

	.u-cell-text {
		font-size: 28rpx;
		color: #333333;
		margin-left: 25rpx;
	}
</style>