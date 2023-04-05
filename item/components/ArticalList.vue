<template>
	<view class="artical-list">
		<ArcicalItem v-for="(item,index) in list" :key="index" :list="item"></ArcicalItem>
	</view>
</template>

<script>
	import ArcicalItem from './ArticalItem.vue'
	export default {
		name: "ArticalList",
		components:{
			ArcicalItem
		},
		props:{
			list:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.artical-list{
		padding: 10rpx 30rpx;
		.skeleton-view{
			margin-top: 40rpx;
		}
	}
</style>
