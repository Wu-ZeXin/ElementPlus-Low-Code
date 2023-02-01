import { viteMockServe } from "vite-plugin-mock";

export function configMockPlugin(isBuild: boolean) {
  const viteMockPlugin = viteMockServe({
    //配置mock位置
    mockPath: "mock",
    localEnabled: !isBuild,
    prodEnabled: !isBuild,
  });
  return viteMockPlugin;
}
