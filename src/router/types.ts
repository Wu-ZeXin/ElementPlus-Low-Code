import type { RouteMeta, RouteRecordRaw } from "vue-router";

export type AppRouteRecordRaw = RouteRecordRaw & {
  path: string;
  name?: string;
  component?: any;
  hidden?: boolean;
  redirect?: string;
  children?: AppRouteRecordRaw[];
  meta?: RouteMeta;
};
