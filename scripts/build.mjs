import esbuild from "esbuild";
import config from "./config.mjs";

(async () => {
  const isWatch = ["--watch", "-w"].reduce(
    (red, el) => red || process.argv.includes(el),
    false
  );

  if (isWatch) {
    console.log("Watching for changes...");
    const ctx = await esbuild.context(config);
    await ctx.watch();
  } else {
    console.log("Building in production mode");
    await esbuild.build(config);
  }
})();
