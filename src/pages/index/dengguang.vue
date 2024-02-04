<script setup lang="ts">
import { ref } from "vue";
import customSwitch from "@/components/customSwitch/customSwitch.vue";
const lightingType = ref([
  { icon: "/static/images/3x/dg_shangbanzu@3x.png", text: "上班组-全开" },
  { icon: "/static/images/3x/dg_jiabanzu.png", text: "加班组-半开" },
  { icon: "/static/images/3x/dg_xiabanzu@3x.png", text: "下班组-全关" },
  { icon: "/static/images/3x/zhibanzu@3x.png", text: "值班组" },
]);

const lightingList = ref([
  {
    text: "应急灯回路",
    status: true,
  },
  {
    text: "01-照明回路分区",
    status: true,
  },

  {
    text: "02-照明回路分区",
    status: true,
  },
  {
    text: "03-照明回路分区",
    status: true,
  },
  {
    text: "04-照明回路分区",
    status: false,
  },
  {
    text: "05-照明回路分区",
    status: false,
  },
]);
const switchChange = (value: any) => {
  console.log(value);
};
</script>

<template>
  <view class="lighting">
    <view class="lighting-type">
      <template v-for="(item, index) of lightingType" :key="index">
        <view class="item">
          <image class="icon" :src="item.icon"></image>
          <text class="text">{{ item.text }}</text>
        </view></template
      >
    </view>
    <view class="lighting-list">
      <template v-for="(item, index) in lightingList">
        <view class="list-item">
          <view class="control">
            <view class="control-img">
              <image
                v-if="item.status"
                src="/static/images/3x/dg_dingdeng_selected@3x.png"
                class="img"
              ></image
              ><image
                v-else
                src="/static/images/3x/dg_dingdeng@3x.png"
                class="img"
              ></image
            ></view>
            <customSwitch
              v-model="item.status"
              @change="switchChange"
            ></customSwitch>
          </view>
          <view class="text">{{ item.text }}</view>
        </view></template
      >
    </view>
  </view>
</template>

<style lang="scss" scoped>
.lighting {
  .lighting-type {
    display: flex;
    justify-content: space-between;
    height: 42px;
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon {
        width: 20px;
        height: 20px;
      }
      .text {
        font-size: 12px;
        font-weight: 400;
        color: #1c2533;
        margin-top: 2px;
      }
    }
  }
  .lighting-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    margin-top: 16px;
    .list-item {
      height: 152rpx;
      background: #f0f5f5;
      border-radius: 8px;
      padding: 12px;
      .control {
        display: flex;
        justify-content: space-between;
        .control-img {
          width: 40px;
          height: 40px;
          background: #fff;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          .img {
            width: 24px;
            height: 24px;
          }
        }
      }
      .text {
        font-size: 14px;
        color: #222222;
        font-weight: 400;
        margin-top: 10px;
      }
    }
  }
}
</style>
