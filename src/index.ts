import { serve } from "@hono/node-server";

import app from "./server";

const port = Number.parseInt(process.env.PORT || "3000");

serve({
  port,
  fetch: app.fetch,
});
