<template>
	<view class="community">
		<u-navbar title="社区" placeholder leftIcon='' :titleStyle="{
					fontSize: '30rpx',
					fontWeight:'bold'
				}" bgColor="#f8f8f8" rightIcon="plus-circle" @rightClick="editNewArtical">
		</u-navbar>

		<!-- 骨架屏 -->
		<view v-if="loading"  class="skeleton-view">
			<u-skeleton avatar rows="4" title :loading="loading" :rowsHeight="[30,30,100,30]"
				:rowsWidth="['100%','100%',100,'100%']" titleHeight="20"></u-skeleton>
			<u-skeleton style="margin-top:20rpx" avatar rows="4" title :loading="loading" :rowsHeight="[30,30,100,30]"
				:rowsWidth="[250,250,100,250]" titleHeight="20"></u-skeleton>
		</view>
		<view v-else>
			<u-notice-bar :text="text1" mode="closable"></u-notice-bar>
			<artical-list :list="articalList"></artical-list>
		</view>
		
	</view>
</template>
<script>
	import ArticalList from '@/components/ArticalList.vue'
	export default {
		components: {
			ArticalList
		},
		data() {
			return {
				loading: false,
				text1: '记录你此刻生活，分享给有趣的人看,在这里你可以自由的分享你的日常哦。。。',
				page: 1,
				articalList: [],
				height: 0
			}
		},
		created() {
			this.getArtical()
		},
		onReachBottom() {
			this.getArtical()
		},
		onPullDownRefresh() {
			this.show = true
			setTimeout(() => {
				this.show = false
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			editNewArtical() {
				uni.navigateTo({
					url: '/pages/editArtical/editArtical'
				})
			},
			// 获取数据
			async getArtical() {
				// this.loading = true
				let length = this.articalList.length
				const res = await this.$api.getAllArtical(this.page)
				this.articalList = [...this.articalList, ...res.data]
				if (this.articalList.length != length) {
					this.page++
				}
				// this.loading = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.community {
		width: 100vw;
		box-sizing: border-box;
		// background-color: rgba(247, 248, 249);
		background-color: rgb(247, 248, 249);
	}
</style>
