import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  test: {
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    environment: "jsdom",
  },
  plugins: [react()],
});
