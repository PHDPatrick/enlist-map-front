<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import useUserInfoStore from "../stores/userInfo.js";


/**
 * 导入用户相关接口
 */
import { userLoginService } from "../api/user.js";


/**
 * 登录数据
 */
const loginData = ref({
	username: "",
	password: ""
});


const router = useRouter();
const userInfoStore = useUserInfoStore();


/**
 * 用户登录
 */
const login = async () => {
	//仅接收响应结果类code,message,data
	let result = await userLoginService(loginData);
	ElMessage.success("登录成功");
	userInfoStore.setInfo(result.data)
	// console.log(result.data);
	// console.log(userInfoStore.info);
	
	// 是管理员跳转后台
	if (userInfoStore.info.role == 1) {
		router.push("/admin");
	}
};
</script>


<template>
	<!-- 在vue页面中，template下第一个标签使用div -->
	<div class="box">
		<div class="login-box">
			<div class="title">全国入伍大数据</div>
			<br>
			<!--  表单  -->
			<div>
				<el-form label-width="100px" :model="loginData" style="margin-top: 40px">
					<el-form-item label="账号" size="large">
						<el-input v-model="loginData.username" placeholder="请输入用户名" size="large" style="width: 270px" />
					</el-form-item>
					<el-form-item label="密码" size="large">
						<el-input type="password" v-model="loginData.password" placeholder="请输入密码" size="large"
							style="width: 270px" />
					</el-form-item>

					<el-button type="success" @click="login" size="large">点击登录</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>


<style scoped>
.box {
	/* background-color: darkcyan; */
	width: 100%;
	height: 100vh;
	/*自适应高度*/
	/* 通过flex布局进行上下居中 */
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url("../assets/img/bg.jpg");
	background-repeat: no-repeat;
	background-size: cover;
}

.login-box {
	width: 450px;
	height: 350px;
	background: rgba(0, 0, 0, 0.6);
	color: #ffffff;
	padding: 10px;
	/*margin: 0 auto;*/
	text-align: center;
}

.title {
	height: 50px;
	width: 100%;
	border-bottom: 1px solid #ffffff;
	font-size: 25px;
	line-height: 50px;
	font-weight: bold;
}

.box /deep/ .el-form-item__label {
	color: #fff;
	/* 设置标签文字颜色为白色 */
	font-weight: bold;
	/* 加粗字体 */
}
</style>