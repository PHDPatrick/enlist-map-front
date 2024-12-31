<script setup>
import { useRouter } from "vue-router";
import useUserInfoStore from "../stores/userInfo.js";
import useYearInfoStore from "../stores/yearInfo.js";
import { ref } from "vue";


// 导入其他vue
import ChinaView from "./user/ChinaView.vue";
// 其他vue的标记
const chinaViewRef = ref();


const router = useRouter();
const userInfoStore = useUserInfoStore();
const yearInfoStore = useYearInfoStore();
const selectYear = ref(2020); // 默认展示2020数据


// 返回admin
const backToAdmin = () => {
    router.push("/admin");
};


// 监听年份变化
const changeYear = () => {
    yearInfoStore.setInfo(selectYear.value);
    // console.log(yearInfoStore.info);
    // 调用ChinaView页面方法
    chinaViewRef.value.getChinaMapData();
};

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
                    <div class="left-top"></div>
                    <!-- 左侧中间区域 -->
                    <div class="left-center"></div>
                    <!-- 左侧底部区域 -->
                    <div class="left-bottom"></div>
                </div>
                <!-- 中间内容块 -->
                <div class="center-chunk">
                    <ChinaView ref="chinaViewRef"/>
                </div>
                <!-- 右侧内容块 -->
                <div class="right-chunk">
                    <!-- 右侧顶部区域 -->
                    <div class="right-top"></div>
                    <!-- 右侧中间区域 -->
                    <div class="right-center"></div>
                    <!-- 右侧底部区域 -->
                    <div class="right-bottom"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
    // border: 1px solid red;

    .head-title {
        // width: 100%;
        // height: 80px;
        // // border: 1px solid cyan;
        // // background: url('../../assets/logo.png') no-repeat center / 100%;

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
        }

        .right-chunk {
            grid-area: 1 / 6 / 6 / 8;
            // border: 1px solid violet;
        }
    }

    .left-chunk {
        display: grid;
        grid: 1fr 1fr 1fr / repeat(1, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 10px;

        .left-top {
            // border: 1px solid red;
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
        grid: 1fr 1fr 1fr / repeat(1, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 10px;

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
}
</style>