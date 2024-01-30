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
    <!-- #endif -->
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
            <view>{{ item.title }}</view>
            <image
              v-if="index === currentDevice"
              style="width: 16px; height: 7px; position: absolute; bottom: -6px"
              src="@/static/images/xuanzhong.svg"
            ></image> </view
        ></template>
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
          <view class="o-item" @click="easyShuttleDevices('openAll')">
            <image
              class="o-item-image"
              src="@/static/images/3x/kongtiao@3x.png"
            >
            </image>
            <text class="o-item-text">一键开启全部</text>
          </view>
          <view class="o-item" @click="easyShuttleDevices('closeAll')">
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
                  <!-- <switch color="#0EEB92" style="transform: scale(0.5)" /> -->
                  <customSwitch
                    v-model="item.status"
                    @change="handleSwitchChange"
                  ></customSwitch>
                  <image
                    @click="openPopUp(item, index)"
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
      </view>
    </view>
    <u-popup :show="showPopUp" :round="16" mode="bottom">
      <view class="pop-setting">
        <view class="header">
          <text class="title"> 空调设置 </text>
          <image
            @click="closePopUp"
            class="close-icon"
            src="@/static/images/3x/close@3x.png"
          >
          </image>
        </view>
        <view class="current-wendu-status">
          <text class="wendu">当前温度：{{ popUpValue.temperature }}°C</text>
          <customTextSwitch
            v-model="popUpValue.status"
            @change="handleSwitchChange"
          ></customTextSwitch>
        </view>
        <view class="gauge"></view>
        <view class="setting-mode">
          <template v-for="(item, key) of modeList" :key="key">
            <view
              class="setting-mode-item"
              :class="{
                'setting-mode-item-selected': popUpValue.mode === item.mode,
              }"
              @click="handleModeType(item.mode)"
            >
              <image class="type-icon" :src="item.mode_icon"> </image>
              <text class="type-text">{{ item.text }}</text>
            </view>
          </template>
        </view>
        <view class="wind-speed">
          <template v-for="(item, key) of windSpeedList" :key="key">
            <view
              class="wind-speed-item"
              :class="{
                'wind-speed-item-selected': popUpValue.windSpeed === key,
              }"
              @click="handleWindSpeed(key)"
            >
              <image class="icon" :src="item.icon"> </image>
              <text class="text">{{ item.text }}</text>
            </view>
          </template>
        </view>
        <view class="popup-submit" @click="handlePopUpSubmit">执行</view>
      </view>
    </u-popup>

    <Charts :chartBaseOptions="chartBaseOptions"></Charts>
    <Charts :chartBaseOptions="chartBaseOptions1"></Charts>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
import CustomNavBar from "@/components/CustomNavBar/CustomNavBar.vue";
import modeComp from "./modeComp.vue";
import { modeMap, windSpeed } from "@/modules/index";
import customTextSwitch from "@/components/customTextSwitch/customTextSwitch.vue";
import customSwitch from "@/components/customSwitch/customSwitch.vue";
import Charts from "@/components/eCharts/eCharts.vue";
import { demo1, demo2 } from "@/modules/eCharts/demo";
import type { chartBaseOptionsType } from "@/typings/eCharts";

const chartBaseOptions = ref<chartBaseOptionsType>({
  width: "750rpx",
  height: "500rpx",
  chartsId: "test",
  setOptions: demo2,
});
const chartBaseOptions1 = ref<chartBaseOptionsType>({
  width: "750rpx",
  height: "500rpx",
  chartsId: "test",
  setOptions: demo2,
});

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
// 一键开启全部
const easyShuttleDevices = (value: string) => {
  deviceList.value = deviceList.value.map((item) => {
    value === "openAll" ? (item.status = true) : (item.status = false);
    return item;
  });
};

// 设备列表
// mode 1：制冷，2：制热，3：通风，4：键盘上锁
interface IDeviceList {
  name: string;
  status: boolean;
  mode: number;
  temperature: number;
}
const deviceList = ref<Array<IDeviceList>>([
  { name: "东侧空调", status: false, mode: 1, temperature: 24 },
  { name: "东侧空调", status: true, mode: 3, temperature: 21 },
  { name: "东侧空调", status: true, mode: 4, temperature: 24 },
  { name: "东侧空调", status: false, mode: 2, temperature: 14 },
  { name: "东侧空调", status: true, mode: 1, temperature: 30 },
  { name: "东侧空调", status: true, mode: 1, temperature: 26 },
  { name: "东侧空调", status: false, mode: 1, temperature: 28 },
]);

