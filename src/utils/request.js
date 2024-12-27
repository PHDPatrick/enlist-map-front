import { ElMessage } from "element-plus";
import axios from "axios";
import router from "../router";


const baseURL = "/api";
const instance = axios.create({ baseURL });


// api接口测试
// const instance = axios.create()


/**
 * 添加请求拦截器
 */
// instance.interceptors.request.use(
// 	//请求前回调
// 	(config) => {
// 		//添加token
// 		const tokenStore = useTokenStore();
// 		if (tokenStore.token) {
// 			config.headers.Authorization = tokenStore.token
// 		}
// 		return config;
// 	},
// 	//请求错误回调
// 	(err) => {
// 		Promise.reject(err);
// 	}
// )


/**
 * 添加响应拦截器
 */
instance.interceptors.response.use(
	result => {
		//判断业务操作码
		//成功
		if (result.data.code == 0) {
			return result.data;
		}
		//失败
		else {
			ElMessage.error(result.data.message ? result.data.message : "失败");
			return Promise.reject(result.data); // 仅返回响应结果类code,message,data
		}
	},
	err => {
		//code为401则未登录
		if (err.response.status === 401) {
			ElMessage.error("未登录");
			router.push("/login")
		} else {
			ElMessage.error("服务异常")
			return Promise.reject(err); //异步的状态转化成失败的状态
		}
	}
)

export default instance;