<script setup>
import * as echarts from "echarts";
import { ref, onMounted, defineExpose } from "vue";
import useProvinceInfoStore from "../../stores/provinceInfo";
import useYearInfoStore from "../../stores/yearInfo";

/**
 * 导入业务接口
 */
import { getRadarDataService } from "../../api/charts";

const provinceInfoStore = useProvinceInfoStore();
const yearInfoStore = useYearInfoStore();

const myChartRef = ref();
const mychart = ref();
// 配置项
const option = ref({
  legend: {
    data: [provinceInfoStore.info, "全国平均"],
    // left: "top",
    // top: "50%"
  },
  radar: {
    indicator: [
      { name: "男", max: 800 },
      { name: "女", max: 800 },
      { name: "总计", max: 800 },
      { name: "上半年", max: 800 },
      { name: "下半年", max: 800 },
    ]
  },
  series: [
    {
      name: "全国入伍大数据",
      type: "radar",
      data: []
    }
  ]
});


/**
 * 获取雷达图数据接口
 */
const getRadarData = async () => {
  // console.log(456);
  let params = {
    year: yearInfoStore.info,
    province: provinceInfoStore.info
  };
  let result = await getRadarDataService(params);
  mychart.value.setOption({
    series: [{
      name: "全国入伍大数据",
      data: result.data
    }]
  });
};
getRadarData();



onMounted(() => {
  mychart.value = echarts.init(myChartRef.value);
  mychart.value.setOption(option.value);
});


defineExpose({
  getRadarData
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
  padding-top: 5%;

  .chart {
    width: 90%;
    height: 90%;
  }
}
</style>
