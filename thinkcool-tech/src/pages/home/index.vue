import '../../theme/color-picker.css';
<template>
  <div class="container">
    <el-row :gutter="50">
      <el-col :span="19">
        <div class="container-left">
          <!-- 业务模块 -->
          <div class="mb-26">
            <el-row><el-col :span="24"><div class="module-menu-title" v-html="'业务模块'"></div></el-col></el-row>
            <el-row :gutter="26">
              <el-col class="mb-20" :span="6">
                <div class="module-menu-content-item">
                  <div class="icon-box"><img src="../../assets/imgs/cangchu.png" alt=""></div>
                  <div class="text" v-html="'仓储 · WNU'"></div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="module-menu-content-item">
                  <div class="icon-box"><img src="../../assets/imgs/wuliu.png" alt=""></div>
                  <div class="text" v-html="'物流 · TMS'"></div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="module-menu-content-item">
                  <div class="icon-box"><img src="../../assets/imgs/zhiliang.png" alt=""></div>
                  <div class="text" v-html="'质量 · QWS'"></div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="module-menu-content-item">
                  <div class="icon-box"><img src="../../assets/imgs/shebei.png" alt=""></div>
                  <div class="text" v-html="'设备 · QWS'"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="26">
              <el-col :span="6">
                <div class="module-menu-content-item">
                  <div class="icon-box"><img src="../../assets/imgs/shengchan.png" alt=""></div>
                  <div class="text" v-html="'生产 · MES'"></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 实用工具 -->
          <div>
            <el-row><el-col :span="24"><div class="module-menu-title" v-html="'实用工具'"></div></el-col></el-row>
            <el-row :gutter="26">
              <el-col class="mb-20" :span="6">
                <div class="module-menu-content-item">
                  <div class="icon-box"><img src="../../assets/imgs/dayin.png" alt=""></div>
                  <div class="text" v-html="'标签打印'"></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 业务监控 -->
          <div>
            <el-row><el-col :span="24"><div class="module-menu-title" v-html="'业务监控'"></div></el-col></el-row>
            <el-row :gutter="26">
              <el-col class="mb-20" :span="5">
                <div class="yewu-item">
                  <div class="text" v-html="'安全库存'"></div>
                  <div><span class="sel-num FD5175" v-html="repertoryNum"></span><span> / 10</span></div>
                </div>
              </el-col>
              <el-col class="mb-20" :span="5">
                <div class="yewu-item">
                  <div class="text" v-html="'质量问题'"></div>
                  <div><span class="sel-num FFAA3F" v-html="qualityProblemNum"></span><span> / 10</span></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 事件发生 -->
          <div>
            <el-row><el-col :span="24"><div class="module-menu-title" v-html="'事件发生'"></div></el-col></el-row>
            <el-row :gutter="30">
              <el-col class="mb-20" :span="12">
                <!-- 折线图 -->
                <div class="chart-bg">
    							<div id="chartmainline" style="width:100%; height:200px;"></div>              
                </div>
              </el-col>
              <el-col class="mb-20" :span="12">
                <!-- 柱状图 -->
                <div class="chart-bg">
    							<div id="chartmainbar" style="width:100%; height:200px;"></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="container-right">
          <!-- 告警通知 -->
          <div class="wrapper-warning mb-26">
            <div class="wrapper-warning-header">
              <span>告警通知</span>
              <span class="day-num"><span>20天</span> <i class="el-icon-arrow-down"></i></span>
            </div>
            <div class="wrapper-warning-body" v-html="warningNum"></div>
            <div class="wrapper-warning-footer">
              系统维护通知<br>请尽快前往业务监控查看
            </div>
          </div>
          <!-- 行业快报 -->
          <div class="wrapper mb-26">
            <div class="wrapper-header">
              <span>行业快报</span>
              <span class="day-num"><span>20天</span> <i class="el-icon-arrow-down"></i></span>
            </div>
            <div class="wrapper-body">
              <div class="news-list">
                <div class="news-list-item" v-for="(item, index) in newsList" :key="index">
                  <div class="date" v-html="item.date"></div>
                  <div class="text" v-html="item.value"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- 获取更多方式 -->
          <div class="wrapper">
            <div class="wrapper-header">
              <span>获取更多方式</span>
            </div>
            <div class="wrapper-body">
              <div class="ewm-box">
                <img src="../../assets/imgs/erweima.png" alt="">
                <div>扫一扫<br>获取小程序</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {EleResize} from "@/utils/index.js";
