<template>
	<view>
		<u-navbar  title="商户申请" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		<common-view>
			<view class="normalApply">
				<view class="title">
					请选择您想申请的商户类型
				</view>
				<view class="flex align-center justify-between item" @click="$tab.navigateTo('/packageA/pages/indentify/identify-terminal?rwtype=geren')">
					<view class="flex align-center">
						<u--image class="margin-right-xs" :showLoading="true"  src="/packageA/static/images/mico.png" width="128rpx"
							height="128rpx"></u--image>
							<view class="">
								<h1>小微商户</h1>
								<p>无营业执照</p>
							</view>
					</view>
					<view class="btn">
						去申请
					</view>
				</view>
				<view class="flex align-center justify-between item" >
					<!-- @click="$tab.navigateTo('/packageA/pages/indentify/identify-terminal?rwtype=geti')" -->
					<view class="flex align-center">
						<u--image class="margin-right-xs" :showLoading="true"  src="/packageA/static/images/normal.png" width="128rpx"
							height="128rpx"></u--image>
							<view class="">
								<h1>标准商户</h1>
								<p>有营业执照</p>
							</view>
					</view>
					<view class="btn btn-disable">
						即将上线
					</view>
				</view>
			</view>
		</common-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F6F8FA;
	}
	.normalApply{
		padding: 40rpx;
		.title{
			font-weight: 500;
			font-size: 30rpx;
			color: #202226;
		}
		.item{
			background-color: #fff;
			padding: 40rpx 0;
			margin-top: 40rpx;
			h1{
				font-weight: 500;
				font-size: 36rpx;
				color: #202226;
				padding-bottom: 8rpx;
			}
			p{
				font-weight: 400;
				font-size: 28rpx;
				color: rgba(32,34,38,0.6);
			}
			.btn{
				width: 160rpx;
				height: 64rpx;
				background: linear-gradient( 131deg, #3178FF 0%, #1CAAFF 100%);
				border-radius: 200rpx 200rpx 200rpx 200rpx;
				font-weight: 500;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 64rpx;
			}
			.btn-disable{
				background: #eee;
				
			}
		}
	}
</style>
