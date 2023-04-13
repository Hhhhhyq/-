<template>
	<view class="artical-item" @click="toDetail">
		<view class="userInfo">
			<u--image :showLoading="true" :src="listData.img" width="40px" height="40px" shape="circle">
			</u--image>
			<view class="info-r">
				<view class="name">{{listData.name}}</view>
				<view class="time">
					<view class="time-l">
						{{listData.time | dealTime}}
					</view>
					<view class="time-r">
						{{listData.college}}
					</view>
				</view>
			</view>
		</view>
		<view class="message">
			<view class="title" v-if="listData.title !== '' || listData.title !== null" v-html="listData.title"></view>
			<view class="txt" v-html="listData.content"></view>
			<u-album v-if="listData.contentimg !== null" style="margin: 20rpx 0;" :urls="listData.imgList" rowCount="4" maxCount="8"></u-album>
		</view>

		<view class="btn">
			<view class="option-item">
				<u-icon name="eye" size="22"></u-icon>
				<view style="color: #666;margin-left: 8rpx;font-size: 28rpx;">{{listData.saw}}</view>
				<!-- <u-badge max="99" style="background-color: #333;color:black" type="info" absolute :value="list.saw"
					:offset="[-2,50]"></u-badge> -->
			</view>
			<view class="option-item">
				<u-icon name="chat" size="22"></u-icon>
			</view>
			<view class="option-item" @click.stop="dianzan">
				<u-icon :name="like" size="24" :color="likeColor"></u-icon>
				<view style="color: #666;margin-left: 8rpx;font-size: 28rpx;">{{listData.likes}}</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>
<script>
	export default {
		name: 'ArticalIten',
		props:{
			list:{
				type:Object,
				default:()=>{}
			}
		},
		onLoad(){
			if(this.userInfo.likes.indexOf(this.listData.id.toString()) != -1){
				this.like = 'thumb-up-fill'
				this.likeColor = 'red'
			}
		},
		created() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		data() {
			return {
				like:'thumb-up',
				likeColor:'#666',
				listData:{},
				userInfo:{}
			}
		},
		watch:{
			list:{
				handler(val){
					this.listData = JSON.parse(JSON.stringify(val))
				},
				immediate:true
			}
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
			toDetail() {
				console.log(JSON.stringify(this.listData));
				this.addSaw()
				uni.navigateTo({
					url:`/pages/articalDetail/articalDetail?info=${JSON.stringify(this.listData)}` 
				})
			},
			//增加浏览次数
			async addSaw(){
				this.listData.saw++
				let obj = {
					id:this.listData.id,
					saw:this.listData.saw
				}
				const res = await this.$api.saw(obj)
			},
			async dianzanAsync(){
				console.log(this.userInfo.likes.toString());
				let obj = {
					userId:this.userInfo.id,
					userLikes:this.userInfo.likes.toString(),
					id:this.listData.id,
					likes:this.listData.likes
				}
				const res = await this.$api.thumbsUp(obj)
				if(res.status !== 200){
					this.$refs.uToast.show({
						type: 'error',
						message: '点赞失败',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
						duration: '500'
					})
				}
				
			},
			dianzan(){
				console.log('点赞');
				if(this.like !== 'thumb-up'){
					this.like = 'thumb-up'
					this.listData.likes--
					if(this.listData.likes<0){
						this.listData.likes = 0
					}
					let index = this.userInfo.likes.indexOf(this.listData.id)
					this.userInfo.likes.splice(index,1)
					this.likeColor = '#666'
				}else {
					this.like = 'thumb-up-fill'
					this.likeColor = 'red'
					this.listData.likes++
					this.userInfo.likes.push(this.listData.id.toString())
				}
				uni.setStorage({
					key: 'userInfo',
					data: JSON.stringify(this.userInfo)
				})
				this.dianzanAsync()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.artical-item {
		margin: 20rpx 0rpx 10rpx;
		padding: 12rpx;
		background-color: #fff;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;

		.userInfo {
			height: 100rpx;
			width: 100%;
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
					font-size: 22rpx;
					.time-l{
						margin-right: 8rpx;
					}
				}
			}
		}

		.message {
			padding: 10rpx 10rpx 10rpx 10rpx;
			.message{
				color: #000;
				font-weight: bold;
				line-height: 1.5;
				font-size: 30rpx;
				word-break: break-all;
				margin-bottom: 8rpx;
			}
			.txt {
				color: #333333;
				// margin-bottom: 20rpx;
				text-align: justify;
				font-size: 28rpx;
				overflow: hidden;
				/* 设置盒子样式，-webkit-是兼容前缀 */
				display: -webkit-box;
				/* 设置盒子参考方式 */
				-webkit-box-orient: vertical;
				/* 设置超出多少行显示省略号 */
				-webkit-line-clamp: 3;
				// position: relative;
			}
		}

		.btn {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.option-item {
				flex: 1;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
