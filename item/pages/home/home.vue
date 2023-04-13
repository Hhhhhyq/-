<template>
	<view class="home">
		<template v-if="!searchStatus">
			<u-navbar class="home-head" placeholder>
				<view slot="left" class="head-left">
					<view class="head-left-icon iconfont icon-dizhi"></view>
					<view class="head-left-txt">
						{{this.city}}
					</view>
				</view>
				<view class="head-middle" slot="center" style="flex: 1; border-radius: 40rpx;" @click="search">
					<u--input class="input" ref="input" border-color="#666666" placeholder="请输入搜索内容"
						prefixIcon="search" prefixIconStyle="font-size: 22px;color: #333333"></u--input>
				</view>
				<view class="head-right" slot="right">
					<view class="head-rIcon iconfont icon-liebiao2"></view>
				</view>
			</u-navbar>
			<u-swiper class="home-swiper" height="340rpx" circular :list="list1"></u-swiper>
			<view class="home-card">
				<view class="card card-left" @click="toFind(0)">
					<view class="content-top">
						<view class="content-topl iconfont icon-fangdajing"></view>
						<view class="content-topr">
							<view class="add iconfont icon-jia"></view>
							发布
						</view>
					</view>
					<view class="content-bottom">寻物启事</view>
				</view>
				<view class="card card-right" @click="toRelease(1)">
					<view class="content-top">
						<view class="content-topl iconfont icon-wenben"></view>
						<view class="content-topr">
							<view class="add iconfont icon-jia"></view>
							发布
						</view>
					</view>
					<view class="content-bottom">失物招领</view>
				</view>
			</view>
			<view class="home-notice">
				<view class="notice-icon iconfont icon-laba"></view>
				<view class="notice-content">
					<swiper v-if="noticeList.length" class="swiper" style="height: 40rpx;" vertical autoplay circular>
						<swiper-item v-for="(item,index) in noticeList" :key="index">{{item}}</swiper-item>
					</swiper>
					<view class="no-notice" v-else>暂无信息...</view>
				</view>
				<view class="notice-more">...</view>
			</view>
			<view class="home-bottom">
				<view class="home-bottom-title">
					<text class="title-l">物品首推</text>
					<view class="title-r" @click="toAll"><text>查看更多</text><u-icon name="arrow-right-double" color="#56bbb5"></u-icon></view>
				</view>
				<urgent-search></urgent-search>
				<u-divider v-if="noMore" text="没有更多了"></u-divider>
			</view>
		</template>
		<template v-if="searchStatus">
			<search @blurs="blurinp"></search>
		</template>

	</view>
</template>

