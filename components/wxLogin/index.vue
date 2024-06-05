<template>
	<view class="">
		<u-popup class="loginPop" :show="showLoginModal" :round="10" bgColor="transparent" :closeOnClickOverlay="closeOnClickOverlay"
			@close="showLoginModal = false" mode="center" >
			<view class="newsBox newsBox2">
				<!-- <image class="icon" src="/static/images/home/notice_icon.png" mode=""></image> -->
			<!-- 	<view class="news" style="background-color: transparent;position: relative;">
					<view class="close-circle">
						<u-icon name="close-circle" color="#393939" size="28" @click="showLoginModal = false"></u-icon>
					</view>
				</view> -->
				<view class="margin-bottom-lg" v-if="!showAccountLogin">
					<div class="img flex justify-center margin-top">
						<u--image class="avatar-img" src="/static/logo.png" :radius="200" width="84rpx" height="84rpx"
							mode="aspectFit"></u--image>
							
					</div>
					<div class="title text-center text-lg ">翼宏惠</div>
					<div class="margin-top-sm text-center">请求获取你的手机号</div>
				</view>
						
				<view class="action-btn">
					<!-- 	<u-button text="微信一键登录" type="success" size="large" :hairline="false" throttleTime="2000"
						shape="circle" :customStyle="{'background': '#6FCF97','color': '#fff'}"
						@click="wxLogin"></u-button> -->
					<!-- 	<button class="weixinBtn" open-type="getUserInfo"
						@tap="getUserProfile">微信授权登录</button> -->
		
		
					<button class="weixinBtn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
						获取手机号登录</button>
					<view class="gap " style="margin-top: 30rpx">
		
					</view>
					<u-button v-if="showAccountLogin" @click="$tab.navigateTo('/pages/login')" size="large" :loading="loading" shape="circle"
						:customStyle="{'background': 'linear-gradient( 131deg, #2D84FF, #1EA6FF)','color': '#fff'}"
						type="default" text="账号密码登录">
					</u-button>
				</view>
			</view>
		
		
		</u-popup>
		<u-popup class="loginPop" :show="showBindModal" :round="10" bgColor="transparent" @close="showBindModal = false"
			mode="center">
			<view class="newsBox newsBox2">
				<!-- <image class="icon" src="/static/images/home/notice_icon.png" mode=""></image> -->
				<view class="news" style="background-color: transparent;position: relative;">
					<view class="close-circle">
						<u-icon name="close-circle" color="#393939" size="28" @click="showBindModal = false"></u-icon>
					</view>
				</view>
				<div class="auth-card">
					<div class="img flex justify-center">
						<u--image class="avatar-img" src="/static/logo.png" :radius="200" width="84rpx" height="84rpx"
							mode="aspectFit"></u--image>
		
					</div>
					<div class="title text-center text-lg margin-top-sm">翼宏惠</div>
					<div class="content text-center">邀请您补全个人信息<br></br>（昵称、头像）</div>
					<div style="margin-left: 100rpx;margin-right: 100rpx">
						<u-form :model="weixinUserInfo" ref="uForm">
							<u-form-item label="头像">
								<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar"
									slot="right">
									<u--image class="avatar-img" :src="weixinUserInfo.avatarUrl" :radius="200"
										width="84rpx" height="84rpx" mode="aspectFit"></u--image>
								</button>
							</u-form-item>
							<u-form-item label="昵称">
								<input ref="nicknameInput" type="nickname" class="weui-input"  @blur="userNameInput" placeholder="请输入昵称" />
							</u-form-item>
						</u-form>
					</div>
				</div>
				<div class="action-btn">
		
					<button class="weixinBtn"  @click="wxLogin">
						允许</button>
					<view class="gap " style="margin-top: 30rpx">
		
					</view>
		
					<u-button @click="showBindModal=false" size="large" :loading="loading" shape="circle"
						:customStyle="{'background': 'linear-gradient( 131deg, #2D84FF, #1EA6FF)','color': '#fff'}"
						type="default" text="拒绝">
					</u-button>
				</div>
			</view>
		
		
		
		</u-popup>
	</view>
