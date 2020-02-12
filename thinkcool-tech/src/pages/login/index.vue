<template>
	<div class="login-bg">
		<div class="zm">
			<img src="../../assets/imgs/login-zimu-w.png" alt="" />
		</div>
		<div class="login-content">
			<div class="login-right">
				<div class="login-box">
					<div class="title">
						<h2>昕斗云</h2>
					</div>
					<el-form
						:model="login"
						:rules="loginRules"
						ref="ruleForm"
						class="demo-ruleForm"
					>
						<p class="tip" :class="borderType == 'name' ? 'tip-active' : ''">
							用户名
						</p>
						<el-form-item prop="name">
							<el-input
								v-model="login.name"
								placeholder="请输入"
								@focus="focusFun('name')"
							>
							</el-input>
						</el-form-item>
						<p
							class="tip"
							:class="borderType == 'password' ? 'tip-active' : ''"
						>
							密码
						</p>
						<el-form-item prop="password">
							<el-input
								v-model="login.password"
								placeholder="请输入"
                type="password"
								@focus="focusFun('password')"
							>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-checkbox v-model="checked">记住密码</el-checkbox>
							<span class="forget-pw pointer" @click="forget">忘记密码？</span>
						</el-form-item>
					</el-form>

					<div class="loginbutonDiv">
						<el-button class="btn" type="primary" @click="loginFun('ruleForm')"
							>登录</el-button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import md5 from 'js-md5';
import {
	Message
} from 'element-ui'

export default {
	data () {
		return {
			login: {
				name: "",
				password: ""
			},
			checked: false,
			loginRules: {
				name: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			},
			fullWidth: { // 动态获取屏幕高度
				width: (document.documentElement.clientWidth - 545) + "px"
			},
			borderType: ""
		}
	},
	methods: {
		iconClick (item) {
			if (item == 'username') {
				document.getElementById('usernameIput').focus();
			} else {
				document.getElementById('passwordIput').focus();
			}
		},
		focusFun (val) {
			let self = this;
			self.borderType = val;
		},
		blurFun () {
			let self = this;
			self.borderType = "";
		},
		loginFun (formName) {
			let self = this;
			console.log(self.login)
			this.$refs[formName].validate((valid) => {
				if (valid) {
          // self.$api.post("sys/login",{
          //   username:self.login.name,
          //   password:self.login.password
          // }).then(r=>{
          //   console.log(r)
          // })
					self.$router.push("/home");
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		forget () {
			console.log("忘记密码")
		}
	},
	mounted () {
		var self = this;
		document.onkeydown = function (e) {
			var ev = document.all ? window.event : e;
			if (ev.keyCode == 13) {
				if (self.$route.path == "/login" || self.$route.path == "/") {
					self.loginFun();
					return false;
				}

			}
		};
		window.onresize = () => {
			return (() => {
				self.fullWidth.width = (document.documentElement.clientWidth - 516) + "px"
			})()
		}
	}
}

</script>

<style lang="scss" scoped>
.login-bg {
	width: 100%;
	height: 100%;
	background-image: linear-gradient(
		-43deg,
		#5222f4 0%,
		#646cf2 73%,
		#74b2ef 100%
	);
	background: #ffffff;
	position: relative;
	.zm {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		img {
			width: 90%;
		}
	}
	.login-content {
		width: 1200px;
		height: 700px;

		background: url(../../assets/imgs/login-1.png);
		background-repeat: no-repeat;
		/*占满屏幕,auto是随尺寸*/
		background-size: contain;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		.login-right {
			padding: 60px 120px;
			width: 50%;
			box-sizing: border-box;
			height: 700px;
			float: right;
			.title h2 {
				font-size: 30px;
				color: #51539f;
				text-align: center;
				letter-spacing: 0.67px;
				font-weight: 600;
				margin: 70px 0;
			}
			.demo-ruleForm {
				width: 320px;
				margin: 0 auto;
				.tip {
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #b7b7b7;
					padding: 0 20px;
					border-left: 4px solid #b7b7b7;
					margin-top: 30px;
				}
				.tip-active {
					border-color: #51539f;
				}
				.el-form-item--small.el-form-item:last-child {
					margin-top: 40px;
				}
			}
			.forget-pw {
				font-family: PingFangSC-Regular;
				font-size: 13px;
				color: #919191;
				float: right;
				letter-spacing: 0;
				text-align: right;
			}
		}
	}
	.loginbutonDiv {
		text-align: center;
		margin-top: 60px;
		.btn {
			width: 180px;
			background: #51539f;
			box-shadow: 0 20px 51px -11px #3376e4;
			border-radius: 100px;
			font-family: PingFangSC-Regular;
			font-size: 20px;
			color: #ffffff;
			line-height: 28px;
		}
	}
}
</style>
<style lang="scss">
.login-box {
	.el-input__inner {
		background: #ffffff;
		border: none !important;
		border-bottom: 1px solid #e0e0e0 !important;
		border-radius: 0 !important;
		padding: 0 24px !important;
		font-size: 14px !important;
		color: #666666 !important;
	}
	.el-form-item.is-error .el-input__inner,
	.el-form-item.is-error .el-input__inner:focus,
	.el-form-item.is-error .el-textarea__inner,
	.el-form-item.is-error .el-textarea__inner:focus {
		border-color: #f56c6c !important;
	}
	.el-input__inner:focus {
		border-color: #7378f0 !important;
	}
	.el-input--small .el-input__inner {
		font-family: PingFangSC-Regular;
		color: #666666 !important;
	}
}
</style>
