import request from "../utils/request.js";

/**
 * 分页查询所有soldier接口
 */
export const soldierListService = (params) => {
	// return request.patch("/admin/soldier", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });

	return request.patch("http://127.0.0.1:4523/m1/5662258-5342815-default/admin/soldier", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};


/**
 * 修改soldier接口
 */
export const updateSoldierService = (soldier) => {
	// return request.put("/admin/soldier", soldier.value, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });

	return request.put("http://127.0.0.1:4523/m1/5662258-5342815-default/admin/soldier", soldier.value, {
		headers: {
			"Content-Type": "application/json"
		}
	})
};


/**
 * 根据id查询soldier接口
 */
export const getSoldierByIdService = (params) => {
	// return request.get("/admin/soldier", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });

	return request.get("http://127.0.0.1:4523/m1/5662258-5342815-default/admin/soldier", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};


/**
 * 新增soldier接口
 */
export const addSoldierService = (soldier) => {
	// return request.post("/admin/soldier", soldier.value, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });

	return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/admin/soldier", soldier.value, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};


/**
 * 删除soldier接口
 */
export const deleteSoldierService = (id) => {
	// return request.delete("/admin/soldier", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });

	return request.delete("http://127.0.0.1:4523/m1/5662258-5342815-default/admin/soldier/" + id, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};