<template>
	<view class="text">
		<u-navbar title="消息中心" leftIcon="" :titleStyle="{
					fontSize: '30rpx',
					fontWeight:'bold'
				}" bgColor="#f8f8f8" placeholder>
		</u-navbar>
		<scroll-view scroll-y="true" >
			<view class="list-item" v-for="(item,index) in itemArr" :key="index" @click="toChat(item)">
				<image :src="item.img" mode="">
				<view class="item-r">
					<view class="content">
						<view class="content-l">{{item.name}}</view>
						<view class="conetent-r">{{item.list.sendtime | dealTime}}</view>
					</view>
					<view class="name">{{item.list.content}}</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexList: [],
				itemArr: {}
			}
		},
		onLoad() {
		},
		created() {
			let token = uni.getStorageSync('token')
			if(token){
				this.init()
			}
		},
		filters:{
			dealTime(val){
				let arr = val.split(' ')
				return arr[1]
			}
		},
		methods: {
			async init(){
				console.log(uni.getStorageSync('userInfo'));
				let id = JSON.parse(uni.getStorageSync('userInfo')).id
				console.log(id);
				let res = await this.$api.charList(id)
				if(res.status == 200){
					for(let item in res.data){
						res.data[item].id = Number(item)
					}
					this.itemArr = res.data
				}
			},
			toChat(item) {
				// console.log(item);
				uni.navigateTo({
					url:`/pages/chatPage/chatPage?to=${item.name}&toId=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.text {
		
		.list-item{
			display: flex;
			align-items: center;
			box-sizing: border-box;
			height: 100rpx;
			background-color: #f7f7f7;
			border-bottom:1px solid #ececec;
			border-top: 1px solid #ececec;
			width: 100vw;
			padding: 10rpx 30rpx;
			line-height: 100rpx;
			font-weight: bold;
			image{
				width: 70rpx;
				height: 70rpx;
				margin-right: 20rpx;
				border-radius: 8rpx;
			}
			.item-r{
				height: 100%;
				display: flex;
				flex: 1;
				flex-direction: column;
				align-items: left;
				justify-content: center;
				box-sizing: border-box;
				.name{
					font-size: 20rpx;
					// height: 40rpx;
					color: #666666;
					font-weight: bold;
				}
				.content{
					font-size: 30rpx;
					height: 40rpx;
					font-weight: bold;
					display: flex;
					justify-content: space-between;
					.conetent-r{
						font-weight: normal;
						font-size: 20rpx;
						color: #666666;
					}
				}
			}
		}
		.list-item:last-child{
			border-bottom: none;
		}
		.list-item:active{
			background-color: #f2f2f2;
		}
	}
</style>
