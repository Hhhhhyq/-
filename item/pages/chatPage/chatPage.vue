<template>
	<view class="chatPage">
		<u-navbar :title=this.toName placeholder @leftClick="back" :titleStyle="{
					fontSize: '30rpx',
					fontWeight:'bold'
				}" bgColor="#56bbb5">
		</u-navbar>
		<scroll-view scroll-y="true" :scroll-top="scrollTop" class="chatHistory" ref="list">
			<view class="goodsInfo" v-if="this.dataInfo.goodsList !== undefined && this.dataInfo.goodsList.length !==0">
				<view class="images">
					<image :src='dataInfo.goodsList[0].url' mode=""></image>
				</view>
				<view class="goodsInfo-r">
					<text class="title">{{this.dataInfo.title}}</text>
					<text class="name" @click="toCallPhone">发布者: <text
							class="name-inner">{{this.dataInfo.publishername}}</text></text>
					<view class="remarks"
						v-if="dataInfo.type == 1 && dataInfo.remarks !== ''">{{this.dataInfo.remarks}}</view>
					<view class="remarks"
						v-else-if="dataInfo.type == 0 && dataInfo.description !== ''">{{this.dataInfo.description}}</view>
					<view v-else class="no-remark">暂无备注...</view>
				</view>
			</view>
			<view v-for="(item,index) in chatList" :key="index">
				<view class="chatItem" v-if="item.sendid !== myInfo.id">
					<view class="image">
						<image :src="toImg" alt="">
					</view>
					<view class="content">
						<view class="txt" v-if="item.type == '0'">{{item.content}}
							<view class="jiantou"></view>
						</view>
						<view class="txt" v-else>
							<image v-if="item.img !== '' || item.img !== null" :src="item.img" alt="">
						</view>
					</view>
				</view>
				<view class="chatItem r" v-else>
					<view class="content">
						<view class="txt" v-if="item.type == '0'">{{item.content}}
							<view class="jiantou"></view>
						</view>
						<view class="txt" v-else>
							<image v-if="item.img !== '' || item.img !== null" :src="item.img" alt="">
						</view>
					</view>
					<view class="image">
						<image :src="myInfo.img" alt="">
					</view>
				</view>
			</view>
			<view id="bot" style='height:1px;width:100%'></view>
		</scroll-view>
		<view class="chatInp">
			<u-icon class="phone" name="photo-fill" color="#666" size="28" @click="upload"></u-icon>
			<!-- <u-icon style="margin:0 10rpx;" size="24" name="mic"></u-icon> -->
			<u--input placeholder="请输入内容" border="surround" v-model="value"></u--input>
			<view class="send" @click="sendMessage">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {},
		data() {
			return {
				myInfo: {}, //个人信息
				toId: 0,
				toName: '',
				toImg: '',
				toInfo: {}, //聊天页面传递信息
				dataInfo: {}, //详情页面传递信息
				value: '',
				scrollTop: '',
				oldbottom: '',
				chatList: []
			}
		},
		onLoad(options) {
			let info = JSON.parse(uni.getStorageSync('userInfo'))
			this.myInfo = info
			// let data = JSON.parse(decodeURIComponent(options.data))
			if (options.to !== undefined) {
				console.log(options);
				this.toInfo = {
					to: options.toId,
					name: options.to
				}
				this.toId = options.toId
				this.toName = options.to
			} else {
				let data = JSON.parse(decodeURIComponent(options.data))
				this.dataInfo = data
				this.toId = this.dataInfo.publisher
				this.toName = this.dataInfo.publishername
			}
			this.join(info.id)
			this.getmsg()
			console.log(this.dataInfo);
		},
		created() {
			this.init()
			// this.myInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		updated() {
			var that = this;
			const query = uni.createSelectorQuery().in(that);
			query.select('#bot').boundingClientRect(data => {
				that.scrollTop = data.top
			}).exec();
		},
		beforeDestroy() {},
		mounted() {
			var that = this;
			const query = uni.createSelectorQuery().in(that);
			query.select('#bot').boundingClientRect(data => {
				that.scrollTop = data.top
			}).exec();
		},
		methods: {
			async init() {
				const res = await this.$api.getHistoryChat(this.myInfo.id, this.toId)
				if (res.status == 200) {
					this.chatList = res.data.list
					this.toImg = res.data.img
				}
				this.toRead()
				
			},
			toRead(){
				this.chatList.forEach(async item=>{
					if(item.isread == 0){
						const res = await this.$api.toRead(item)
					}
				})
			},
			// 用户登录socket注册
			join(uid) {
				this.socket.emit('login', uid)
			},
			back() {
				uni.navigateBack()
			},
			toCallPhone() {
				uni.makePhoneCall({
					phoneNumber: '123456789',
					success: function() {
						console.log('成功');
					},
					fail() {
						console.log('拨打失败');
					}
				})
			},
			sendMessage() {
				if (this.value.trim() !== '') {
					let data = {
						id: this.myInfo.id,
						toId: Number(this.toId),
						value: this.value
					}
					console.log('1', this.toId);
					let type="0",img="";
					this.socket.emit('msg', this.value, this.myInfo.id, this.toId,type,img);
					let obj = {
						reciveid: Number(this.toId),
						content: this.value,
						sendid:this.myInfo.id,
						img:'',
						type:"0"
					}
					this.chatList.push(obj)
					console.log(this.chatList);
					this.value = ''
				}
			},
			//接收事件
			getmsg() {
				this.socket.on('msg', data => {
					this.chatList.push(data)
				})
			},
			// 文章图片上传
			upload() {
				let that = this
				uni.chooseImage({
					count: 1, //上传图片的数量，默认是9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths; //拿到选择的图片，是一个数组
						tempFilePaths.forEach(item => {
							let data = {
								filePath: item,
								name: "file"
							}
							that.uploadFileListPromise(data)
						})
					}
				});
			},
			uploadFileListPromise(data) {
				return new Promise((resolve, reject) => {
					this.$api.chatImgUpload(data).then(res => {
						console.log(res.data.url);
						let type = "1",value="";
						this.socket.emit('msg', value, this.myInfo.id, this.toId,type,res.data.url);
						// this.goodsInfo.fileList.push({
							let obj = {
								reciveid: Number(this.toId),
								content: '',
								sendid:this.myInfo.id,
								img:res.data.url,
								type:"1"
							}
							this.chatList.push(obj)
						// 	url: res.data.url
						// })
					}).catch(err => {
						console.log(err);
					})
			
				})
			},
		}
	}
