<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { chinaMap } from "../assets/js/chinamap";

const chinaChartRef = ref();
const chinaChart = ref();

const optionData = ref();

const option = ref({
    // 标题
    // title: {
    //     text: "",
    //     left: "center"
    // },
    // 提示框组件
    tooltip: {
        trigger: "item", // 工具提示将在数据项触发
        // formatter: "{b}<br/>{c}" // 工具提示内容格式，{b}为名称，{c}为值，后跟单位
    },
    // 视觉映射组件
    visualMap: {
        min: optionData.value.min, // 视觉映射的最小值
        max: optionData.value.max, // 假设数据的最大值为100
        left: 'left', // 左侧显示
        top: 'bottom', // 底部显示
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: false, // 是否显示拖动条
        inRange: {
            color: ['#ADD8E6', '#90EE90', '#FFFF00', '#FFA500', '#FF0000'] // 颜色渐变范围
        }
    },
    series: [
        {
            name: "mapData",
            type: "map", // series 类型为 map
            mapType: "china", // 使用注册的 china 地图
            roam: false, // 缩放和平移
            label: {
                normal: {
                    show: false, // 默认不显示省份标签
                    textStyle: { color: "#c71585" } // 省份标签字体颜色
                },
                emphasis: {
                    show: true,
                    textStyle: { color: "red" } // 对应的鼠标悬浮效果
                }
            },
            data: optionData.value.data
        }
    ]
});

// 重置地图数据
const resetChinaChart = () => {
};

onMounted(() => {
    chinaChart.value = echarts.init(chinaChartRef.value);
    // 注册地图
    echarts.registerMap("china", chinaMap);
    chinaChart.value.setOption(option.value);
});
</script>

<template>
    <div ref="chinaChartRef"></div>
</template>

<style scoped></style>