import request from "../utils/request.js";

/**
 * 用户登录
 */
export const userLoginService = (loginData) => {
	// return request.post("/user/login", loginData.value, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });

	return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/user/login", loginData.value, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

/**
 * 查询所有用户接口
 */
export const userListService = () => {
	// return request.get("/admin/user");

	return request.get("http://127.0.0.1:4523/m1/5662258-5342815-default/admin/user");
};


/**
 * 根据id查询用户接口
 */
export const getUserByIdService = (params) => {
	// return request.post("/admin/user", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });

	return request.put("http://127.0.0.1:4523/m1/5662258-5342815-default/admin/user", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

/**
 * 修改用户信息接口
 */
export const updateUserService = (user) => {
	// return request.put("/admin/user", user.value, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });

	return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/admin/user", user.value, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};