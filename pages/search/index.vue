<template>
	<view class="search">
		<u-popup :show="show" mode="top" @close="close" @open="open">
			<view class="serach-pop">
				<u-navbar leftText="返回" :fixed="false" bgColor="transparent" :autoBack="false" :safeAreaInsetTop="true"
					@leftClick="$mHelper.goBack()" leftIconColor="#363636"  leftIconSize="25"
					:titleStyle="{color: '#363636',fontSize: '32rpx'}">
					<view class="search flex align-center" slot="right" @click="show=false" :style="{marginRight: rightX + 'px'}">
						<text style="fontSize: 33rpx">退出查询</text>
						<u-icon size="28" class="margin-left-xs" color="#363636" name="close-circle"></u-icon>

					</view>
				</u-navbar>
				<view class="" style="padding:  20rpx 44rpx 44rpx 44rpx;border-top: 2rpx solid #413BD7;">
					
				
				<u--form  :model="form" ref="form" labelPosition="left" labelWidth="120" :borderBottom="true">
					<view class="" v-for="(item,index) in columns" :key="index">
						<u-form-item v-if="item.type == 'select'" :label="item.label" :prop="item.model"
							class="input-item " :borderBottom="true" @click="item.show = true; ">
							<u--input v-model="form[item.model]" disabled disabledColor="#ffffff"
								:placeholder="item.placeholder" inputAlign="right" fontSize="18" color="#3F3F3F"
								border="none"></u--input>
							<u-icon slot="right" class="margin-left-sm" name="arrow-down"></u-icon>
							<u-action-sheet :show="item.show" :actions="item.actions" :title="item.placeholder"
								@close="item.show = false" @select="selectAction">
							</u-action-sheet>
						</u-form-item>

						<u-form-item v-if="item.type == 'date'" :label="item.label" prop="bank" class="input-item "
							:borderBottom="true">
						
							<view class="flex align-center selectDate" slot="right">

								<text v-if="form.startDate"
									@click="form.showStartDate = true">
									{{ form.startDate | date('yyyy-mm-dd')}} </text>
								<text v-else @click="form.showStartDate = true">开始时间</text>
								<text class="fs margin-left margin-right">至</text>
								<text v-if="form.endDate"
									@click="form.showEndDate = true">{{ form.endDate | date('yyyy-mm-dd')}}</text>
								<text v-else @click="form.showEndDate = true">结束时间</text>
							</view>
							<u-datetime-picker :show="form.showStartDate"
								v-model="form.startDate" 
								@confirm="selectStartTime"
								@cancel="form.showStartDate =false"
								mode="date"></u-datetime-picker>
							<u-datetime-picker :show="form.showEndDate "
								v-model="form.endDate" mode="date"
								@cancel="form.showEndDate =false"
								@confirm="selectEndTime"></u-datetime-picker>
						</u-form-item>
						<u-form-item v-if="item.type == 'input'" :label="item.label" :prop="item.model"
							class="input-item " :borderBottom="true">
							<u--input v-model="form[item.model]" disabledColor="#ffffff" :placeholder="item.placeholder"
								inputAlign="right" fontSize="18" color="#3F3F3F" border="none"></u--input>
						</u-form-item>

					</view>
					<view class="btn-action flex align-center justify-between">
						<u-button type="default" :plain="true" shape="circle" text="重置条件" @click="reset"></u-button>
						<u-button type="primary" shape="circle" text="确认筛选" @click="confirm"></u-button>
					</view>
				</u--form>
				</view>
			</view>
		</u-popup>


	</view>
</template>

<script>
	export default {
		props: {
			columns: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {
				show: false,
				rightX: 0,
				form: {
					
					startDate: new Date(),
					endDate: new Date(),
					showStartDate: false,
					showEndDate: false
				},
				showBank: false,
				showStartTime: false,
				showEndTime: false,
				startTime: '',
				endTime: '',
				actions: [{
						name: '中国银行',
					},
					{
						name: '建设银行',
					},
					{
						name: '招商银行',
					},
				],
			};
		},
		created() {
			// #ifdef MP-WEIXIN
			let res = uni.getMenuButtonBoundingClientRect()
			console.log(res)
			this.rightX = res.width
			// #endif
			const today = new Date();
			  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
			this.form.startDate = firstDay,
			this.form.endDate = new Date()
			// this.columns.forEach((item) => {
			// 	this.form[item.model] = ''
			// 	console.log(this.form)
			// 	if (item.dateZone) {
			// 		item.dateZone.forEach((zone) => {
			// 			this.form[zone.model] = ''
			// 		})
			// 	}
			// 	if(item.type != 'date') {
					
			// 	}
			// })
		},
		methods: {
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			selectAction(e) {
				// this.form.bank = e.name
				console.log(e)
				this.form[e.model] = e.name
			},

			selectStartTime(e) {
				console.log(uni.$u.timeFormat(e.value, 'yyyy-mm-dd'))
				// this.startTime = e.value
				this.form.startDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				console.log(this.form.startDate)
				this.form.showStartDate = false

			},
			selectEndTime(e) {
				console.log(e.value)
				// this.date2 = e.value
				this.form.endDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.form.showEndDate = false
			},
			confirm() {
				this.$emit('submit', this.form)
				this.close()
			},
			reset() {
				this.columns.forEach((item) => {
					this.form[item.model] = ''
					if (item.dateZone) {
						item.dateZone.forEach((zone) => {
							this.form[zone.model] = ''
						})
					}
					if(item.type == 'date') {
						this.form.DataFrom = '',
						this.form.DataTo =  '',
						this.form.startDate = new Date(),
						this.form.endDate = new Date()
						// this.form[item.dateZone[0].model] = new Date()
						// this.form[item.dateZone[1].model] = new Date()
						// this.form[item.dateZone[0].showModel] = ''
						// this.form[item.dateZone[1].showModel] = ''
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-form {
		
		

		/deep/ .u-form-item__body__left__content {
			padding-left: 26rpx;
		}

		/deep/ .u-form-item__body__left__content__label {
			color: #3F3F3F;
			font-size: 30rpx;
			line-height: 30rpx;
		}

		/deep/ .u-form-item__body__left__content__required {
			font-size: 28rpx;
			color: #413BD7;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}

		/deep/ .u-input {
			flex: auto;
		}

		/deep/ .uni-select {
			margin-top: 20rpx;
			border: 0;

			// border-bottom: 1rpx solid rgba(255, 255, 255, 0.2) !important;
		}

		/deep/ .uni-select__input-placeholder {
			color: #9A9A9A;
			font-size: 30rpx;
		}

		/deep/ .uni-input-placeholder {
			color: #9A9A9A !important;
			font-size: 30rpx;
			// font-family: 'AlibabaPuHuiTiR';
			// font-weight: 400;
		}

		.selectDate {
			color: #9A9A9A;
			font-size: 30rpx;

			.fs {
				color: #3F3F3F;
			}
		}

		

	}
	.btn-action {
		margin-top: 60rpx;
	
		.u-button {
			width: 242rpx;
			height: 72rpx;
		}
	
		/deep/ .u-button--plain {
			height: 72rpx;
			border: 1px solid #413BD7 !important;
			background: transparent;
			color: #413BD7;
		}
	}
</style>