<template>
	<div id="contentView">
		<div class="menu-left" :class="{ width: toggles }" v-if="$route.meta.isMenus">
			<!-- :class="{'width':toggles}" -->
			<p class="toggles" @click="togglesFun">
				<i :class="toggles ? 'el-icon-caret-left' : 'el-icon-caret-right'"></i>
			</p>
			<el-menu
        v-show="toggles"
				class="sidebar-el-menu"
				:default-active="onRoutes"
				active-text-color="#7d82c4"
				unique-opened
				router
			>
				<template v-for="item in menuLists">
					<template v-if="item.subs">
						<el-submenu :index="item.index" :key="item.index">
							<template slot="title">
								<i :class="item.icon"></i
								><span slot="title">{{ item.title }}</span>
							</template>
							<template v-for="subItem in item.subs">
								<el-submenu
									v-if="subItem.subs"
									:index="subItem.index"
									:key="subItem.index"
								>
									<template slot="title">
										{{ subItem.title }}
									</template>
									<el-menu-item
										v-for="(threeItem, i) in subItem.subs"
										:key="i"
										:index="threeItem.index"
									>
										{{ threeItem.title }}
									</el-menu-item>
								</el-submenu>
								<el-menu-item
									v-else
									:index="subItem.index"
									:key="subItem.index"
								>
									{{ subItem.title }}
								</el-menu-item>
							</template>
						</el-submenu>
					</template>
					<template v-else>
						<el-menu-item :index="item.index" :key="item.index">
							<i :class="item.icon"></i>
							<span slot="title">{{ item.title }}</span>
						</el-menu-item>
					</template>
				</template>
			</el-menu>
		</div>
		<div class="content">
			<!-- 路由动画载体 -->
			<!-- <transition :name="transitionName"> -->
			<Breadcrumbs v-show="!$route.meta.noPath" :name="$route.meta.title" />
			<!-- 路由视图 -->
			<router-view></router-view>
			<!-- </transition> -->
		</div>
	</div>
</template>
<script>
import Breadcrumbs from "@/components/Breadcrumb"
export default {
	name: "Content",
	components: {
		Breadcrumbs
	},
	data () {
		return {
      // 二级菜单路由 根据当前模块 动态获取 二级菜单列表
			menuLists: [
				{ index: "index1", title: "子菜单1", icon: "" },
				{ index: "index2", title: "子菜单2", icon: "" },
				{ index: "index3", title: "子菜单3", icon: "" }
			],
			transitionName: '',//路由切换动画
			toggles: true
		}
	},
	computed: {
		onRoutes () {
			return this.$route.path.replace('/', '');
		}
	},
	watch: {//使用watch 监听$router的变化
		$route (to, from) {
			// 跳转后使视图滚动条 置顶
			document.getElementById("contentView").scrollTop = 0;
			//如果to索引大于from索引,判断为前进状态,反之则为后退状态
			// if (to.meta.index > from.meta.index) {
			// 	//设置动画名称
			// 	this.transitionName = 'slide-left';
			// } else {
			// 	this.transitionName = 'slide-right';
			// }
		}
	},
	methods: {
		handleOpen (key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose (key, keyPath) {
			console.log(key, keyPath);
		},
		togglesFun () {
			this.toggles = !this.toggles;
		}
	}
}
</script>
<style lang="scss" scoped>
#contentView {
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	background: #f4f6fd;
	box-sizing: border-box;
	display: flex;
	.menu-left {
		height: 100%;
		width:0;
		padding-top: 60px;
		box-sizing: border-box;
		background: #fff;
		position: relative;
		.el-menu {
			width: 200px;
		}
		&.width {
			width: 200px;
		}
		.toggles {
			position: absolute;
			width: 15px;
			height: 50px;
			background: #fff;
			top: 50%;
			right: -15px;
			cursor: pointer;
			transform: translateY(-50%);
			font-size: 20px;
			line-height: 50px;
			overflow: hidden;

			border-radius: 0 5px 5px 0;
			box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
			i {
				margin-left: -3px;
			}
		}
	}
	.content {
		overflow-y: auto;
		padding: 60px 20px 20px 20px;
		flex: 1;
	}
}
// /*路由动画*/
// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
// 	will-change: transform;
// 	transition: all 300ms;
// 	position: absolute;
// }
// .slide-right-enter {
// 	opacity: 0;
// 	/*transform: translate3d(-100%, 0, 0);*/
// }
// .slide-right-leave-active {
// 	opacity: 0;
// 	/*transform: translate3d(100%, 0, 0);*/
// }
// .slide-left-enter {
// 	opacity: 1;
// 	/*transform: translate3d(100%, 0, 0);*/
// }
// .slide-left-leave-active {
// 	opacity: 1;
// 	/*transform: translate3d(-100%, 0, 0);*/
// }
</style>