</script>

<style lang="scss">
	.chatPage {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f2f2f2;

		/deep/ .uni-scroll-view-content {
			height: auto;
		}

		.chatHistory {
			box-sizing: border-box;
			flex: 1;
			overflow: scroll;
			padding-top: 20rpx;
			height: auto !important;

			.goodsInfo {
				position: sticky;
				top: 0rpx;
				width: 90%;
				height: 220rpx;
				background-color: #fff;
				margin: 30rpx auto 20rpx;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding-left: 20rpx;
				z-index: 50;

				.images {
					width: 160rpx;
					height: 160rpx;
					border-radius: 20rpx;
					margin-right: 20rpx;
					overflow: hidden;
					object-fit: contain;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.goodsInfo-r {
					flex-shrink: 0;
					flex: 1;
					height: 180rpx;
					display: flex;
					flex-direction: column;
					overflow: hidden;
					// justify-content: space-between;

					.title {
						font-size: 42rpx;
						font-weight: bold;
					}

					.name {
						font-size: 30rpx;
						font-weight: bold;
						color: #333;

						.name-inner {
							margin-left: 10rpx;
							font-size: 26rpx;
							color: #333;
							font-weight: bold;
						}

					}

					.remarks {
						margin-top: 10rpx;
						text-align: justify;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						white-space: pre-wrap;
						word-break: break-all;
						overflow: hidden;
						font-size: 22rpx;
					}

					.no-remark {
						height: 80rpx !important;
						line-height: 80rpx;
						color: #bbb;
						text-align: center;

					}
				}
			}

			.chatItem {
				width: 100%;
				min-height: 100rpx;
				display: flex;
				box-sizing: border-box;
				padding-left: 20rpx;

				.image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 6rpx;
					overflow: hidden;
					flex-shrink: 0;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.content {
					flex: 1;
					display: flex;
					flex-direction: column;
					margin-left: 10rpx;
					padding-left: 20rpx;
					position: relative;

					.txt {
						margin-top: 10rpx;
						background-color: #fff;
						width: 40%;
						border-radius: 10rpx;
						padding: 10rpx;
						width: fit-content;
						max-width: 40%;
						word-wrap: break-word;
						word-break: normal;
						text-align: justify;
						position: relative;

						.jiantou {
							position: absolute;
							// width: 0;
							// height: 0;
							border-top: 10rpx solid transparent;
							border-bottom: 10rpx solid transparent;
							border-left: 10rpx solid transparent;
							border-right: 10rpx solid #fff;
							left: -20rpx;
							top: 20rpx;
						}
					}

					image{
						width: 120rpx;
						height: 120rpx;
					}
				}
			}

			.r {
				.content {
					align-items: flex-end;
					margin-right: 10rpx;
					position: relative;
					padding-left: 0rpx;
					padding-right: 20rpx;

					.txt {
						text-align: right;
						width: fit-content;
						max-width: 40%;
						text-align: left;

						.jiantou {
							position: absolute;
							// width: 0;
							// height: 0;
							border-top: 10rpx solid transparent;
							border-bottom: 10rpx solid transparent;
							border-left: 10rpx solid #fff;
							border-right: 10rpx solid transparent;
							right: -20rpx;
							left: 100%;
							top: 20rpx;
						}
					}
				}
			}
		}

		.chatInp {
			height: 100rpx;
			display: flex;
			align-items: center;
			background-color: #fff;
			.phone{
				margin-left: 10rpx;
				width: 60rpx;
				text-align: center;
			}
			.u-input {
				height: 60rpx;
				border-radius: 10rpx;
			}

			.send {
				margin: 0 10rpx;
			}

			.send:active {
				color: #777777;
			}
		}
	}
</style>
