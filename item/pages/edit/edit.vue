<template>
	<view class="edit-page">
		<u-navbar title="编辑" placeholder @leftClick="back" :titleStyle="{
					fontSize: '30rpx',
					fontWeight:'bold'
				}" rightText="保存" @rightClick="save">
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" color="#000" bold></u-icon>
			</view>
		</u-navbar>
		<view class="head-sculpture">
			<view class="img">
				<image :src="userInfo.img" mode=""></image>
			</view>
			<text class="txt" @click="upload">点击编辑</text>
		</view>
		<u-cell-group :border="false">
			<u-cell :titleStyle="titleStyle" title="昵称" :value="userInfo.name" isLink @click="toEdit('name')"></u-cell>
			<u-cell :titleStyle="titleStyle" title="性别" :value="userInfo.sex" isLink @click="editDisabled('性别不可以修改哦')"></u-cell>
			<u-cell :titleStyle="titleStyle" title="学院" :value="userInfo.school" isLink @click="editDisabled('学院不可以修改哦')">
			</u-cell>
			<u-cell :titleStyle="titleStyle" title="手机号" :value="userInfo.phone" isLink @click="toEdit('phone')">
			</u-cell>
		</u-cell-group>
		<u-popup :show="show" :round="10" mode="top" @close="close" :customStyle="{top:'80rpx;'}">
			<view class="modal">
				<view class="title">{{modalInfo.title}}</view>
				<template v-if="this.type == 'name'">
					<u--input
					    border="surround"
					    v-model="modalInfo.value"
					    @change="change"
						maxlength="12"
						clearable
					  ></u--input>
					  <view class="ipt-length">{{number}} / 12</view>
				</template>
				<template v-else>
					<u--input
					    border="surround"
					    v-model="modalInfo.value"
					    @change="change"
						maxlength="12"
						clearable
					  ></u--input>
					  <view class="ipt-length">{{number}} / 11</view>
				</template>
				  <view class="btns">
				  	<u-button type="default" shape="circle" text="取消" class="btn cancel" @click="close"></u-button>
					<u-button type="primary" shape="circle" class="btn sure" color="" text="确定" @click="editValue"></u-button>
				  </view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					name: '设置',
					sex: '设置',
					school: '设置',
					phone: '设置',
					img: '../../static/image/default_img.jpeg'
				},
				titleStyle: {
					fontWeight: 'bold',
					letterSpacing: '2rpx'
				},
				number:0, //输入框计数
				type:'', //哪种类型的弹窗
				show: false,
				modalInfo:{
					title:'',
					value:''
				}
			}
		},
		created(){
			let data = JSON.parse(uni.getStorageSync('userInfo'))
			this.userInfo = data
			for(let item in this.userInfo) {
				if(item !== 'img'){
					this.userInfo[item] == '' || this.userInfo[item] == null ? '设置' : this.userInfo[item]
				}
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			//保存
			async save() {
				console.log("保存");
				const res = await  this.$api.editInfo(this.userInfo)
				console.log(res);
				if(res.status == 200){
					this.userInfo = res.data
					// uni.removeStorageSync('userInfo')
					uni.setStorage({
						key: 'userInfo',
						data: JSON.stringify(res.data)
					})
					this.$refs.uToast.show({
						type: 'success',
						message: res.message,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						duration: '500'
					})
				}else {
					this.$refs.uToast.show({
						type: 'error',
						message: res.message,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
						duration: '500'
					})
				}
			},
			// 头像上传
			upload(){
				let that = this
				uni.chooseImage({
				    count: 1, //上传图片的数量，默认是9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        const tempFilePaths = res.tempFilePaths;    //拿到选择的图片，是一个数组
						let data = {
							filePath:res.tempFilePaths[0],
							name:"file"
						}
						that.uploadFilePromise(data)
				    }
				});
			},
			uploadFilePromise(data) {
				return new Promise((resolve, reject) => {
					this.$api.sculptureUpload(data).then(res => {
						this.userInfo.img = res.data.url
					
					}).catch(err => {
						console.log(err);
					})
			
				})
			},
			toEdit(type) {
				this.type = type
				this.modalInfo.value= this.userInfo[type] == '设置' ? '' : this.userInfo[type]
				this.number = this.modalInfo.value.length
				switch(type){
					case 'name':
						this.modalInfo.title = '修改昵称'
						break;
					// case 'sex':
					// 	this.modalInfo.title = '修改性别'
					// 	break;
					// case 'school':
					// 	this.modalInfo.title = '修改学院'
					// 	break;
					case 'phone':
						this.modalInfo.title = '修改手机号'
						break;
				}
				this.show = true
			},
			close() {
				this.show = false
			},
			//禁止编辑
			editDisabled(val){
				this.$refs.uToast.show({
					type: 'default',
					message: val,
					iconUrl: 'https://cdn.uviewui.com/uview/dvalemo/toast/loading.png',
					duration: '500'
				})
			},
			//确认
			editValue(){
				if(this.modalInfo.value == ''){
					this.userInfo[this.type] = '设置'
					this.show = false
					return ;
				}
				this.userInfo[this.type] = this.modalInfo.value
				this.show = false
			},
			// 姓名编辑输入框
			change(){
				let size = this.modalInfo.value.length
				if(this.type == 'name'){
					if(size >= 12){
						this.number == 12
					}
					this.number =  size
				}
				if(this.type == 'phone'){
					if(size >= 11){
						this.number == 11
					}
					this.number =  size
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit-page {
		/deep/ .u-cell__value{
			color: #333333;
		}
		.head-sculpture {
			margin-top: 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100vw;

			.img {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				overflow: hidden;

				// background-color: red;
				image {
					width: 100%;
					height: 100%;
				}
			}

			.txt {
				margin: 20rpx 0 40rpx;
				color: #666666;

				&:active {
					color: #333333;
				}
			}
		}
		/deep/ .u-transition{
			padding: 0 50rpx;
		}
		/deep/ .u-slide-down-enter-active{
			top:160rpx !important;
			.u-popup__content{
				border-radius: 20rpx !important;
				padding: 32rpx;
				box-sizing: border-box;
			}
		}
		.modal{
			// width: 200rpx;
			height: 400rpx;
			.title{
				width: inherit;
				text-align: center;
				font-size: 36rpx;
				font-weight: bold;
				text-align: center;
				line-height: 54rpx;
				margin:20rpx 0 40rpx;
			}
			.u-input{
				background-color: #f8f8f8;
			}
			.ipt-length{
				margin-top: 30rpx;
				font-size: 34rpx;
				text-align: right;
				font-weight: bold;
				color: #BBBBBB;
			}
			.btns{
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-top: 40rpx;
				.btn{
					width: 40%;
					border: none;
				}
				.cancel{
					background-color: #f2f2f2;
				}
				.sure{
					background: linear-gradient(to right, #56bbb5, #78cdd1);
				}
			}
		}
	}
</style>
