import { defineStore } from "pinia";
import { ref } from "vue";

//存储登录用户信息
const useProvinceInfoStore= defineStore("provinceInfo",()=>{
	const info=ref("河北省"); // 默认值
	const setInfo=(newInfo)=>{
		info.value=newInfo;
	};
	const removeInfo=()=>{
		info.value={};
	};
	
	return {info,setInfo,removeInfo};
	
},{persist:true});

export default useProvinceInfoStore;