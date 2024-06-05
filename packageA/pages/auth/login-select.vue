<template>
	<view class="layout">

		<view class="login">
			<view class="login-top">
				<image class="login-logo" src="/static/images/store/logo.png" alt=""></image>
				<h3 class="login-title">欢迎使用翼宏惠商户端</h3>
			</view>
			<view class="login-form">
				<view class="btn-group">
					<u-button @click="$tab.navigateTo('/pages/login')" class="btn btn-primary fs56"
						text="已注册，帐号密码登录"></u-button>
					<u-button class="btn btn-default fs56" text="我要快速注册"></u-button>
				</view>
			</view>
			<view class="other">
				<view href="">手机验证码登录</view> 
			</view>
			<view class="check textCenter flex align-center justify-center">
				<u-checkbox-group>
					<u-checkbox v-model="checked" shape="circle" activeColor="#463bd8" label="登录代表您已同意"
						labelColor="#666665" labelSize="27rpx"></u-checkbox>
				</u-checkbox-group>

				<view class="outer" for="customcb2">
					<text class="active" href="">《商户用户协议》</text>
					<text class="active" href="">《隐私政策》</text>
				</view>
			</view>
		</view>
		<!--homeMod-->

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.login {
		min-height: 100%;
		background-color: #fff;

		&-top {
			padding-top: 265rpx;
		}

		&-logo {
			width: 172rpx;
			height: 172rpx;
			margin: 0 auto;
			position: relative;
			display: block;
			// img {
			//     position: absolute;
			//     width: 100%;
			//     height: 100%;
			//     top: 50%;
			//     left: 50%;
			//     transform: translate(-50%, -50%);
			//     object-fit: contain;
			// }
		}

		&-title {
			font-size: 31rpx;
			color: #2e2e2e;
			text-align: center;
			font-weight: bold;
			margin-top: 71rpx;
		}

		&-form {
			margin-top: 230rpx;
			padding: 0 87rpx;

			.input-group {
				position: relative;
				display: flex;
				align-items: center;
				border-bottom: solid 1px #f1f1f1;

				&:nth-of-type(1) {
					border-top: solid 1px #f1f1f1;
				}

				.label {
					width: 20%;
					font-size: 46rpx;
					color: #333;
					font-size: 46rpx;
				}

				input {
					flex: auto;
					height: 165rpx;
					line-height: 165rpx;
					padding-top: 0;
					padding-bottom: 0;
					padding-left: 140rpx;
					background: transparent;
					border-radius: 60px;
					border: 1px solid transparent;
					font-size: 46rpx;

					// color: #000;
					&::placeholder {
						color: #b3b3b3;
						font-size: 46rpx;
					}

					&:focus {}
				}

				&-flex {
					display: flex;
					align-items: center;
				}

				.valid-img {
					width: 40%;
					height: 91rpx;
					background: #DAE3F4;
					margin-left: 60rpx;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}

			.btn-group {
				margin-top: 160rpx;

				.btn {
					// font-size: 48rpx;
					display: block;
				}

				a {
					height: 120rpx;
					line-height: 120rpx;
					text-align: center;
					margin-top: 50rpx;
					border-radius: 60rpx;
				}
			}

			.tips {
				text-align: center;
				margin-top: 57rpx;
				font-size: 42rpx;
				color: #999997;

				a {
					color: #463bd8;
					font-size: 42rpx;
				}
			}
		}
	}

	.btn-primary {
		height: 89rpx;
		line-height: 89rpx;
		width: 100%;
		border-radius: 67rpx;
		margin-top: 50rpx;
		background-image: linear-gradient(-90deg, #413bd7 0%, #943ee6 100%), linear-gradient(#000000, #000000);
		background-blend-mode: normal, normal;
		border: 0;
		outline: none;
		color: #fff !important;
		text-align: center;
	}

	.btn-default {
		height: 89rpx;
		line-height: 89rpx;
		width: 100%;
		border-radius: 67rpx;
		margin-top: 50rpx;
		border: 2rpx solid #473bd9;
		outline: none;
		background-color: transparent;
		color: #473bd9 !important;
	}

	.other {
		text-align: center;
		margin-top: 68rpx;

		&>view {
			color: #333332;
			font-size: 32rpx;

			&:hover {
				color: #463bd8;
			}
		}
	}

	.check {
		display: flex;
		align-items: center;
		margin-top: 57rpx;
	}

	.login-read {
		// position: fixed;
		// bottom: 5%;
		// width: 100%;
		// left: 0;
		padding-top: 210rpx;
		padding-bottom: 100rpx;

		.check {
			justify-content: center;
		}
	}

	.customcb {
		width: 34rpx;
		height: 34rpx;
		background: transparent;
		border-radius: 50%;
		position: relative;
		border: solid 2rpx #b7b7b7;
	}

	.customcb label.inner {
		display: block;
		width: 22rpx;
		height: 22rpx;
		border-radius: 50%;
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
		cursor: pointer;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		background: #fff;
	}

	.check .outer {
		// margin-left: 35rpx;
		line-height: 2;
		color: #666665;
	}

	.customcb [type=checkbox] {
		display: none
	}

	.red.customcb input[type=checkbox]:checked+label.inner {
		background: #463bd8
	}

	.active {
		font-size: 27rpx;
		color: #463bd8 !important;
	}
</style>