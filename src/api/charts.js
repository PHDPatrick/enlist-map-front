import request from "../utils/request.js";

/**
 * 获取大地图数据接口
 */
export const getChinaMapDataService = (params) => {
	// return request.post("/user/map", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });
	
	return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/user/map", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};


/**
 * 获取总览数据接口
 */
export const getOverviewDataService = (params) => {
	// return request.post("/user/overview", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });

	return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/user/overview", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};