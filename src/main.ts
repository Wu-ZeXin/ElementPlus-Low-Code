import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router";
import { setupStore } from "@/stores";
import { setupI18n } from "@/locales/setupI18n";

import "@/style/global.less";
import setupElementPlus from "@/packages/element-plus/el-import";
import setupDefineComponent from "@/packages/defineComponents";

async function bootstrap() {
  const app = createApp(App);

  // 加载自定义组件
  setupDefineComponent(app);
  // 配置状态仓库
  setupStore(app);
  // 配置路由
  app.use(router);
  // 按需加载Element-Plus组件及图标
  setupElementPlus(app);

  // 多语言配置
  await setupI18n(app);

  app.mount("#app");
}

bootstrap();
