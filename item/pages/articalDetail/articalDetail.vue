<template>
	<view class="artical-detail">
		<u-navbar title="讨论区" @leftClick="back" :titleStyle="{
					fontSize: '30rpx',
					fontWeight:'bold'
				}" placeholder bgColor="#fff"></u-navbar>
		<view class="top">
			<scroll-view scroll-y="true" :scroll-top="scrollTop" :style="{height:scrollBoxHeight}">
				<view class="content">
					<view class="userInfo">
						<u--image :showLoading="true" :src="this.articalInfo.img" width="50px"
							height="50px" shape="circle">
						</u--image>
						<view class="info-r">
							<view class="name">
								{{this.articalInfo.name}}
							</view>
							<view class="time">
								<view class="time-r">
									{{this.articalInfo.college}}
								</view>
							</view>
						</view>
					</view>

					<view class="text">
						<view class="title" v-if="articalInfo.title !== '' || articalInfo.title !== null">
							{{this.articalInfo.title}}
						</view>
						<view class="artical" v-html="articalInfo.content"></view>
						<u-album v-if="articalInfo.contentimg !== null" style="margin: 20rpx 0;" :urls="articalInfo.imgList" rowCount="4" maxCount="8"></u-album>
						<view class="time">
							{{this.articalInfo.time | dealTime}}
						</view>
					</view>
				</view>
				<view class="comment" v-if="this.commentList && this.commentList.length">
					<view class="all-count">
						<view class="all-txt">全部评论</view>
						<view class="all-num" v-if="this.commentNum && this.commentNum!==0">({{this.commentNum}}条)</view>
					</view>
					<view  v-for="(item,index) in this.commentList" :key="index">
						<comment-item :articalId="id" :commentlist="item"></comment-item>
					</view>
				</view>
				<view v-else></view>
			</scroll-view>
		</view>
		<view  class="edit" :style="{bottom: bottom}">
			<view class="inp">
			 	<input class="uni-input"  @focus="focus" @blur="blur" :adjust-position="false" type="text" placeholder="请输入内容" @input="handleInput" :value="inpValue" />
			 </view>
			 <view class="send" @click="sendTxt">发送</view>
		</view>
		<view style="height: 120rpx;">
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import CommentItem from '@/components/CommentItem.vue'
	export default {
		components:{
			CommentItem
		},
		data() {
			return {
				id:0,
				userInfo:{},
				commentNum: 0,
				articalInfo:{},
				showList: [],
				inpValue:'',
				commentList: [
				],
				bottom:'0px',
				scrollTop:0,
				scrollBoxHeight:'',
				inpType:'评论'
			};
		},
		onLoad(options) {
			let articalInfo = JSON.parse(options.info)
			this.id = Number(articalInfo.id)
			this.articalInfo = articalInfo
			this.getComment(this.id)
			
		},
		created() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// if(this.userInfo.likes.indexOf(this.listData.id.toString()) !== -1){
			// 	this.like = 'thumb-up-fill'
			// 	this.likeColor = 'red'
			// }
		},
		filters:{
			dealTime(val){
				let date = new Date()
				let year = date.getFullYear().toString()
				let arr = val.split(' ')
				let time = arr[1].split(':')
				let arr1 = arr[0].split('-')
				if(year !== arr1[0]){
					return arr[0]
				}
				else{
					return `${arr1[1]}-${arr1[2]} ${time[0]}:${time[1]}`
				}
				console.log('arr',arr1,year);
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			//获取评论
			async getComment(id){
				let res = await this.$api.getComment(id)
				if(res.status == 200){
					this.commentNum = res.data.count
					this.commentList = res.data.data.reverse()
				}
			},
			handleInput({ detail }) {
				if(detail.value.trim() === ''){
					return ;
				}
				this.inpValue = detail.value.trim();
			},
			changeInpType(){
				this.inpType = '回复'
				uni.showKeyboard()
			},
			//发表评论
			async sendTxt(){
				if(this.inpType === '评论'){
					let obj = {
						articalId:this.id,
						publisherId:Number(this.userInfo.id),
						publisherName:this.userInfo.name,
						publisherImg:this.userInfo.img,
						publisherCollege:this.userInfo.school,
						content:this.inpValue
					}
					const res = await this.$api.sendComment(obj)
					if(res.status !== 200){
						this.$refs.uToast.show({
							type: 'error',
							message: '评论失败',
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
							duration: '500'
						})
					}else{
						this.getComment(this.id)
					}
				}else {
					console.log('回复');
				}
				this.inpValue = ''
			},
			
			// 获得焦点后
			focus(e){
			     // 可用区域高度减去软键盘高度，最后加上px转为字符串
				this.pageHeight = uni.getWindowInfo().windowHeight - e.detail.height + 'px';
			    // 可用区域高度减去send盒子高度再减去软键盘高度，最后加上px转为字符串
				this.scrollBoxHeight = uni.getWindowInfo().windowHeight - 35 - 60 + 'px';
				this.bottom = e.detail.height + 'px'
			},
			// 失去焦点后
			blur(){
				this.pageHeight = 0
				this.scrollBoxHeight = ''
				// this.pageHeight = uni.getWindowInfo().windowHeight + 'px';
				// this.scrollBoxHeight = uni.getWindowInfo().windowHeight  -60 + 'px';
				this.bottom = '0px'
			},
		}
	}
