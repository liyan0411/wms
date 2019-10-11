<template>
	<div class="headers">
		<el-header class="app-header" height="60px">
			<i class="el-icon-menu pointer" @click="show = !show"></i>

			header
		</el-header>
	</div>
</template>
<script>
export default {
	name: "Header",
	data () {
		return {

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
		},
	}
}
</script>
<style lang="scss" scoped>
.app-header {
	width: 100%;
	box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
	background-color: #fff;
	position: fixed;
	top: 0;
	z-index: 888;
	line-height: 60px;
	font-size: 17px;
}
</style>
