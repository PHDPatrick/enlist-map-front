<script setup>
import * as echarts from "echarts";
import { ref, onMounted, defineExpose } from "vue";
import useProvinceInfoStore from "../../stores/provinceInfo";
import useYearInfoStore from "../../stores/yearInfo";

/**
 * 导入业务接口
 */
import { getPieDataService } from "../../api/charts";

const provinceInfoStore = useProvinceInfoStore();
const yearInfoStore = useYearInfoStore();

const myChartRef = ref();
const mychart = ref();
// 配置项
const option = ref({
  tooltip: {
    // trigger: 'item'
  },
  legend: {
    // top: "1%",
    left: "center",
    textStyle: {
      color: "wdsaight",
      // fontSize: "24",
    },
  },
  series: [
    {
      name: "全国入伍大数据",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2
      },
      label: {
        show: true,
        // position: "center"
        textStyle: {
          color: "",
          // fontSize: "24",
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold"
        }
      },
      labelLine: {
        show: true
      },
      data: []
    }
  ]
});


/**
 * 获取雷达图数据接口
 */
const getPieData = async () => {
  // console.log(456);
  let params = {
    year: yearInfoStore.info,
    province: provinceInfoStore.info
  };
  let result = await getPieDataService(params);
  mychart.value.setOption({
    series: [{
      name: "全国入伍大数据",
      data: result.data
    }]
  });
};
getPieData();


onMounted(() => {
  mychart.value = echarts.init(myChartRef.value);
  mychart.value.setOption(option.value);
});


defineExpose({
  getPieData
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
    width: 80%;
    height: 80%;
  }
}
</style>
