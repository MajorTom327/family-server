export const external = [];

export const baseConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  sourcemap: true,
  target: ["es2020"],
  outfile: "dist/index.js",
  platform: "node",
  external,
  loader: { ".graphql": "text" },
  define: {},
};

export const productionConfig = {
  sourcemap: false,
  minify: true,
  drop: ["debugger", "console"],
};

export const developmentConfig = {};

export const config = {
  ...baseConfig,
  ...(process.env.NODE_ENV === "production"
    ? productionConfig
    : developmentConfig),
};

export default config;
