<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { chartBaseOptionsType } from "@/typings/eCharts";
import { nenghaoOptions } from "@/modules/eCharts/index";
import Charts from "@/components/eCharts/eCharts.vue";
const quxian = ref<chartBaseOptionsType>({
  width: "622rpx",
  height: "400rpx",
  chartsId: "test",
  setOptions: nenghaoOptions,
});

onMounted(() => {});
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

<template>
  <view class="nenghao">
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
</template>

<style lang="scss" scoped>
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
</style>
