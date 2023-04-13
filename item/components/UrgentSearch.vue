<template>
	<view class="urgent-search">
		<gooods-item v-for="(item,index) in urgentList" :key="index" :dataInfo="item"></gooods-item>
	</view>
</template>

<script>
	import GooodsItem from '@/components/GoodsItem.vue'
	export default {
		name:"UrgentSearch",
		components:{
			GooodsItem
		},
		data() {
			return {
				urgentList:[]
			};
		},
		created() {
			this.init()
		},
		methods:{
			async init(){
				const res = await this.$api.getUrgentList()
				console.log(res);
				if(res.status== 200){
					this.urgentList = res.data
				}
			}
		}
	}
</script>

<style lang="scss">
.urgent-search{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 80rpx;
}
</style>