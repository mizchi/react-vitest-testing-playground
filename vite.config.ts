import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), !process.env.VITEST && reactRouter()],
  test: {
    coverage: {
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      all: true,
      include: ["app/**/*.{ts,tsx}"],
    },
    include: ["**/*.test.tsx", "**/*.test.ts"],
    environment: "happy-dom",
    setupFiles: "./test/setup.ts",
  },
});
