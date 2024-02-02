import { defineStore } from "pinia";
import { ref } from "vue";

export const useSystemStore = defineStore("system", () => {
  // 获取系统信息
  const systemInfo = uni.getSystemInfoSync();

  // 获取胶囊信息
  // #ifdef MP
  const MenuRect = uni.getMenuButtonBoundingClientRect();

  function getNavContentHeight() {
    let { statusBarHeight } = systemInfo as any;

    let { top, height } = MenuRect;

    // 设置导航栏内容高度
    return (top - statusBarHeight) * 2 + height + statusBarHeight;
  }
  // #endif

  return {
    systemInfo,
    // #ifdef MP
    MenuRect,
    getNavContentHeight,
    // #endif
  };
});
