<template>
	<view class="search">
		<u-navbar class="home-head" placeholder>
			<view class="head-left" slot="left">
				<u-icon class="backIcon" focus @click="backHome" name="arrow-left" color="#000" size="28"></u-icon>
			</view>
			<view class="head-middle" slot="center">
				<u--input class="input" :focus="isInputFocus" border-color="#666666" placeholder="请输入搜索内容"
					prefixIcon="search" v-model="inputValue" prefixIconStyle="font-size: 22px;color: #333333">
				</u--input>
			</view>
			<view class="head-right" slot="right">
				<view class="head-rtxt" @click="search">搜索</view>
			</view>
		</u-navbar>
		<view class="search-list">
			<view class="history">
				<view class="">历史搜索记录</view>
				<view class="icon iconfont icon-shanchu" @click="deleteAll"></view>
			</view>
			<view class="list">
				<span v-for="(item,index) in searchList" :key="index">
					<u-tag v-if="item !== ''" plain color="#666" borderColor="#999" :text=item closable
						@close="deleteItem(index)"></u-tag>
				</span>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				searchList: [],
				inputValue: '',
				isInputFocus: false //进入界面输入框是否聚焦
			}
		},
		created() {
			this.getSysteminfo()
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.searchList = this.userInfo.searchlist
		},
		mounted() {
			this.isInputFocus = true
		},
		methods: {
			//添加搜索记录
			async addHistory(){
				let search = this.searchList.toString()
				const res = await this.$api.addSearchHistory({id:this.userInfo.id,value:search})
			},
			// 获取系统栏高度
			getSysteminfo() {
				uni.getSystemInfo({
					success: res => {
						this.systemBarHeight = res.statusBarHeight;
					}
				});
			},
			deleteItem(index) {
				this.searchList.splice(index, 1)
				this.addHistory()
				this.userInfo.searchlist = this.searchList
				uni.setStorage({
					key: 'userInfo',
					data: JSON.stringify(this.userInfo)
				})
			},
			deleteAll() {
				this.searchList = []
				this.addHistory()
				this.userInfo.searchlist = this.searchList
				uni.setStorage({
					key: 'userInfo',
					data: JSON.stringify(this.userInfo)
				})
			},
			search() {
				if (this.inputValue.trim() == '') {
					return;
				}
				this.inputValue.trim()
				this.searchList.push(this.inputValue)
				this.addHistory(this.inputValue)
				this.userInfo.searchlist = this.searchList
				uni.setStorage({
					key: 'userInfo',
					data: JSON.stringify(this.userInfo)
				})
				uni.navigateTo({
					url:'/pages/allGoods/allGoods?search='+this.inputValue
				})
			},
			backHome() {
				this.$emit('blurs')
			}
		}
	}
</script>

<style lang="scss">
	.search {
		width: 100vw;
		background-color: #f8f8f8;

		.home-head {
			/deep/ .u-navbar__content__left {
				position: relative;
				padding: 0;
			}

			/deep/ .u-navbar__content__right {
				position: relative;
				padding: 0;
			}

			.head-left {
				font-size: 30rpx;
				height: 100%;
				text-align: center;
				line-height: 88rpx;
				// display: flex;
				// align-items: center;
				// justify-content: center;
				color: #000000;
				.backIcon{
					font-size: 40rpx;
					margin-right: 0;
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
				margin: 0 10rpx;
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

		.search-list {
			.history {
				padding: 30rpx 30rpx 0 30rpx;
				font-size: 32rpx;
				color: #999999;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.icon {
					width: 50rpx;
					height: 50rpx;
					font-size: 44rpx;
					line-height: 50rpx;
					flex-shrink: 0;
				}

				.icon:active {
					color: #777777;
				}
			}

			.list {
				display: flex;
				padding: 30rpx;
				flex-wrap: wrap;
			}
		}
	}
</style>
