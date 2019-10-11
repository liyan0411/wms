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
									alt=""
								/>
							</el-input>
						</el-form-item>
					</el-form>
				</li>
				<li class="inform">
					<el-badge :value="1" class="item pointer">
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
	</div>
</template>
<script>
export default {
	name: "Header",
	data () {
		return {
			imgs: require("../../assets/imgs/default_people.png"),
			form: {
				search: ""
			},
			info: {
				avatar: "",
				userName: "admin"
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
		handleCommand (command) {
			this.$message.success('click on item ' + command);
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
		}
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
					margin: 10px 0;
				}
				.searchs {
					float: right;
					margin: 10px 0;
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
