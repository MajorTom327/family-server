import { serve } from "@hono/node-server";

import { getEnv } from "./config";
import server from "./server";

server.then((app) => {
  serve({
    port: getEnv("PORT", 3000),
    fetch: app.fetch,
  });
});
