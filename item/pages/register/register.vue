<template>
	<view class="register">
		<u-navbar  leftText="注册" @leftClick="back" placeholder bgColor="#56bbb5">
		</u-navbar>
		<view class="register-img">
			<image src="../../static/image/login_bg.png" mode="">
		</view>
		<view class="form-box">
			<u--form :labelStyle=labelStyle errorType="message" :model="formData" ref="form" :rules="rules">
				<u-form-item label="名称" prop="name" label-width="70">
					<u-input placeholder="请输入名称" v-model="formData.name" />
				</u-form-item>
				<u-form-item label="密码" prop="password" label-width="70">
					<u-input type="password" placeholder="请输入密码" v-model="formData.password" />
				</u-form-item>
				<u-form-item label="确认密码" prop="checkPassword" label-width="70">
					<u-input type="password" placeholder="请重新输入密码" v-model="formData.checkPassword" />
				</u-form-item>
				<u-form-item label="账号" prop="email" label-width="70">
					<u-input placeholder="请输入邮箱" v-model="formData.email" />
				</u-form-item>
				<u-form-item label="验证码" prop="code" label-width="70">
					<u-input class="codeInput" placeholder="请输入验证码" v-model="formData.code" type="text">
						<template slot="suffix">
							<u-code :seconds="seconds" ref="uCode" @change="codeChange"></u-code>
							<u-button class="codeBtn" slot="right" type="success" size="normal" @click="getCodes">{{codeTips}}
							</u-button>
						</template>
					</u-input>
				</u-form-item>
			</u--form>
			<u-button class="btn" @click="tohome">提交</u-button>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					name: '',
					password: '',
					checkPassword: '',
					email: '',
					code: ''
				},
				emailCode:'',
				codeTips: '',
				seconds: 60,
				labelStyle: {
					'font-weight': 'bold',
					'color': '#fff',
					'width': '80rpx'
				},
				rules: {
					name: [{
						required: true,
						message: '请输入账号',
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
						message: '请输入正确密码格式',
						trigger: ['blur']
					}],
					checkPassword: [{
						required: true,
						message: '请确认密码',
						trigger: ['blur']
					}, {
						validator: (rule, value, callback) => {
							return true
						},
						message: '请输入正确密码格式',
						trigger: ['blur']
					}],
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: ['blur']
					}, {
						validator: (rule, value, callback) => {
							if(RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(value)){
								return true
							}else {
								return false
							}
						},
						message: '请输入有效邮箱号',
						trigger: ['blur']
					}],
					code: [{
						type: 'string',
						required: true,
						len: 6,
						message: '请填写6位验证码',
						trigger: ['blur']
					},{
						validator:(rule,value,callback)=>{
							if(value !== this.emailCode){
								return false
							}
						},
						message:'请填写正确验证码',
						trigger:['blur']
					}]
				}
			}
		},
		methods: {
			tohome() {
				this.$refs.form.validate().then(async res => {
					const result = await this.$api.register(this.formData)
					console.log(result);
					if(result.status === 401){
						this.$refs.uToast.show({
							type: 'error',
							message: result.message,
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
						})
						return ;
					}else {
						this.$refs.uToast.show({
							type: 'success',
							message: "注册成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
						})
						uni.reLaunch({
							url: '/pages/login/login?email='+this.formData.email
						})
					}
				}).catch(errors => {
					this.$refs.uToast.show({
						type: 'error',
						message: "注册失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
				})
			},
			back() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			codeChange(text) {
				this.codeTips = text;
			},
			 async getCodes() {
				if(!RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(this.formData.email)){
					uni.$u.toast('请检查邮箱号');
					return ;
				}
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					let res = await this.$api.getCode(this.formData.email)
					console.log(res);
					this.emailCode = res.data.code
					if(res.data.code){
						setTimeout(() => {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							uni.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							// this.$refs.uCode.start();
						}, 2000);
					}
					else {
						// uni.hideLoading();
						uni.$u.toast('验证码发送失败');
					}
					
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			// end() {
			// 	uni.$u.toast('倒计时结束');
			// },
			// start() {
			// 	uni.$u.toast('倒计时开始');
			// }
		}
	}
</script>

<style lang="scss">
	.register {
		width: 100vw;
		min-height: 100vh;
		position: relative;
		background-color: #56bbb5;
		box-sizing: border-box;
		padding-bottom: 20rpx;
		/deep/ .u-navbar__content{
			font-weight: bold;
		}
		.register-img {
			width: 100%;
			height: 480rpx;
			border-radius: 0 0 10rpx 10rpx;
			box-sizing: border-box;
			// margin-left: 60rpx;

			image {
				width: 100%;
				height: 100%;
			}

			.top-txt {
				font-size: 20rpx;
				line-height: 88rpx;
				font-size: 36rpx;
				font-weight: bold;
			}
		}


		.form-box {
			width: 100vw;
			box-sizing: border-box;
			padding: 0rpx 30rpx;
			color: #000;
			font-weight: bold;
			.u-input {
				border: 1px solid #fff !important;
				box-shadow: 0 0 1rpx 1rpx #fff;
			}
			.codeInput{
				padding: 0 0 0 18rpx !important;
			}
			.uni-input-placeholder {
				color: #fff !important;
			}
			.u-form-item__body__left__content__label span{
				flex-shrink: 0;
			}
		}

		.btn {
			margin-top: 40rpx;
			letter-spacing: 3rpx;
			font-size: 32rpx;
		}

		.btn:active {
			background-color: #f8f8f8;
		}
	}
</style>
