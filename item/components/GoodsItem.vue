<template>
	<view class="goods-item" @click="toDetail">
		<view class="item-box">
			<view class="img">
				<swiper style="width: 100%;height: 100%;" :indicator-dots="true" :duration="1000" circular>
					<swiper-item v-for="(item,index) in dataInfo.goodsList" :key="index">
						<image :src="item.url" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="txt">
				<text class="txt-l">{{dataInfo.title}}</text>
				<!-- <text class="txt-r">认领中...</text> -->
			</view>
			<view class="address" @click.stop="showAddress">
				<view class="icon iconfont icon-dizhi"></view>
				<view class="address-txt">{{dataInfo.address}}</view>
			</view>
			<view class="item-bot">
				<view class="item-bot-l">
					<view class="item-bot-img">
						<img class="img" :src="dataInfo.publisherimg" alt="">
					</view>
					<text class="item-bot-name">{{dataInfo.publishername}}</text>
				</view>
				<view class="type">类型:<text style="margin-left: 10rpx;">{{dataInfo.selectType}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "GoodsItem",
		props:{
			dataInfo:{
				type:Object,
				default:()=>{}
			}
		},
		created(){
			// console.log('1',this.dataInfo);
		},
		data() {
			return {
				cardInfo:{},
				title: '',
				type: '',
				item:{
					longitude:0, //经度
					latitude:0, //纬度
				}
				
			};
		},
		methods: {
			toDetail() {
				let token = uni.getStorageSync('token')
				if (!token) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}else{
					uni.navigateTo({
						url: '/pages/detail/detail?dataInfo='+JSON.stringify(this.dataInfo)
					})
				}
			},
			showAddress(){
				let that = this
				uni.chooseLocation({
					latitude:that.item.latitude,
					longitude:that.item.longitude,
					success: function (res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.item.latitude = res.latitude
						that.item.longitude = res.longitude
					}
				});
			}

		}
	}
</script>

<style lang="scss">
	.goods-item {
		background-color: #fff;
		box-sizing: border-box;
		width: 48%;
		padding: 14rpx;
		border-radius: 24rpx;
		margin-bottom: 30rpx;
		
		.img {
			width: 240rpx;
			height: 240rpx;
			margin: 0 auto;

			image {
				width: 100%;
				height: 100%;
			}
		}
		.address{
			display: flex;
			align-items: center;
			.icon{
				font-size: 26rpx;
				color: #56bbb5;
			}
			.address-txt{
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 20rpx;
				margin-left: 10rpx;
				color: #56bbb5;
			}
		}
		.txt {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0rpx 10rpx;
			flex-wrap: nowrap;
			.txt-l {
				font-weight: bold;
				// max-width: 140rpx;
				flex: 1;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}

			.txt-r {
				background-color: #56bbb5;
				border-radius: 20rpx;
				padding: 0 14rpx;
				font-size: 28rpx;
				min-width: 100rpx;
				flex-shrink: 0;
				text-align: center;
				color: #fff;
			}
		}

		.item-bot {
			display: flex;
			align-items: center;
			margin-top: 10rpx;
			justify-content: space-between;
			align-items: center;
			.type {
				color: #333;
				font-size: 20rpx;
				flex-shrink: 0;
			}
			.item-bot-l{
				display: flex;
				align-items: center;
				.item-bot-img {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					border: 1px solid #666;
					box-sizing: border-box;
					overflow: hidden;
					margin-right: 10rpx;
					.img{
						width: 40rpx;
						height: 40rpx;
					}
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.item-bot-name {
					font-size: 26rpx;
					font-weight: bold;
					color: #333;
					flex-shrink: 0;
				}
			}
			
		}
	}

	.goods-item:active {
		box-shadow: 0 0 10rpx 10rpx #ececec;
	}
</style>