<script>
	import utils from '../../utils.js'
	import Search from '@/components/Search.vue'
	import GoodsItem from '@/components/GoodsItem.vue'
	import UrgentSearch from '@/components/UrgentSearch.vue'
	export default {
		components: {
			Search,
			GoodsItem,
			UrgentSearch
		},
		data() {
			return {
				noMore:false,
				searchStatus: false,
				title: 'Hello',
				show: false,
				value1: Number(new Date()),
				windowHeight: '',
				city: '天津',
				list1: [],
				noticeList: [
					'当前所在滑块的 item-id ，不能与 current 被同时指定',
					'是否采用衔接滑动，即播放到末尾后重新回到开头',
					'当开启时，会根据滑动速度，连续滑动多屏'
				],
				systemBarHeight: 0
			}
		},
		onLoad() {},
		computed: {},
		created() {
			this.getSysteminfo()
			this.initBanner()
		},
		onReachBottom() {
			this.noMore = true
		},
		methods: {
			//获取轮播图片
			async initBanner(){
				const res = await this.$api.getAllType()
				if(res.status == 200){
					let arr = res.data.bannerlist.split(',')
					let arr1 = []
					arr.forEach(item=>{
						if(item == ''){
							return ;
						}
						arr1.push(item)
					})
					this.list1 = arr1
				}
			},
			toAll(){
				uni.navigateTo({
					url:'/pages/allGoods/allGoods'
				})
			},
			blur() {
				// this.$refs.input.blur()
				console.log(2);
			},
			// 获取系统栏高度
			getSysteminfo() {
				uni.getSystemInfo({
					success: res => {
						this.systemBarHeight = res.statusBarHeight;
					}
				});
			},
			close() {
				this.show = !this.show
			},
			toRelease(type) {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
					return;
				}
				uni.navigateTo({
					url: '/pages/release/release?current=' + type
				})
			},
			toFind(type) {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
					return;
				}
				uni.navigateTo({
					url: '/pages/release/release?current=' + type
				})
			},
			//聚焦
			search() {
				uni.hideKeyboard()
				this.searchStatus = true
			},
			//search触发
			blurinp() {
				this.searchStatus = false
			},
			citys() {

				uni.getLocation({
					type: 'wgs84',
					geocode: true, //设置该参数为true可直接获取经纬度及城市信息
					success: function(res) {
						console.log(res)
						that.addrDel = res;
					},
					fail: function() {
						uni.showToast({
							title: '获取地址失败，将导致部分功能不可用',
							icon: 'none'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	// page {
	// 	display: flex;
	// 	flex-direction: column;
	// 	height: 100%;
	// }

	.home {
		width: 100vw;
		box-sizing: border-box;
		background-color: rgb(247, 248, 249);
		height: 100%;
		position: relative;

		.home-head {
			/deep/ .u-navbar__content__left{
				position: relative;
				padding: 0;
			}
			/deep/ .u-navbar__content__right{
				position: relative;
				padding: 0; 
			}
			.head-left {
				width: 100rpx;
				margin-right: 6rpx;
				font-size: 50rpx;
				height: 100%;
				text-align: center;
				line-height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #000000;

				.head-lIcon {
					font-size: 24rpx;
					margin-right: 6rpx;
				}

				.head-left-txt {
					font-size: 24rpx;
				}
			}

			.head-left:active {
				color: #333333;
			}
			.head-right {
				width: 80rpx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				.head-rIcon {
					font-size: 50rpx;
					color: #000;
				}
			}

			.head-middle {
				flex: 1;
				height: 88rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;

				.input {
					// border: 1px solid #777777 !important;
					box-shadow: 0 0 1rpx 1rpx #fff;
					border-radius: 40rpx;
					height: 60rpx;
					color: #333333;

					.input-placeholder {
						color: #999999 !important;
					}
				}
			}
		}

		.home-swiper {}

		.home-card {
			margin-top: 40rpx;
			width: 100vw;
			height: 240rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;

			.card {
				width: 330rpx;
				height: 100%;
				background-color: #fff;
				border-radius: 40rpx;
				// box-shadow: 0 0 5rpx 5rpx #cccccc;
			}

			.card:active {
				box-shadow: 0 0 5rpx 5rpx #cccccc;
			}

			.card-left {}

			.card-right {}

			.content-top {
				font-size: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 100rpx;
				margin-top: 20rpx;
				box-sizing: border-box;
				padding: 0 20rpx 0 20rpx;

				.content-topl {
					display: inline-block;
					box-sizing: border-box;
					width: 120rpx;
					height: 100rpx;
					margin-right: 30rpx;
					font-size: 90rpx;
					text-align: center;
					line-height: 100rpx;
				}

				.content-topr {
					font-size: 30rpx;
					width: 140rpx;
					height: 60rpx;
					border-radius: 40rpx;
					display: inline-block;
					background-color: #56bbb5;
					box-sizing: border-box;
					line-height: 60rpx;
					display: flex;
					font-size: 30rpx;
					font-weight: bold;

					.add {
						font-size: 40rpx;
						margin-left: 12rpx;
						width: 40rpx;
						margin-right: 10rpx;
					}
				}

			}

			.content-bottom {
				font-size: 40rpx;
				font-weight: bold;
				margin: 40rpx 0 0 40rpx;
			}
		}

		.home-notice {
			height: 50rpx;
			width: 92%;
			background-color: #fff;
			border-radius: 24rpx;
			margin: 34rpx auto 0;
			display: flex;
			align-items: center;
			padding: 0 24rpx;
			justify-content: space-between;
			box-sizing: border-box;

			.notice-icon {
				width: 32rpx;
				height: 32rpx;
				margin-right: 12rpx;
			}

			.notice-content {
				flex: 1;
				height: 40rpx;
				color: #000;

				.no-notice {
					color: #777777;
					height: 40rpx;
					font-size: 26rpx;
					line-height: 40rpx;
				}

				.swiper {
					// hieght:40rpx !important;
					overflow: hidden;

					uni-swiper-item {
						height: 40rpx;
						font-size: 26rpx;
						line-height: 40rpx;
						text-overflow: ellipsis;
						white-space: nowrap;

					}
				}
			}

			.notice-more {
				margin-left: 6rpx;
				line-height: 50rpx;
				font-size: 44rpx;
				padding-bottom: 22rpx;
			}
		}

		.home-bottom {
			padding: 30rpx 30rpx 40rpx 30rpx;
			box-sizing: border-box;
			.home-bottom-title{
				display: flex;
				justify-content: space-between;
				margin-bottom: 40rpx;
				font-size: 28rpx;
				.title-l{
					font-size: 30rpx;
					font-weight: bold;
				}
				.title-r{
					display: flex;
					color: #56bbb5;
				}
			}
		}
	}
</style>
