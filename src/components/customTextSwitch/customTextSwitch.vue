<template>
  <view class="custom-switch" @click="handleToggle">
    <text class="off"> OFF </text>
    <text class="on">ON</text>
    <view
      class="switch-t"
      :class="{ 'switch-on': !checked, 'switch-off': checked }"
    >
      <view class="switch-knob"></view
    ></view>
  </view>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

// 向外提供双向绑定的model值
const emit = defineEmits(["update:modelValue", "change"]);

// 持久化内部状态
const checked = ref(props.modelValue);

// 更新内部状态同时更新外部model
watch(
  () => props.modelValue,
  (newValue) => {
    checked.value = newValue;
  },
  {
    immediate: true,
  }
);

// 处理切换事件
function handleToggle() {
  if (!props.disabled) {
    checked.value = !checked.value;
    emit("update:modelValue", checked.value);
    emit("change", checked.value);
  }
}
</script>

<style lang="scss" scoped>
.custom-switch {
  width: 68px;
  height: 32px;
  border-radius: 40px;
  background: linear-gradient(90deg, #f2f9fa 0%, #f7feff 100%);
  box-shadow: 4px 4px 8px rgba(0, 118, 135, 0.05),
    -4px -4px 10px rgba(255, 255, 255, 0.5),
    6px 6px 20px rgba(0, 118, 135, 0.16);
  border: 1px solid #ffffff;
  font-size: 12px;
  font-weight: 400;
  color: #007c84;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  overflow: hidden;
  .switch-t {
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0;
    background: linear-gradient(90deg, #f2f9fa 0%, #f7feff 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s;
    transform: translateX(0);
    .switch-knob {
      position: absolute;
      width: 18px;
      height: 18px;
      background: rgba(36, 179, 189, 1);
      border: 2px solid rgba(255, 255, 255, 0.8);
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.05),
        -4px -4px 13px rgba(255, 255, 255, 0.6),
        6px 6px 10px rgba(0, 0, 0, 0.06);
      border-radius: 75px;
      /* box-shadow: 1px 1px 6px  #000000, -4px -4px 13px  #FFFFFF, 6px 6px 10px  #000000; */
    }
  }
  .off {
  }
  .on {
  }
  .switch-on {
    transform: translateX(100%);
  }
}
</style>
