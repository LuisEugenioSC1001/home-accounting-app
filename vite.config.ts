import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tspaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
  build: {},
  plugins: [
    react(),
    tspaths(),
    VitePWA({
      registerType: "autoUpdate",
      mode: "development",
      base: "/",
      srcDir: "src",
      filename: "serviceWorker.js",
      strategies: "injectManifest",
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,jpg,png,svg}"],
        maximumFileSizeToCacheInBytes: 5000000,
      },
      manifest: {
        name: `Home Accounting`,
        short_name: `HA-App`,
        icons: [
          {
            src: "favicon/icon 32x32.png",
            sizes: "32x32",
            type: "image/png",
            density: "0.75",
          },
          {
            src: "favicon/icon 144x144.png",
            sizes: "144x144",
            type: "image/png",
            density: "3.0",
          },
        ],
      },
      devOptions: {
        enabled: false,
        type: "module",
        navigateFallback: "index.html",
      },
    }),
  ],
});
