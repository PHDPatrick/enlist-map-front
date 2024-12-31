<script setup>
import * as echarts from "echarts";
import { ref, onMounted, defineExpose } from "vue";
import useProvinceInfoStore from "../../stores/provinceInfo";
import useYearInfoStore from "../../stores/yearInfo";

/**
 * 导入业务接口
 */

const provinceInfoStore = useProvinceInfoStore();
const yearInfoStore = useYearInfoStore();

const myChartRef = ref();
const mychart = ref();
// 配置项
const option = ref();


/**
 * 获取总览数据接口
 */
const getOverviewData = async () => {
  // console.log(123);
  let params = {
    year: yearInfoStore.info,
    province: provinceInfoStore.info
  };
  let result = await getOverviewDataService(params);
  mychart.value.setOption({
    series: [{
      name: "enlist",
      data: result.data
    }]
  });
};
getOverviewData();



onMounted(() => {
  mychart.value = echarts.init(myChartRef.value);
  mychart.value.setOption(option.value);
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

</style>
