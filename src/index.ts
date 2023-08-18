import { serve } from "@hono/node-server";

import { getEnv } from "./config";
import app from "./server";

serve({
  port: getEnv("PORT", 3000),
  fetch: app.fetch,
});
