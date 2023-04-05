<template>
	<view class="edit-password">
		<u-navbar title="修改密码" placeholder @leftClick="back" :titleStyle="{
					fontSize: '30rpx',
					fontWeight:'bold'
				}"></u-navbar>
		<view class="content">
			<view class="title">原密码</view>
			<u--input :password="oldpasswordStatus" placeholder="请输入原密码" border="bottom" v-model="oldPassword">
				<template slot="suffix">
					<u-icon name="eye" color="#666666" size="24" @click="showold"></u-icon>
				</template>
			</u--input>
			<view class="title">新密码</view>
			<u--input :password="newpasswordStatus"  placeholder="请输入新密码" border="bottom" v-model="newPassword">
				<template slot="suffix">
					<u-icon name="eye" color="#666666" size="24" @click="shownew"></u-icon>
				</template>
			</u--input>
		</view>
		<view class="btn">
			<u-button class="check" type="primary" size="large" text="确认修改" @click="checkPass"></u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				oldPassword:'',
				newPassword:'',
				oldpasswordStatus:true,
				newpasswordStatus:true
			}
		},
		mounted(){
			let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.id = userInfo.id
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			showold(){
				this.oldpasswordStatus = !this.oldpasswordStatus
			},
			shownew(){
				this.newpasswordStatus = !this.newpasswordStatus
			},
			async checkPass(){
				if(this.oldPassword == '' || this.newPassword == ''){
					this.$refs.uToast.show({
						type: 'error',
						message: "请确认密码是否为空",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
					})
					return ;
				}
				if(this.oldPassword == this.newPassword){
					this.$refs.uToast.show({
						type: 'error',
						message: "新旧密码一致，请重新修改！",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
					})
					return ;
				}
				let obj = {
					id:this.id,
					oldPassword:this.oldPassword,
					newPassword:this.newPassword
				}
				let res = await this.$api.editPass(obj)
				if(res.status == 200){
					this.$refs.uToast.show({
						type: 'success',
						message: "密码修改成功",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
						duration: '1500',
						complete() {
							uni.navigateTo({
								url: '/pages/login/login'
							})
							uni.removeStorageSync('token')
							uni.removeStorageSync('userInfo')
						}
					})
				}else if(res.status == 300) {
					this.$refs.uToast.show({
						type: 'error',
						message: res.message,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit-password {
		.content {
			padding: 0rpx 30rpx;
			margin-top: 60rpx;
			.title {
				font-weight: bold;
				margin-top: 30rpx;
				margin-bottom: 10rpx;
			}

			/deep/ .u-input {
				padding: 6px 0 !important;
			}
		}
		.btn{
			margin: 80rpx 50rpx 0;
			.check{
				background: linear-gradient(to right, #56bbb5, #78cdd1);
			}
		}
	}
</style>
