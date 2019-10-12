<template>
	<div class="container">
		<div class="data">
			<h3 class="title">统计数据</h3>
			<div class="content">
				<el-row :gutter="26">
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<h4>业务内容1</h4>
							<p class="center color1">
								<span class="span1">{{ data1 }}</span>
							</p>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<h4>业务内容2</h4>
							<p class="center color2">
								<span class="span2">{{ data2 }}</span>
							</p>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<h4>业务内容3</h4>
							<p class="center color3">
								<span class="span3">{{ data3 }}</span>
							</p>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<h4>业务内容4</h4>
							<p class="center color4">
								<span class="span4">{{ data4 }}</span>
							</p>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="describe">
			<h3 class="title">统计图表</h3>
			<div class="content">
				<el-row :gutter="26">
					<el-col :span="5">
						<div class="grid-content bg-purple">
							<h4>饼图标题</h4>
							<!-- 饼图 -->
							<div id="chartmainpie" style="width:100%; height:400px;"></div>
						</div>
					</el-col>
					<el-col :span="11"
						><div class="grid-content bg-purple">
							<h4>折线图标题</h4>
							<!-- 折线图 -->
							<div id="chartmainline" style="width:100%; height:400px;"></div>
						</div>
					</el-col>
					<el-col :span="8"
						><div class="grid-content bg-purple">
							<h4>柱状图标题</h4>
							<!-- 柱状图 -->
							<div id="chartmainbar" style="width:100%; height:400px;"></div>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
import {EleResize} from "@/utils/index.js"
export default {
	name: 'Chart',
	data () {
		return {
			data1: 123123,
			data2: 45674567,
			data3: 3456345.436,
			data4: 1241234.343,

		}
	},
	mounted () {
		this.drawLine();
		this.chartmainline();
		this.pie();
	},
	methods: {
		// 柱状图
		drawLine () {
			let chartmainbar = this.$echarts.init(document.getElementById("chartmainbar"));
			let option = {
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				},
				yAxis: {
					type: 'value'
        },
        color: ['#7378f0'],
				series: [{
					data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
					// }
				}]
			};
			chartmainbar.setOption(option);
			// 元素发送变化后 调用resize 方法
			EleResize.on(document.getElementById("chartmainbar"), () => {
				chartmainbar.resize();
			})
		},
		// 折线图
		chartmainline () {
			let chartmainline = this.$echarts.init(document.getElementById("chartmainline"));
			let option = {
				// title: {
				//     text: '堆叠区域图'
				// },
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					}
				],
				yAxis: [
					{
						type: 'value'
					}
				],
				series: [
					{
						name: '邮件营销',
						type: 'line',
						stack: '总量',
						areaStyle: {},
						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '联盟广告',
						type: 'line',
						stack: '总量',
						areaStyle: {},
						data: [220, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '视频广告',
						type: 'line',
						stack: '总量',
						areaStyle: {},
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '直接访问',
						type: 'line',
						stack: '总量',
						areaStyle: { normal: {} },
						data: [320, 332, 301, 334, 390, 330, 320]
					},
					{
						name: '搜索引擎',
						type: 'line',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						areaStyle: { normal: {} },
						data: [820, 932, 901, 934, 1290, 1330, 1320]
					}
				]
			};
			chartmainline.setOption(option);
			// 元素发送变化后 调用resize 方法
			EleResize.on(document.getElementById("chartmainline"), () => {
				chartmainline.resize();
			})

		},
		// 饼图
		pie () {
			let chartmainpie = this.$echarts.init(document.getElementById("chartmainpie"));
			let option = {
				// title: {
				// 	text: '天气情况统计',
				// 	left: 'center'
				// },
				// color: ['#6dd8da', '#b6a2de', '#58afed'],
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					// orient: 'vertical',
					// top: 'middle',
					bottom: 10,
					left: 'center',
					data: ['西凉', '益州', '兖州', '荆州', '幽州']
				},
				series: [
					{
						type: 'pie',
						radius: '65%',
						center: ['50%', '50%'],
						selectedMode: 'single',
						data: [
							{ value: 1548, name: '幽州' },
							{ value: 535, name: '荆州' },
							{ value: 510, name: '兖州' },
							{ value: 634, name: '益州' },
							{ value: 735, name: '西凉' }
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			};
			chartmainpie.setOption(option);
			// 元素发送变化后 调用resize 方法
			EleResize.on(document.getElementById("chartmainpie"), () => {
				chartmainpie.resize();
			})

		}

	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.data {
	.center {
		padding: 10px 0 30px;
		font-family: PingFangSC-Medium;
		font-size: 30px;
		letter-spacing: 0;
		line-height: 42px;
		> span {
			position: relative;
			&:after {
				content: "";
				display: inline-block;
				width: 12px;
				height: 12px;
				border-radius: 50%;
				position: absolute;
				top: 50%;
				left: -20px;
				transform: translateY(-50%);
				background: red;
			}
			&.span1:after {
				background: #7378f0;
			}
			&.span2:after {
				background: #1bccaa;
			}
			&.span3:after {
				background: #fd5175;
			}
			&.span4:after {
				background: #ffaa3f;
			}
		}
	}
	.color1 {
		color: #7378f0;
	}
	.color2 {
		color: #1bccaa;
	}
	.color3 {
		color: #fd5175;
	}
	.color4 {
		color: #ffaa3f;
	}
}
.title {
	font-family: PingFangSC-Medium;
	font-size: 16px;
	color: #666666;
	letter-spacing: 0;
	border-bottom: 1px solid #d8d8d8;
	padding: 15px 0;
	position: relative;
	&:after {
		content: "";
		width: 34px;
		height: 3px;
		background: #7378f0;
		border-radius: 2px;
		position: absolute;
		bottom: -4px;
		left: 0;
	}
}
.content {
	padding: 15px 0;
	h4 {
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #666666;
		letter-spacing: 0;
		padding: 15px;
	}
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 4px;
	}
	.bg-purple {
		background: #ffffff;
		box-shadow: 0 2px 16px 0 rgba(163, 168, 179, 0.14);
		border-radius: 12px;
	}
	.grid-content {
    width:100%;
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
	.center {
		text-align: center;
	}
}
.describe {
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 4px;
	}
}
</style>
