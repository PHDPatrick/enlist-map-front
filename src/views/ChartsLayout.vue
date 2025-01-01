<script setup>
import * as echarts from "echarts";
import { ref, onMounted, defineExpose } from "vue";
import { chinaMap } from "../assets/js/chinamap";
import { useRouter } from "vue-router";
import useUserInfoStore from "../stores/userInfo.js";
import useYearInfoStore from "../stores/yearInfo.js";
import useProvinceInfoStore from "../stores/provinceInfo.js";


/**
 * 导入业务接口
 */
import { getChinaMapDataService } from "../api/charts.js";


// 导入其他vue
import OverviewView from "./user/OverviewView.vue";
import RadarView from "./user/RadarView.vue";
import PieView from "./user/PieView.vue";
import SortView from "./user/SortView.vue";
import GraphView from "./user/GraphView.vue";
import HistogramView from "./user/HistogramView.vue";
// 其他vue的标记
const overviewViewRef = ref();
const radarViewRef = ref();
const pieViewRef = ref();
const sortViewRef = ref();
const graphViewRef = ref();
const histogramViewRef = ref();


const router = useRouter();
const userInfoStore = useUserInfoStore();
const yearInfoStore = useYearInfoStore();
const provinceInfoStore = useProvinceInfoStore();
const selectYear = ref(2020);
const myChartRef = ref();
const mychart = ref();


// 大地图配置项
const option = ref({
    tooltip: {},
    // 视觉映射组件
    visualMap: {
        min: 0, // 视觉映射的最小值
        max: 500, // 假设数据的最大值为100
        show: false,
        inRange: {
            color: [
                "#90EE90", // 浅绿色
                "#7CC57C", // 中绿色
                "#66B266", // 深绿色（但比黄色浅）
                "#FFFF99", // 浅黄色（比绿色深）
                "#FFD700", // 中黄色
                "#FFA500", // 深黄色（但比红色浅）
                "#FF6347", // 浅红色（比黄色深）
                "#FF0000", // 中红色
                "#990000"  // 深红色
            ]
        }
    },
    series: [
        {
            name: "全国入伍大数据",
            type: "map", // series 类型为 map
            mapType: "china", // 使用注册的 china 地图
            roam: false, // 缩放和平移
            zoom: 1.2,
            center: [104, 37.5],
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
            data: [],
            itemStyle: {
                normal: {
                    areaColor: "#4c60ff", // 设置默认颜色
                },
                emphasis: {
                    areaColor: "#293fff" // 鼠标悬浮时的颜色
                }
            }
        }
    ]
});


/**
 * 获取大地图数据接口
 */
const getChinaMapData = async () => {
    // console.log(123);
    let params = {
        year: yearInfoStore.info,
    };
    let result = await getChinaMapDataService(params);
    mychart.value.setOption({
        series: [{
            name: "全国入伍大数据",
            data: result.data
        }]
    });
};
getChinaMapData();


// 返回admin
const backToAdmin = () => {
    router.push("/admin");
};


// 点击地图事件
const getProvince = (params) => {
    provinceInfoStore.setInfo(params.name);
    // 调用其他页面方法
    radarViewRef.value.getRadarData();
    pieViewRef.value.getPieData();
    graphViewRef.value.getGraphData();
    histogramViewRef.value.getHistogramData();
};


// 监听年份变化
const changeYear = () => {
    yearInfoStore.setInfo(selectYear.value);
    getChinaMapData();
    // 调用其他页面方法
    overviewViewRef.value.getOverviewData();
    radarViewRef.value.getRadarData();
    pieViewRef.value.getPieData();
    sortViewRef.value.getSortData();
    graphViewRef.value.getGraphData();
};


onMounted(() => {
    mychart.value = echarts.init(myChartRef.value);

    // 注册地图
    echarts.registerMap(
        "china", // 注册名称
        chinaMap // 地图数据
    );
    mychart.value.setOption(option.value);
    mychart.value.on("click", getProvince);
});
</script>

<template>
    <!-- 容器div，用于包裹整个组件的内容 -->
    <div class="container">
        <!-- 主要内容区域 -->
        <div class="embody">
            <!-- 头部标题区域 -->
            <div class="head-title">
                <!-- 头部左边区域 -->
                <div class="left-head-title">
                    <el-button class="back-button" v-if="userInfoStore.info.role == 1"
                        @click="backToAdmin()">返回</el-button>
                </div>
                <!-- 头部中间区域 -->
                <div class="center-head-title">全国入伍大数据</div>
                <!-- 头部右边区域 -->
                <div class="right-head-title">
                    <div class="select-year">
                        <el-select v-model="selectYear" @change="changeYear()">
                            <el-option label="2020" :value="2020"></el-option>
                            <el-option label="2021" :value="2021"></el-option>
                            <el-option label="2022" :value="2022"></el-option>
                            <el-option label="2023" :value="2023"></el-option>
                            <el-option label="2024" :value="2024"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <!-- 主要内容块 -->
            <div class="chunk">
                <!-- 左侧内容块 -->
                <div class="left-chunk">
                    <!-- 左侧顶部区域 -->
                    <div class="left-top">
                        <div class="box">
                            <span>数据总览</span>
                            <OverviewView ref="overviewViewRef" />
                        </div>
                    </div>
                    <!-- 左侧中间区域 -->
                    <div class="left-center">
                        <div class="box">
                            <span>{{ provinceInfoStore.info }}与全国平均对比</span>
                            <RadarView ref="radarViewRef" />
                        </div>
                    </div>
                    <!-- 左侧底部区域 -->
                    <div class="left-bottom">
                        <div class="box">
                            <span>{{ provinceInfoStore.info }}学历比例</span>
                            <PieView ref="pieViewRef" />
                        </div>
                    </div>
                </div>
                <!-- 中间内容块 -->
                <div class="center-chunk">
                    <div class="context">
                        <div class="chart" ref="myChartRef"></div>
                    </div>
                </div>
                <!-- 右侧内容块 -->
                <div class="right-chunk">
                    <!-- 右侧顶部区域 -->
                    <div class="right-top">
                        <div class="box">
                            <span>入伍人数Top5</span>
                            <SortView ref="sortViewRef" />
                        </div>
                    </div>
                    <!-- 右侧中间区域 -->
                    <div class="right-center">
                        <div class="box">
                            <span>{{ provinceInfoStore.info }}入伍年龄统计</span>
                            <GraphView ref="graphViewRef" />
                        </div>
                    </div>
                    <!-- 右侧底部区域 -->
                    <div class="right-bottom">
                        <div class="box">
                            <span>{{ provinceInfoStore.info }}入伍年度变化</span>
                            <HistogramView ref="histogramViewRef" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@font-face {
    font-family: electronicFont;
    src: url("../assets/font/DS-DIGI.ttf")
}

