<script setup>
import { Delete, Edit } from "@element-plus/icons-vue";
import { ref } from "vue";

import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { ElMessage, ElMessageBox } from "element-plus";


/**
 * 导入Soldier相关接口
 */
import {
	soldierListService,
	updateSoldierService,
	getSoldierByIdService,
	addSoldierService,
	deleteSoldierService
} from "../../api/soldier.js";


// 分页查询数据模型
const pageNum = ref(1); // 当前页
const pageSize = ref(3); // 每页条数
const total = ref(); // 总条数
// 控制抽屉是否显示
const visibleDrawer = ref(false);
const drawerTitle = ref();
const soldiers = ref([]);
// soldier数据模型
const soldier = ref({
	name: "",
	gender: "",
	age: "",
	province: "",
	education: "",
	enlistmentYear: "",
	enlistmentMonth: ""
});
// 表单校验
const rules = {
	name: {
		required: true,
		message: "请输入姓名",
		trigger: "blur"
	},
	gender: {
		required: true,
		message: "请选择性别",
		trigger: "blur"
	},
	age: {
		required: true,
		message: "请选择年龄",
		trigger: "blur"
	},
	province: {
		required: true,
		message: "请选择籍贯",
		trigger: "blur"
	},
	education: {
		required: true,
		message: "请选择学历",
		trigger: "blur"
	},
	enlistmentYear: {
		required: true,
		message: "请选择入伍年份",
		trigger: "blur"
	},
	enlistmentMonth: {
		required: true,
		message: "请选择入伍月份",
		trigger: "blur"
	}
};
// 34个省份名
const provinces = [
	"北京市", "天津市", "上海市", "重庆市",
	"河北省", "山西省", "辽宁省", "吉林省", "黑龙江省",
	"江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省",
	"湖北省", "湖南省", "广东省", "海南省",
	"四川省", "贵州省", "云南省", "陕西省", "甘肃省", "青海省",
	"台湾省",
	"内蒙古自治区", "广西壮族自治区", "西藏自治区", "宁夏回族自治区", "新疆维吾尔自治区",
	"香港特别行政区", "澳门特别行政区"
];


// 当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
	pageSize.value = size;
	// movieList();
};

// 当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
	pageNum.value = num;
	// movieList();
};

// 清空soldier数据模型
const clearSoldier = () => {
	soldier.value = {
		id: "",
		name: "",
		gender: "",
		age: "",
		province: "",
		education: "",
		enlistmentYear: "",
		enlistmentMonth: "",
		createTime: "",
		isDeleted: "",
	};
};



/**
 * 分页查询所有soldier接口
 */
const soldierList = async () => {
	let params = {
		pageNum: pageNum.value,
		pageSize: pageSize.value,
	};
	let result = await soldierListService(params);
	// 数据赋值
	total.value = result.data.total;
	soldiers.value = result.data.items;
};
soldierList();


/**
 * 根据id查询soldier接口
 */
const getSoldierById = async (id) => {
	let params = { id: id };
	let result = await getSoldierByIdService(params);
	soldier.value = result.data;
};


/**
 * 修改soldier接口
 */
const updateSoldier = async () => {
	await updateSoldierService(soldier);
	ElMessage.success("修改成功");
	visibleDrawer.value = false;
	clearSoldier();
	soldierList();
};


/**
 * 修改soldier
 */
const editSoldier = (row) => {
	clearSoldier();
	getSoldierById(row.id);
	visibleDrawer.value = true;
};


/**
 * 添加soldier接口
 */
const addSoldier = async () => {
	await addSoldierService(soldier);
	ElMessage.success("添加成功");
	visibleDrawer.value = false;
	clearSoldier();
	soldierList();
};


// 检查soldier
const check = () => {
	if (soldier.value.name == null || soldier.value.name == ""){
		return false;
	};
	if (soldier.value.gender != 0 && soldier.value.gender != 1){
		return false;
	};
	if (soldier.value.age == null || soldier.value.age == ""){
		return false;
	};
	if (soldier.value.province == null || soldier.value.province == ""){
		return false;
	};
	if (soldier.value.education == null || soldier.value.education == ""){
		return false;
	};
	if (soldier.value.enlistmentYear == null || soldier.value.enlistmentYear == ""){
		return false;
	};
	if (soldier.value.enlistmentMonth == null || soldier.value.enlistmentMonth == ""){
		return false;
	};
	return true;
};


// 添加或修改soldier
const drawerAction = () => {
	if(!check()){
		ElMessage.error("请输入完整信息");
		return;
	}
	if (drawerTitle.value == "添加数据") {
		addSoldier();
	};
	if (drawerTitle.value == "修改数据") {
		updateSoldier();
	};
};


/**
 * 删除soldier接口
 */
const deleteSoldier = (row) => {
	//用户确认
	ElMessageBox.confirm(
		"确认删除？",
		"提示", {
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		type: "warning",
	}
	).then(async () => {
		await deleteSoldierService(row.id);
		soldierList();
		ElMessage({
			type: "success",
			message: "删除成功",
		})
	}).catch(() => {
		ElMessage({
			type: "info",
			message: "取消删除",
		})
	})
};
</script>

