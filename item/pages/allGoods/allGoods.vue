<template>
	<view class="allGoods">
		<u-loading-page class="loading" bgColor="#f8f8f8" fontSize="16" iconSize="32" loadingMode="spinner"
			:loading="loading" loadingText="加载中..."></u-loading-page>
		<u-navbar title="所有" @leftClick="back" placeholder :autoBack="false" :titleStyle="{
					fontSize: '30rpx',
					fontWeight:'bold'
				}">
		</u-navbar>
		<u--input placeholder="请输入搜索内容" clearable border="surround" v-model="value" shape="circle">
			<template slot="suffix">
				<u-icon @click="inputSearch" name="search" color="#333333" size="30"></u-icon>
			</template>
		</u--input>
		<view class="class">
			<text class="title">选择类型:</text>
			<view class="class-r">
				<view class="class-item" v-for="(item,index) in columns1" :key="index"
					:class="[select.value1 === item ? 'item-active' : '']" @click="addClass1(item)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="class class2">
			<text class="title">物品类别:</text>
			<view class="class-r">
				<view class="class-item" v-for="(item,index) in columns2" :key="index"
					:class="[select.value2 ===  item? 'item-active' : '']" @click="addClass2(item)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="goods-content" v-if="goodsList.length">
			<goods-item v-for="(item,index) in goodsList" :dataInfo="item" :key="index"></goods-item>
		</view>
		<view class="" v-else style="margin-top: 100rpx;">
			<u-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png">
			</u-empty>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import GoodsItem from '@/components/GoodsItem.vue'
	export default {
		components: {
			GoodsItem
		},
		data() {
			return {
				loading: true,
				value: '', //输入框值
				columns1: ['所有', '失物招领', '寻物启事'],
				columns2: [],
				select: {
					value1: '所有',
					value2: ''
				},
				goodsList: [],
				userInfo:{},
				searchList:[]
			}
		},
		onLoad(options){
			if(options.search !== undefined){
				setTimeout(()=>{
						this.value = options.search
						this.inputSearch()
				},1000)
			}
			
		},
		created() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.searchList = this.userInfo.searchlist
			this.select = {
				value1: '所有',
				value2: ''
			}
			this.value = ''
			this.initData();
			this.getAllType()
		},
		mounted() {
			this.inputSearch()
		},
		watch: {
			select: {
				handler(val) {
					if (val.value1 !== '所有' && val.value2 !== '') {
						this.selectData(val)
					} else {
						this.initData()
					}
				},
				deep: true
			},
			value(val){
				if(val.trim() == '' || val == ''){
					this.initData()
				}
				else {
					this.inputSearch()
				}
			}
		},
		methods: {
			//获取所有类型
			async getAllType(){
				const res = await this.$api.getAllType()
				if(res.status == 200){
					let arr = []
					arr = res.data.typelist.split(',')
					let arr1 = []
					arr.forEach(item=>{
						if(item == '' || arr1.indexOf(item) !== -1){
							return ;
						}else {
							arr1.push(item)
						}
					})
					this.columns2 = arr1
				}
			},
			//添加搜索记录
			async addHistory(){
				let search = this.searchList.toString()
				const res = await this.$api.addSearchHistory({id:this.userInfo.id,value:search})
			},
			async initData() {
				this.loading = true
				let result = []
				if (this.select.value2 == '') {
					let result1 = await this.$api.getAllRelease()
					let result2 = await this.$api.getAllFind()
					if (this.select.value1 == '所有') {
						result = [...result1.data, ...result2.data]
					}
					if (this.select.value1 == '失物招领') {
						result = [...result1.data]
					}
					if (this.select.value1 == '寻物启事') {
						result = [...result2.data]
					}
					if (result1.status == 200 || result2.status == 200) {
						this.goodsList = result
						this.$refs.uToast.show({
							type: 'success',
							message: '获取成功',
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							duration: '500'
						})
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: '获取失败',
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							duration: '500'
						})
					}
				} else {
					let result1 = await this.$api.getAllRelease()
					let result2 = await this.$api.getAllFind()
					if (this.select.value1 == '所有') {
						result = [...result1.data, ...result2.data]
					}
					if (this.select.value1 == '失物招领') {
						result = [...result1.data]
					}
					if (this.select.value1 == '寻物启事') {
						result = [...result2.data]
					}
					if (result1.status == 200 || result2.status == 200) {
						result = result.filter(item => {
							return item.selectType == this.select.value2
						})
						this.goodsList = result
						this.$refs.uToast.show({
							type: 'success',
							message: '获取成功',
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							duration: '500'
						})
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: '获取失败',
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							duration: '500'
						})
					}
				}

				this.loading = false
			},
			back() {
				uni.navigateBack()
			},
			//筛选条件查询
			async selectData(value) {
				const res = await this.$api.selectGoods(value)
				this.goodsList = res.data
			},
			//防抖
			debounce(func,wait){
				let time = null
				return function(){
				    if(timer !== null){
				      clearTimeout(timer);
				    }
				    timer = setTimeout(func.bind(this),wait);
				  }
			},
			//搜索框搜索
			inputSearch() {
				if(this.value == '' || this.value.trim() == ''){
					return ;
				}
				this.loading = true
				// let arr = []
				this.goodsList = this.goodsList.filter(item => {
					if(item.title == null || item.title == ''){
						return ;
					}else {
						return item.title.indexOf(this.value) !== -1
					}
				})
				//添加搜索记录
				this.searchList.push(this.value)
				this.addHistory()
				this.userInfo.searchlist = this.searchList
				uni.setStorage({
					key: 'userInfo',
					data: JSON.stringify(this.userInfo)
				})
				this.loading = false
			},
			addClass1(item) {
				if (this.select.value1 === item) {
					this.select.value1 = '所有'
					return;
				}

				this.select.value1 = item
			},
			addClass2(item) {
				if (this.select.value2 === item) {
					this.select.value2 = ''
					return;
				}
				this.select.value2 = item
			}
		}
	}
