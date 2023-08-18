/// <reference types="vitest" />
/// <reference types="vite/client" />
// import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import graphqlLoader from "vite-plugin-graphql-loader";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), graphqlLoader()],
  test: {
    globals: true,
    // environment: "happy-dom",
    setupFiles: ["./test/setup-test-env.ts"],
    include: ["./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: [
      "./test/e2e/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "./src/graphql/schema.graphql",
      "**/screenshots/**",
    ],
    coverage: {
      reporter: ["cobertura", "html", "text"],
    },
    watchExclude: [
      ".*\\/node_modules\\/.*",
      ".*\\/build\\/.*",
      ".*\\/postgres-data\\/.*",
    ],
    typecheck: {
      tsconfig: "./tsconfig.json",
    },
  },
});
