<template>
	<div id="contentView">
		<!-- 路由动画载体 -->
		<transition :name="transitionName">
			<!-- 路由视图 -->
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
export default {
	name: "Content",
	data () {
		return {
			transitionName: '',//路由切换动画
		}
	},
	watch: {//使用watch 监听$router的变化
		$route (to, from) {
			// 跳转后使视图滚动条 置顶
			document.getElementById("contentView").scrollTop = 0;
			//如果to索引大于from索引,判断为前进状态,反之则为后退状态
			if (to.meta.index > from.meta.index) {
				//设置动画名称
				this.transitionName = 'slide-left';
			} else {
				this.transitionName = 'slide-right';
			}
		}
	}
}
</script>
<style lang="scss" scoped>
#contentView{
  height:100vh;
  background: #f9f9f9;
  padding: 70px 10px 10px 10px;
  box-sizing: border-box;
  overflow-y: auto;
}
/*路由动画*/
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
	will-change: transform;
	transition: all 300ms;
	position: absolute;
}
.slide-right-enter {
	opacity: 0;
	/*transform: translate3d(-100%, 0, 0);*/
}
.slide-right-leave-active {
	opacity: 0;
	/*transform: translate3d(100%, 0, 0);*/
}
.slide-left-enter {
	opacity: 1;
	/*transform: translate3d(100%, 0, 0);*/
}
.slide-left-leave-active {
	opacity: 1;
	/*transform: translate3d(-100%, 0, 0);*/
}
</style>
