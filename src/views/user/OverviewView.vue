<script setup>
import useYearInfoStore from "../../stores/yearInfo";
import { ref, defineExpose } from "vue";

/**
 * 导入业务接口
 */
import { getOverviewDataService } from "../../api/charts";


const yearInfoStore = useYearInfoStore();
const overviewData = ref();


/**
 * 获取总览数据接口
 */
const getOverviewData = async () => {
  // console.log(123);
  let params = {
    year: yearInfoStore.info,
  };
  let result = await getOverviewDataService(params);
  overviewData.value = result.data;
};
getOverviewData();


defineExpose({
  getOverviewData
})
</script>

<template>
  <div class="main">
    <div class="data-box">
      <div class="data-box-title">年份</div>
      <div class="data-box-context">{{ yearInfoStore.info }}</div>
    </div>
    <div class="data-box">
      <div class="data-box-title">总计</div>
      <div class="data-box-context">{{ overviewData }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border: 1px solid #90EE90;

  .data-box {
    flex: 1;
    text-align: center;
    color: #ffeb7b; // 设置字体颜色

    .data-box-title {
      font-size: 20px;
    }

    .data-box-context {
      font-size: 67px; // 设置字体大小
    }
  }

}
</style>
