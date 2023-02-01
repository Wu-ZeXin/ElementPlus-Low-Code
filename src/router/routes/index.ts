import type { AppRouteRecordRaw } from "@/router/types";

export const routes: AppRouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
];
