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
  console.log("aaa");
  console.log(!props.disabled);
  if (!props.disabled) {
    checked.value = !checked.value;
    emit("update:modelValue", checked.value);
    emit("change", checked.value);
  }
}
</script>

<template>
  <view class="custom-switch" @click="handleToggle">
    <view class="switch-bg" :class="{ 'on-bg': !checked }"></view>
    <view
      class="switch-knob"
      :class="{ 'switch-on': !checked, 'switch-off': checked }"
    ></view>
  </view>
</template>

<style lang="scss" scoped>
.custom-switch {
  position: relative;
  width: 24px;
  height: 12px;
  display: flex;
  align-items: center;
  .switch-bg {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(196, 242, 224, 1);
  }
  .on-bg {
    background: #d5e8e7;
  }

  .switch-knob {
    position: absolute;
    width: 16px;
    height: 16px;
    background: rgba(14, 235, 146, 1);
    border-radius: 75px;
    transition: transform 0.3s;
    transform: translateX(12px);
  }
  .switch-on {
    transform: translateX(-4px);
    background: #9fc2bf;
  }
  .switch-off {
  }
}
</style>
