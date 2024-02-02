<script setup lang="ts">
import LEchart from "@/uni_modules/lime-echart/components/l-echart/l-echart.vue";
import { ref, onMounted, toRefs, watch } from "vue";
import type { chartBaseOptionsType } from "@/typings/eCharts";

// #ifdef VUE3
// #ifdef MP
const echarts = require("../../uni_modules/lime-echart/static/echarts.min");
// #endif

// #ifdef WEB
import * as echarts from "echarts";
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
  GaugeChart,
} from "echarts/charts";
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent,
  GaugeChart,
]);
// #endif
// #endif

/**
 * Props
 * @param chartBaseOptions 基础配置
 */
interface Props {
  chartBaseOptions?: chartBaseOptionsType;
  // setOptions: Object;
}

const props = withDefaults(defineProps<Props>(), {
  chartBaseOptions: () => {
    return {
      width: "200px",
      height: "200px",
      chartsId: "test",
      setOptions: {},
    };
  },
});

let { width, height, chartsId } = toRefs<chartBaseOptionsType>(
  props.chartBaseOptions
);

// 监听setOptions并更新
watch(
  () => props.chartBaseOptions.setOptions,
  (newValue, oldValue) => {
    console.log(newValue);
    initWebChart();
  },
  { deep: true }
);

// 初始化图表
const chartRef = ref<any>(null);
const initWebChart = async () => {
  if (!chartRef.value) return;
  // const myChart = await chartRef.value.init(echarts);
  // myChart.setOption(props.chartBaseOptions.setOptions);
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  setTimeout(async () => {
    if (!chartRef.value) return;
    const myChart = await chartRef.value.init(echarts);
    myChart.setOption(props.chartBaseOptions.setOptions);
  }, 300);
};

onMounted(() => {
  initWebChart();
});
</script>

<template>
  <view :style="{ width: width, height: height }"
    ><LEchart ref="chartRef"></LEchart
  ></view>
</template>

<style lang="scss" scoped></style>