<template>

	<el-card class="page-container">
		<template #header>
			<div class="header">
				<span>入伍数据管理</span>
				<div class="extra">
					<el-button type="primary"
						@click="clearSoldier(); visibleDrawer = true; drawerTitle = '添加数据'">添加数据</el-button>
				</div>
			</div>
		</template>

		<!-- 数据列表 -->
		<el-table :data="soldiers" stripe style="width: 100%">
			<el-table-column label="序号" width="100" type="index"></el-table-column>
			<el-table-column label="姓名" prop="name"></el-table-column>
			<el-table-column label="性别" prop="gender">
				<template #default="{ row }">
					{{ row.gender === 1 ? "男" : "女" }}
				</template>
			</el-table-column>
			<el-table-column label="籍贯" prop="province"></el-table-column>
			<el-table-column label="学历" prop="education"></el-table-column>
			<el-table-column label="年龄" prop="age"></el-table-column>
			<el-table-column label="入伍年份" prop="enlistmentYear"></el-table-column>
			<el-table-column label="半年" prop="enlistmentMonth">
				<template #default="{ row }">
					{{ row.enlistmentMonth < 7 ? "上" : "下" }} </template>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template #default="{ row }">
					<el-button :icon="Edit" circle plain type="primary"
						@click="editSoldier(row); drawerTitle = '修改数据'"></el-button>
					<el-button :icon="Delete" circle plain type="danger" @click="deleteSoldier(row)"></el-button>
				</template>
			</el-table-column>
			<template #empty>
				<el-empty description="没有数据" />
			</template>
		</el-table>

		<!-- 分页条 -->
		<el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15, 30]"
			layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
			@current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end"
			:hide-on-single-page="total < pageNum || total == pageNum" />

		<!-- 抽屉 -->
		<el-drawer v-model="visibleDrawer" :title="drawerTitle" direction="rtl" size="30%">
			<!-- 添加数据表单 -->
			<el-form :model="soldier" :rules="rules" label-width="100px">

				<el-form-item label="姓名" prop="name">
					<el-input v-model="soldier.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="gender">
					<el-select v-model="soldier.gender" placeholder="请选择性别">
						<el-option label="男" :value="1"></el-option>
						<el-option label="女" :value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="籍贯" prop="province">
					<el-select v-model="soldier.province" placeholder="请选择籍贯">
						<el-option v-for="province in provinces" :key="province" :label="province"
							:value="province"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学历" prop="education">
					<el-select v-model="soldier.education" placeholder="请选择学历">
						<el-option label="初中" :value="'初中'"></el-option>
						<el-option label="高中" :value="'高中'"></el-option>
						<el-option label="大学" :value="'大学'"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-select v-model="soldier.age" placeholder="请选择年龄">
						<el-option label="18" :value="18"></el-option>
						<el-option label="19" :value="19"></el-option>
						<el-option label="20" :value="20"></el-option>
						<el-option label="21" :value="21"></el-option>
						<el-option label="22" :value="22"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="入伍年份" prop="enlistmentYear">
					<el-select v-model="soldier.enlistmentYear" placeholder="请选择入伍年份">
						<el-option label="2020" :value="2020"></el-option>
						<el-option label="2021" :value="2021"></el-option>
						<el-option label="2022" :value="2022"></el-option>
						<el-option label="2023" :value="2023"></el-option>
						<el-option label="2024" :value="2024"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="入伍月份" prop="enlistmentMonth">
					<el-select v-model="soldier.enlistmentMonth" placeholder="请选择入伍月份">
						<el-option label="1" :value="1"></el-option>
						<el-option label="2" :value="2"></el-option>
						<el-option label="3" :value="3"></el-option>
						<el-option label="4" :value="4"></el-option>
						<el-option label="5" :value="5"></el-option>
						<el-option label="6" :value="6"></el-option>
						<el-option label="7" :value="7"></el-option>
						<el-option label="8" :value="8"></el-option>
						<el-option label="9" :value="9"></el-option>
						<el-option label="10" :value="10"></el-option>
						<el-option label="11" :value="11"></el-option>
						<el-option label="12" :value="12"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button @click="visibleDrawer = false; clearSoldier()">取消</el-button>
					<el-button type="primary" @click="drawerAction()">
						<span v-if="drawerTitle == '添加数据'">添加数据</span>
						<span v-else>修改数据</span>
					</el-button>
				</el-form-item>
			</el-form>
		</el-drawer>

	</el-card>

</template>
<style lang="scss" scoped>
.page-container {
	min-height: 100%;
	box-sizing: border-box;

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}

.avatar-uploader {
	:deep() {
		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}

		.el-upload {
			border: 1px dashed var(--el-border-color);
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			transition: var(--el-transition-duration-fast);
		}

		.el-upload:hover {
			border-color: var(--el-color-primary);
		}

		.el-icon.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			text-align: center;
		}
	}
}

.editor {
	width: 100%;

	:deep(.ql-editor) {
		min-height: 200px;
	}
}
</style>