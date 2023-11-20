import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import image from "@rollup/plugin-image";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [{ ...image(), enforce: "pre" }, preact()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
