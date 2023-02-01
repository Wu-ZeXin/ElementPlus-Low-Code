import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { loadEnv, type ConfigEnv, type UserConfig } from "vite";
import { wrapperEnv, buildAssetsFile, buildChunkFile } from "./build/utils";
import { createVitePlugin } from "./build/vite/plugin";
import { createProxy } from "./build/vite/proxy";
import { OUTPUT_DIR } from "./build/constant";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const url = import.meta.url;

  // process.cwd()方法返回Node.js进程的当前工作目录。
  const root = process.cwd();

  // 加载 root 中的 .env 文件。
  const env = loadEnv(mode, root);

  // loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env);

  const isBuild = command === "build";

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,

    root,

    plugins: createVitePlugin(viteEnv, isBuild),

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", url)),
        "#": fileURLToPath(new URL("./types", url)),
        $locales: fileURLToPath(new URL("./src/locales/setupLocale.ts", url)),
        $stores: fileURLToPath(new URL("./src/stores/modules", url)),
        $styleVariable: fileURLToPath(new URL("./src/style/variable.module.less", url)),
      },
    },

    server: {
      host: true,
      port: VITE_PORT,
      open: true,
      cors: true,
      proxy: createProxy(VITE_PROXY),
    },

    esbuild: {
      // 删除对控制台API方法(如console.log)的所有调用
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },

    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      rollupOptions: {
        // 设置项目打包入口文件
        input: {
          index: resolve(__dirname, "index.html"),
        },
        // 设置项目打包资源输出文件，包括JS、CSS、图片
        output: {
          chunkFileNames: (chunkInfo) => buildChunkFile(chunkInfo),
          entryFileNames: "[name]-[hash].js",
          assetFileNames: (chunkInfo) => buildAssetsFile(chunkInfo),
        },
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve("src/style/variable.module.less")}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
  };
};
