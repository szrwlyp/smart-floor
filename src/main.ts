import { createSSRApp } from "vue";
import uviewPlus from "uview-plus";
import * as Pinia from "pinia";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  app.use(uviewPlus);
  return {
    app,
    Pinia,
  };
}
