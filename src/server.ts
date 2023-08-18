import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import graphqlServer from "./graphql";
import { HonoApollo } from "./graphql/HonoApollo";

export const app = new Hono();

(async () => {
  app.use("*", cors(), logger(), compress(), prettyJSON());

  app.get("/health", (c) => {
    return c.json({ message: "OK" });
  });

  await graphqlServer.start();
  app.use("/graphql", HonoApollo(graphqlServer));
})();

export default app;
