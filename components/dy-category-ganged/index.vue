<template>
	<view class="dyCategoryGanged">
		<view class="dyCategoryGangedBox">
			<view class="dyCategoryGangedTypeBox">
				<scroll-view class="scrollBoxL" :scroll-top="scrollBoxL" :scroll-y="true" :show-scrollbar="false"
					:scroll-with-animation="scrollWithAnimation" :scroll-into-view="scrollLIndex">
					<view class="dyCategoryGangedTypeList">
						<view class="dyCategoryGangedTypeItem" :id="'scrollLIndex'+index"
							:class="('scrollLIndex' + index === scrollLIndex)&&(dyCategoryGangedTypeItemClass+' active')"
							v-for="(item,index) in dyCategoryGangedData" :key="index" @click="clickLItem(item,index)">
							<view class="typeSlot typeTitle">
								<!-- 只在微信小程序编译 -->
								<!--  #ifdef MP-WEIXIN -->
								<slot :name="'type'+index"></slot>
								<!--  #endif -->
								<!-- 除微信小程序以外编译 -->
								<!--  #ifndef MP-WEIXIN -->
								<slot name="type" :item="item" :index="index">{{item[optionsD.typeTitle]}}</slot>
								<!--  #endif -->
							</view>
							<!-- 只在微信小程序编译 - 默认值 -->
							<!--  #ifdef MP-WEIXIN -->
							<view class="typeSlotDefault typeTitle">{{item[optionsD.typeTitle]}}</view>
							<!--  #endif -->
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="dyCategoryGangedContentBox">
				<scroll-view class="scrollBoxR" :scroll-top="scrollBoxR" :scroll-y="true" :show-scrollbar="false"
					:scroll-with-animation="scrollWithAnimation" :scroll-into-view="scrollRIndex"
					@scroll="dyCategoryGangedContentBoxScroll">
					<view class="dyCategoryGangedContentList">
						<view :id="'scrollRIndex'+index" v-for="(item,index) in dyCategoryGangedData" :key="index">
							<view class="minTypeTitleSlot minTypeTitle">
								<!-- 只在微信小程序编译 -->
								<!--  #ifdef MP-WEIXIN -->
								<slot :name="'minTypeTitle'+index"></slot>
								<!--  #endif -->
								<!-- 除微信小程序以外编译 -->
								<!--  #ifndef MP-WEIXIN -->
								<slot name="minTypeTitle" :item="item" :index="index">
									{{item[optionsD.minTypeTitle]}}
								</slot>
								<!--  #endif -->
							</view>
							<!-- 只在微信小程序编译 - 默认值 -->
							<!--  #ifdef MP-WEIXIN -->
							<view class="minTypeTitleSlotDefault minTypeTitle">
								{{item[optionsD.minTypeTitle]}}
							</view>
							<!--  #endif -->

							<view v-for="(itemChild,indexChild) in item[optionsD.childrens]" :key="indexChild">
								<view class="dyCategoryGangedContentItem"
									:class="itemChild.dyCategoryGangedTypeItemClassActive&&'active'"
									@click="selectValueFn(itemChild,indexChild)">
									<view class="contentSlot content">
										<!-- 只在微信小程序编译 -->
										<!--  #ifdef MP-WEIXIN -->
										<slot :name="'content'+index+indexChild"></slot>
										<!--  #endif -->
										<!-- 除微信小程序以外编译 -->
										<!--  #ifndef MP-WEIXIN -->
										<slot name="content" :itemChild="itemChild" :indexChild="indexChild">
											{{itemChild[options.content]}}
										</slot>
										<!--  #endif -->
									</view>
									<!-- 只在微信小程序编译 - 默认值 -->
									<!--  #ifdef MP-WEIXIN -->
									<view class="contentSlotDefault content">
										{{itemChild[options.content]}}
									</view>
									<!--  #endif -->
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [Object, Array],
				default () {
					return [];
				}
			},
			data: {
				type: Array,
				default () {
					return [];
				}
			},
			multiple: {
				type: Boolean,
				default () {
					return false;
				}
			},
			scrollWithAnimation: {
				type: Boolean,
				default () {
					return false;
				}
			},
			options: {
				type: Object,
				default (e) {
					return {
						typeTitle: "typeTitle",
						minTypeTitle: "minTypeTitle",
						childrens: "childrens",
						content: "content",
					};
				}
			},
			dyCategoryGangedTypeItemClass: {
				type: String,
				default () {
					return 'dyCategoryGangedTypeItemClassActive';
				}
			},
		},
		data() {
			return {
				title: 'Hello',
				clickChange: false, // 点击切换
				selectListShow: false,
				scrollBoxL: 0, // 左侧滚动条位置
				scrollBoxR: 0, // 右侧滚动条位置
				scrollBoxRHeightArr: [],
				scrollLIndex: 'scrollLIndex0',
				scrollRIndex: 'scrollRIndex0',
				scrollTimer: null,
				clickScrollTimer: null,
				dyCategoryGangedData: [],
				optionsD: {
					typeTitle: "typeTitle",
					minTypeTitle: "minTypeTitle",
					childrens: "childrens",
				},
			}
		},
		watch: {
			data: {
				deep: true,
				handler(val) {
					let _self = this;
					console.log(val);
					_self.init();
				}
			},
		},
		mounted() {
			let _self = this;
			Object.assign(_self.optionsD, _self.options); // 初始化默认配置
			_self.init();
		},
		methods: {
			// 初始化
			init() {
				let _self = this;
				_self.dyCategoryGangedData = _self.data || [];
				_self.$nextTick(() => {
					let timer = setTimeout(() => {
						clearTimeout(timer);
						timer = null;
						_self.scrollBoxRHeightArr = [];
						let sum = 0;
						// 获取右侧每一项的高度，用于滚动时同步左侧激活项
						for (let i = 0; i < _self.dyCategoryGangedData.length; i++) {
							let q = uni.createSelectorQuery().in(_self);
							q.select("#scrollRIndex" + i).boundingClientRect(data => {
								sum += data.height;
								_self.scrollBoxRHeightArr.push(sum);
							}).exec()
						}
					}, 300)
				})
			},
			// 点击左侧滚动到当前位置并同步右侧
			clickLItem(item, index) {
				let _self = this;
				clearTimeout(_self.clickScrollTimer);
				_self.clickScrollTimer = null;
				_self.clickChange = true;
				_self.scrollLIndex = 'scrollLIndex' + index;
				_self.scrollRIndex = 'scrollRIndex' + index;
				_self.clickScrollTimer = setTimeout(() => {
					clearTimeout(_self.clickScrollTimer);
					_self.clickScrollTimer = null;
					_self.clickChange = false;
				}, 700);
			},
			// 右侧滚动监听
			dyCategoryGangedContentBoxScroll(e) {
				let _self = this;
				if (_self.clickChange) { // 如果是点击切换
					return false;
				}
				clearTimeout(_self.scrollTimer);
				_self.scrollTimer = null;
				// 防抖
				_self.scrollTimer = setTimeout(() => {
					clearTimeout(_self.scrollTimer);
					_self.scrollTimer = null;
					let scrollTop = e.detail.scrollTop;
					for (let i = 0; i < _self.scrollBoxRHeightArr.length; i++) {
						if (_self.scrollBoxRHeightArr[i] > scrollTop) {
							console.log('切换' + i);
							_self.scrollLIndex = 'scrollLIndex' + i;
							break;
						}
					}
				}, 70)
			},
			// 清空选中项
			clear() {
				let _self = this;

				for (let i = 0; i < _self.dyCategoryGangedData.length; i++) {
					let c = _self.dyCategoryGangedData[i][_self.optionsD.childrens];
					for (let j = 0; j < c.length; j++) {
						c[j].dyCategoryGangedTypeItemClassActive = false;
					}
				}
				// ↓解决选中数据不回显，需要滚动页面才能回显
				_self.scrollBoxR++;
				_self.scrollBoxR--;
			},
			// 选中数据
			selectValueFn(itemChild, indexChild) {
				let _self = this;

				itemChild.dyCategoryGangedTypeItemClassActive = !itemChild.dyCategoryGangedTypeItemClassActive;

				let selectValue = null;
				if (_self.multiple) { // 多选为数组对象
					selectValue = [];
					for (let i = 0; i < _self.dyCategoryGangedData.length; i++) {
						let c = _self.dyCategoryGangedData[i][_self.optionsD.childrens];
						for (let j = 0; j < c.length; j++) {
							if (c[j].dyCategoryGangedTypeItemClassActive) {
								let obj = JSON.parse(JSON.stringify(c[j]));
								delete obj.dyCategoryGangedTypeItemClassActive;
								selectValue.push(obj);
							}
						}
					}
				} else { // 单选为对象
					_self.clear();
					itemChild.dyCategoryGangedTypeItemClassActive = true;
					let obj = JSON.parse(JSON.stringify(itemChild));
					delete obj.dyCategoryGangedTypeItemClassActive;
					selectValue = obj;
				}
				// ↓解决选中数据不回显，需要滚动页面才能回显
				_self.scrollBoxR++;
				_self.scrollBoxR--;
				_self.setValue(selectValue);
			},
			// 设置值
			setValue(val) {
				let _self = this;
				_self.$emit('input', val);
				_self.$emit('select', val);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.dyCategoryGanged {
		width: 100%;
		height: 100%;
		background-color: #fff;
		position: relative;
		box-sizing: border-box;

		.dyCategoryGangedBox {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 100%;
			// padding-bottom: calc(constant(safe-area-inset-bottom) + 100rpx);
			// padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);
		}

		.dyCategoryGangedTypeBox {
			width: 200rpx;
			height: 100%;
			box-shadow: 5rpx 5rpx 12rpx 5rpx rgba(0, 0, 0, .05);

			.scrollBoxL {
				height: 100%;

				.dyCategoryGangedTypeList {

					.dyCategoryGangedTypeItem {
						min-height: 80rpx;
						line-height: 80rpx;
						background-color: #f1f1f1;
						color: #666;

						&.active {
							background-color: #fff;
							color: #111;
							border-right: 5rpx solid #009ee5;
						}

						.typeTitle {}

						.typeSlot {

							&:empty {
								display: none;

								&+.typeSlotDefault {
									display: block;
								}
							}
						}

						.typeSlotDefault {
							display: none;

							&.typeTitle {
								text-align: center;
							}
						}
					}
				}
			}
		}

		.dyCategoryGangedContentBox {
			flex: 1;
			height: 100%;
			overflow: auto;

			.scrollBoxR {
				height: 100%;

				.dyCategoryGangedContentList {

					.minTypeTitle {}


					.minTypeTitleSlot {

						&:empty {
							display: none;

							&+.minTypeTitleSlotDefault {
								display: block;
							}
						}
					}

					.minTypeTitleSlotDefault {
						display: none;

						&.minTypeTitle {
							font-size: 24rpx;
							padding: 12rpx 24px;
							background-color: #f1f1f1;
						}
					}

					.dyCategoryGangedContentItem {

						&.active {
							color: #fff;
							background-color: #009ee5;
							position: relative;

							&::after {
								content: '〇';
								position: absolute;
								top: 50%;
								right: 24rpx;
								transform: translateY(-50%);
							}
						}

						.content {}

						.contentSlot {

							&:empty {
								display: none;

								&+.contentSlotDefault {
									display: block;
								}
							}
						}

						.contentSlotDefault {
							display: none;

							&.content {
								padding: 12rpx 24rpx;
							}
						}
					}
				}
			}
		}
	}
</style>