<template>
  <view class="index" :class="{ tet: showPopUp }">
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
            :class="{ 'device-selected': item.type === currentDevice }"
            @click="handleDeviceSelected(item.type)"
          >
            <view>{{ item.title }}</view>
            <image
              v-if="item.type === currentDevice"
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

        <!-- 空调 -->
        <view v-show="currentDevice === 'kongtiao'" class="device-list">
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

        <!-- 能耗 -->
        <view v-show="currentDevice === 'nenghao'" class="nenghao">
          <view class="overview">
            <view class="titile">能耗总览</view>
            <view class="value">
              <view class="measure">
                <view class="measure-kw">
                  <text>235</text>
                  <text>kw</text>
                </view>
                <view class="measure-label">日用电量</view>
              </view>
              <view class="measure">
                <view class="measure-kw">
                  <text>235</text>
                  <text>kw</text>
                </view>
                <view class="measure-label">月用电量</view>
              </view>
              <view class="measure">
                <view class="measure-kw">
                  <text>235</text>
                  <text>kw</text>
                </view>
                <view class="measure-label">年用电量</view>
              </view>
            </view>
          </view>
          <view class="curve-echart">
            <view class="t">
              <view class="title">本月用电曲线</view>
              <view class="month">
                <view>本月</view>
              </view></view
            >
            <Charts :chartBaseOptions="quxian"></Charts>
          </view>
          <view class="curve-echart">
            <view class="t">
              <view class="title">电表用电量</view>
              <view class="month">
                <view>本月</view>
              </view></view
            >
            <template v-for="(item, index) of companyDosage" :key="index">
              <view class="company-dosage">
                <view class="name">
                  <text>{{ item.companyName }}</text>
                  <text>{{ item.dosage }}kw</text>
                </view>
                <u-line-progress
                  :percentage="30"
                  :showText="false"
                  height="8"
                  activeColor="#2BC4B8"
                ></u-line-progress> </view
            ></template>
          </view>
        </view>
      </view>
    </view>
    <MyPopUp :showPopUp="showPopUp" @close="closePopUp" @open="open">
      <view class="pop-setting" v-if="showPopUp">
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
        <view class="gauge">
          <Charts :chartBaseOptions="wenduGauge"></Charts>
          <view @click="handlerHeat('jia')" class="heat_operation jia">
            <text class="line-x"></text>
            <text class="line-y"></text>
          </view>
          <view @click="handlerHeat('jian')" class="heat_operation jian">
            <text class="line-x"></text>
          </view>
        </view>
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
    </MyPopUp>
    <!-- <Charts :chartBaseOptions="wenduGauge"></Charts> -->
    <!-- <Charts :chartBaseOptions="wenduGauge"></Charts>
    <Charts :chartBaseOptions="chartBaseOptions1"></Charts> -->
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { onPageScroll } from "@dcloudio/uni-app";
import CustomNavBar from "@/components/CustomNavBar/CustomNavBar.vue";
import modeComp from "./modeComp.vue";
import { modeMap, windSpeed } from "@/modules/index";

import customTextSwitch from "@/components/customTextSwitch/customTextSwitch.vue";
import customSwitch from "@/components/customSwitch/customSwitch.vue";
import Charts from "@/components/eCharts/eCharts.vue";
import { demo1, demo2 } from "@/modules/eCharts/demo";
import type { chartBaseOptionsType } from "@/typings/eCharts";
import { nenghaoOptions } from "@/modules/eCharts/index";
import MyPopUp from "@/components/myPopUp/myPopUp.vue";

import { useGaugeStore } from "@/stores/utils";
const { currentValueEndAngle, currentSplitNumber } = storeToRefs(
  useGaugeStore()
);
const gaugeStore = useGaugeStore();

const chartBaseOptions = ref<chartBaseOptionsType>({
  width: "750rpx",
  height: "500rpx",
  chartsId: "test",
  setOptions: demo2,
});
const chartBaseOptions1 = ref<chartBaseOptionsType>({
  width: "622rpx",
  height: "400rpx",
  chartsId: "test",
  setOptions: demo2,
});

