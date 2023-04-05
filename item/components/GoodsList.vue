<template>
	<view class="goods-list">
		<view class="">已审核</view>
		<u-swipe-action>
			<u-swipe-action-item autoClose :options="options1" v-for="(item,index) in goodsList" :name="index" :key="index" @click="btnClick">
				<view class="list-item">
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
					</view>
				</view>
			</u-swipe-action-item>
		</u-swipe-action>
		<view class="">审核中...</view>
		<u-popup :show="show" :closeOnClickOverlay="true" :safeAreaInsetTop="true" mode="bottom" @close="close">
		    <view class="box">
				<view class="head"></view>
		        <view class="main">出淤泥而不染，濯清涟而不妖</view>
				<view class="btn">s
					111
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
			}
		},
		data() {
			return {
				show :false,
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				options1: [{
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
			};
		},
		filters:{
			dealTime(val){
				let data = utils.getTimeDifference(val)
				return data
			}
		},
		methods: {
			toEdit() {
				uni.navigateTo({

				})
			},
			btnClick(e){
				console.log(e);
				if(e.index == 0){
					this.show = !this.show
				}
				
			},
			close(){
				this.show = !this.show
			}
		}
	}
</script>
<style lang="scss">
	/deep/ .u-swipe-action-item__right{
		right: 2rpx;
	}
	/deep/ .u-transition{
		top: 50%;
	}
</style>
<style lang="scss">
	.goods-list {
		height: 100%;
		width: 100%;
		.list-item {
			width: 100%;
			height: 160rpx;
			padding: 14rpx 20rpx;
			display: flex;
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
			.item-middle{
				flex: 1;
				width: 0;
				height: 100%;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				padding: 20rpx 0;
				.title{
					font-weight: bold;
					font-size: 30rpx;
				}
				.type{
					color: #000;
					font-size: 22rpx;
					.type-title{
						color: #666;
						margin-right: 8rpx;
					}
				}
			}
			.item-r{
				height: 100%;
				flex-shrink: 0;
				position: absolute;
				min-width: 100rpx;
				width: fit-content;
				right: 0;
				top: 20rpx;
				.time{
					font-size: 22rpx;
				}
			}
			// .item-r {
			// 	height: 120rpx;
			// 	flex: 1;
			// 	display: flex;
			// 	flex-direction: column;

			// 	.item-r-t {
			// 		margin-bottom: 30rpx;
			// 		font-size: 30rpx;
			// 		font-weight: bold;
			// 	}

			// 	.item-r-b {
			// 		display: flex;
			// 		justify-content: space-between;
			// 		height: 60rpx;

			// 		.goods-status {
			// 			font-size: 24rpx;
			// 			line-height: 60rpx;
			// 			color: #777777;
			// 		}

			// 		.btn-box {
			// 			line-height: 60rpx;
			// 			font-size: 26rpx;
			// 			display: flex;
			// 			width: 240rpx;
			// 			justify-content: space-between;

			// 			.btn {
			// 				width: 110rpx;
			// 				background-color: #ececec;
			// 				border-radius: 30rpx;
			// 				font-size: 30rpx;
			// 				text-align: center;
			// 				font-weight: bold;
			// 			}

			// 			.btn:active {
			// 				color: #777777;
			// 			}
			// 		}
			// 	}
			// }
		}

		.list-item:last-child {
			border-bottom: none;
		}
		.box{
			width: 100%;
			// height: 100vh;
			display: flex;
			flex-direction: column;
			padding-top: 20rpx;
			.main{
				flex: 1;
				overflow: auto;
			}
			.btn{
				height: 100rpx;
			}
		}
	}
</style>
