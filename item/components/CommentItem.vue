<template>
	<view class="comment-item">
		<view class="userInfo">
			<u--image :showLoading="true" :src="this.comment.publisherImg" width="30px" height="30px" shape="circle">
			</u--image>
			<view class="info-r">
				<view class="name">
					{{this.comment.publisherName}}
				</view>
				<view class="time">
					<view class="time-r">
						{{this.comment.publisherCollege}}
					</view>
				</view>
			</view>
		</view>
		<view class="content-box">
			<view class="content-txt">{{this.comment.content}}</view>
			<view class="bottom">
				<view class="time">
					<view class="time-l">
						{{this.comment.time | dealTime}}
					</view>
					<view class="time-r">
						{{this.comment.publisherCollege}}
					</view>
				</view>
				<view class="bot-icons">
					<view class="icon icon1" @click="changeInpType">
						<u-icon name="chat" size="20"></u-icon>
						<!-- <text>{{this.comment.children.length}}</text> -->
					</view>
					<view class="icon icon2" @click="likeComment()">
						<u-icon :name="like" :color="likeColor" size="20"></u-icon>
						<text>{{this.comment.likes}}</text>
					</view>
				</view>
			</view>
			<view class="sub-content" v-if="this.comment.children && this.comment.children.length">
				<template v-if="this.comment.children.length <= 3">
					<view class="sub-content-item" v-for="(subitem,index1) in comment.children" :key="index1">
						{{subitem.publishername}}回复: {{subitem.content}}
					</view>
				</template>
				<template v-else>
					<view v-if="!showmore">
						<view class="sub-content-item">
							{{this.comment.children[0].publishername}}回复: {{this.comment.children[0].content}}
						</view>
						<view class="sub-content-item">
							{{this.comment.children[1].publishername}}回复: {{this.comment.children[1].content}}
						</view>
						<view class="sub-content-item">
							{{this.comment.children[2].publishername}}回复: {{this.comment.children[2].content}}
						</view>
					</view>
					<view v-else>
						<view class="sub-content-item" v-for="(subitem,index) in comment.children" :key="index">
							{{subitem.publishername}}回复: {{subitem.content}}
						</view>
					</view>
					<view class="show-more" v-if="!showmore" @click="showMore">展开{{this.comment.children.length - 3}}条回复
					</view>
					<view class="show-more" v-if="showmore" @click="up">收起回复</view>
				</template>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		name: "CommentItem",
		props: {
			articalId: {
				type: Number,
				default: 0
			},
			commentlist: {
				type: Object,
				default: () => {}
			},
			inpVal:{
				type:String,
				default:''
			},
			index:{
				type:Number,
				default:0
			}
		},
		created() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			if(this.userInfo.likeComment.indexOf(this.commentlist.id.toString()) !== -1){
				this.likeColor = 'red'
				this.like = 'thumb-up-fill'
			}else {
				this.like = 'thumb-up'
			}
			this.$nextTick(()=>{
				this.comment = this.commentlist
			})
		},
		data() {
			return {
				userInfo: {},
				comment:{},
				showmore: false,
				like: '',
				likeColor: '#666',
				showmore: false,
			};
		},
		watch:{
			commentlist:{
				handler(val){
					this.comment = JSON.parse(JSON.stringify(val))
				},
				immediate:true,
				deep:true
			}
		},
		filters:{
			dealTime(val){
				// let date = new Date()
				// let year = date.getFullYear().toString()
				// let arr = val.split(' ')
				// let time = arr[1].split(':')
				// let arr1 = arr[0].split('-')
				// if(year !== arr1[0]){
				// 	return arr[0]
				// }
				// else{
				// 	return `${arr1[1]}-${arr1[2]} ${time[0]}:${time[1]}`
				// }
				// console.log('arr',arr1,year);
				return val
			}
		},
		watch: {
			// like() {
			// 	console.log(item);
			// 	// console.log(this.userInfo.likeComment.indexOf(item.id));
			// 	if (this.userInfo.likeComment.indexOf(item.id) != -1) {
			// 		this.like = 'thumb-up-fill'
			// 	}
			// },

		},
		methods: {
			showMore() {
				this.showmore = true
			},
			up() {
				this.showmore = false
			},
			likeComment() {
				if (this.like !== 'thumb-up') {
					this.like = 'thumb-up'
					this.likeColor = '#666'
					this.comment.likes--
					if (this.comment.likes < 0) {
						this.comment.likes = 0
					}
					let index = this.userInfo.likeComment.indexOf(this.comment.id)
					this.userInfo.likeComment.splice(index, 1)
				} else {
					this.like = 'thumb-up-fill'
					this.likeColor = 'red'
					this.comment.likes++
					this.userInfo.likeComment.push(this.comment.id.toString())
				}
				uni.setStorage({
					key: 'userInfo',
					data: JSON.stringify(this.userInfo)
				})
				this.dianzanAsync(this.userInfo.id, this.comment.id, this.comment.likes, this.userInfo.likeComment)
			},
			async dianzanAsync(userId, id, likes, likeComment) {
				let obj = {
					userId,
					id,
					likes,
					likeComment: likeComment.toString()
				}
				const res = await this.$api.commentThumbsUp(obj)
				if (res.status !== 200) {
					this.$refs.uToast.show({
						type: 'error',
						message: '点赞失败',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
						duration: '500'
					})
				}
			},
			changeInpType(){
				this.inpType = '回复'
				this.$emit('changeType',this.index)
				// uni.showKeyboard()
				console.log('111',this.comment);
			},
			//发表评论
			async sendReply(){
				let obj = {
					id:this.comment.id,
					publishername:this.userInfo.name,
					content:this.inpVal,
				}
				const res = await this.$api.sendReply(obj)
				
				if(res.status == 200){
					this.comment.children.push(obj)
					console.log(this.comment);
					this.$refs.uToast.show({
						type: 'success',
						message: '回复成功',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						duration: '500'
					})
					this.$emit('getcomment')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-item {
		.userInfo {
			// height: 100%;
			height: 110rpx;
			width: 100%;
			padding: 10rpx 0rpx 0;
			display: flex;
			align-items: center;
			overflow: hidden;

			.info-r {
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
				justify-content: center;

				.name {
					margin-bottom: 4rpx;
					font-size: 20rpx;
					font-weight: bold;
					max-width: 300rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.time {
					display: flex;
					color: #666666;
					font-size: 20rpx;
				}
			}
		}

		.content-box {
			padding-left: 74rpx;

			.content-txt {
				font-size: 26rpx;
				color: #000;
				margin-bottom: 20rpx;
			}

			.bottom {
				font-size: 22rpx;
				color: #666;
				display: flex;
				justify-content: space-between;

				.time {
					display: flex;
					flex-shrink: 0;

					.time-l {
						margin-right: 8rpx;
					}

					.time-r {
						color: #56bbb5;
					}
				}

				.bot-icons {
					display: flex;
					flex-shrink: 0;

					.icon {
						display: flex;
						align-items: center;
					}

					.icon1 {
						margin-right: 24rpx;
					}
				}
			}

			.sub-content {
				margin-top: 20rpx;
				border-radius: 8rpx;
				padding: 10rpx 20rpx;
				background-color: rgb(248, 248, 248);

				.sub-content-item {
					margin: 10rpx 0;
					color: #666;
					font-size: 24rpx;
					text-align: justify;
					line-height: 1.5;
				}

				.show-more {
					color: #56bbb5;
					font-size: 24rpx;
					margin: 10rpx 0;
				}
			}
		}
	}
</style>
