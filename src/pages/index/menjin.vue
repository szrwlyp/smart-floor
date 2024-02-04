<script setup lang="ts">
import { ref } from "vue";
import customSwitch from "@/components/customSwitch/customSwitch.vue";
const lightingType = ref([
  { icon: "/static/images/3x/mj_shangbanzu@3x.png", text: "上班组" },
  { icon: "/static/images/3x/mj_jiabanzu.png", text: "加班组" },
  { icon: "/static/images/3x/mj_xiabanzu@3x.png", text: "下班组" },
  { icon: "/static/images/3x/zhibanzu@3x.png", text: "值班组" },
]);

const lightingList = ref([
  {
    text: "中心机房门禁",
    status: false,
  },
  {
    text: "二楼机房门禁",
    status: true,
  },

  {
    text: "中心机房门襟",
    status: false,
  },
  {
    text: "二楼机房门禁",
    status: true,
  },
  {
    text: "二楼机房门禁",
    status: true,
  },
  {
    text: "05-照明回路分区",
    status: true,
  },
]);

const logArr = ref([
  {
    date: "2023/05",
    day: "10",
    log: [{ status: true, time: "11:15", men: "办公室左门", name: "路人甲" }],
  },
  {
    date: "2023/05",
    day: "09",
    log: [
      { status: true, time: "11:15", men: "办公室左门", name: "路人甲" },
      { status: false, time: "11:15", men: "办公室左门", name: "路人乙" },
    ],
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
                src="/static/images/3x/mj_list_men_selected@3x.png"
                class="img"
              ></image
              ><image
                v-else
                src="/static/images/3x/mj_list_men@3x.png"
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

    <view class="mj-list">
      <view class="title">
        <text>门禁记录</text>
        <text>记录查询</text>
      </view>
      <view class="log-list">
        <template v-for="(item, index) of logArr" :key="index">
          <view class="log-list-item">
            <view class="log-list-item">
              <view class="date">
                <view class="date-text">
                  <text>{{ item.day }}</text>
                  <text>{{ item.date }}</text>
                </view>
                <view class="date-divider"></view>
              </view>
              <view class="log-arr">
                <template v-for="(i_item, i_index) of item.log" :key="i_index">
                  <view class="log">
                    <view class="log-top">
                      <view class="log-success-status" v-if="i_item.status">
                        <view class="success-style"></view>
                        <text class="status-title">进门成功</text>
                      </view>
                      <view class="log-error-status" v-else>
                        <view class="error-style"></view>
                        <text class="status-title">进门失败</text>
                      </view>
                      <text class="time">{{ i_item.time }}</text>
                    </view>
                    <view class="log-bottom">
                      <view class="men">
                        <image
                          src="/static/images/3x/log_list_icon@3x.png"
                        ></image>
                        <text>{{ i_item.men }}</text>
                      </view>
                      <view class="bottom-divider"></view>
                      <view class="personnel">
                        <image
                          class=""
                          src="/static/images/3x/log_list_personnel@3x.png"
                        >
                        </image>
                        <text>{{ i_item.name }}</text>
                      </view>
                    </view>
                  </view>
                </template>
              </view>
            </view>
          </view></template
        >
      </view>
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
    margin: 16px 0 20px 0;
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
  .mj-list {
    .title {
      display: flex;
      justify-content: space-between;
      text:nth-child(1) {
        color: #000000;
        font-size: 16px;
        font-weight: 500;
      }
      text:nth-child(2) {
        font-size: 14px;
        font-weight: 400;
        color: #2fc5b9;
      }
    }
    .log-list {
      margin-top: 16px;
      .log-list-item {
        margin-top: 12px;
        .log-list-item {
          display: flex;
          .date {
            flex: 0 1 50px;
            margin-right: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .date-divider {
              /* width: 1px; */
              /* height: 100%; */
              /* transform: rotate(90deg); */
              flex: 1;

              border: 0.5px dashed #4d4d4d;
            }
            .date-text {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-bottom: 6px;
              text:nth-child(1) {
                color: #000;
                font-size: 16px;
                font-weight: 700;
              }
              text:nth-child(2) {
                color: #999999;
                font-size: 14px;
                font-weight: 400;
                /* margin-top: 10px; */
              }
            }
          }
          .log-arr {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 12px;
            .log {
              /* height: 92px; */
              border-radius: 8px;
              background: #f5f8f8;
              padding: 16px;
              .log-top {
                display: flex;
                justify-content: space-between;
                margin-bottom: 17px;
                .log-success-status {
                  display: flex;
                  align-items: center;
                  .success-style {
                    width: 12px;
                    height: 12px;
                    opacity: 1;
                    background: #ffffff;
                    border-radius: 50%;
                    border: 2.5px solid #2bc4b8;
                    margin-right: 8px;
                  }
                  .status-title {
                    color: #000000;
                    font-size: 16px;
                    font-weight: 500;
                  }
                }
                .log-error-status {
                  display: flex;
                  align-items: center;
                  .error-style {
                    width: 12px;
                    height: 12px;
                    opacity: 1;
                    background: #ffffff;
                    border-radius: 50%;
                    border: 2.5px solid #e61c1c;
                    margin-right: 8px;
                  }
                  .status-title {
                    color: #000000;
                    font-size: 16px;
                    font-weight: 500;
                  }
                }
                .time {
                  font-size: 14px;
                  color: #666666;
                  font-weight: 400;
                }
              }
              .log-bottom {
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                .bottom-divider {
                  height: 16px;
                  width: 1px;
                  background: #dce2e6;
                }
                .men {
                  display: flex;
                  align-items: center;
                  image {
                    width: 12px;
                    height: 14px;
                  }
                  text {
                    margin-left: 6px;
                    font-size: 15px;
                    font-weight: 400;
                    color: #444444;
                  }
                }
                .personnel {
                  display: flex;
                  align-items: center;
                  image {
                    width: 16px;
                    height: 16px;
                  }
                  text {
                    margin-left: 6px;
                    font-size: 15px;
                    font-weight: 400;
                    color: #444444;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