export default {
  name: "Home",
  data() {
    return {
      repertoryNum: 0, // 安全库存
      qualityProblemNum: 0, // 质量问题
      warningNum: '40%',   // 告警通知
      // 行业快报
      newsList: [
        {
          date: '2019/3',
          value: '上海物流库存不足'
        },
        {
          date: '2019/3',
          value: '上海物流库存不足'
        },
        {
          date: '2019/3',
          value: '上海物流库存不足'
        },
        {
          date: '2019/3',
          value: '上海物流库存不足'
        }
      ]
    };
  },
  mounted() {
    this.chartmainline()
    this.drawLine()
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.FD5175 {
  color: #FD5175;
}
.FFAA3F {
  color: #FFAA3F;
}
.mb-20 {
  margin-bottom: 20px;
}
.mb-26 {
  margin-bottom: 20px;
}
.container {
  height: 100%;
  box-sizing: border-box;
  .container-left {
    height: 100%;
  }
  .container-right {
    height: 100%;
    .wrapper {
      background: #FFFFFF;
      box-shadow: 0 2px 16px 0 rgba(163,168,179,0.14);
      border-radius: 12px;
      padding: 0 10px;
      box-sizing: border-box;
      .wrapper-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 10px 16px 16px;
        font-size: 16px;
        color: #666666;
        border-bottom: 1px solid #ececec;
        .day-num {
          font-size: 14px;
          color: #666666;
        }
      }
      .news-list {
        font-size: 14px;
        color: #666666;
        padding: 20px;
        max-height: 200px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .news-list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          .date {
            width: 50px;
          }
          .text {
            padding-right: 5px;
            box-sizing: border-box;
            text-align: right;
            flex: 1;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
      .ewm-box {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        font-size: 14px;
        padding: 20px 0 30px 0;
        img {
          margin-right: 20px;
          width: 96px;
        }
      }
    }
    .wrapper-warning {
      background: #FFFFFF;
      box-shadow: 0 2px 16px 0 rgba(163,168,179,0.14);
      border-radius: 12px;
      padding: 0 10px;
      box-sizing: border-box;
      .wrapper-warning-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 10px 16px 16px;
        font-size: 16px;
        color: #666666;
        border-bottom: 1px solid #ececec;
        .day-num {
          font-size: 14px;
          color: #666666;
        }
      }
      .wrapper-warning-body {
        height: 160px;
        background: url('../../assets/imgs/jiankong.png') no-repeat;
        background-size: auto 120px;
        background-position: center center;
        color: #7277F0;
        font-size: 40px;
        font-weight: 600;
        text-align: center;
        line-height: 160px;
      }
      .wrapper-warning-footer {
        font-size: 14px;
        color: #666666;
        padding: 20px 0 40px 0;
        border-top: 1px solid #ececec;
        text-align: center;
        line-height: 20px;
      }
    }
  }
  .module-menu-title {
    position: relative;
    font-size: 16px;
    color: #666666;
    padding-left: 12px;
    padding-bottom: 12px;
    &::after {
      position: absolute;
      content: '';
      width: 4px;
      height: 16px;
      background: #7378F0;
      border-radius: 2px;
      left: 0;
      top: 0;
    }
  }
  .module-menu-content-item {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0 2px 16px 0 rgba(163,168,179,0.14);
    border-radius: 12px;
    height: 80px;
    &::after {
      position: absolute;
      content: '';
      height: 70%;
      width: 1px;
      background: #ececec;
      left: 40%;
      top: 15%;
    }
    .icon-box {
      width: 40%;
      text-align: center;
      img {
        height: 40px;
      }
    }
    .text {
      width: 60%;
      text-align: center;
      font-size: 18px;
      color: #666666;
    }
  }
  .yewu-item {
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80px;
    background: #FFFFFF;
    box-shadow: 0 2px 16px 0 rgba(163,168,179,0.14);
    border-radius: 12px;
    color: #666666;
    .sel-num {
      font-size: 28px;
      font-weight: 500;
    }
    .text {
      margin-bottom: 6px;
    }
  }
  .chart-bg {
    background: #FFFFFF;
    box-shadow: 0 2px 16px 0 rgba(163,168,179,0.14);
    border-radius: 12px;
    padding: 10px 0;
  }
}
</style>
