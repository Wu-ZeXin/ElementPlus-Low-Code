import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { routes } from "@/router/routes";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
