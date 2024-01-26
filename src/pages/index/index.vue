<template>
  <view class="content">
    <CustomNavBar>
      <template #left>
        <view
          style="
            margin-left: 16px;
            font-size: 18px;
            color: #222222;
            font-weight: 500;
          "
          >首页</view
        >
      </template>
      <!-- <template #center>
        <view>智慧楼宇</view>
      </template>
      <template #right>
        <view>智慧楼宇</view>
      </template> -->
    </CustomNavBar>
    <view class="bg-color"></view>
    <view class="top-right"></view>
    <view style="display: flex; justify-content: center">智慧楼宇</view>
  </view>
</template>

<script setup lang="ts">
import CustomNavBar from "@/components/CustomNavBar/CustomNavBar.vue";
import { ref } from "vue";
const title = ref("Hello");
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  min-height: 100vh;
  background: #f5f9fa;
  .bg-color {
    /* background: linear-gradient(90deg, #b0e8de 0%, #b0e8de 100%); */
    background: linear-gradient(#b0e8de 0%, #f5f9fa 100%);
    width: 100%;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .top-right {
    width: 240px;
    height: 240px;
    background: #85e0ff;
    position: absolute;
    top: -75px;
    left: 212px;
    filter: blur(130px);
  }
}
</style>
