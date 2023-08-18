import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import graphqlServer from "./graphql";
import { HonoApollo } from "./graphql/HonoApollo";
import internalLogger from "./lib/logger";

const server = (async () => {
  const server = new Hono();
  server.use("*", cors(), logger(), compress(), prettyJSON());

  server.get("/health", (c) => {
    return c.json({ message: "OK" });
  });

  await graphqlServer.start();

  internalLogger.info("GraphQL server started");
  server.use("/graphql", HonoApollo(graphqlServer));
  return server;
})();

export default server;
