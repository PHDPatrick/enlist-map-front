<script setup>
import * as echarts from "echarts";
import { ref, onMounted, defineExpose } from "vue";
import { chinaMap } from "../../assets/js/chinamap";
import useProvinceInfoStore from "../../stores/provinceInfo";
import useYearInfoStore from "../../stores/yearInfo";

/**
 * 导入业务接口
 */
import { getChinaMapDataService } from "../../api/charts";

const provinceInfoStore = useProvinceInfoStore();
const yearInfoStore = useYearInfoStore();

const myChartRef = ref();
const mychart = ref();
const selectProvince = ref("河北省");
// 配置项
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
      name: "enlist",
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
      name: "enlist",
      data: result.data
    }]
  });
};
getChinaMapData();


// 点击地图事件
const getProvince = (params) => {
  // console.log(params.name);
  provinceInfoStore.setInfo(params.name);
  // console.log(provinceInfoStore.info);
  selectProvince.value = params.name;
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


defineExpose({
  getChinaMapData
});
</script>

<template>
  <div class="main">
    <div class="chart" ref="myChartRef"></div>
  </div>
</template>

<style lang="scss" scoped>
.main {
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
</style>
