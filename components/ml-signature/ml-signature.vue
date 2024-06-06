<template>
	<view class="box">
		<view :class="[mode==='horizontal'?'vertical':'horizontal']">
			<canvas canvas-id="canvasId" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
				:style="{width: width+'px', height: height+'px'}"></canvas>
			<view class="bottom">
				<view class="bot_text" :style="{color:textColor}">{{text}}</view>
				<view class="btn">
					<button class="clear" :style="{color:clearColor,background:clearBgColor}"
						@click="clear">{{clearText}}</button>
					<button class="save" :style="{color:saveColor,background:saveBgColor}"
						@click="save">{{saveText}}</button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				width: '',
				height: '',
				ctx: '',
				moveX: '',
				moveY: '',
			};
		},
		props: {
			color: {
				type: String,
				default: "#000"
			},
			size: {
				type: Number,
				default: 4
			},
			mode: {
				type: String,
				default: "horizontal"
			},
			upload: {
				type: Boolean,
				default: false
			},
			text: {
				type: String,
				default: "请在输入框内签名"
			},
			textColor: {
				type: String,
				default: "#999"
			},
			clearText: {
				type: String,
				default: "清空"
			},
			clearColor: {
				type: String,
				default: "#fff"
			},
			clearBgColor: {
				type: String,
				default: "#F56C6C"
			},
			saveText: {
				type: String,
				default: "保存"
			},
			saveColor: {
				type: String,
				default: "#fff"
			},
			saveBgColor: {
				type: String,
				default: "#409EFF"
			}
		},
		mounted() {
			// 获取屏幕宽高
			if (this.mode == 'horizontal') {
				let width = uni.getSystemInfoSync().windowWidth
				let height = uni.getSystemInfoSync().windowHeight - 70
				// 计算画板的高宽
				this.width = width - 4
				this.height = height
			} else {
				let width = uni.getSystemInfoSync().windowWidth
				let height = uni.getSystemInfoSync().windowHeight - 150
				// 计算画板的高宽
				this.width = width - 4
				this.height = height * 0.99
			}

			this.ctx = uni.createCanvasContext("canvasId", this)
			this.ctx.setLineWidth(this.$props.size)
			this.ctx.setStrokeStyle(this.$props.color)
			this.ctx.lineCap = 'round'
			this.ctx.lineJoin = 'round'
		},
		methods: {
			handleTouchStart(e) {
				// console.log(e);
				let startX = e.changedTouches[0].x;
				let startY = e.changedTouches[0].y;
				this.ctx.beginPath()
				this.ctx.moveTo(startX, startY)
				this.moveX = ''
				this.moveY = ''
			},
			handleTouchMove(e) {
				// console.log(e);
				let movesX = e.changedTouches[0].x;
				let movesY = e.changedTouches[0].y;
				// 防止线条出现断点
				if (this.moveX && this.moveY) {
					this.ctx.moveTo(this.moveX, this.moveY)
					this.ctx.lineTo(this.moveX, this.moveY)
				}
				this.ctx.lineTo(movesX, movesY)
				this.moveX = movesX
				this.moveY = movesY
				this.ctx.stroke()
				this.ctx.draw(true)

			},

			clear() {
				this.ctx.clearRect(0, 0, this.width, this.height);
				this.ctx.draw();
				uni.showToast({
					icon: "none",
					title: "已清空"
				})
			},
			saveImage() {

				const that = this;
				if (that.moveX == 0 && that.moveY == 0) {
					uni.showToast({
						icon: "none",
						title: "请先签名"
					})
					return false;
				}
				uni.canvasToTempFilePath({
					canvasId: 'canvasId',
					destWidth: that.mode == 'horizontal' ? uni.getSystemInfoSync().windowWidth : uni
						.getSystemInfoSync().windowHeight,
					destHeight: that.mode == 'horizontal' ? uni.getSystemInfoSync().windowHeight : uni
						.getSystemInfoSync().windowWidth,
					success: function(res) {
						let path = res.tempFilePath;

						console.log(res)
						if (that.upload) {
							// #ifdef APP-PLUS
							// const savedFilePath = res.tempFilePath //相对路径
							const _path = plus.io.convertLocalFileSystemURL(path) //绝对路径
							const fileReader = new plus.io.FileReader()
							fileReader.readAsDataURL(_path)
							fileReader.onloadend = (res) => { //读取文件成功完成的回调函数
								console.log(res.target.result) //输出base64内容
								that.$emit("onSign", res.target.result)
							}
							// #endif
							// #ifdef H5 
							that.$emit("onSign", path)
							// #endif
							// #ifdef MP-WEIXIN
							uni.getFileSystemManager().readFile({ // 【重点来啦】人家自提供的转码API
								filePath: path, // 所需转码图像路径
								encoding: "base64", // 转码类型
								success: (res) => {
									// 生成base64
									let imageBase64 = 'data:image/' +'png' + ';base64,' + res
										.data;
									console.log('转base64后：', imageBase64);
									that.$emit("onSign", imageBase64)
								}
							})

							// #endif
						} else {
							uni.showLoading({
								title: '正在保存图片...'
							});
							setTimeout(() => {
								// #ifdef APP-PLUS||MP-WEIXIN
								uni.saveImageToPhotosAlbum({
									filePath: path,
									success() {
										uni.showToast({
											icon: "none",
											title: "已保存到相册"
										})
									},
									fail() {
										uni.showToast({
											icon: "none",
											title: "已取消"
										})
									}
								})
								// #endif

								// #ifdef H5 
								const bytes = atob(path.split(',')[1]);
								const ab = new ArrayBuffer(bytes.length);
								const ia = new Uint8Array(ab);
								for (let i = 0; i < bytes.length; i++) {
									ia[i] = bytes.charCodeAt(i);
								}

								const blob = new Blob([ab], {
									type: 'image/png'
								});
								const url = URL.createObjectURL(blob);

								const link = document.createElement('a');
								link.href = url;
								link.download = 'image.png';
								link.click();
								uni.showToast({
									icon: "none",
									title: "已保存到相册"
								})
								// #endif
								uni.hideLoading()
							}, 2000)
						}

					},
					fail(err) {
						console.log(err);
					}
				}, that)
			},

			save() {

				this.saveImage()

			}
		}
	}
