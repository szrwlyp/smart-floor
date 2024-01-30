<script setup lang="ts">
import { ref, watch } from "vue";
import { modeMap } from "@/modules/index";
interface Props {
  modeType: number;
}
const props = defineProps<Props>();

interface Mode {
  mode_icon: string;
  text: string;
}
const mode = ref<Mode>({ mode_icon: "", text: "" });
watch(
  () => props.modeType,
  (newValue) => {
    if (modeMap.has(newValue)) {
      mode.value = modeMap.get(newValue) as Mode;
    }
  },
  { immediate: true }
);
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
