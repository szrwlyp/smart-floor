<script setup lang="ts">
import { ref, onMounted, reactive, useSlots } from "vue";
import { useSystemStore } from "@/stores/system";
const { systemInfo, MenuRect } = useSystemStore();

const slots = useSlots();
console.log(slots);

type modeType = "includeMenu" | "onIncludeMenu";
interface Props {
  backgroundColor?: string;
  customNavBarStyle?: string;
  mode: modeType;
}
const props = withDefaults(defineProps<Props>(), {
  customNavBarStyle: "",
  mode: "includeMenu",
  backgroundColor: "transparent",
});

// 状态栏高度
const statusHeight = ref(0);

// 导航栏内容高度
const navContentHeight = ref(0);

const setNavBar = () => {
  let { statusBarHeight } = systemInfo as any;

  let { top, height } = MenuRect;

  // 设置状态栏高度
  statusHeight.value = statusBarHeight;

  // 设置导航栏内容高度
  navContentHeight.value = (top - statusBarHeight) * 2 + height;
};

const navBarStyle = ref("");
const setNavBarArrange = () => {
  if (props.mode === "includeMenu") {
    navBarStyle.value = `width:100%;`;
  } else {
    navBarStyle.value = `width:${MenuRect.left}px;${props.customNavBarStyle}`;
  }
};
onMounted(() => {
  setNavBar();
  // 设置导航栏内容排列
  setNavBarArrange();
});
</script>

<template>
  <view :style="{ height: `${statusHeight + navContentHeight}px` }"></view>
  <view
    class="custom-nav-bar"
    :style="{
      'background-color': props.backgroundColor,
    }"
  >
    <!-- 状态栏 -->
    <view :style="{ height: `${statusHeight}px` }"></view>

    <view
      class="nav-bar"
      :style="{ height: `${navContentHeight}px`, ...navBarStyle }"
    >
      <!-- 左侧内容，例如返回按钮 -->
      <view v-if="slots.center || slots.left" class="flex-items"
        ><slot name="left"></slot
      ></view>
      <!-- 中间内容，例如标题 -->
      <view v-if="slots.center" class="flex-items flex-center"
        ><slot name="center"></slot
      ></view>
      <!-- 右侧内容，例如更多按钮 -->
      <view v-if="slots.center || slots.right" class="flex-items"
        ><slot name="right"></slot
      ></view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.custom-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .nav-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .flex-items {
      flex: 1;
    }
    .flex-center {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
