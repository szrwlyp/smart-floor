<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSystemStore } from "@/stores/system";
const { systemInfo } = useSystemStore();
// #ifdef MP
const { getNavContentHeight } = useSystemStore();
// #endif
interface PopUp {
  showPopUp: boolean;
  round?: number;
  mode?: string;
}
const props = withDefaults(defineProps<PopUp>(), {
  showPopUp: false,
  round: 16,
  mode: "bottom",
});

const emits = defineEmits(["close", "open"]);
const popUpHeight = ref(0);

onMounted(() => {
  popUpHeight.value = systemInfo.windowHeight - 100;

  // #ifdef MP
  popUpHeight.value = systemInfo.windowHeight - getNavContentHeight() - 100;
  // #endif
});

const close = () => {
  emits("close");
};
const open = () => {
  console.log("打开了");
  // uToastRef.value.show({ message: systemInfo.windowHeight, duration: 3000 });
  // setTimeout(() => {
  //   uToastRef.value.show({ message: popUpHeight.value, duration: 3000 });
  // }, 3000);
  emits("open");
};
</script>

<template>
  <u-popup
    :show="props.showPopUp"
    :round="props.round"
    :mode="props.mode"
    @close="close"
    @open="open"
    ><view
      class="popup-item"
      :style="{
        height: `${popUpHeight}px`,
        'border-top-left-radius': `${props.round}px`,
        'border-top-right-radius': `${props.round}px`,
      }"
    >
      <slot></slot>
    </view>
  </u-popup>
</template>

<style lang="scss" scoped>
.popup-item {
  overflow-y: scroll;
}
</style>
