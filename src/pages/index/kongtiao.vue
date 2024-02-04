<script setup lang="ts">
import { ref } from "vue";
import customSwitch from "@/components/customSwitch/customSwitch.vue";
import modeComp from "./modeComp.vue";
const emits = defineEmits([
  "openPopUp",
  "handleSwitchChange",
  "easyShuttleDevices",
]);
interface IDeviceList {
  name: string;
  status: boolean;
  mode: number;
  temperature: number;
}
interface Props {
  deviceList: Array<IDeviceList>;
}
const props = defineProps<Props>();
console.log(props.deviceList);

const switchChange = (value: any) => {
  emits("handleSwitchChange", value);
};
</script>

<template>
  <view class="device-list">
    <view class="operation">
      <view class="o-item" @click="emits('easyShuttleDevices', 'openAll')">
        <image class="o-item-image" src="@/static/images/3x/kongtiao@3x.png">
        </image>
        <text class="o-item-text">一键开启全部</text>
      </view>
      <view class="o-item" @click="emits('easyShuttleDevices', 'closeAll')">
        <image
          class="o-item-image"
          src="@/static/images/3x/yijianguanbi@3x.png"
        >
        </image>
        <text class="o-item-text">一键关闭全部</text>
      </view>
    </view>
    <template v-for="(item, index) in props.deviceList" :key="index">
      <view class="d-item">
        <view class="d-item-top">
          <text class="name">{{ item.name }}</text>
          <view class="status-setting">
            <!-- <switch color="#0EEB92" style="transform: scale(0.5)" /> -->
            <customSwitch
              v-model="item.status"
              @change="switchChange"
            ></customSwitch>
            <image
              @click="emits('openPopUp', item, index)"
              class="setting"
              src="@/static/images/3x/setting@3x.png"
            >
            </image>
          </view>
        </view>
        <view class="d-item-bottom">
          <modeComp :modeType="item.mode"></modeComp>
          <view class="device-mode">
            <image class="model-icon" src="@/static/images/3x/wenduji@3x.png">
            </image>
            <text class="text">气温{{ item.temperature }}°C</text>
          </view>
        </view>
        <view></view>
      </view>
    </template>
  </view>
</template>

<style lang="scss" scoped>
.device-list {
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
          margin-left: 14px;
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
</style>
