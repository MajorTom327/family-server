import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import graphqlServer from "./graphql";
import { HonoApollo } from "./graphql/HonoApollo";
import internalLogger from "./lib/logger";

export const app = new Hono();

export default new Promise<typeof app>(async (resolve) => {
  app.use("*", cors(), logger(), compress(), prettyJSON());

  app.get("/health", (c) => {
    return c.json({ message: "OK" });
  });

  await graphqlServer.start();

  internalLogger.info("GraphQL server started");
  app.use("/graphql", HonoApollo(graphqlServer));
  resolve(app);
});
