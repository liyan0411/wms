<template>
	<div ref="leftPanel" :class="{ show: show }" class="leftPanel-container">
		<div class="leftPanel-background" @click="show=!show"/>
		<div class="leftPanel">
			<!-- <div
				class="handle-button"
				:style="{ top: buttonTop + 'px', 'background-color': theme }"
				@click="show = !show"
			>
				<i :class="show ? 'el-icon-close' : 'el-icon-setting'" />
			</div> -->
			<div class="leftPanel-items">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
import { addClass, removeClass } from "@/utils";

export default {
	name: "leftPanel",
	props: {
		clickNotClose: {
			default: false,
			type: Boolean
    },
		buttonTop: {
			default: 250,
			type: Number
		}
  },
	data () {
		return {
      theme:"#c8d6e8"
		};
	},
  computed: {
    show: {
      get() {
        return this.$store.state.setting.isMenu
      },
      set(val) {
        this.$store.dispatch('setting/changeSetting', {
          key: 'isMenu',
          value: val
        })
      }
    },
  },
	watch: {
		// show (value) {
		// 	if (value && !this.clickNotClose) {
		// 		this.addEventClick();
		// 	}
		// 	if (value) {
		// 		addClass(document.body, "showLeftPanel");
		// 	} else {
		// 		removeClass(document.body, "showLeftPanel");
		// 	}
		// }
	},
	mounted () {
		// this.insertToBody();
	},
	beforeDestroy () {
		// const elx = this.$refs.leftPanel;
		// elx.remove();
	},
	methods: {
		// addEventClick () {
		// 	window.addEventListener("click", this.closeSidebar);
		// },
		// closeSidebar (evt) {
		// 	const parent = evt.target.closest(".leftPanel");
		// 	if (!parent) {
		// 		this.show = false;
		// 		window.removeEventListener("click", this.closeSidebar);
		// 	}
		// },
		// insertToBody () {
		// 	const elx = this.$refs.leftPanel;
		// 	const body = document.querySelector("body");
		// 	body.insertBefore(elx, body.firstChild);
		// }
	}
};
</script>

<style>
.showLeftPanel {
	overflow: hidden;
	position: relative;
	width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.leftPanel-background {
	position: fixed;
	top: 0;
	left: 0;
	opacity: 0;
	transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
	background: rgba(0, 0, 0, 0.2);
	z-index: -1;
}

.leftPanel {
  width: 100%;
  padding-top: 60px;
	max-width: 260px;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
	transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
	transform: translate(-100%);
	background: #fff;
  z-index: 30;
  overflow-y: auto;
}

.show {
	transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
	.leftPanel-background {
		z-index: 20;
		opacity: 1;
		width: 100%;
		height: 100%;
	}
	.leftPanel {
		transform: translate(0);
	}
}
.handle-button {
	width: 48px;
	height: 48px;
	position: absolute;
	right: -48px;
	text-align: center;
	font-size: 24px;
	border-radius: 0 6px 6px 0 !important;
	z-index: 0;
	pointer-events: auto;
	cursor: pointer;
	color: #fff;
	line-height: 48px;
	i {
		font-size: 24px;
		line-height: 48px;
	}
}
.leftPanel-items {
  // height: 100vh;
  overflow-y: auto;
  padding-bottom: 60px;
}
</style>