.container {
    width: 100%;
    height: 100vh;
    background-image: url('../assets/img/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}


.embody {
    width: 100%;
    height: 100%;

    .head-title {
        // width: 100%;
        // height: 80px;
        // // border: 1px solid cyan;
        // // background: url('../../assets/logo.png') no-repeat center / 100%;
        background: url("../assets//img/head_bg.png") no-repeat center center;

        width: 100%;
        height: 80px;
        // border: 1px solid gold;
        display: grid;
        grid: repeat(5, 1fr) / repeat(7, 1fr);
        /* x / y */
        grid-column-gap: 10px;
        grid-row-gap: 0px;

        .left-head-title {
            grid-area: 1 / 1 / 6 / 3;
            // border: 1px solid cyan;
            padding-top: 10px;
            padding-left: 10px;

            .back-button {
                color: white;
                background-color: transparent;
            }
        }

        .center-head-title {
            grid-area: 1 / 3 / 6 / 6;
            // border: 1px solid red;
            font-size: 47px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: bold;
            text-align: center;
        }

        .right-head-title {
            grid-area: 1 / 6 / 6 / 8;
            // border: 1px solid violet;
            display: flex; // 使用flex布局来实现右对齐
            justify-content: flex-end;
            padding-right: 10px;
            padding: 10px;

            .select-year {
                width: 80px;
            }
        }

    }

    .chunk {
        width: 100%;
        height: calc(100% - 80px);
        // border: 1px solid gold;
        display: grid;
        grid: repeat(5, 1fr) / repeat(7, 1fr);
        /* x / y */
        grid-column-gap: 10px;
        grid-row-gap: 0px;

        .left-chunk {
            grid-area: 1 / 1 / 6 / 3;
            // border: 1px solid cyan;
        }

        .center-chunk {
            grid-area: 1 / 3 / 6 / 6;
            // border: 1px solid red;

            .context {
                width: 100%;
                height: 80vh;
                display: flex;
                align-items: flex-end;

                .chart {
                    width: 100%;
                    height: 80vh;
                    // border: 1px solid red;
                }
            }

        }

        .right-chunk {
            grid-area: 1 / 6 / 6 / 8;
            // border: 1px solid violet;
        }
    }

    .left-chunk {
        display: grid;
        grid: 20% 40% 35% / repeat(1, 1fr);
        // grid: 20% 40% 40% / 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 10px;
        padding-left: 8px;

        .left-top {

            // border: 1px solid red;
            // font-size: 30px; 
            color: #0e94ea;
            font-family: electronicFont;
            font-weight: bold;

        }

        .left-center {
            // border: 1px solid red;
        }

        .left-bottom {
            // border: 1px solid red;
        }

    }

    .center-chunk {
        display: grid;
        grid: 5fr 3fr / 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 10px;
        // border: 1px solid red;
    }


    .right-chunk {
        display: grid;
        // grid: 1fr 1fr 1fr / repeat(1, 1fr);
        grid: 32% 32% 31% / repeat(1, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 10px;
        padding-right: 8px;

        .right-top {
            // border: 1px solid red;
        }

        .right-center {
            // border: 1px solid red;
        }

        .right-bottom {
            // border: 1px solid red;
        }
    }

    .box {
        height: 100%;
        // padding-top: 12%;
        background: linear-gradient(to left, #2CD5FF, #2CD5FF) left top no-repeat,
            linear-gradient(to bottom, #2CD5FF, #2CD5FF) left top no-repeat,
            linear-gradient(to left, #2CD5FF, #2CD5FF) right top no-repeat,
            linear-gradient(to bottom, #2CD5FF, #2CD5FF) right top no-repeat,
            linear-gradient(to left, #2CD5FF, #2CD5FF) left bottom no-repeat,
            linear-gradient(to bottom, #2CD5FF, #2CD5FF) left bottom no-repeat,
            linear-gradient(to left, #2CD5FF, #2CD5FF) right bottom no-repeat,
            linear-gradient(to left, #2CD5FF, #2CD5FF) right bottom no-repeat;
        background-size: 4px 20px, 20px 4px, 4px 20px, 20px 4px;
        border: 1px solid #073F97;
        position: relative;

        span {
            display: inline-block;
            width: 35%;
            background: #05286C;
            font-size: 14px;
            position: absolute;
            top: 0;
            left: 32%;
            padding: 4px 0px;
            color: #19E8FE;
            border-radius: 0 0 10px 10px;
            text-align: center;
        }
    }
}
</style>