// 底部弹出框Popup
const showPopUp = ref(false);
const modeList = ref([...modeMap.values()]);
const windSpeedList = ref([...windSpeed.values()]);
const listCurrentIndex = ref(0);
interface PopUpValue {
  name: string;
  status: boolean;
  windSpeed?: number;
  mode: number;
  temperature: number;
}
const popUpValue = ref<PopUpValue>({
  name: "",
  status: true,
  windSpeed: 0,
  mode: 1,
  temperature: 1,
});
const handleModeType = (i: number) => {
  popUpValue.value.mode = i;
};
const handleWindSpeed = (i: number) => {
  popUpValue.value.windSpeed = i;
};
const openPopUp = (item: IDeviceList, index: number) => {
  showPopUp.value = true;

  console.log(item);
  popUpValue.value = { ...popUpValue.value, ...item };
  listCurrentIndex.value = index;
};
const closePopUp = () => {
  showPopUp.value = false;
};
const handlePopUpSubmit = () => {
  let data = Object.assign({}, popUpValue.value);

  delete data.windSpeed;
  console.log(data);
  deviceList.value.splice(listCurrentIndex.value, 1, data);
  closePopUp();
};

onMounted(() => {
  setTimeout(() => {
    chartBaseOptions.value.setOptions = {
      title: {
        text: "ECharts 入门示例111",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [25, 40, 56, 17, 7, 20],
        },
      ],
    };
  }, 3000);
  setTimeout(() => {
    chartBaseOptions1.value.setOptions = {
      title: {
        text: "ECharts 入门示例111",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [40, 400, 560, 170, 70, 20],
        },
      ],
    };
  }, 5000);
});

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

const handleSwitchChange = (v: boolean) => {
  console.log(v);
  console.log(deviceList.value);
};
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
    background: rgba(133, 224, 255, 0.7);
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
        display: flex;
        justify-content: center;
        position: relative;
      }
      .device-selected {
        color: #000;
        font-weight: 500;
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
    }
  }
  .pop-setting {
    padding: 16px;
    background: linear-gradient(180deg, #f5f9fa 0%, #ffffff 100%);
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        color: #222222;
        font-size: 18px;
        font-weight: 500;
      }
      .close-icon {
        width: 20px;
        height: 20px;
      }
    }
    .current-wendu-status {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .wendu {
        color: #007c84;
        font-size: 16px;
        font-weight: 400;
      }
    }
    .gauge {
      margin: 24px auto;
      /* width: 280px;
      height: 280px; */
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: linear-gradient(90deg, #f2f9fa 0%, #f7feff 100%);
      box-shadow: 4px 4px 8px rgba(0, 118, 135, 0.05),
        -4px -4px 10px rgba(255, 255, 255, 0.5),
        6px 6px 20px rgba(0, 118, 135, 0.16);
      border: 2px solid #ffffff;
    }
    .setting-mode {
      /* width: 327px; */
      height: 72px;
      border-radius: 8px;
      /* margin: 0 auto; */
      background: linear-gradient(90deg, #f2f9fa 0%, #f7feff 100%);
      box-shadow: 4px 4px 8px rgba(0, 118, 135, 0.05),
        -4px -4px 10px rgba(255, 255, 255, 0.5),
        6px 6px 20px rgba(0, 118, 135, 0.16);
      border: 1px solid #ffffff;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .setting-mode-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 72px;
        height: 62px;
        .type-icon {
          width: 20px;
          height: 20px;
          margin-bottom: 4px;
        }
        .type-text {
          color: #485161;
          font-size: 14px;
          font-weight: 400;
        }
      }

      .setting-mode-item-selected {
        background: rgba(43, 196, 184, 0.2);
        border-radius: 8px;
        .type-text {
          color: #2bc4b8;
        }
      }
    }
    .wind-speed {
      margin: 20px 0 38px 0;
      display: flex;
      justify-content: space-between;
      .wind-speed-item {
        width: 68px;
        height: 72px;
        background: linear-gradient(90deg, #f2f9fa 0%, #f7feff 100%);
        box-shadow: 4px 4px 8px rgba(0, 118, 135, 0.05),
          -4px -4px 10px rgba(255, 255, 255, 0.5),
          6px 6px 20px rgba(0, 118, 135, 0.16);
        border: 1px solid #ffffff;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .icon {
          width: 24px;
          height: 24px;
          margin-bottom: 4px;
        }
        .text {
          color: #485161;
          font-size: 14px;
          font-weight: 400;
        }
      }
      .wind-speed-item-selected {
        background: linear-gradient(90deg, #bfdfe0 0%, #e6f7fa 100%);
      }
    }
    .popup-submit {
      width: 100%;
      height: 40px;
      border-radius: 6px;
      background: #2bc4b8;
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      display: flex;
      justify-content: center;
      align-items: center;
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
