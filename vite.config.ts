import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/figaro-portfolio/" : "/",
  build: {
    chunkSizeWarningLimit: 900
  }
}));
