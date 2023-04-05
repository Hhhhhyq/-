<template>
	<view class="edit-artical">
		<u-navbar leftIcon="close" @rightClick="rightClick" :autoBack="true" placeholder>
			<template slot="right">
				<view class="release"
					style="border: 1px solid #56bbb5; color: #56bbb5; padding:4rpx 20rpx;border-radius: 28rpx;">发布
				</view>
			</template>
		</u-navbar>
		<view class="content">
			  <u--textarea v-model="articalInfo.title" border="bottom" placeholder="标题非必填" count maxlength="20" height="20"></u--textarea>
			<u--textarea v-model="articalInfo.value" height="140" border="none" maxlength="1000"
				:placeholder="placeholder"></u--textarea>
			<u-upload v-if="articalInfo.imgList && articalInfo.imgList.length" :fileList="articalInfo.imgList"
				@delete="deletePic" name="1" multiple :maxCount="10"></u-upload>
		</view>
		<view class="bot">
			<view class="icon-box" @click="upload">
				<u-icon name="photo-fill" color="#666" size="28"></u-icon>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeholder: '此刻你想和大家分享点什么... (1000字以内)',
				articalInfo: {
					title:'',
					value: '',
					imgList: []
				}
			};
		},
		methods: {
			async rightClick() {
				console.log('发布');
				let data = JSON.parse(uni.getStorageSync('userInfo'))
				let obj = {
					publisherId: data.id,
					img: data.img,
					name: data.name,
					college:data.school,
					title:this.articalInfo.title,
					content: this.articalInfo.value,
					image: this.articalInfo.imgList
				}
				const result = await this.$api.articalUpload(obj)
				if (result.status == 200) {
					this.$refs.uToast.show({
						type: 'success',
						message: result.message,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						duration: '500'
					})
					this.articalInfo = {
						value: '',
						imgList: []
					}
				}
			},
			// 文章图片上传
			upload() {
				let that = this
				uni.chooseImage({
					count: 9, //上传图片的数量，默认是9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths; //拿到选择的图片，是一个数组
						tempFilePaths.forEach(item => {
							let data = {
								filePath: item,
								name: "file"
							}
							that.uploadFileListPromise(data)
						})
					}
				});
			},
			uploadFileListPromise(data) {
				return new Promise((resolve, reject) => {
					this.$api.articalImgUpload(data).then(res => {
						this.articalInfo.imgList.push({
							url: res.data.url
						})
					}).catch(err => {
						console.log(err);
					})

				})
			},
			//删除
			deletePic(event) {
				this.articalInfo.imgList.splice(event.index, 1)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.edit-artical {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;

		/deep/ .u-icon__icon {
			font-weight: bold !important;
		}

		.content {
			flex: 1;
			margin-top: 20rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
		}

		.bot {
			height: 100rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			border-top: 1px solid #ececec;

			.icon-box {
				background-color: #ececec;
				height: 70rpx;
				width: 70rpx;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				/deep/ .u-icon {
					margin-top: -4rpx;
				}
			}
		}
	}
</style>
