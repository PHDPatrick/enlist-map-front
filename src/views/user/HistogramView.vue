<script setup>
import * as echarts from "echarts";
import { ref, onMounted, defineExpose } from "vue";
import useProvinceInfoStore from "../../stores/provinceInfo";

/**
 * 导入业务接口
 */
import { getHistogramDataService } from "../../api/charts";

const provinceInfoStore = useProvinceInfoStore();

const myChartRef = ref();
const mychart = ref();
// // 配置项
const option = ref({
  tooltip: {
    // trigger: 'item'
  },
  xAxis: {
    type: "category",
    data: ["2020", "2021", "2022", "2023", "2024"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "全国入伍大数据",
      data: [],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)"
      },
      itemStyle: {
        //normal: {
        color: {
          type: "linear",
          // x=0,y=1,柱子的颜色在垂直方向渐变
          x: 0,
          y: 1,
          colorStops: [
            // 0%处的颜色
            {
              offset: 0,
              color: "#2F83F7",
            },
            // 100%处的颜色
            {
              offset: 1,
              color: "#54CED6",
            },
          ],
          emphasis: {
            color: "#00feff",
          },
          global: false, // 缺省为 false
        },
      }
    }
  ]
});


/**
 * 获得柱状图数据接口
 */
const getHistogramData = async () => {
  // console.log(456);
  let params = {
    province: provinceInfoStore.info
  };
  let result = await getHistogramDataService(params);
  mychart.value.setOption({
    series: [{
      name: "全国入伍大数据",
      data: result.data
    }]
  });
  mychart.value.setOption(option);
};
getHistogramData();


onMounted(() => {
  mychart.value = echarts.init(myChartRef.value);
  mychart.value.setOption(option.value);
});


defineExpose({
  getHistogramData
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
