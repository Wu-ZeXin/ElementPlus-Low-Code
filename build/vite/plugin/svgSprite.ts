import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    svgoOptions: isBuild,
    // default
    symbolId: "icon-[dir]-[name]",
  });
  return svgIconPlugin;
}