</script>

<style lang="scss" scoped>
	.artical-detail {
		width: 100vw;
		height: 100vh;
		background-color: rgb(247, 248, 249);
		display: flex;
		flex-direction: column;
		position: relative;
		.top{
			flex: 1 !important;
			// height: 100%;
			overflow: auto;
			.content {
				width: 100%;
				padding: 20rpx 20rpx 2rpx;
				background-color: #fff;
			
				// padding-top: 120rpx;
				.userInfo {
					// height: 100%;
					height: 110rpx;
					width: 100%;
					background-color: #fff;
					padding: 10rpx 20rpx;
					display: flex;
					align-items: center;
					overflow: hidden;
					position: sticky;
					top: 0;
			
					.info-r {
						display: flex;
						flex-direction: column;
						margin-left: 20rpx;
						justify-content: center;
			
						.name {
							margin-bottom: 4rpx;
							font-size: 28rpx;
							font-weight: bold;
							max-width: 300rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
			
						.time {
							display: flex;
							color: #666666;
							font-size: 24rpx;
						}
					}
				}
			
				.text {
					padding: 10rpx 20rpx 20rpx;
			
					.title {
						font-weight: 600;
						line-height: 1.5;
						font-size: 30rpx;
						margin-bottom: 20rpx;
					}
			
					.artical {
						word-break: break-all;
						text-align: justify;
					}
				}
			
				.time {
					margin-top: 20rpx;
					color: #666666;
					font-size: 26rpx;
				}
			}
			
			.comment {
				// height: 1000rpx;
				margin-top: 10rpx;
				background-color: #fff;
				padding: 20rpx 40rpx;
			
				.all-count {
					display: flex;
					align-items: center;
			
					.all-txt {
						font-weight: bold;
						font-size: 28rpx;
						margin-right: 16rpx;
					}
			
					.all-num {
						font-size: 20rpx;
						margin-top: 4rpx;
						color: #666;
						;
					}
				}
			}
		}
		.edit{
			height: 120rpx;
			position: absolute;
			// bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			align-items: center;
			background-color: #fff;
			padding: 0 20rpx 0 40rpx;
			.inp{
				border: 1px solid #dadbde;
				display: flex;
				border-radius: 40rpx;
				padding-left: 10rpx;
				align-items: center;
				flex: 1;
				.uni-input{
					width: 100%;
					height: 60rpx;
					padding-left: 20rpx;
					display: flex;
					align-items: center;
					line-height: 60rpx;
				}
			}
			
			.send{
				height: 100%;
				line-height: 120rpx;
				font-size: 30rpx;
				margin-left: 20rpx;
			}
		}
	}
</style>