</template>

<script>
		import WXBizDataCrypt from "@/common/WXBizDataCrypt.js"; 
		import {
			logout,
			weiXinlogin,
			getWeixinConfig
		} from '@/api/login.js'
		
		export default {
			props: {
				showAccountLogin: {
					type: Boolean,
					default: true
				},
				closeOnClickOverlay: {
					type: Boolean,
					default: false
				}
			},
			data() {
				return {
					showBindModal: false,
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
			created() {
				
			},
			methods: {
				
				open() {
					this.showLoginModal = true
				},
			
				getUserInfo() {
					return new Promise((resolve, reject) => {
						uni.getUserProfile({
							desc: '获取个人信息',
							success: (res) => {
								resolve(res.userInfo)
							},
							fail: (err) => {
								reject(err)
							}
						})
					})
				},
		
		
				getCode() {
					return new Promise((resolve, reject) => {
						uni.login({
							provider: 'weixin',
							success(res) {
								resolve(res.code)
							},
							fail: (err) => {
								reject(err)
							}
						})
					})
				},
		
		
		
				onGetPhoneNumber(e) {
					// this.getCode();
					// if (!this.decodePhoneParams.code || !e.detail.encryptedData) {
					// 	return false;
					// }
					if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //用户决绝授权  
						//拒绝授权后弹出一些提示  
		
					} else { //允许授权  
						// let userInfo = this.getUserInfo();
						let js_code = this.getCode();
						Promise.all([js_code]).then((info) => {
							console.log(info)
							getWeixinConfig({
								xcode: info[0]
							}).then((res) => {
								this.session_key = res.session_key;
								let pc = new WXBizDataCrypt(this.AppId, res
									.session_key); //wxXXXXXXX为你的小程序APPID  
								let data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
								// let user = pc.decryptData(this.weixinUserInfo.encryptedData,this.weixinUserInfo.iv);
								console.log(data) //data就是最终解密的用户信息  
								this.weixinUserInfo.mobile = data.phoneNumber
								// this.showBindModal = true
								// console.log('weixinUserInfo',user)
								this.wxLogin(data.phoneNumber)
							})
		
		
						})
						console.log(e.detail)
						e.detail.encryptedData //加密的用户信息  
						e.detail.iv //加密算法的初始向量  时要用到  
					}
				},
				//获取昵称输入内容
				userNameInput(e) {
						console.log('昵称信息》', e)
					this.weixinUserInfo.nickName = e.detail.value
					// uni.showModal({
					// 	title: this.weixinUserInfo.nickName,
					// 	content:  e.detail.value
					// })
				},
				onChooseAvatar(e) {
					console.log('头像信息》')
					console.log(e)
					this.weixinUserInfo.avatarUrl = e.detail.avatarUrl;
				},
				authUser() {
					console.log('authUser', this.weixinUserInfo)
				},
				getUserProfile() {
					// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
					// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
					uni.getUserProfile({
						desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
						success: (res) => {
							console.log('getUserProfile', res)
							this.weixinUserInfo = res.userInfo
							this.showLoginModal = false;
							this.showBindModal = true //调用一键获取手机号弹窗（自己写的）
						}
					})
				},
				wxLogin() {
					console.log('用户信息》', this.weixinUserInfo)
					console.log(this.$refs.nicknameInput)
					
					weiXinlogin({
						mobile: this.weixinUserInfo.mobile,
						// mingcheng: this.weixinUserInfo.nickName
					}).then((res) => {
						this.showLoginModal = false;
						this.showBindModal = false;
		
						this.$toast("微信授权登录成功!");
						// this.$store.commit("SET_USERINFO", result.data);
						this.$store.commit("SET_TOKEN", res.token);
		
						uni.reLaunch({
							url: "/pages/home/home"
						})
		
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
		
			}
		}
</script>

<style lang="scss">
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