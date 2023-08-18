import { Hono } from "hono";

type GraphqlInput = {
  query: string;
  variables?: Record<string, unknown>;
};

export const sendGraphqlRequest = async (app: Hono, query: GraphqlInput) => {
  const request = new Request("http://localhost/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });
  return await app.request(request);
};

export default sendGraphqlRequest;
