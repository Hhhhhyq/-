<template>
	<view class="detail">
		<u-navbar leftText="返回" @leftClick="back" title="物品信息" placeholder :autoBack="true" :titleStyle="{
					fontSize: '30rpx',
					fontWeight:'bold'
				}">
		</u-navbar>
		<view class="detail-card">
			<view class="card-top">
				<text class="top-l">{{this.dataInfo.title}}</text>
				<text class="top-r">{{this.dataInfo.time | dealTime}}</text>
			</view>
			<view class="card-address">
				<view class="addressIcon iconfont icon-dizhi"></view>
				<view class="addressTxt">{{this.dataInfo.address}}</view>
			</view>
			<view class="card-img">
				<u-album :urls="dataInfo.goodsList" keyName="url" previewFullImage multipleSize="140" rowCount="2" space="18"></u-album>
			</view>
			<view v-if="dataInfo.remarks !== ''" class="card-resmark">
				{{this.dataInfo.remarks}}
			</view>
			<view v-else class="card-resmark1">
				暂无备注...
			</view>
			<view class="share" @click="share">
				<view class="share-l">
					<view class="share-l-tit">领取方式:</view>
					<view class="share-l-txt">{{this.dataInfo.location}}</view>
				</view>
				<view class="share-r">
					<u-icon class="icon" name="share-square" size="20"></u-icon>
					<view class="sharetxt">分享</view>
				</view>

			</view>
		</view>
		<view class="person">
			<view class="person-l">
				<image src="../../static/image/logo.png" mode=""></image>
				<view class="person-txt">
					<view class="name">{{this.dataInfo.publishername}}</view>
					<view class="identity">发布者</view>
				</view>
			</view>
			<view class="person-r" @click="toChat">认领</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/utils.js'
	export default {
		props:{
			
		},
		onLoad(options){
			this.dataInfo = JSON.parse(options.dataInfo)
			console.log(this.dataInfo);
		},
		data() {
			return {
				dataInfo:{},
				// title:'校园卡',
				// time:'30分钟前',
				// address:'学校南门门口',
				// remarks:'本书收录了鲁迅所有的散文名篇，并收录了一部分精品杂文，根据文章写作内容和特点共分为五个专辑。',
				// name:'王同学',
				// location:'本人代管',
				// list1: [
				// 	'https://cdn.uviewui.com/uview/swiper/swiper1.png'
				// ]
			}
		},
		filters:{
			dealTime(val){
				let data = utils.getTimeDifference(val)
				return data
			}
		},
		methods: {
			back() {
				// uni.navigateBack(-1)
			},
			share() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "http://uniapp.dcloud.io/",
					title: "uni-app分享",
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					imageUrl: "https://web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			// getTime(val) {
			// 	var dates = new Date();
			// 	var times = dates.getTime()
			// },
			//进入聊天界面
			toChat(){
				// let obj = {
				// 	list1:this.list1,
				// 	title:this.dataInfo.title,
				// 	name:this.name,
				// 	location:this.location
				// }
				let data = encodeURIComponent(JSON.stringify(this.dataInfo))
				uni.navigateTo({
					url:`/pages/chatPage/chatPage?data=${data}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		background-color: #f8f8f8;
		height: 100vh;

		.detail-card {
			padding: 60rpx 40rpx 30rpx;
			margin: 40rpx auto;
			background-color: #fff;
			width: 90%;
			// height: 600rpx;
			border-radius: 30rpx;
			box-sizing: border-box;

			.card-top {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.top-l {
					font-size: 46rpx;
					font-weight: bold;
				}

				.top-r {
					font-size: 26rpx;
					color: #666;
				}
			}

			.card-address {
				display: flex;
				align-items: center;
				margin: 30rpx 0;
				color: #333;
				font-size: 30rpx;

				.addressIcon {
					margin-right: 10rpx;
				}

				.addressTxt {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.card-img {
				display: flex;
				flex-wrap: wrap;

				/deep/ uni-image {
					border-radius: 40rpx !important;
				}
			}
			.card-resmark {
				margin-top: 30rpx;
				min-height: 100rpx;
				text-align: justify;
				font-size: 30rpx;
				color: #666;
				font-weight: 450;
			}
			.card-resmark1{
				margin-top: 30rpx;
				height: 60rpx;
				text-align: justify;
				font-size: 30rpx;
				color: #666;
				font-weight: 450;
				text-align: center;
			}
			.share{
				position: relative;
				right: 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30rpx;
				font-size: 30rpx;
				.share-l{
					display: flex;
					align-items: center;
					.share-l-tit{
						margin-right: 4rpx;
						color: #333;
					}
					.share-l-txt{
						color: #56bbb5;
					}
				}
				.share-r{
					display: flex;
					.icon{
						margin-bottom: -4rpx;
					}
					.sharetxt{
						margin-left: 4rpx;
						font-size: 30rpx;
					}
				}
			}
		}
		.person {
			width: 90%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 200rpx;
			background-color: #fff;
			margin: 0 auto;
			border-radius: 20rpx;
			padding: 0 30rpx;
			box-sizing: border-box;

			.person-l {
				display: flex;
				align-items: center;
				height: 140rpx;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				.person-txt {
					height: 100rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						font-size: 40rpx;
						color: #000;
					}

					.identity {
						font-size: 28rpx;
						color: #333;
					}
				}
			}

			.person-r {
				width: 120rpx;
				height: 60rpx;
				background-color: #56bbb5;
				text-align: center;
				line-height: 60rpx;
				border-radius: 30rpx;
				color: #fff;
			}

			.person-r:active {
				opacity: 0.7;
			}
		}
	}
</style>
