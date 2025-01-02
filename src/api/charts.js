import request from "../utils/request.js";

/**
 * 获取大地图数据接口
 */
export const getChinaMapDataService = (params) => {
	return request.post("/user/map", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});

	// return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/user/map", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });
};


/**
 * 获取总览数据接口
 */
export const getOverviewDataService = (params) => {
	return request.post("/user/overview", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});

	// return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/user/overview", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });
};


/**
 * 获取雷达图数据接口
 */
export const getRadarDataService = (params) => {
	return request.post("/user/radar", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});

	// return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/user/radar", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });
};


/**
 * 获取饼图数据接口
 */
export const getPieDataService = (params) => {
	return request.post("/user/pie", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});

	// return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/user/pie", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// })
};


/**
 * 获取排序数据接口
 */
export const getSortDataService = (params) => {
	return request.post("/user/sort", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});

	// return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/user/sort", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// })
};


/**
 * 获取折线图数据接口
 */
export const getGraphDataService = (params) => {
	return request.post("/user/graph", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});

	// return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/user/graph", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// })
};


/**
 * 获得柱状图数据接口
 */
export const getHistogramDataService = (params) => {
	return request.post("/user/histogram", params, {
		headers: {
			"Content-Type": "application/json"
		}
	});

	// return request.post("http://127.0.0.1:4523/m1/5662258-5342815-default/user/histogram", params, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// })
};