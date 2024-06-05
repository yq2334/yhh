<template>
	<view>
		<u-navbar leftText="人脸识别" :fixed="false" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#000" leftIcon="arrow-left" leftIconSize="22"
			:titleStyle="{color: '#000',fontSize: '32rpx'}">
		</u-navbar>
		{{faceUrl}}
	</view>
</template>

<script>
	import {getFaceUrl} from '@/api/system/user.js'

	export default {
		data() {
			return {
				faceUrl: '',
				orderno: ''
			};
		},
		onLoad(options) {
			this.orderno = options.orderno;
			this.getUrl()
		},
		methods: {
			getUrl() {
				getFaceUrl({
					orderno: this.orderno
				}).then((res) => {
					// console(JSON.stringify(res))
					// #ifdef APP-PLUS
					
					// #endif
					let url = 'https://face.eval.pw/?token=' + res.faceurl
					// this.faceUrl = url
					this.$tab.navigateTo(
						`/packageA/pages/indentify/face-webview?title=人脸识别&url=${url}`
					);
				})
			},
			openLink() {
				
			}
		},
	}
</script>

<style lang="scss">

</style>