</script>

<style lang="less" scoped>
	.box {
		.vertical {
			height: 100%;

			.bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;

				.bot_text {
					font-size: 30rpx;
					color: #999;
				}

				.btn {
					display: flex;
					align-items: center;

					.save {
						font-size: 28rpx;
						background: #409EFF;
						color: #fff;
						padding: 0 30rpx;
						margin-left: 30rpx;
					}

					.clear {
						font-size: 28rpx;
						background: #F56C6C;
						color: #fff;
						padding: 0 30rpx;
						margin: 0;
					}
				}
			}

			canvas {
				border: 2px dashed #DCDFE6;
			}
		}

		.horizontal {
			display: flex;
			flex-direction: row-reverse;

			.bottom {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				padding: 140rpx 20rpx;
				box-sizing: border-box;
				width: 15%;

				.bot_text {
					font-size: 30rpx;
					color: #999;
					width: max-content;
					transform: rotate(90deg);
				}

				.btn {
					display: flex;
					margin-top: 15px;
					transform: rotate(90deg);

					.save {
						font-size: 28rpx;
						background: #409EFF;
						color: #fff;
						width: 120rpx;
						margin-left: 30rpx;
					}

					.clear {
						font-size: 28rpx;
						background: #F56C6C;
						color: #fff;
						width: 120rpx;
						margin: 0;
					}
				}
			}

			canvas {
				border: 2px dashed #DCDFE6;
			}
		}
	}
</style>