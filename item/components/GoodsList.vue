<template>
	<view class="goods-list">
		<u-swipe-action>
			<u-swipe-action-item autoClose :options="options1" v-for="(item,index) in goodsList" :name="index"
				:key="index" @click="btnClick">
					<view class="list-item" v-if="item.status !== '3'">
						<view class="img">
							<image v-if="item.goodsList && item.goodsList.length" :src="item.goodsList[0].url" mode="">
								<view v-else class="none-img">
									<u-icon name="photo" color="#ffffff" size="40"></u-icon>
								</view>
						</view>
						<view class="item-middle">
							<view class="title">
								{{item.title}}
							</view>
							<view class="type">
								<text class="type-title">类型:</text>
								{{item.selectType}}
							</view>
						</view>
						<view class="item-r">
							<view class="time">{{item.time | dealTime}}</view>
							<view class="status">
								<view class="status1" v-if="item.status == '0'">审核中...</view>
								<view class="status1" v-if="item.status == '1'">审核通过</view>
								<view class="status2" v-if="item.status == '2'">未通过审核</view>
							</view>
						</view>
					</view>
					<!-- <view class="reject-text"v-if="item.status == '2'">{{item.rejectText}}</view> -->
			</u-swipe-action-item>
		</u-swipe-action>
		<u-popup :show="show" :closeOnClickOverlay="true" :safeAreaInsetTop="true" mode="bottom" @close="close">
			<view class="box">
				<view class="title">
					<text class="title-pre">标题：</text>
					<text class="title-content">{{this.showInfo.title}}</text>
				</view>
				<view class="main">
					<view class="main-box">
						<view class="item">
							<view class="title-name">物品类型：</view>
							<view class="title-value">{{this.showInfo.selectType}}</view>
						</view>
						<view class="item">
							<view class="title-name">姓名：</view>
							<view class="title-value">{{this.showInfo.name}}</view>
						</view>
						<view class="item">
							<view class="title-name">联系方式：</view>
							<view class="title-value">{{this.showInfo.phone}}</view>
						</view>
						<view class="item">
							<view class="title-name">学院：</view>
							<view class="title-value">{{this.showInfo.college}}</view>
						</view>
					</view>
					<view class="item">
						<view class="title-name">物品描述：</view>
						<view class="title-value">{{this.showInfo.intro || '暂无描述'}}</view>
					</view>
					<view class="item">
						<view class="title-name">丢失地址：</view>
						<view class="title-value">{{this.showInfo.address}}</view>
					</view>
					<view class="item">
						<view class="title-name">详细丢失地址：</view>
						<view class="title-value">{{this.showInfo.description || '暂无描述'}}</view>
					</view>
					<view class="imglist" v-if="showInfo.goodsList && showInfo.goodsList.length">
						<u-album :urls="showInfo.goodsList" keyName="url"></u-album>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import utils from '@/utils.js'
	export default {
		name: "GoodsList",
		props: {
			goodsList: {
				type: Array,
				default: []
			},
			type: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				show: false,
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				options1: [],
				showInfo:{}
			};
		},
		watch: {
			type: {
				handler(val) {
					if (val == 'release') {
						this.options1 = [{
							text: '归还',
							style: {
								backgroundColor: '#56bbb5'
							}
						}, {
							text: '删除',
							style: {
								backgroundColor: '#f56c6c'
							}
						}]
					}else {
						this.options1 = [{
							text: '查看',
							style: {
								backgroundColor: '#56bbb5'
							}
						}, {
							text: '删除',
							style: {
								backgroundColor: '#f56c6c'
							}
						}]
					}
				},
				immediate:true
			}
		},
		filters: {
			dealTime(val) {
				let data = utils.getTimeDifference(val)
				return data
			}
		},
		methods: {
			toEdit() {
				uni.navigateTo({

				})
			},
			async btnClick(e) {
				let { id } = JSON.parse(uni.getStorageSync('userInfo'))
				if(this.type == 'release'){
					if (e.index == 0) {
						//归还,status=3
						const res = await this.$api.returnGoods(this.goodsList[e.name])
						if(res.status == 200){
							console.log('归还成功');
							this.$emit('getRelease',id)
						}
					} else {
						const res = await this.$api.deleteMyGood(this.goodsList[e.name])
						if(res.status == 200){
							console.log('删除成功');
							this.$emit('getRelease',id)
						}
					}
				}else {
					if (e.index == 0) {
						this.show = !this.show
						this.showInfo = this.goodsList[e.name]
						console.log(this.showInfo);
						return;
					} else {
						const res = await this.$api.deleteMyGood(this.goodsList[e.name])
						if(res.status == 200){
							console.log('删除成功');
							this.$emit('getFind',id)
						}
					}
				}
				
			},
			close() {
				this.show = !this.show
				this.showInfo = {}
			}
		}
	}
</script>
<style lang="scss">
	/deep/ .u-swipe-action-item__right {
		right: 2rpx;
	}

	/deep/ .u-transition {
		top: 50%;
	}
</style>
<style lang="scss">
	.goods-list {
		height: 100%;
		width: 100%;
		.reject-text{
			font-size: 26rpx;
			margin: 0 auto;
			color: red;
		}
		// .item{
		// 	display: flex;
		// 	flex-direction: column;
		// }
		.list-item {
			width: 100%;
			height: 160rpx;
			padding: 14rpx 20rpx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #f4f4f4;
			position: relative;
			
			.img {
				flex-shrink: 0;
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				border: 1px solid #cccccc;
				border-radius: 14rpx;
				overflow: hidden;

				.none-img {
					width: 100%;
					height: 100%;
					background-color: #999999;
					display: flex;
					// position: relative;
					margin: auto;

					.u-icon {
						// width: 120rpx;
						// height: 120rpx;
						margin: 0 auto;
					}
				}

				image {
					width: 100%;
					height: 100%;
				}
			}

			.item-middle {
				flex: 1;
				width: 0;
				height: 100%;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				padding: 20rpx 0;

				.title {
					font-weight: bold;
					font-size: 30rpx;
				}

				.type {
					color: #000;
					font-size: 22rpx;

					.type-title {
						color: #666;
						margin-right: 8rpx;
					}
				}
			}

			.item-r {
				height: 100%;
				flex-shrink: 0;
				// position: absolute;
				padding: 20rpx 0;
				min-width: 100rpx;
				width: fit-content;
				// right: 0;
				// top: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.time {
					font-size: 22rpx;
				}
				.status{
					font-size: 20rpx;
					.status1{
						color: green;
					}
					.status2{
						color: red;
					}
				}
			}
		}

		.list-item:last-child {
			border-bottom: none;
		}

		.box {
			width: 100%;
			// height: 100vh;
			display: flex;
			flex-direction: column;
			padding: 40rpx;
			.title{
				margin-bottom: 30rpx;
				.title-pre{
					font-size: 30rpx;
					font-weight: bold;
				}
				.title-content{
					font-size: 26rpx;
					color: #333333;
				}
			}
			.main {
				flex: 1;
				overflow: auto;
				.item{
					display: flex;
					margin-bottom: 30rpx;
					.title-name{
						font-size: 28rpx;
						font-weight: bold;
					}
					.title-value{
						display: inline-block;
						min-width: 140rpx;
					}
				}
				.imglist{
					height: 100%;
				}
				.main-box{
					display: flex;
					flex-wrap: wrap;
				}
			}
		}
	}
</style>
