import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), !process.env.VITEST && reactRouter()],
  test: {
    environment: "happy-dom",
    setupFiles: "./test/setup.ts",
  },
});
