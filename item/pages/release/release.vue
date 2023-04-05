<template>
	<view class="release">
		<u-navbar title="发布" placeholder @leftClick="back" :titleStyle="{
					fontSize: '30rpx',
					fontWeight:'bold'
				}">
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" color="#000" bold></u-icon>
			</view>
		</u-navbar>
		<view class="release-tab">
			<view style="background-color: #f8f8f8;">
				<u-tabs :current="current === 0 ? 0 : 1" @click="currentChange" :inactiveStyle="tabStyle.inactiveStyle"
					:duration="tabStyle.duration" :itemStyle="tabStyle.itemStyle" :activeStyle="tabStyle.activeStyle"
					:lineColor="tabStyle.lineColor" :lineWidth=tabStyle.lineWidth :list="list1"></u-tabs>
			</view>
			<template v-if="current === 0">
				<view class="find">
					<u--form labelPosition="left" labelWidth="70" :model="findInfo" ref="form1">
						<view class="findInfo">
							<u-form-item required label="标题" prop="findInfo.title" borderBottom ref="item1">
								<u--input v-model="findInfo.title" border="none" placeholder="请填写物品标题"></u--input>
							</u-form-item>
							<u-form-item required label="姓名" prop="findInfo.name" borderBottom ref="item1">
								<u--input v-model="findInfo.name" border="none" placeholder="请填写姓名"></u--input>
							</u-form-item>
							<u-form-item required label="联系方式" prop="findInfo.phone" borderBottom ref="item1">
								<u--input v-model="findInfo.phone" border="none" placeholder="请填写联系方式"></u--input>
							</u-form-item>
							<u-form-item required label="学院" prop="findInfo.college" borderBottom
								@click="showCollege = true; hideKeyboard()" ref="item1">
								<u--input v-model="findInfo.college" disabled disabledColor="#ffffff"
									placeholder="请选择学院" border="none"></u--input>
								<u-icon slot="right" name="arrow-right"></u-icon>
							</u-form-item>
							<u-form-item required label="类型" prop="findInfo.selectType" borderBottom
								@click="showselectType = true; hideKeyboard()" ref="item1">
								<u--input v-model="findInfo.selectType" disabled disabledColor="#ffffff"
									placeholder="请选择物品类型" border="none"></u--input>
								<u-icon slot="right" name="arrow-right"></u-icon>
							</u-form-item>
							<u-form-item required label="描述" prop="findInfo.intro" borderBottom ref="item3">
								<u--textarea placeholder="不低于5个字" v-model="findInfo.intro" count autoHeight height="70">
								</u--textarea>
							</u-form-item>
							<u-picker :show="showselectType" :columns="selectType" @confirm="confirmType"
								@cancel="cancelType" key="1"></u-picker>
							<u-picker :show="showCollege" :columns="actions" @confirm="confirmCollege"
								@cancel="cancelCollege" key="2"></u-picker>
						</view>
						<view class="lossAddress">
							<view class="address-top">
								<u-form-item label="地址" style="width: 100%;" labelWidth="40" required
									prop="findInfo.address" borderBottom>
									<u--input required v-model="findInfo.address" @focus="getAddress"
										suffixIcon="map-fill" disabledColor="#ffffff" placeholder="请定位丢失地址"
										border="none" :suffixIconStyle="suffixIconStyle">
									</u--input>
								</u-form-item>
								<!-- <u--input required v-model="findInfo.address" @focus="getAddress" suffixIcon="map-fill"
									disabledColor="#ffffff" placeholder="请定位丢失地址" border="none"
									:suffixIconStyle="suffixIconStyle">
								</u--input> -->
							</view>
							<u-form-item prop="findInfo.description" borderBottom>
								<u--textarea placeholder="备注丢失详细地址" v-model="findInfo.description" count height="80">
								</u--textarea>
							</u-form-item>
							<!-- <u--textarea placeholder="备注丢失详细地址" v-model="findInfo.description" count height="80">
							</u--textarea> -->
						</view>
						<view class="img">
							<u-upload class="upload" @afterRead="afterRead1" :sizeType="['compressed']" @delete="deletePic1"
								multiple width="200rpx" previewImage height="200rpx" :fileList="findInfo.fileList"
								:maxCount="10">
							</u-upload>
						</view>
						<u-button class="btn" @click="release1">发布</u-button>
					</u--form>
				</view>
			</template>
			<template v-if="current === 1">
				<view class="recruit">
					<view class="information">
						<u--input class="input" placeholder="物品的标题" shape="circle" border="surround"
							v-model="goodsInfo.title"></u--input>
						<view class="type-list">
							<view class="type-list-item"
								:class="[goodsInfo.selectType === item ? 'type-list-active' : '']"
								v-for="(item,index) in typeList" :key="index" @click="selectTypes(item)">{{item}}</view>
						</view>
						<u--input class="input" v-model="goodsInfo.address" @focus="getPickAddress" shape="circle"
							suffixIcon="map-fill" disabledColor="#ffffff" placeholder="请定位拾取地址" border="surround"
							:suffixIconStyle="suffixIconStyle">
						</u--input>
						<view class="remarks">
							<view class="remarks-title">备注</view>
							<u--textarea class="remarks-content" v-model="goodsInfo.remarks" placeholder="添加备注信息"
								border="none" autoHeight></u--textarea>
						</view>

					</view>
					<view class="location">
						<view class="location-title">当前物品位置</view>
						<view class="location-list">
							<view class="location-list-item"
								:class="[goodsInfo.location === item ? 'location-list-active' : '']"
								v-for="(item,index) in locationList" :key="index" @click="selectLocation(item)">{{item}}
							</view>
						</view>
						<template v-if="goodsInfo.location === '本人代管'">
							<view style="font-size: 24rpx;padding-left: 20rpx;">点击下方可填写联系方式</view>
							<view class="myself">
								<view class="myself-txt" @click="fillInPhone">本人代管:</view>
								<u--input v-model="goodsInfo.remarkContactMe" placeholder="备注联系方式" border="bottom"
									clearable></u--input>
							</view>
						</template>
						<template v-if="goodsInfo.location === '拾取处'">
							<view class="pick">
								<u--textarea v-model="goodsInfo.pickInfo" placeholder="请备注物品存放处..." count height="100">
								</u--textarea>
							</view>
						</template>
						<template v-if="goodsInfo.location === '代收处'">
							<view class="collection" @click="selectCollection">
								<view class="icon iconfont icon-dizhi"></view>
								<view class="locationBottom collectiontxt">
									{{ this.goodsInfo.collection ? this.goodsInfo.collection : '点击选择代收点'}}
								</view>
								<u-picker :show="showCollection" :columns="collectionList" @confirm="confirm"
									@cancel="cancel" key="3"></u-picker>
							</view>
						</template>
						<template v-if="goodsInfo.location === ''">
							<view class="collection">
								<view class="icon iconfont icon-dizhi"></view>
								<view class="locationBottom collectiontxt">请选择上方物品位置类型...</view>
							</view>
						</template>
					</view>
					<view class="img">
						<u-upload class="upload" @afterRead="afterRead" :sizeType="['compressed']" @delete="deletePic"
							multiple width="200rpx" previewImage height="200rpx" :fileList="goodsInfo.fileList"
							:maxCount="10">
						</u-upload>
					</view>
					<u-button class="btn" @click="release2">发布</u-button>
				</view>
			</template>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	// import service from '@/utils/request.js'
	export default {
		data() {
			return {
				list1: [{
					name: '寻物启事'
				}, {
					name: '失物招领'
				}],
				tabStyle: {
					lineColor: '#56bbb5',
					lineWidth: 40,
					activeStyle: {
						color: '#000',
						margin: 'auto',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					},
					itemStyle: {
						color: '#000',
						height: '80rpx',
					},
					inactiveStyle: {
						color: '#000'
					},
					lineHeight: 6,
					duration: 100
				},
				current: 0, //选择当前页
				typeList: [
					'校园卡',
					'服饰',
					'证件',
					'数码',
					'日用品',
					'其它'
				],
				selectType: [
					[
						'校园卡',
						'服饰',
						'证件',
						'数码',
						'日用品',
						'其它'
					]
				] || [],
				publisher: 0,
				findInfo: {
					type:0, //type为0为找,type为1为捡
					publisher: 0,
					title:'',
					publishername:'',
					name: '',
					phone: '',
					college: '',
					intro: '',
					selectType: '',
					address: '',
					longitude: 0, //经度
					latitude: 0, //纬度
					description: '',
					fileList:[],
					status: '0',
					time: '' // 发布时间
				},
				goodsInfo: {
					type:1, //type为0为找,type为1为捡
					publisher: 0,
					publishername:'',
					title: '', //物品标题
					selectType: '', //物品类型选择
					address: '', //详细地址
					longitude: 0, //经度
					latitude: 0, //纬度
					remarks: '', //备注
					location: '', //领取位置
					remarkContactMe: '', //本人代管联系方式  
					pickInfo: '', //失去地点备注
					collection: '', //代收处地点信息
					fileList: [], //图片
					status: '0', //审核状态 0为待审核，1为审核后
					time: '' // 发布时间
				},
				locationList: [
					'本人代管',
					'拾取处',
					'代收处'
				],
				//学院列表信息
				actions: [
					[
						'计算机与信息工程学院',
						'商学院',
						'软件学院',
						'音乐学院',
						'体育学院',
						'历史与文博学院',
						'音乐学院',
						'体育学院',
						'历史与文博学院'
					]
				] || [],
				showCollection: false, //是否展示代收处选择器
				showCollege: false, //是否展示学院选择器
				showselectType: false, //是否展示类型选择器
				collectionList: [
					[
						'校南门保卫处',
						'校西门保卫处',
						'校北门保卫处',
						'校东门保卫处',
					]
				], //学校代收处
				suffixIconStyle: {
					color: '#56bbb5'
				}
			}
		},
		onLoad(options) {
			this.current = Number(options.current)
		},
		created() {
			let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.goodsInfo.publisher = userInfo.id
			this.findInfo.publisher = userInfo.id
			this.goodsInfo.publishername = userInfo.name
			this.findInfo.publishername = userInfo.name
			this.publisher = userInfo.id
		},
		mounted() {},
		methods: {
			//隐藏键盘
			hideKeyboard() {
				uni.hideKeyboard()
			},
			back() {
				// uni.navigateBack()
				uni.reLaunch({
					url: '/pages/home/home'
				})
			},
			currentChange(item) {
				this.current = item.index
			},
			//弹出填写手机号弹窗
			fillInPhone() {
				this.showPhontCard = true
			},
			//选择物品类型
			selectTypes(item) {
				if (item === this.goodsInfo.selectType) {
					this.goodsInfo.selectType = ''
					return;
				}
				this.goodsInfo.selectType = item
			},
			//选择物品存放位置方式
			selectLocation(item) {
				if (item === this.goodsInfo.location) {
					this.goodsInfo.location = ''
					return;
				}
				this.goodsInfo.location = item
			},
			//选择物品代收处
			selectCollection() {
				this.showCollection = true
			},
			//选择器确认
			confirm(e) {
				this.goodsInfo.collection = e.value[0]
				this.showCollection = false
			},
			//选择器取消
			cancel() {
				this.showCollection = false
			},
			//删除图片
			deletePic(event) {
				this.goodsInfo.fileList.splice(event.index, 1)
			},
			//发布
			async release1() {
				if(this.findInfo.fileList.length <= 0){
					this.$refs.uToast.show({
						type: 'error',
						message: '请拍取至少一张物品图片...',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
						duration: '1500'
					})
					return ;
				}
				let data = new Date()
				this.findInfo.time = data.getTime().toString()
				let result = await this.$api.find(this.findInfo)
				console.log('result',result);
				if (result.status === 200) {
					this.$refs.uToast.show({
						type: 'success',
						message: result.message,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						duration: '500'
					})
				} else {
					this.$refs.uToast.show({
						type: 'error',
						message: result.message,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
						duration: '500'
					})
				}
				this.findInfo = {
					type:0, //type为0为找,type为1为捡
					title:'',
					publisher: 0,
					publishername:'',
					name: '',
					phone: '',
					college: '',
					intro: '',
					selectType: '',
					address: '',
					longitude: 0, //经度
					latitude: 0, //纬度
					description: '',
					fileList:[],
					time:'',
					status: '0'
				}
			},
			async release2() {
				if(this.goodsInfo.fileList.length <= 0){
					this.$refs.uToast.show({
						type: 'error',
						message: '请拍取至少一张物品图片...',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
						duration: '1500'
					})
					return ;
				}
				let data = new Date()
				this.goodsInfo.time = data.getTime().toString()
				let result = await this.$api.release(this.goodsInfo)
				if (result.status === 200) {
					this.$refs.uToast.show({
						type: 'success',
						message: result.message,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						duration: '1500'
					})
				} else {
					this.$refs.uToast.show({
						type: 'error',
						message: result.message,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
						duration: '1500'
					})
				}
				this.goodsInfo = {
					type:1,  //type为0为找,type为1为捡
					publisher: this.publisher,
					publishername:'',
					title: '', //物品标题
					selectType: '', //物品类型选择
					address: '', //详细地址
					longitude: 0, //经度
					latitude: 0, //纬度
					remarks: '', //备注
					location: '', //领取位置
					remarkContactMe: '', //本人代管联系方式  
					pickInfo: '', //失去地点备注
					collection: '', //代收处地点信息
					fileList: [], //图片
					time: '',
					status: '0'
				}
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式， 否则为对象格式
				let lists = [].concat(event.file)
				// console.log(event);
				for (let i = 0; i < event.file.length; i++) {
					// console.log();
					// console.log(event.file[i]);
					// let res=fetch(event.file[i].url).then(r=>r.blob());
					// console.log(event.file[i].url);
					let data = {
						filePath: event.file[i].url,
						name: "file"
					}
					this.uploadFilePromise(data);
				}
			},
			uploadFilePromise(data) {
				return new Promise((resolve, reject) => {
					this.$api.imgUpload(data).then(res => {
						this.goodsInfo.fileList.push({
							url: res.data.url
						})
					}).catch(err => {
						console.log(err);
					})

				})
			},
			//find新增图片
			async afterRead1(event) {
				// 当设置 multiple 为 true 时, file 为数组格式， 否则为对象格式
				let lists = [].concat(event.file)
				// console.log(event);
				for (let i = 0; i < event.file.length; i++) {
					// console.log();
					// console.log(event.file[i]);
					// let res=fetch(event.file[i].url).then(r=>r.blob());
					// console.log(event.file[i].url);
					let data = {
						filePath: event.file[i].url,
						name: "file"
					}
					this.uploadFilePromise1(data);
				}
			},
			uploadFilePromise1(data) {
				return new Promise((resolve, reject) => {
					this.$api.findImgUpload(data).then(res => {
						this.findInfo.fileList.push({
							url: res.data.url
						})
					}).catch(err => {
						console.log(err);
					})
			
				})
			},
			//删除find图片
			deletePic1(event) {
				this.findInfo.fileList.splice(event.index, 1)
			},
			confirmCollege(e) {
				this.findInfo.college = e.value[0]
				this.showCollege = false
			},
			cancelCollege() {
				this.showCollege = false
			},
			confirmType(e) {
				this.findInfo.selectType = e.value[0]
				this.showselectType = false
			},
			cancelType() {
				this.showselectType = false
			},
			getAddress() {
				let that = this
				this.hideKeyboard()
				uni.chooseLocation({
					success: function(res) {
						that.findInfo.address = res.name
						that.findInfo.latitude = res.latitude
						that.findInfo.longitude = res.longitude
						// alert('位置名称：' + res.name);
						// alert('详细地址：' + res.address);
						// alert('纬度：' + res.latitude);
						// alert('经度：' + res.longitude);
					}
				});
			},
			getPickAddress() {
				let that = this
				this.hideKeyboard()
				uni.chooseLocation({
					success: function(res) {
						that.goodsInfo.address = res.name
						that.goodsInfo.latitude = res.latitude
						that.goodsInfo.longitude = res.longitude
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.release {

		.find {
			padding: 30rpx 30rpx;
			background-color: #f8f8f8;
			box-sizing: border-box;

			.findInfo {
				min-height: 560rpx;
				width: 100%;
				background-color: #fff;
				border-radius: 20rpx;
				padding: 20rpx 30rpx;
				box-sizing: border-box;

				.u-form-item {
					margin-top: 20rpx;
				}
			}

			.lossAddress {
				width: 100%;
				height: 360rpx;
				margin-top: 30rpx;
				background-color: #fff;
				border-radius: 20rpx;
				padding: 20rpx 30rpx;
				box-sizing: border-box;

				.address-top {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;

					.icon {
						font-size: 40rpx;
						color: #56bbb5;
					}

					.icon:active {
						color: #666;
					}

					.u-input .input-placeholder {
						padding-left: 20rpx;
					}
				}
			}
			.img {
				margin-top: 10rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				width: 100%;
				padding: 30rpx 10rpx;
				margin: 0 auto;
			
				/deep/ .u-upload__button {
					background-color: #999;
					border-radius: 20rpx;
					width: 202rpx !important;
					height: 202rpx !important;
				}
			
				/deep/ .u-upload__wrap__preview {
					width: 204rpx;
					height: 204rpx;
				}
			}
		}

		.recruit {
			padding: 30rpx 30rpx;
			background-color: #f8f8f8;
			box-sizing: border-box;

			.information {
				box-sizing: border-box;
				border-radius: 20rpx;
				// height: 300rpx;
				width: 100%;
				background-color: #fff;
				padding: 30rpx 10rpx;

				.input {
					width: 90%;
					background-color: #f8f8f8;
					margin: 0 auto 20rpx;
					height: 50rpx;
					padding-left: 24rpx !important;
				}

				.type-list {
					display: flex;
					flex-wrap: wrap;
					padding: 10rpx;

					.type-list-item {
						width: 100rpx;
						height: 50rpx;
						background-color: #f8f8f8;
						margin-right: 30rpx;
						border-radius: 20rpx;
						text-align: center;
						line-height: 50rpx;
						margin-bottom: 20rpx;
						color: #333;
						font-size: 26rpx;
					}

					.type-list-active {
						background-color: #56bbb5;
						color: #fff;
					}
				}

				.remarks {
					width: 95%;
					margin: 0 auto;
					display: flex;

					.remarks-title {
						width: 100rpx;
						height: 80rpx;
						line-height: 80rpx;
						color: #333;
						font-size: 30rpx;
						text-align: center;
					}

					.remarks-content {
						flex: 1;
					}
				}
			}

			.location {
				margin-top: 30rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				min-height: 280rpx;
				width: 100%;
				background-color: #fff;
				padding: 30rpx 10rpx;

				.location-title {
					font-size: 30rpx;
					margin-left: 8rpx;
					letter-spacing: 2rpx;
					color: #666;
					margin-bottom: 30rpx;
				}

				.location-list {
					display: flex;
					flex-wrap: wrap;
					margin-bottom: 30rpx;

					.location-list-item {
						// width: 150rpx;
						box-sizing: border-box;
						padding: 0 32rpx;
						height: 60rpx;
						text-align: center;
						line-height: 60rpx;
						border-radius: 30rpx;
						background-color: #f8f8f8;
						margin-right: 20rpx;
						color: #000;
						font-size: 30rpx;
					}

					.location-list-active {
						background-color: #56bbb5;
						color: #fff;
						font-weight: bold;
					}
				}

				.collection {
					margin-top: 20rpx;
					margin-left: 20rpx;
					height: 60rpx;
					line-height: 60rpx;
					display: flex;
					align-items: center;
					color: #333;

					.icon {
						margin-right: 10rpx;
						color: #56bbb5;
					}

					.locationBottom {
						height: 60rpx;
						font-size: 28rpx;
						line-height: 60rpx;
					}

					.collectiontxt {
						color: #56bbb5;
					}
				}

				.collection:active {
					color: #777777;
				}

				.myself {
					// margin-top: 20rpx;
					margin-left: 20rpx;
					margin-right: 50rpx;
					height: 90rpx;
					line-height: 60rpx;
					display: flex;
					align-items: center;

					.myself-txt {
						font-size: 28rpx;
						color: #56bbb5;
						margin-right: 10rpx;
					}
				}

				.pick {

					margin-top: 20rpx;
					margin-left: 20rpx;
					line-height: 60rpx;
					color: #56bbb5;

					.inp {
						margin-bottom: 20rpx;
					}

					.u-input .input-placeholder {
						padding-left: 20rpx;
					}
				}
			}

			.img {
				margin-top: 10rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				width: 100%;
				padding: 30rpx 10rpx;
				margin: 0 auto;

				/deep/ .u-upload__button {
					background-color: #999;
					border-radius: 20rpx;
					width: 202rpx !important;
					height: 202rpx !important;
				}

				/deep/ .u-upload__wrap__preview {
					width: 204rpx;
					height: 204rpx;
				}
			}


		}

		.btn {
			width: 616rpx;
			height: 96rpx;
			margin: 40rpx auto;
			background-color: #56bbb5;
			border-radius: 10rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: bold;
			letter-spacing: 4rpx;
		}
	}
</style>
