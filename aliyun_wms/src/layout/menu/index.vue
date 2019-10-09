<template>
	<div class="container">
		<el-menu
			class="sidebar-el-menu"
			:default-active="onRoutes"
			active-text-color="#7d82c4"
			unique-opened
			router
		>
			<template v-for="item in menuList">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template slot="title">
							<i class="iconfont" :class="item.icon"></i
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
							<el-menu-item v-else :index="subItem.index" :key="subItem.index">
								{{ subItem.title }}
							</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index">
						<i class="iconfont" :class="item.icon"></i
						><span slot="title">{{ item.title }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>
<script>
export default {
	name: "Menu",
	data () {
		return {
			menuList: [
				{ index: "home", title: "首页", icon: "el-icon-star-off" },
				{ index: "chart", title: "图表", icon: "el-icon-share" },
				{ index: "list", title: "列表", icon: "el-icon-document" },
				{ index: "form", title: "表单", icon: "el-icon-setting" }
			]
		}
	},
	computed: {
		onRoutes () {
			return this.$route.path.replace('/', '');
		}
	},
	methods: {
		handleOpen (key, keyPath) {
			console.log(1, key, keyPath);
		},
		handleClose (key, keyPath) {
			console.log(2, key, keyPath);
		}
	}
}
</script>
<style lang="scss" scoped>
.sidebar-el-menu > .el-menu-item {
  font-size: 16px;
	> .iconfont {
		margin: 0 10px !important;
	}
}
</style>
<style lang="scss">
</style>
