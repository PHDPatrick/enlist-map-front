<script setup>
import * as echarts from "echarts";
import { ref, onMounted, defineExpose } from "vue";
import useProvinceInfoStore from "../../stores/provinceInfo";
import useYearInfoStore from "../../stores/yearInfo";

/**
 * 导入业务接口
 */
import { getGraphDataService } from "../../api/charts";

const provinceInfoStore = useProvinceInfoStore();
const yearInfoStore = useYearInfoStore();

const myChartRef = ref();
const mychart = ref();
// // 配置项
const option = ref({
  tooltip: {
      // trigger: 'item'
    },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["18", "19", "20", "21", "22"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "全国入伍大数据",
      data: [],
      type: 'line',
      areaStyle: {}
    }
  ]
});


/**
 * 获取排序数据接口
 */
const getGraphData = async () => {
  // console.log(456);
  let params = {
    year: yearInfoStore.info,
    province: provinceInfoStore.info
  };
  let result = await getGraphDataService(params);
  mychart.value.setOption({
    series: [{
      name: "全国入伍大数据",
      data: result.data
    }]
  });
  mychart.value.setOption(option);
};
getGraphData();


onMounted(() => {
  mychart.value = echarts.init(myChartRef.value);
  mychart.value.setOption(option.value);
});


defineExpose({
  getGraphData
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-left: 5%;
  // border: 1px solid red;

  .chart {
    width: 100%;
    height: 100%;
    // border: 1px solid red;
  }
}
</style>
