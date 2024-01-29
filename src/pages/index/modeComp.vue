<script setup lang="ts">
import { ref, onMounted } from "vue";
import { modeMap } from "@/modules/index";
interface Props {
  modeType: number;
}
const props = defineProps<Props>();

// mode 1：制冷，2：制热，3：通风，4：键盘上锁
// const modeMap = new Map([
//   [1, { mode_icon: "../../static/images/3x/xuehua@3x.png", text: "制冷模式" }],
//   [2, { mode_icon: "../../static/images/3x/zhire@3x.png", text: "制热模式" }],
//   [3, { mode_icon: "../../static/images/tongfeng.png", text: "通风模式" }],
//   [4, { mode_icon: "../../static/images/3x/suoding@3x.png", text: "键盘上锁" }],
// ]);

interface Mode {
  mode_icon: string;
  text: string;
}
const mode = ref<Mode>({ mode_icon: "", text: "" });
onMounted(() => {
  if (modeMap.has(props?.modeType)) {
    mode.value = modeMap.get(props.modeType) as Mode;
  }
});
</script>

<template>
  <view class="device-mode">
    <image class="model-icon" :src="mode.mode_icon"> </image>
    <text class="text">{{ mode.text }}</text>
  </view>
</template>

<style lang="scss" scoped>
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
</style>
