<template>
  <view class="index">
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
    <view class="content">
      <view class="device-type">
        <template v-for="(item, index) in deviceType" :key="index">
          <view
            class="device-type-item"
            :class="{ 'device-selected': index === currentDevice }"
            @click="handleDeviceSelected(index)"
          >
            <text>{{ item.title }}</text>
            <!-- <image
            style="width: 12px; height: 5px"
            src="@/static/xuanzhong.svg"
          ></image> -->
          </view></template
        >
      </view>
      <view class="device-content">
        <view class="floor">
          <template v-for="(item, index) in floor" :key="index">
            <view
              class="floor-item"
              :class="{ 'floor-selected': item.value === currentFloor }"
              @click="handleFloorSelected(item.value)"
              >{{ item.label }}</view
            ></template
          >
        </view>
        <view class="operation">
          <view class="o-item">
            <image
              class="o-item-image"
              src="@/static/images/3x/kongtiao@3x.png"
            >
            </image>
            <text class="o-item-text">一键开启全部</text>
          </view>
          <view class="o-item">
            <image
              class="o-item-image"
              src="@/static/images/3x/yijianguanbi@3x.png"
            >
            </image>
            <text class="o-item-text">一键关闭全部</text>
          </view>
        </view>
        <view class="device-list">
          <template v-for="(item, index) in deviceList" :key="index">
            <view class="d-item">
              <view class="d-item-top">
                <text class="name">{{ item.name }}</text>
                <view class="status-setting">
                  <switch color="#0EEB92" style="transform: scale(0.5)" />
                  <image
                    class="setting"
                    src="@/static/images/3x/setting@3x.png"
                  >
                  </image>
                </view>
              </view>
              <view class="d-item-bottom">
                <modeComp :modeType="item.mode"></modeComp>
                <view class="device-mode">
                  <image
                    class="model-icon"
                    src="@/static/images/3x/wenduji@3x.png"
                  >
                  </image>
                  <text class="text">气温{{ item.temperature }}°C</text>
                </view>
              </view>
              <view></view>
            </view>
          </template>
        </view>
        <!-- <u-button>打开ActionSheet</u-button> -->
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CustomNavBar from "@/components/CustomNavBar/CustomNavBar.vue";
import modeComp from "./modeComp.vue";

// 设备类型
const deviceType = ref([
  { title: "空调" },
  { title: "能耗" },
  { title: "灯光" },
  { title: "风机" },
  { title: "门禁" },
  { title: "视频" },
]);
const currentDevice = ref(0);
const handleDeviceSelected = (index: number) => {
  currentDevice.value = index;
};

// 楼层
const floor = ref([
  { label: "全部楼层", value: "all" },
  { label: "1F", value: 1 },
  { label: "2F", value: 2 },
  { label: "3F", value: 3 },
  { label: "4F", value: 4 },
  { label: "5F", value: 5 },
  { label: "6F", value: 6 },
]);
const currentFloor = ref<number | string>(1);
const handleFloorSelected = (value: string | number) => {
  console.log(value);
  currentFloor.value = value;
};

// 设备列表
// mode 1：制冷，2：制热，3：通风，4：键盘上锁
const deviceList = ref([
  { name: "东侧空调", status: "on", mode: 1, temperature: 24 },
  { name: "东侧空调", status: "on", mode: 3, temperature: 21 },
  { name: "东侧空调", status: "on", mode: 4, temperature: 24 },
  { name: "东侧空调", status: "on", mode: 2, temperature: 14 },
  { name: "东侧空调", status: "on", mode: 1, temperature: 30 },
  { name: "东侧空调", status: "on", mode: 1, temperature: 26 },
  { name: "东侧空调", status: "on", mode: 1, temperature: 28 },
]);
</script>

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
    background: #85e0ff;
    position: absolute;
    top: -75px;
    left: 212px;
    filter: blur(130px);
  }
  .content {
    padding: 16px 16px 0 16px;
    position: relative;
    .device-type {
      display: flex;
      padding-bottom: 24px;
      .device-type-item {
        color: #666;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        margin-right: 24px;
      }
      .device-selected {
        color: #000;
        font-weight: 500;
        position: relative;
      }
    }

    .device-content {
      background: #fff;
      /* width: 100%; */
      border-radius: 12px;
      padding: 16px;
      .floor {
        display: flex;
        font-size: 15px;
        font-weight: 500;
        color: #1c2533;
        justify-content: space-between;

        .floor-item {
        }
        .floor-selected {
          color: #2bc4b8;
          position: relative;
          &::after {
            content: "";
            width: 100%;
            /* height: 2px; */
            position: absolute;
            bottom: -2px;
            left: 0;
            border: 1px solid #2bc4b8;
          }
        }
      }

      .operation {
        padding: 20px 0;
        display: flex;
        justify-content: space-evenly;
        border-bottom: 1px solid #f0f0f0;
        .o-item {
          display: flex;
          align-items: center;
          flex-direction: column;
          .o-item-image {
            width: 20px;
            height: 20px;
          }
          .o-item-text {
            margin-top: 4px;
            color: #1c2533;
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
      .device-list {
        .d-item {
          padding: 16px 0;
          border-bottom: 1px solid #f0f0f0;
          .d-item-top {
            display: flex;
            justify-content: space-between;
            .name {
              color: #000000;
              font-size: 16px;
              font-weight: 500;
              vertical-align: middle;
            }
            .status-setting {
              display: flex;
              align-items: center;
              .status {
                width: 20px;
                height: 20px;
              }
              .setting {
                width: 20px;
                height: 20px;
              }
            }
          }

          .d-item-bottom {
            margin-top: 12px;
            display: flex;
            .device-mode {
              display: flex;
              align-items: center;
              background: #e9f2f2;
              width: 80px;
              height: 24px;
              justify-content: center;
              border-radius: 4px;
              margin-right: 8px;
              .model-icon {
                width: 16px;
                height: 16px;
              }
              .text {
                margin-left: 4px;
                color: #385956;
                font-size: 12px;
                font-weight: 400;
              }
            }
          }
        }
      }
    }
  }
}

.half-circle {
  position: relative; /* 确保容器相对定位 */
  width: 200px;
  height: 100px;
  background-color: #f5f5f5;
  border-radius: 50% / 100%; /* 将四角变为圆形 */
}

.half-circle::after {
  content: "";
  position: absolute;
  bottom: -50%; /* 控制半圆显示的高度 */
  left: 0;
  right: 0;
  top: 50%;
  border-top: 50px solid transparent; /* 控制上边界线条的长度 */
  border-bottom: 50px solid transparent; /* 控制下边界线条的长度 */
  border-left: 100px solid red; /* 控制左边界线条的长度及颜色 */
  border-right: 100px solid blue; /* 控制右边界线条的长度及颜色 */
}
</style>
