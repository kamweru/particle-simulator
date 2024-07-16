import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  plugins: [svelte(), terser()],
  build: {
    outDir: `${__dirname}/dist`,
    emptyOutDir: true,
    minify: true,
    cssCodeSplit: false,
    manifest: true,
    target: "esnext",
    rollupOptions: {
      output: {
        assetFileNames: (asset) => {
          let typePath = "static/styles";
          const type = asset.name.split(".").at(1);
          if (/png|jpe?g|webp|svg|gif|tiff|bmp|ico/i.test(type)) {
            typePath = "static/images";
          }
          return `${typePath}/[name]-[hash][extname]`;
        },
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
