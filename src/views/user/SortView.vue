<script setup>
import * as echarts from "echarts";
import { ref, onMounted, defineExpose } from "vue";
import useProvinceInfoStore from "../../stores/provinceInfo";
import useYearInfoStore from "../../stores/yearInfo";

/**
 * 导入业务接口
 */
import { getSortDataService } from "../../api/charts";

const provinceInfoStore = useProvinceInfoStore();
const yearInfoStore = useYearInfoStore();

const myChartRef = ref();
const mychart = ref();
// // 配置项
const option = ref({
  yAxis: {
    type: "category",
    data: []
  },
  xAxis: {
    type: "value"
  },
  series: [
    {
      data: [],
      type: "bar"
    }
  ]
});


/**
 * 获取排序数据接口
 */
const getSortData = async () => {
  // console.log(456);
  let params = {
    year: yearInfoStore.info,
  };
  let result = await getSortDataService(params);
  // mychart.value.setOption({
  //   series: [{
  //     name: "全国入伍大数据",
  //     data: result.data
  //   }]
  // });
  // option.value.yAxis.data=result.data.nameData;
  // console.log(result.data.nameData);
  // option.value.series=result.data.countData;
  // console.log(result.data.countData);
  // mychart.value.setOption(option.value);
  let option = {
    tooltip: {
      // trigger: 'item'
    },
    xAxis: {
      max: "dataMax"
    },
    yAxis: {
      type: "category",
      data: result.data.nameData,
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      show: false
      // max: 2 // only the largest 3 bars will be displayed
    },
    series: [
      {
        realtimeSort: true,
        // name: "全国入伍大数据",
        type: "bar",
        data: result.data.countData,
        label: {
          show: true,
          position: "inside",
          valueAnimation: true
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
          //},
        },
      }
    ],
    // legend: {
    //   show: true
    // },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: "linear",
    animationEasingUpdate: "linear"
  };
  mychart.value.setOption(option);
};
getSortData();


onMounted(() => {
  mychart.value = echarts.init(myChartRef.value);
  mychart.value.setOption(option.value);
});


defineExpose({
  getSortData
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
