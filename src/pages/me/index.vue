<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
import CustomNavBar from "@/components/CustomNavBar/CustomNavBar.vue";
// #ifdef MP
const customNavBarBg = ref("transparent");
onPageScroll(({ scrollTop }) => {
  if (scrollTop > 10) {
    customNavBarBg.value = "#b0e8de";
    // customNavBarBg.value = "#2BC4B8";
  } else {
    customNavBarBg.value = "transparent";
  }
});
// #endif
</script>

<template>
  <view class="index">
    <!-- #ifdef MP -->
    <CustomNavBar mode="includeMenu" :backgroundColor="customNavBarBg">
      <template #left>
        <view
          style="
            margin-left: 16px;
            font-size: 18px;
            color: #222222;
            font-weight: 500;
          "
          >我的</view
        >
      </template>
      <!-- <template #center>
        <view>智慧楼宇</view>
      </template>
      <template #right>
        <view>智慧楼宇</view>
      </template> -->
    </CustomNavBar>
    <!-- #endif -->
    <view class="bg-color"></view>
    <view class="top-right"></view>
    <view class="content">
      <view class="user-info">
        <image class="head-icon" src="@/static/images/3x/my_head@3x.png">
        </image>
        <view class="user-name">
          <text>憨憨晏晏</text>
          <text>181****5542</text>
        </view>
      </view>
      <view class="operation-list">
        <view class="item">
          <image
            class="item-icon"
            src="@/static/images/3x/history_log@3x.png"
          ></image>
          <text class="item-text">记录查询</text>
        </view>
        <view class="item">
          <image
            class="item-icon"
            src="@/static/images/3x/about-us@3x.png"
          ></image>
          <text class="item-text">关于我们</text> </view
        ><view class="item">
          <image class="item-icon" src="@/static/images/3x/kefu@3x.png"></image>
          <text class="item-text">客服中心</text> </view
        ><view class="item">
          <image class="item-icon" src="@/static/images/3x/exit@3x.png"></image>
          <text class="item-text">退出登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.index {
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
    background: rgba(133, 224, 255, 0.7);
    position: absolute;
    top: -75px;
    left: 212px;
    filter: blur(130px);
  }
  .content {
    padding: 16px 16px 0 16px;
    position: relative;
    .user-info {
      display: flex;
      margin-top: 16px;
      .head-icon {
        width: 56px;
        height: 56px;
      }
      .user-name {
        display: flex;
        flex-direction: column;
        margin-left: 12px;
        justify-content: center;
        text:nth-child(1) {
          font-size: 16px;
          color: #000;
        }
        text:nth-child(2) {
          font-size: 13px;
          color: #444;
        }
      }
    }
    .operation-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      margin-top: 16px;
      grid-gap: 11px;
      .item {
        width: 332rpx;
        height: 224rpx;
        background: #fff;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .item-icon {
          width: 56px;
          height: 56px;
        }
        .item-text {
          font-size: 15px;
          color: #333;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
