import { defineStore } from "pinia";
import { ref } from "vue";

//存储登录用户信息
const useYearInfoStore= defineStore("yearInfo",()=>{
	const info=ref(2020); // 默认值
	const setInfo=(newInfo)=>{
		info.value=newInfo;
	};
	const removeInfo=()=>{
		info.value={};
	};
	
	return {info,setInfo,removeInfo};
	
},{persist:true});

export default useYearInfoStore;