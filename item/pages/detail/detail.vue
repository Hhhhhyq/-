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
				<u-album :urls="dataInfo.goodsList" keyName="url" previewFullImage multipleSize="140" rowCount="2"
					space="18"></u-album>
			</view>
			<template v-if="dataInfo.type == 1">
				<view v-if="dataInfo.remarks !== ''" class="card-resmark">
					{{this.dataInfo.remarks}}
				</view>
				<view v-else class="card-resmark1">
					暂无备注...
				</view>
			</template>
			<template v-if="dataInfo.type == 0">
				<view class="infoBox">
					<view class="subTitle">物品描述：</view>
					<view class="card-resmark">
						{{this.dataInfo.intro}}
					</view>
				</view>
				<view class="infoBox" style="margin-top: 10rpx;">
					<view class="subTitle">详细地址：</view>
					<view class="card-resmark" v-if="dataInfo.description">
						{{this.dataInfo.description}}
					</view>
					<view v-else  class="noData">
						暂无信息
					</view>
				</view>
			</template>
			<view class="share" @click="share" v-if="dataInfo.type == 1">
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
		<!-- <view class="" v-if="dataInfo.type == 0">
			
		</view> -->
		<view class="person">
			<view class="person-l">
				<image :src="dataInfo.publisherimg" mode=""></image>
				<view class="person-txt">
					<view class="name">{{this.dataInfo.publishername}}</view>
					<view class="identity">发布者</view>
				</view>
			</view>
			<view class="person-r" v-if="dataInfo.type == 1" @click="toChat">认领</view>
			<view class="person-r" v-if="dataInfo.type == 0" @click="toChat">归还</view>
		</view>
		<view class="more">
			<view @click="toDetail(item)" v-for="(item,index) in moreFind" :key="index" style="margin-bottom: 40rpx;">
				<view v-if="item.id !== dataInfo.id" class="find-item">
					<view class="goodsImg">
						<image v-if="item.goodsList && item.goodsList.length" :src="item.goodsList[0]" mode=""></image>
					</view>
					<view class="goods-txt">
						<view class="type">
							<view class="title">
								类型：
							</view>
							<view :style="{color: item.selectType == '' ? '#BBB' : '#666'}">
								{{item.selectType | noneOrNot}}
							</view>
						</view>
						<view class="address">
							<view class="addressIcon iconfont icon-dizhi"></view>
							<view class="title">
								地址：
							</view>
							<view :style="{color: item.address == '' ? '#BBB' : '#666'}">
								{{item.address | noneOrNot}}
							</view>
						</view>
						<view class="intro">
							<view class="title">
								描述：
							</view>
							<view :style="{color: item.intro == '' ? '#BBB' : '#666'}">
								{{item.intro | noneOrNot}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/utils.js'
	export default {
		props: {

		},
		onLoad(options) {
			this.dataInfo = JSON.parse(options.dataInfo)
			console.log(this.dataInfo);
		},
		data() {
			return {
				dataInfo: {},
				moreFind: []
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
		filters: {
			dealTime(val) {
				let data = utils.getTimeDifference(val)
				return data
			},
			noneOrNot(val) {
				if (val == '' || val == null) {
					return '暂无信息'
				} else {
					return val
				}
			}
		},
		created() {
			this.getMore()
		},
		methods: {
			toDetail(item) {
				let token = uni.getStorageSync('token')
				if (!token) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				} else {
					uni.navigateTo({
						url: '/pages/detail/detail?dataInfo=' + JSON.stringify(item)
					})
				}
			},
			back() {
				// uni.navigateBack(-1)
			},
			//获取他所找的更多物品
			async getMore() {
				let obj = {
					id: this.dataInfo.publisher,
				}
				const res = await this.$api.getMore(obj)
				console.log(res);
				if (res.status == 200) {
					this.moreFind = res.data
					console.log(this.moreFind);
				}
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
			toChat() {
				// let obj = {
				// 	list1:this.list1,
				// 	title:this.dataInfo.title,
				// 	name:this.name,
				// 	location:this.location
				// }
				let data = encodeURIComponent(JSON.stringify(this.dataInfo))
				uni.navigateTo({
					url: `/pages/chatPage/chatPage?data=${data}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		background-color: #f8f8f8;
		height: 100vh;
		.infoBox{
			display: flex;
			.subTitle{
				font-size: 28rpx;
				flex-shrink: 0;
			}
			.card-resmark{
				margin-top: 0 !important;
				flex-shrink: 1;
				text-align: justify;
				min-height: fit-content !important;
				word-break: break-all;
			}
			.noData{
				color: #bbb;
				font-size: 28rpx;
			}
		}
		
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

			.card-resmark1 {
				margin-top: 30rpx;
				height: 60rpx;
				text-align: justify;
				font-size: 30rpx;
				color: #666;
				font-weight: 450;
				text-align: center;
			}

			.share {
				position: relative;
				right: 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30rpx;
				font-size: 30rpx;

				.share-l {
					display: flex;
					align-items: center;

					.share-l-tit {
						margin-right: 4rpx;
						color: #333;
					}

					.share-l-txt {
						color: #56bbb5;
					}
				}

				.share-r {
					display: flex;

					.icon {
						margin-bottom: -4rpx;
					}

					.sharetxt {
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

		.more {
			width: 90%;
			margin: 40rpx auto;

			.find-item {
				width: 100%;
				background-color: #fff;
				border-radius: 20rpx;
				height: 180rpx;
				display: flex;
				align-items: center;
				padding: 0 40rpx;

				.goodsImg {
					width: 120rpx;
					height: 120rpx;
					border-radius: 10rpx;
					overflow: hidden;
					margin-right: 20rpx;
					border: 1px solid red;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.goods-txt {
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
					flex: 1;
					flex-shrink: 0;
					.title {
						color: #000;
					}

					.type {
						color: #666;
						display: flex;
					}
					.address {
						color: #666;
						display: flex;
						 white-space: nowrap;
						 /*超出范围隐藏*/
						 overflow: hidden;
						 /*文字超出用省略号*/
						 text-overflow: ellipsis;
						 align-items: center;
						 .addressIcon{
						 	font-size: 18rpx;
							margin-right: 8rpx;
						 }
					}

					.intro {
						color: #666;
						display: flex;
						 white-space: nowrap;
						 /*超出范围隐藏*/
						 overflow: hidden;
						 /*文字超出用省略号*/
						 text-overflow: ellipsis;
					}
				}
			}
		}
	}
</style>
