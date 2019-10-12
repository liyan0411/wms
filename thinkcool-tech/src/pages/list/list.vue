<template>
	<div class="container">
		<div class="div-search">
			<el-row :gutter="10">
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
					<span>路线名称</span>
					<el-input placeholder="请输入路线名称" v-model="form.name" clearable>
					</el-input>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
					<span>出发地</span>
					<el-select placeholder="请选择" v-model="form.location" clearable>
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
					<span>目的地</span>
					<el-date-picker
						v-model="form.date"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
						clearable
					>
					</el-date-picker>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
					<div class="btn-view">
						<el-button type="primary" @click="query" round>查询</el-button>
						<el-button round @click="reset">重置</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="div-btn">
			<Button
				:icon="add.icon"
				:text="add.text"
				:bg="add.bg"
				@click="addClick"
			></Button>
			<Button
				:icon="edit.icon"
				:text="edit.text"
				:bg="edit.bg"
				@click="editClick"
			></Button>
			<Button
				:icon="del.icon"
				:text="del.text"
				:bg="del.bg"
				@click="delClick"
			></Button>
		</div>
		<div class="div-table">
			<el-table
				:data="tableData"
				ref="multipleTable"
				@selection-change="handleSelectionChange"
				@row-click="toggleSelection"
			>
				<el-table-column type="selection" width="55"> </el-table-column>
				<el-table-column prop="date" label="日期" width="180">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="address" label="地址"> </el-table-column>
			</el-table>
		</div>
		<div class="div-page">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[100, 200, 300, 400]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="400"
			>
			</el-pagination>
		</div>

		<el-dialog title="新增" :visible.sync="dialogFormVisible" width="500px">
			<el-form :model="forms">
				<el-form-item label="活动名称" label-width="80px">
					<el-input v-model="forms.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="活动区域" label-width="80px">
					<el-select v-model="forms.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="affirm">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import Button from "@/components/Button"
export default {
	name: 'List',
	components: {
		Button
	},
	data () {
		return {
			currentPage: 1,
			dialogFormVisible: false,
			add: {
				text: "新增",
				icon: "el-icon-circle-plus-outline",
				bg: "#7378F0"
			},
			edit: {
				text: "编辑",
				icon: "el-icon-edit",
				bg: "#69bce2"
			},
			del: {
				text: "删除",
				icon: "el-icon-delete",
				bg: "#E26976"
			},
			tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄',
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄',
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}],
			options: [{
				value: '选项1',
				label: '黄金糕'
			}, {
				value: '选项2',
				label: '双皮奶'
			}, {
				value: '选项3',
				label: '蚵仔煎'
			}, {
				value: '选项4',
				label: '龙须面'
			}, {
				value: '选项5',
				label: '北京烤鸭'
			}],
			// 查询
			form: {
				name: "",
				location: "",
				date: "  "
			},
			// 弹框
			forms: {
				name: "",
				region: ""
      },
      // 保存选中的列表数据
			selList: []
		}
	},
	methods: {
		handleSizeChange (val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange (val) {
			console.log(`当前页: ${val}`);
		},
		query () {
			console.log("query", this.form)
		},
		reset () {
			this.form.name = "";
			this.form.location = "";
			this.form.date = "";
			console.log("reset", this.form)
		},
		addClick () {
			console.log("新增")
			this.dialogFormVisible = true;
		},
		editClick () {
			console.log("编辑",this.selList)
		},
		delClick () {
			console.log("删除")
		},
		affirm () {
			console.log(this.forms)
			this.dialogFormVisible = false;
		},

		// 点击复选框获取当前行数据
		handleSelectionChange (val) {
			var self = this;
			self.selList = val;
		},
		// 点击行选中复选框
		toggleSelection (row) {
			var rows = [];
			rows.push(row);
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.container {
	background: #ffffff;
}
</style>
