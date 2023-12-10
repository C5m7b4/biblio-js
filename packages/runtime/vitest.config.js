import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    reporters: "verbose",
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
});
