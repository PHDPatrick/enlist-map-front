<script setup>
import { Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";


/**
 * 导入用户相关接口
 */
import {
    userListService,
    getUserByIdService,
    updateUserService
} from "../../api/user.js";


// 用户数据
const users = ref([]);
const dialogVisible = ref(false);
// 一个用户
const user = ref();
// 表单校验
const rules = {
    username: {
        required: true,
        message: "请输入用户名",
        trigger: "blur"
    },
    role: {
        required: true,
        message: "请选择账户权限",
        trigger: "blur"
    },
    isDeleted: {
        required: true,
        message: "请选择账户状态",
        trigger: "blur"
    }
};


// 清空user数据
const clearUser = () => {
    user.value = {};
};


/**
 * 查询所有用户接口
 */
const userList = async () => {
    let result = await userListService();
    // 数据赋值
    users.value = result.data;
};
userList();


/**
 * 根据id查询用户接口
 */
const getUserById = async (id) => {
    let params = { id: id };
    let result = await getUserByIdService(params);
    user.value = result.data;
};


/**
 * 修改用户信息接口
 */
const updateUserById = async () => {
    await updateUserService(user);
    ElMessage.success("修改成功");
    dialogVisible.value = false;
    clearUser();
    userList();
};


// 修改用户信息
const editUser = (row) => {
    clearUser();
    getUserById(row.id);
    // console.log(row);
    dialogVisible.value = true;
};


</script>

<template>

    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>用户管理</span>
            </div>
        </template>

        <el-table :data="users" stripe style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="是否为管理员" prop="role">
                <template #default="{ row }">
                    {{ row.role === 1 ? "管理员" : "普通用户" }}
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="isDeleted">
                <template #default="{ row }">
                    <span :class="{ 'enabled': !row.isDeleted, 'disabled': row.isDeleted }">
                        {{ row.isDeleted ? "禁用" : "启用" }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="editUser(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 弹窗 -->
        <el-dialog v-model="dialogVisible" title="修改用户信息" width="30%">

            <el-form :model="user" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="user.username" minlength="1" maxlength="15" disabled></el-input>
                </el-form-item>
                <el-form-item label="账户权限" prop="role">
                    <el-select v-model="user.role">
                        <el-option label="管理员" :value="1"></el-option>
                        <el-option label="普通用户" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账户状态" prop="isDeleted">
                    <el-select v-model="user.isDeleted">
                        <el-option label="启用" :value="0"></el-option>
                        <el-option label="禁用" :value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false; clearUser();">取消</el-button>
                    <el-button type="primary" @click="updateUserById()"> 确认 </el-button>
                </span>
            </template>

        </el-dialog>

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

    .enabled {
        color: green;
    }

    .disabled {
        color: red;
    }
}
</style>