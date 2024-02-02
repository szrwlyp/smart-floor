import { ref } from "vue";
import { defineStore } from "pinia";

export const useGaugeStore = defineStore("gauge", () => {
  const splitCount = 60; //刻度总数

  const startAngle = 225; // 开始角度

  const endAngle = -45; // 结束角度

  const totalAngle = 270; //总的角度

  const currentValueEndAngle = ref(0); //值现在的结束角度

  const currentSplitNumber = ref(0); //当前刻度数

  const maxHeat = 31;

  const minHeat = 16;

  const heatRange = maxHeat - minHeat;

  function setCurrentValue(currentHeat: number) {
    const a = totalAngle / splitCount;

    const b = (splitCount / heatRange) * (currentHeat - minHeat);
    console.log(a, b);

    currentSplitNumber.value = b;

    currentValueEndAngle.value = a * b;
    // 144 32
  }

  function getValueEndAngle() {
    return startAngle - currentValueEndAngle.value;
  }

  return {
    startAngle,
    endAngle,
    maxHeat,
    minHeat,
    currentValueEndAngle,
    currentSplitNumber,
    setCurrentValue,
    getValueEndAngle,
  };
});
