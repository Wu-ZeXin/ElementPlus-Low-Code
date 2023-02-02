import type { App } from "vue";
import BasicComponent from "@/components/BasicComponent/src/BasicComponent.vue";
// Register icon sprite
import "virtual:svg-icons-register";

export default function setupDefineComponent(app: App) {
  [BasicComponent].forEach((v) => {
    app.component(v.__name as string, v);
  });
  return app;
}
