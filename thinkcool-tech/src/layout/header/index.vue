<template>
	<div class="headers">
		<el-header class="app-header" height="60px">
			<ul>
				<li>
					<i
						class="el-icon-menu pointer iconfont iconicon-cebian"
						@click="show = !show"
					></i>
				</li>
				<li>
					<img src="../../assets/imgs/logo.png" class="logos" alt="" />
				</li>
				<li class="flex1">
					<el-form ref="form" :model="form" class="searchs">
						<el-form-item>
							<el-input v-model="form.search" placeholder="点击搜索">
								<img
									slot="prepend"
									class="pointer"
									width="20px"
									src="../../assets/imgs/icon-search_app.png"
									@click="searchFun"
									alt="昕斗云"
								/>
							</el-input>
						</el-form-item>
					</el-form>
				</li>
				<li class="inform">
					<el-badge :value="msgNum" class="item pointer">
						<img src="../../assets/imgs/icon-xiaoxi.png" alt="" />
					</el-badge>
				</li>
				<li class="info pointer">
					<el-dropdown @command="handleCommand">
						<p>
							<img :src="info.avatar ? info.avatar : imgs" alt="" />
							<span>{{ info.userName }}</span>
						</p>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="info">个人中心</el-dropdown-item>
							<el-dropdown-item command="password">修改密码</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
				<li class="quit">
					<img
						src="../../assets/imgs/icon-tuichu.png"
						class="pointer"
						@click="quitFun"
						alt=""
					/>
				</li>
			</ul>
		</el-header>

		<!-- 编辑弹出框 -->
		<el-dialog title="修改密码" :visible.sync="password_dialog" width="400px">
			<div class="dialog-box">
				<el-form
					:model="passwordModel"
					:rules="rules"
					ref="passwordModel"
					label-width="100px"
				>
					<el-form-item label="旧密码" prop="oldPassword">
						<el-input
							:type="pwdType.oldPassword"
							placeholder="请输入旧密码"
							v-model="passwordModel.oldPassword"
						>
							<i
								slot="suffix"
								class="el-icon-view pointer"
								@click="showPwd('oldPassword', 0)"
							></i>
						</el-input>
					</el-form-item>
					<el-form-item label="新密码" prop="newPassword">
						<el-input
							:type="pwdType.newPassword"
							placeholder="请输入新密码"
							v-model="passwordModel.newPassword"
						>
							<i
								slot="suffix"
								class="el-icon-view pointer"
								@click="showPwd('newPassword', 1)"
							></i>
						</el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="confirmPassword">
						<el-input
							:type="pwdType.confirmPassword"
							placeholder="请输入确认密码"
							v-model="passwordModel.confirmPassword"
						>
							<i
								slot="suffix"
								class="el-icon-view pointer"
								@click="showPwd('confirmPassword', 2)"
							></i>
						</el-input>
					</el-form-item>
					<div class="btn-modal">
						<el-button @click="password_dialog = false">取 消</el-button>
						<el-button type="primary" @click="confirm('passwordModel')"
							>确 定</el-button
						>
					</div>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: "Header",
	data () {
		var confirmPassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.passwordModel.newPassword) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		var checkData = (rule, value, callback) => {
			if (value) {
				if (/[\u4E00-\u9FA5]/g.test(value)) {
					callback(new Error('不能输入汉字!'));
				} else {
					callback();
				}
			}
			callback();
		}
		return {
			imgs: require("../../assets/imgs/default_people.png"),
			form: {
				search: ""
			},
			info: {
				avatar: "",
				userName: "admin"
			},
			password_dialog: false,
			msgNum: 0,
			passwordModel: {
				oldPassword: '',
				newPassword: '',
				confirmPassword: ''
			},
			// 验证码 表单验证
			rules: {
				oldPassword: [
					{ required: true, message: '请输入旧密码', trigger: 'blur' }
				],
				newPassword: [
					{ required: true, message: '请输入新密码', trigger: 'blur' },
					{ min: 6, max: 20, message: '最少为6个字符', trigger: 'blur' },
					// { pattern: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/, message: '密码中必须包含字母、数字、特殊字符', trigger: 'blur' },
					{ validator: checkData, trigger: 'blur' }

				],
				confirmPassword: [
					{ validator: confirmPassword, required: true, trigger: 'blur' }
				]
			},
			pwdType: {
				oldPassword: "password",
				newPassword: "password",
				confirmPassword: "password"
			}
		}
	},

	watch: {
		password_dialog (newValue) {
			if (!newValue) {
				this.$refs.passwordModel.resetFields();
			}
		}
	},
	computed: {
		show: {
			get () {
				return this.$store.state.setting.isMenu
			},
			set (val) {
				this.$store.dispatch('setting/changeSetting', {
					key: 'isMenu',
					value: val
				})
			}
		}
	},
	methods: {
		showPwd (key, i) {
			this.pwdType[key] = this.pwdType[key] === 'password' ? '' : 'password';
			let e = document.getElementsByClassName('el-icon-view')[i];
			this.pwdType[key] == '' ? e.setAttribute('style', 'color: #6C85FC') : e.setAttribute('style', 'color: #c0c4cc');
		},
		handleCommand (command) {
			// this.$message.success('click on item ' + command);
			// 用户名下拉菜单选择事件
			let self = this;
			if (command == 'info') {
				this.$message.success('click on item ' + command);
			} else if (command == 'password') {
				self.password_dialog = true;

			}
		},
		quitFun () {
			this.$confirm('确认要退出吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message({
					type: 'success',
					message: '退出成功!'
				});
				this.$router.push("/login")
			}).catch(() => {
			});
		},
		searchFun () {
			console.log("搜索", this.form.search)
		},
		//确认 修改密码
		confirm (formName) {
			let self = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// var regex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}');
					let req = {
						userId: self.$api.sGetObject("_user").id,
						oldPassword: md5(self.passwordModel.oldPassword),
						newPassword: md5(self.passwordModel.newPassword)
					}
					console.log(req)

				}

			})

		},
	}
}
</script>
<style lang="scss" scoped>
.headers {
	.app-header {
		width: 100%;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
		background-color: #fff;
		position: fixed;
		top: 0;
		z-index: 888;
		line-height: 60px;
		font-size: 17px;
		ul {
			display: flex;
			li {
				margin: 0 10px;
				height: 60px;
				&.flex1 {
					flex: 1;
				}
				&.info {
					img {
						width: 36px;
						height: 36px;
						border-radius: 50%;
						margin: 12px 0;
						vertical-align: middle;
					}
				}
				&.quit {
					img {
						margin: 17px 5px;
					}
				}
				&.inform {
					padding: 0 20px;
					.el-badge {
						margin-top: 10px;
						box-sizing: border-box;
						height: 50px;
					}
				}
				.el-icon-menu {
					line-height: 60px;
					color: #50559e;
					font-size: 24px;
				}
				.logos {
					height: 40px;
					margin: 10px;
				}
				.searchs {
					float: right;
					margin: 10px 80px 10px 0;
					width: 400px;
					background: #f7f8fc;
					border-radius: 23px;
				}
			}
		}
	}
}
</style>
<style lang="scss">
.app-header {
	.el-badge__content.is-fixed {
		top: 10px !important;
	}
	.el-form-item--small.el-form-item {
		margin-bottom: 0 !important;
	}
	.el-form-item--small .el-form-item__content,
	.el-form-item--small.el-form-item {
		height: 40px;
		background: #ffffff;
		box-shadow: 0 1px 6px 0 rgba(218, 212, 229, 0.5);
		background: #f7f8fc;
		border-radius: 23px;
	}
	.el-input-group__prepend,
	.el-input-group--prepend .el-input__inner {
		height: 40px;
		border: none;
		background: none;
	}
	.el-input-group--prepend .el-input__inner {
		padding-left: 0;
	}
}
</style>
