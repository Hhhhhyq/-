<template>
	<view class="text">
		<u-navbar title="消息中心" leftIcon="" :titleStyle="{
					fontSize: '30rpx',
					fontWeight:'bold'
				}" bgColor="#f8f8f8" placeholder>
		</u-navbar>
		<scroll-view scroll-y="true" >
			<view class="list-item" v-for="(item,index) in itemArr" :key="index" @click="toChat(item)">
				<view style="position: relative;display: flex;margin-right: 20rpx;">
					<image :src="item.img" mode="" style="margin: auto;">
					<view class="noread" v-if="item.noreadNum && item.noreadNum !== 0">
						<view class="num">
							{{item.noreadNum}}
						</view>
					</view>
				</view>
				<view class="item-r">
					<view class="content">
						<view class="content-l">{{item.name}}</view>
						<view class="conetent-r">{{item.list[item.length-1].sendtime | dealTime}}</view>
					</view>
					<view class="name">{{item.list[item.length-1].type == '0' ? item.list[item.length-1].content : '[图片表情]' }}</view>
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
				itemArr: [],
				time:0,
				timer:null
			}
		},
		onLoad() {
			this.init()
		},
		created() {
			let token = uni.getStorageSync('token')
			if(token){
				this.init()
			}
			this.timer = setInterval(()=>{
				if(this.time >=60){
					this.init()
					this.time = 0
				}
				this.time++
				
			},1000)
			this.$once('hook:beforeDestroy',()=> this.timer = null)
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
				let res = await this.$api.charList(id)
				console.log(res);
				if(res.status == 200){
					let arr = []
					for(let item in res.data){
						res.data[item].id = Number(item)
						res.data[item].length = res.data[item].list.length
						arr.push(res.data[item])
						let noreadNum = 0
						res.data[item].list.forEach((item)=>{
							if(item.isread ==0 && item.sendid !== id){
								noreadNum++
							}
						})
						res.data[item].noreadNum = noreadNum
					}
					console.log(arr);
					this.itemArr = arr
				}
			},
			toChat(item) {
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
					width: 100%;
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
			.noread{
				position: absolute;
				width: 30rpx;
				height: 30rpx;
				background-color: red;
				right: -16rpx;
				border-radius: 50%;
				top: -12rpx;
				display: flex;
				.num{
					// position: absolute;
					text-align: center;
					line-height: 30rpx;
					width: 30rpx;
					height: 30rpx;
					// margin: auto;
					font-size: 18rpx;
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