const wenduGauge = ref<chartBaseOptionsType>({
  width: "200px",
  height: "200px",
  chartsId: "test",
  setOptions: {
    graphic: [
      {
        type: "text",
        left: 20,
        top: 170,
        scaleX: 1.4,
        scaleY: 1.4,
        style: {
          text: gaugeStore.minHeat + "°C",
          fill: "#007C84",
        },
      },
      {
        type: "text",
        left: 155,
        top: 170,
        scaleX: 1.4,
        scaleY: 1.4,
        style: {
          text: gaugeStore.maxHeat + "°C",
          fill: "#007C84",
        },
      },
      {
        type: "text",
        x: 120,
        y: 84,
        scaleX: 1.3,
        scaleY: 1.3,
        style: {
          text: "°C",
          fill: "#007C84",
        },
      },
    ],
    series: [],
  },
});

const setGaugeOption = () => {
  const dataArr = [
    {
      type: "gauge",
      radius: "90%",
      splitNumber: 1,
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          opacity: 1,
          color: [[1, "#007C84"]],
        },
      },
      startAngle: gaugeStore.startAngle,
      endAngle: gaugeStore.endAngle,
      title: { show: false },
      detail: { show: false },
      splitLine: { show: false },
      axisTick: {
        length: 10,
        splitNumber: 60,
        lineStyle: {
          color: "rgba(0, 118, 135, 0.2)",
          width: 2,
        },
      },
      axisLabel: { show: false },
      pointer: { show: false },
      itemStyle: {},
    },
    {
      type: "gauge",
      radius: "90%",
      splitNumber: currentSplitNumber.value ? 1 : 0,
      axisLine: {
        show: false,
        lineStyle: {
          width: 0,
          opacity: 0,
        },
      },
      startAngle: gaugeStore.startAngle,
      endAngle: gaugeStore.getValueEndAngle(),
      title: { show: false },
      detail: {
        show: true,
        offsetCenter: [0, 0],
        color: "#00495F",
        fontSize: 34,
      },
      splitLine: { show: false },
      axisTick: {
        length: 11,
        splitNumber: currentSplitNumber.value,
        lineStyle: {
          color: "#23BAC4",
          width: 2,
        },
      },
      axisLabel: { show: false },
      pointer: { show: false },
      itemStyle: {},

      data: [{ value: popUpValue.value.temperature }],
    },
  ];
  wenduGauge.value.setOptions.series = dataArr;
};

