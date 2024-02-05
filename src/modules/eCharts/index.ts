// #ifdef VUE3
// #ifdef MP
const echarts = require("../../uni_modules/lime-echart/static/echarts.min");
// #endif

// #ifndef MP
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

export const nenghaoOptions = {
  grid: { left: 40, top: 10, right: 0, bottom: 30 },
  xAxis: {
    type: "category",
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    axisTick: { show: true, alignWithLabel: true },
  },
  yAxis: {
    type: "value",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320, 500, 300],
      type: "line",
      smooth: true,
      symbol: "none",
      lineStyle: {
        width: 4, // 线条宽度
        cap: "round",
      },
      itemStyle: {
        // borderCap: "round",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#5ED7FF", // 结束颜色
          },
          {
            offset: 1,
            color: "#5BD9CE", // 起始颜色
          },
        ]),
      },
    },
  ],
};
