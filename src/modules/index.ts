// mode 1：制冷，2：制热，3：通风，4：键盘上锁
export const modeMap = new Map([
  [1, { mode_icon: "/static/images/3x/xuehua@3x.png", text: "制冷模式" }],
  [2, { mode_icon: "/static/images/3x/zhire@3x.png", text: "制热模式" }],
  [3, { mode_icon: "/static/images/zidong.png", text: "通风模式" }],
  [4, { mode_icon: "/static/images/3x/suoding@3x.png", text: "键盘上锁" }],
]);

export const windSpeed = new Map([
  [1, { text: "自动", icon: "/static/images/3x/zidong@3x.png" }],
  [2, { text: "低风", icon: "/static/images/3x/difeng@3x.png" }],
  [3, { text: "中风", icon: "/static/images/3x/zhongfeng@3x.png" }],
  [4, { text: "高风", icon: "/static/images/3x/gaofeng@3x.png" }],
]);