// 设备类型
const deviceType = ref([
  { title: "空调", type: "kongtiao" },
  { title: "能耗", type: "nenghao" },
  { title: "灯光", type: "dengguang" },
  { title: "风机", type: "fengji" },
  { title: "门禁", type: "menjin" },
  { title: "视频", type: "shipin" },
]);
const currentDevice = ref("nenghao");
const handleDeviceSelected = (type: string) => {
  currentDevice.value = type;
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
  { name: "东侧空调", status: false, mode: 1, temperature: 32 },
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
  temperature: 24,
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

const handlerHeat = (type: string) => {
  console.log(popUpValue.value.temperature);

  let count =
    type === "jia"
      ? popUpValue.value.temperature + 1
      : popUpValue.value.temperature - 1;
  console.log(count);
  if (count >= 16 && count <= 31) {
    popUpValue.value.temperature = count;

    open();
  }
};
const open = () => {
  gaugeStore.setCurrentValue(popUpValue.value.temperature);
  setGaugeOption();
};
const handlePopUpSubmit = () => {
  let data = Object.assign({}, popUpValue.value);

  delete data.windSpeed;
  console.log(data);
  deviceList.value.splice(listCurrentIndex.value, 1, data);
  closePopUp();
};

onMounted(() => {
  setGaugeOption();
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

/*******************************************************能耗***************************************************/
const quxian = ref<chartBaseOptionsType>({
  width: "622rpx",
  height: "400rpx",
  chartsId: "test",
  setOptions: nenghaoOptions,
});

const companyDosage = ref([
  {
    companyName: "掌舵科技有限公司",
    dosage: 454,
  },
  {
    companyName: "掌舵科技有限公司",
    dosage: 200,
  },
  {
    companyName: "掌舵科技有限公司",
    dosage: 150,
  },
  {
    companyName: "掌舵科技有限公司",
    dosage: 600,
  },
  {
    companyName: "掌舵科技有限公司",
    dosage: 1030,
  },
  {
    companyName: "掌舵科技有限公司",
    dosage: 454,
  },
  {
    companyName: "掌舵科技有限公司",
    dosage: 410,
  },
  {
    companyName: "掌舵科技有限公司",
    dosage: 803,
  },
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

      .nenghao {
        .overview {
          /* height: 110px; */
          margin-top: 16px;
          padding: 16px 12px;
          background: url("@/static/images/3x/nenghao_bg@3x.png") no-repeat;
          background-size: 100%;
          .titile {
            color: #324761;
            font-size: 14px;
            font-weight: 500;
          }
          .value {
            margin-top: 12px;
            display: flex;
            justify-content: space-around;
            .measure {
              .measure-kw {
                text:nth-child(1) {
                  color: #00ba82;
                  font-size: 16px;
                  font-weight: 500;
                }
                text:nth-child(2) {
                  font-size: 12px;
                  color: #91969e;
                  font-weight: 400;
                  margin-left: 3px;
                }
              }
              .measure-label {
                font-size: 12px;
                font-weight: 400;
                color: #535a66;
                margin-top: 6px;
              }
            }
          }
        }
        .curve-echart {
          margin-top: 16px;
          .t {
            display: flex;
            justify-content: space-between;
            margin-bottom: 14px;
            align-items: center;

            .title {
              font-size: 16px;
              font-weight: 500;
              color: #000;
            }
            .month {
              width: 80px;
              height: 32px;
              border-radius: 4px;
              background: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #f0f0f0;
            }
          }
          .company-dosage {
            margin-bottom: 16px;
            .name {
              color: #7f8694;
              font-size: 14px;
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              /* text:nth-child(1){} */
            }
          }
        }
      }
    }
  }
  .pop-setting {
    padding: 16px;
    /* #ifdef H5 */
    padding: 16px 16px 70px 16px;
    /* #endif */

    background: linear-gradient(180deg, #f5f9fa 0%, #ffffff 100%);
    /* position: relative; */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* position: fixed;
      top: 0; */
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
      width: 280px;
      height: 280px;
      /* width: 200px;
      height: 200px; */
      border-radius: 50%;
      background: linear-gradient(90deg, #f2f9fa 0%, #f7feff 100%);
      box-shadow: 4px 4px 8px rgba(0, 118, 135, 0.05),
        -4px -4px 10px rgba(255, 255, 255, 0.5),
        6px 6px 20px rgba(0, 118, 135, 0.16);
      border: 2px solid #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .jia {
        top: 217px;
        left: 104px;
      }
      .jian {
        top: 217px;
        left: 150px;
      }
      .heat_operation {
        width: 32px;
        height: 32px;
        position: absolute;

        background: rgba(250, 252, 252, 1);

        border: 1px solid rgba(255, 255, 255, 1);

        box-shadow: 4px 4px 10px rgba(0, 118, 135, 0.05),
          -4px -4px 13px rgba(255, 255, 255, 0.5),
          6px 6px 30px rgba(0, 118, 135, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        /* font-size: 25px;
        color: #007c84; */
        z-index: 10;
        .line-x {
          width: 12px;
          height: 0;
          border: 1px solid #007c84;
        }
        .line-y {
          position: absolute;
          width: 12px;
          height: 0;
          border: 1px solid #007c84;
          transform: rotate(-90deg);
        }
      }
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

.tet {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
</style>
