<template>
	<view class="common" :style="{paddingTop: barH }">
		 <slot></slot>
	</view>
</template>

<script>
	export default {
		name:"common-view",
		data() {
			return {
				barH: `44px`
				// return `calc(${this.$statusBarHeight } + 44px)`
			};
		},
		
		mounted() {
			console.log(this.barH)
			// #ifdef APP-PLUS || MP-WEIXIN
			this.barH = `calc(${this.$statusBarHeight } + 44px)`
			
			uni.getSystemInfo({
			    success: (res) => {
			      // 获取手机顶部状态栏的高度
			      const statusBarHeight = res.statusBarHeight || 0;
			
			      // 获取导航栏的高度（手机状态栏高度 + 胶囊高度 + 胶囊的上下间距）
			      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			      const navBarHeight = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) * 2;
			
			      // 计算顶部图标距离
			      const topIconDistance = statusBarHeight + navBarHeight;
			
			      // 打印顶部图标距离
			      console.log('顶部图标距离:', topIconDistance);
				  this.barH = topIconDistance + 'px'
			    },
			    fail: (err) => {
			      console.error('获取系统信息失败:', err);
			    },
			  });
			  // #endif
			  
		},
		computed: {
			
		},
	}
</script>

<style lang="scss">

</style>