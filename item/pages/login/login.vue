<template>
	<view class="login">
		<!-- <u-icon class="backIcon" @click="backHome" name="arrow-left" color="#ffffff" size="24"></u-icon> -->
		<u-navbar leftText="登录" @leftClick="backHome" placeholder bgColor="#56bbb5">
		</u-navbar>
		<view class="login-img">
			<image src="../../static/image/login_bg.png" mode="">
		</view>
		<view class="login-txt">
			<view class="login-txt1">欢迎，</view>
			<view class="login-txt1">请先登录账号</view>
		</view>
		<u--form class="form" labelWidth="100rpx" errorType="message" :labelStyle="labelStyle" labelPosition="top"
			:model="formData" :rules="rules" ref="form">
			<u-form-item class="form-item" label="账号" prop="email" ref="item1">
				<u--input placeholder="请输入您的邮箱" v-model="formData.email"></u--input>
			</u-form-item>
			<u-form-item class="form-item" label="密码" prop="password" ref="item2">
				<u--input placeholder="********" v-model="formData.password" type="password"></u--input>
			</u-form-item>
		</u--form>
		<view class="forget">
			忘记密码?
		</view>
		<u-button class="btn" @click="submit">登录</u-button>
		<view class="register">
			<view class="txt1">还没有注册账号?</view>
			<view class="txt2" @click="toRegister">点击注册</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelStyle: {
					'font-size': '28rpx',
					'font-weight': 'bold'
				},
				formData: {
					email: '',
					password: ''
				},
				rules: {
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: ['blur']
					}, {
						validator: (rule, value, callback) => {
							return true
						},
						message: '请输入正确账号',
						trigger: ['blur']
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['blur']
					}, {
						validator: (rule, value, callback) => {
							return true
						},
						message: '请输入正确密码',
						trigger: ['blur']
					}]
				}
			}
		},
		created(){
			// if(this.$route.query !== undefined){
			// 	this.formData.email = this.$route.query.email
			// }
		},
		methods: {
			toRegister() {
				uni.navigateTo({
					url: "/pages/register/register"
				})
			},
			backHome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			submit() {
				this.$refs.form.validate().then(async res => {
					let result = await this.$api.login(this.formData)
					console.log(result)
					if (result.data.token) {
						uni.setStorage({
							key: 'token',
							data: result.data.token
							// data:'11212'
						})
						result.data.userInfo.likes = result.data.userInfo.likes.split(',')
						result.data.userInfo.likeComment = result.data.userInfo.likeComment.split(',')
						uni.setStorage({
							key: 'userInfo',
							data: JSON.stringify(result.data.userInfo)
						})
						// this.socket.emit('join',result.data.userInfo.id)
						this.$refs.uToast.show({
							type: 'success',
							message: "登录成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							duration: '1500',
							complete() {
								uni.switchTab({
									url: '/pages/home/home'
								})
							}
						})
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: "登录失败",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
						})
					}
				}).catch(errors => {
					this.$refs.uToast.show({
						type: 'error',
						message: "登录失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		background-color: #ffffff;
		height: 100vh;
		box-sizing: border-box;
		position: relative;

		/deep/ .u-navbar__content {
			font-weight: bold;
		}

		.backIcon {
			background-color: transparent;
			position: absolute;
			top: 10rpx;
			left: 10rpx;
		}

		.login-img {
			width: 100%;
			height: 420rpx;
			border-radius: 0 0 10rpx 10rpx;
			box-sizing: border-box;
			image {
				width: 100%;
				height: 100%;
			}
		}

		.login-txt {
			margin-top: 10rpx;
			box-sizing: border-box;
			padding-left: 66rpx;
			height: 160rpx;

			.login-txt1 {
				font-size: 50rpx;
				font-weight: bold;
				line-height: 80rpx;
			}
		}

		.form {
			padding: 0 66rpx;
			box-sizing: border-box;

			.form-item {
				.u-input {
					border-radius: 16rpx;
					padding-left: 28rpx;
					background-color: #f2f2f2;
				}
			}
		}

		.forget {
			// margin-top: 10rpx;
			text-align: right;
			padding: 0 66rpx;
			color: #777777;
		}

		.register {
			display: flex;
			justify-content: center;
			align-items: center;
			// position: absolute;
			// bottom: 52rpx;
			// left: 50%;
			// transform: translateX(-50%);
			width: 100%;

			.txt1 {
				color: #777777;
				margin-right: 10rpx;
				flex-wrap: nowrap;
			}

			.txt2 {
				// #009dff
				color: #56bbb5;
				flex-wrap: nowrap;
				font-weight: bold;
			}
		}

		.btn {
			width: 616rpx;
			height: 96rpx;
			margin-top: 80rpx;
			// position: absolute;
			// bottom: 106rpx;
			// left: 50%;
			// transform: translateX(-50%);
			background-color: #56bbb5;
			border-radius: 10rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: bold;
			letter-spacing: 4rpx;
		}
	}
</style>
