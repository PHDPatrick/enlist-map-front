<script setup>
import { Management, UserFilled, Film } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import useUserInfoStore from "../stores/userInfo.js";

const router = useRouter();
const userInfoStore = useUserInfoStore();


/**
 * 退出登录
 */
const logout = () => {
	ElMessageBox.confirm(
		"确认退出?",
		"提示", {
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		type: "warning",
	}).then(() => {
		userInfoStore.removeInfo();
		router.push("/login");
		ElMessage({
			type: "info",
			message: "退出登录"
		})
	}).catch(() => {
		ElMessage({
			type: "info",
			message: "取消"
		})
	})
}
</script>

<template>
	<el-container class="layout-container">

		<!-- 左侧菜单 -->
		<el-aside width="200px">
			<div class="el-aside__logo"></div>
			<el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>

				<el-menu-item index="/admin/user">
					<el-icon>
						<UserFilled />
					</el-icon>
					<span>用户管理</span>
				</el-menu-item>

				<el-menu-item index="/admin/soldier">
					<el-icon>
						<Management />
					</el-icon>
					<span>入伍数据管理</span>
				</el-menu-item>

				<el-menu-item index="/user">
					<el-icon>
						<Film />
					</el-icon>
					<span>数据展示</span>
				</el-menu-item>

				<!-- <el-menu-item index="/">
					<el-icon>
						<Ticket />
					</el-icon>
					<span>排片管理</span>
				</el-menu-item> -->

			</el-menu>
		</el-aside>

		<!-- 右侧主区域 -->
		<el-container>

			<!-- 头部区域 -->
			<el-header style="display: flex; justify-content: space-between; align-items: center;">
				<div> <strong>你好，{{ userInfoStore.info.username }}</strong> </div>
				<el-button type="danger" @click="logout"> 退出登录 </el-button>
			</el-header>

			<!-- 中间区域 -->
			<el-main>
				<router-view></router-view>
			</el-main>


			<!-- 底部区域 -->
			<el-footer>
				<div>本系统由林喆华团队开发 @2024 v0.0.0 全国入伍大数据</div>
			</el-footer>
		</el-container>

	</el-container>
</template>

<style lang="scss" scoped>
.layout-container {
	height: 100vh;

	.el-aside {
		background-color: #232323;

		&__logo {
			height: 120px;
			background: url("../assets/img/logo.png") no-repeat center / 50% auto;
		}

		.el-menu {
			border-right: none;
		}
	}

	.el-header {
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.el-dropdown__box {
			display: flex;
			align-items: center;

			.el-icon {
				color: #999;
				margin-left: 10px;
			}

			&:active,
			&:focus {
				outline: none;
			}
		}
	}

	.el-footer {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #666;
		background-color: #ccc;
	}
}
</style>