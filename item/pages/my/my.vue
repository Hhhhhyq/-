<template>
	<view class="my">
		<u-navbar title="个人中心" placeholder leftIcon='' :titleStyle="{
					fontSize: '30rpx',
					fontWeight:'bold'
				}" bgColor="#56bbb5" :customStyle='customStyle'>
		</u-navbar>
		<view class="my-head">
			<view class="my-head-box">
				<view class="my-img">
					<u-icon v-if="this.userInfo.img === undefined || this.userInfo.img === ''" class="none-img" name="camera-fill" size="40"></u-icon>
					<image v-else :src="userInfo.img" mode="">
				</view>
				<view class="my-name" @click="tologin">{{this.userInfo.name ? this.userInfo.name : '立即登录'}}</view>
				<!-- <view v-if="this.userInfo.name" class="edit" style="display: flex; align-items: center;">
					<u-icon class="edit-icon" name="edit-pen" color="#777777" size="20" @click="editInfo"></u-icon>
					<text class="edit-txt">编辑资料</text>
				</view>		 -->
			</view>
		</view>
		<view class="my-address">
			<view class="address address1">
				<view class="address-t">
					<view class="icon icon1 iconfont icon-xuexiao"></view>
					<view class="txt">学校</view>
				</view>
				<view class="address-b">{{this.userInfo.school ? this.userInfo.school : '暂无信息'}}</view>
			</view>
			<view class="address address2">
				<view class="address-t">
					<view class="icon iconfont icon-dianhua"></view>
					<view class="txt">电话</view>
				</view>
				<view class="address-b">{{ this.userInfo.phone ? this.userInfo.phone : '暂无信息'}}</view>
			</view>
		</view>
		<view class="my-release">
			<u-collapse accordion :border="false"style="{height: 100%;}">
				<u-collapse-item name="release" title="我发布的物品">
					<goods-list v-if="releaseGoodsList.length" type="release" :goodsList="releaseGoodsList" @getRelease="getMyRelease"></goods-list>
					<view class="no-goods" v-else>
						<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/car.png">
						</u-empty>
					</view>
				</u-collapse-item>
				<u-collapse-item name="find" title="我丢失的物品">
					<view class="u-collapse-content">
						<goods-list v-if="findGoodsList.length" type="find" :goodsList="findGoodsList" @getFind="getMyFind"></goods-list>
						<view class="no-goods" v-else>
							<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/car.png">
							</u-empty>
						</view>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="my-bottom">
			<u-cell-group :border="false">
				<u-cell @click="editInfo" :iconStyle="iconStyle1" :titleStyle="titleStyle" icon="edit-pen-fill"
					title="编辑信息" isLink></u-cell>
				<u-cell @click="editPassword" :iconStyle="iconStyle" :titleStyle="titleStyle" icon="lock" title="找回密码"
					isLink></u-cell>
				<u-cell :iconStyle="iconStyle" :titleStyle="titleStyle" icon="question" title="帮助" isLink>
				</u-cell>
				<u-cell :iconStyle="iconStyle" :titleStyle="titleStyle" icon="error" title="关于" isLink
					:border="false"></u-cell>
			</u-cell-group>
		</view>
		<view class="exit" v-show="this.token !== ''" @click="exitLogin">退出登录</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		forEach
	} from 'luch-request/src/lib/utils'
	import GoodsList from '../../components/GoodsList.vue'
	import loginVue from '../login/login.vue'
	export default {
		components: {
			GoodsList
		},
		// onShow(){
		// 	console.log();
		// 	this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		// },
		data() {
			return {
				userInfo: {},
				token: '',
				releaseGoodsList: [],
				findGoodsList: [],
				titleStyle: {
					marginLeft: '20rpx',
					fontWeight:'bold'
				},
				iconStyle: {
					fontSize: '44rpx',
					marginTop: '10rpx',
					fontWeight: 'bold',
					border:'2px solid #000',
					borderRadius:'50%',
					padding:'8rpx 4rpx',
					boxSizing:'border-box'
				},
				iconStyle1: {
					fontSize: '44rpx',
					border:'2px solid #000',
					borderRadius:'50%',
					padding:'8rpx 4rpx',
					boxSizing:'border-box'
				}
				// customStyle:{
				// 	fontWeight:'bold'
				// }
			}
		},
		created() {
			this.token = uni.getStorageSync('token')
			// let data = uni.getStorageSync('userInfo')
			if(this.token){
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				console.log(userInfo);
				if (userInfo.name && userInfo.name !== '') {
					this.userInfo = userInfo
					this.getMyRelease(this.userInfo.id)
					this.getMyFind(this.userInfo.id)
				}
				// console.log(this, userInfo);
			}
		},
		methods: {
			editInfo() {
				if (this.token == '') {
					this.$refs.uToast.show({
						type: 'default',
						message: "请先登录账号",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						duration: '1500'
					})
					return;
				}
				uni.navigateTo({
					url: '/pages/edit/edit',
					animationType:'slide-in-right',
					animationDuration:500
				})
			},
			editPassword() {
				if (this.token == '') {
					this.$refs.uToast.show({
						type: 'default',
						message: "请先登录账号",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						duration: '1500'
					})
					return;
				}
				uni.navigateTo({
					url: '/pages/editPassword/editPassword',
					animationType:'slide-in-right',
					animationDuration:500
				})
			},
			tologin() {
				if (uni.getStorageSync('token')) {
					return;
				}
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},
			//退出登录
			exitLogin() {
				this.token = ''
				this.userInfo = {}
				this.goodsList = []
				this.releaseGoodsList = []
				this.findGoodsList = []
				uni.removeStorageSync('token')
				uni.removeStorageSync('userInfo')
				this.$refs.uToast.show({
					type: 'success',
					message: "已退出登录",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
					duration: '1500'
				})
			},
			// 获取发布物品信息
			async getMyRelease(id) {
				console.log(111);
				let result = await this.$api.getMyRelease(id)
				if (result.status == 200) {
					this.releaseGoodsList = result.releaseGoods
				}
				console.log('result', result);
			},
			// 获取发布find物品信息
			async getMyFind(id) {
				let result = await this.$api.getMyFind(id)
				if (result.status == 200) {
					this.findGoodsList = result.findGoods
				}
				console.log('result', result);
			}
		}
	}
