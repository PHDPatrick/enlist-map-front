import request from "../utils/request.js";

/**
 * 用户登录接口
 */
export const userLoginService = (loginData) => {
	// return request.post("/user/login", loginData.value, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });

	return request.post("", loginData.value,{
		headers: {
			"Content-Type": "application/json"
		}
	})
}

