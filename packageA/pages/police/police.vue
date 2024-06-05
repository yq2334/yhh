<template>
	<view class="police">
		<u-navbar leftText="返回" :fixed="true" bgColor="#fff" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636"  leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view class="police-content common-content">
			<view class="pannel">
				<view class="cell flex align-center justify-between ">
					<view class="lable">
						代理商名称
					</view>
					<view class="value">
						潘海青
					</view>
					
				</view>
				<view class="cell flex align-center justify-between " @click="showBand = true">
					<view class="lable">
						品牌
					</view>
					<view class="value">
						{{bandName}}
					</view>
					<view class="">
						<u-icon size="18" color="#8B8B8B" name="arrow-down"></u-icon>
					</view>
				</view>
				<view class="cell flex align-center justify-between noBorder-Bottom" @click="showPolice = true">
					<view class="lable">
						政策
					</view>
					<view class="value">
						{{policeName}}
					</view>
					<view class="">
						<u-icon size="18" color="#8B8B8B" name="arrow-down"></u-icon>
					</view>
				</view>
			</view>
			<view class="pannel margin-top">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						刷卡成本
					</view>
					<view class="value">
						{{detail.chengben_dai}}
					</view>
				
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						扫码成本
					</view>
					<view class="value">
						{{detail.chengben_yun}}
					</view>
				
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						笔数成本
					</view>
					<view class="value">
						{{detail.bishu}}
					</view>
					
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						运营补贴
					</view>
					<view class="value">
							{{detail.butie}}
					</view>
					
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						流量卡分润
					</view>
					<view class="value">
							{{detail.liuliangka}}
					</view>
					
				</view>
			</view>
			<view class="pannel margin-top">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						一阶段
					</view>
					<view class="value">
							{{detail.fanxian1}}
					</view>
					
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						二阶段
					</view>
					<view class="value">
						{{detail.fanxian2}}
					</view>
					
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						三阶段
					</view>
					<view class="value">
						{{detail.fanxian3}}
					</view>
					
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						四阶段
					</view>
					<view class="value">
						{{detail.fanxian4}}
					</view>
					
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						五阶段
					</view>
					<view class="value">
							{{detail.fanxian5}}
					</view>
					
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						六阶段
					</view>
					<view class="value">
							{{detail.fanxian6}}
					</view>
					
				</view>
			</view>
			<view class="pannel margin-top">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						押金一
					</view>
					<view class="value">
							{{detail.yajin1}}
					</view>
				
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						押金二
					</view>
					<view class="value">
							{{detail.yajin2}}
					</view>
					
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						押金三
					</view>
					<view class="value">
							{{detail.yajin3}}
					</view>
				
				</view>
			</view>
			<view class="pannel margin-top-xs">
				<view class="cell-sm flex align-center justify-between">
					<view class="lable">
						押金四
					</view>
					<view class="value">
							{{detail.yajin4}}
					</view>
				
				</view>
			</view>
		</view>
		<u-picker :show="showBand" :columns="bandList" keyName="pinpainame" title="请选择品牌" @close="showBand = false" @cancel="showBand = false" @confirm="bandSelect" ></u-picker>
		<u-picker :show="showPolice" :columns="policeList" keyName="zcname" title="请选择政策" @close="showPolice = false" @cancel="showPolice = false" @confirm="policeSelect" ></u-picker>
		
	</view>
</template>

<script>
	import {getBandList, getPoliceList, getPoliceDetail} from '@/api/system/user.js'
	export default {
		data() {
			return {
				showBand: false,
				showPolice: false,
				bandList: [],
				policeList: [],
				bandName: '',
				bandno: '',
				policeName: '',
				policeNO: '',
				detail: {}
			};
		},
		onLoad() {
			this.getBandListData()
			
		},
		methods: {
			getBandListData() {
				this.bandList = []
				getBandList().then((res) => {
					this.bandList.push(res.pinpailist)
					this.bandName = res.pinpailist[0].pinpainame
					this.bandno = res.pinpailist[0].pinpai
						this.getPoliceListData()
				})
			},
			getPoliceListData() {
				this.policeList = []
				getPoliceList({
					pinpai: this.bandno
				}).then((res) => {
					this.policeList.push(res.zhengcelist)
					this.policeName = res.zhengcelist[0].zcname
					this.policeNO = res.zhengcelist[0].zcno
					this.getPoliceDetailData()
				})
			},
			getPoliceDetailData() {
				getPoliceDetail({
					zcno: this.policeNO,
					pinpai: this.bandno
				}).then((res) => {
					this.detail = res
				})
			},
			bandSelect(e) {
				this.bandName = e.value[0].pinpainame
				this.bandno = e.value[0].pinpai
				this.getPoliceListData()
				this.showBand = false
				
			},
			policeSelect(e) {
				this.policeName = e.value[0].zcname
				this.policeNO = e.value[0].zcno
				this.getPoliceDetailData()
				this.showPolice = false
				
			}
		},
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #F6F5F8;
}
.police{
	&-content{
		padding: 31rpx 18rpx;
		.pannel{
			background: #FFFFFF;
			border-radius: 25rpx;
			padding: 0 40rpx;
		}
		.cell{
			padding: 30rpx 0;
			border-bottom: 1rpx solid rgba(103, 103, 103, 0.2);
		
		}
		.cell-sm{
			padding: 20rpx 0;
		}
		.lable{
			font-size: 33rpx;
			color: #676767;
			flex: 1;
		}
		.value{
			flex: 2;
			font-size: 33rpx;
			color: rgba(51, 51, 51, 0.6);
		}
	}
}
</style>