</script>

<style lang="scss">
	.my {
		background-color: rgb(247, 248, 249);
		padding-bottom: 40rpx;

		.my-head {
			height: 360rpx;
			border-radius: 0 0 40rpx 40rpx;
			background: linear-gradient(to bottom, #56bbb5, #78cdd1);
			box-sizing: border-box;
			// padding: 56rpx 0 0 70rpx;
			.my-head-box {
				padding-top: 40rpx;
				width: 100vw;
				height: fit-content;
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				flex-direction: column;
				justify-content: center;
				.my-img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					background-color: #f2f2f2;
					overflow: hidden;
					// margin-right: 30rpx;
					flex-shrink: 0;
					line-height: 120rpx;
					display: block;
					.none-img {
						margin: 0 auto;
						line-height: 120rpx;
						position: relative;
						top: 50%;
						transform: translateY(-50%);

						/deep/ .u-icon__icon {
							margin: 0 auto;
						}
					}

					image {
						width: 100%;
						height: 100%;
					}
				}

				.my-name {
					height: 50rpx;
					width: fit-content;
					max-width: 300rpx;
					text-align: center;
					line-height: 50rpx;
					font-size: 42rpx;
					font-weight: bold;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					margin-top: 20rpx;
				}

				.my-name:active {
					color: #666;
				}

				.edit {
					display: flex;
					align-items: center;

					.edit-icon {
						// height: 50rpx;
						// width: 50rpx;
						line-height: 50rpx;
						margin-bottom: -6rpx;
						margin-right: 8rpx;
						flex-shrink: 0;
					}

					.edit-txt {
						color: 20rpx;
						color: #777777;
					}
				}

				.edit:active {
					color: #cccccc;
				}
			}
		}

		.my-address {
			width: 680rpx;
			height: 200rpx;
			background-color: #fff;
			margin-top: -100rpx;
			margin: -100rpx auto 0;
			border-radius: 20rpx;
			display: flex;
			padding: 0rpx 60rpx;
			box-sizing: border-box;
			align-items: center;
			.address1{
				flex: 1.5;
			}
			.address2{
				flex: 1;
			}
			.address {
				height: 140rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.address-t {
					display: flex;
					height: 60rpx;
					align-items: center;

					.icon {
						font-size: 36rpx;
						margin-right: 12rpx;
					}

					.icon1 {
						font-size: 44rpx;
					}

					.txt {
						color: #000;
						font-size: 30rpx;
						font-weight: bold;
					}
				}

				.address-b {
					font-size: 30rpx;
					font-weight: bold;
					letter-spacing: 2rpx;
					color: #333;
				}
			}
		}

		.my-release {
			width: 680rpx;
			height: 100%;
			// min-height: 200rpx;
			margin: 20rpx auto 40rpx;
			background-color: #fff;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding-top: 10rpx;

			/deep/ .u-cell__title-text {
				span {
					font-weight: bold;
				}
			}

			.my-goods {
				margin-left: 24rpx;
				font-size: 28rpx;
				color: #666666;
				font-weight: bold;
			}

			.u-collapse-item /deep/ .u-collapse-item__content {
				height: auto;
			}

			.goods-list {
				height: 100%;

				.list-item {
					height: 160rpx;
					padding: 14rpx 40rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #f4f4f4;

					.img {
						width: 120rpx;
						height: 120rpx;
						margin-right: 20rpx;
						border: 1px solid #cccccc;
						border-radius: 10rpx;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.item-r {
						height: 120rpx;
						flex: 1;
						display: flex;
						flex-direction: column;

						.item-r-t {
							margin-bottom: 30rpx;
							font-size: 30rpx;
							font-weight: bold;
						}

						.item-r-b {
							display: flex;
							justify-content: space-between;
							height: 60rpx;

							.goods-status {
								font-size: 24rpx;
								line-height: 60rpx;
								color: #777777;
							}

							.btn-box {
								line-height: 60rpx;
								font-size: 26rpx;
								display: flex;
								width: 240rpx;
								justify-content: space-between;

								.btn {
									width: 110rpx;
									background-color: #ececec;
									border-radius: 30rpx;
									font-size: 30rpx;
									text-align: center;
									font-weight: bold;
								}

								.btn:active {
									color: #777777;
								}
							}
						}
					}
				}

				.list-item:last-child {
					border-bottom: none;
				}
			}

			.no-goods {
				width: 100%;
				height: 320rpx;
				display: flex;

				.u-empty {
					height: 300rpx;
					flex: auto;
				}
			}
		}

		.my-bottom {
			width: 680rpx;
			margin: 0 auto 20rpx;
			background-color: #fff;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 20rpx 10rpx 20rpx 30rpx;

			.detaile-item {
				height: 100rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.detailItem-l {
					height: 60rpx;
					width: 200rpx;
					display: flex;
					line-height: 60rpx;

					// .detaileIcon {
					// 	margin-right: 20rpx;
					// 	font-size: 48rpx;
					// 	vertical-align: middle;
					// 	// margin-top: 4rpx;
					// }

					.detailTxt {
						font-size: 32rpx;
						font-weight: 450;
						margin-left: 20rpx;
						// font-weight: bold;
						vertical-align: middle;
					}
				}

				.detailItem-r {}

				.detailItem-r:active {
					color: #999999;
				}
			}
		}

		.exit {
			width: 400rpx;
			color: #f56c6c;
			border: 1px solid #f56c6c;
			height: 80rpx;
			margin: 40rpx auto 0rpx;
			line-height: 80rpx;
			text-align: center;
			letter-spacing: 2rpx;
			border-radius: 14rpx;
			background-color: #ffffff;
		}

		.exit:active {
			background-color: #f8f8f8;
		}
	}
</style>