</script>

<style lang="scss">
	.allGoods {
		background-color: #f8f8f8;
		min-height: 100vh;

		.loading {
			width: 100vw;
			height: 100vh;
			z-index: 10;
		}

		.u-input {
			width: 80%;
			background-color: #FFFFFF;
			margin: 0 auto 20rpx;
			height: 64rpx;
			padding-left: 24rpx !important;
			margin-top: 20rpx;
		}

		.class {
			height: 120rpx;
			width: 90%;
			margin: 0 auto;
			background-color: #FFFFFF;
			box-sizing: border-box;
			border-radius: 20rpx;
			margin-bottom: 10rpx;
			display: flex;
			align-items: center;
			padding-left: 20rpx;

			.title {
				font-size: 30rpx;
				font-weight: bold;
				margin-right: 20rpx;
			}

			.class-r {
				flex: 1;
				display: flex;
				align-items: center;

				.class-item {
					box-sizing: border-box;
					width: fit-content;
					height: 50rpx;
					padding: 10rpx 20rpx;
					line-height: 30rpx;
					background-color: #f8f8f8;
					margin-right: 30rpx;
					border-radius: 20rpx;
					text-align: center;
					color: #333;
					font-size: 26rpx;
				}

				.item-active {
					background-color: #56bbb5;
					color: #fff;
				}
			}

		}

		.class2 {
			height: 100%;
			align-items: flex-start;
			padding: 30rpx 0 20rpx 20rpx;

			.class-r {
				flex-wrap: wrap;

				.class-item {
					margin-right: 18rpx;
					margin-bottom: 14rpx;
				}
			}


		}

		.goods-content {
			padding: 20rpx 40rpx 40rpx 40rpx;
			background-color: #f8f8f8;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
	}
</style>
