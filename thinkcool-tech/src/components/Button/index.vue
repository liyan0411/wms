<!--
  按钮 组件
  bg   按钮背景色
  icon    按钮图标
  addClick   接收传过来的值
 -->
<template>
	<div style="float: left;">
		<div class="btns">
			<button class="headButton" :icon="icon" @click="clickFun" :style="{'background':bg}">
        <i :class="icon"></i>
      </button>
			<span v-text="text"></span>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			clickFun() {
				this.$emit('click', '')
			}
		},
		props: ['text', 'icon','bg']
	}
</script>

<style scoped="scoped">
	.btns{
		width: 60px;
		/* height: 55px; */
		text-align: center;
	}
	.btns span{
		width: 60px;
		line-height: 20px;
		text-align: center;
		display: block;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #1A2036;
	}

	.headButton {
		color: #fff;
		border: 0;
		width: 35px;
		height: 35px;
		margin-bottom: 6px;
		cursor: pointer;
		border-radius: 50%;

	}
  	.headButton i{
      font-size: 18px;
    }
	.headButton::before{
		font-size: 16px;
	}
</style>
