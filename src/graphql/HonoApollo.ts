import { ApolloServer, BaseContext, HeaderMap } from "@apollo/server";
import { Context as HonoContext, HonoRequest } from "hono";

const httpHeadersToMap = (headers: Headers) => {
  const map = new HeaderMap();

  const entries = headers.entries();

  for (const [key, value] of entries) {
    map.set(key, headers.get(key) ?? "");
  }

  return map;
};

export const HonoApollo = <Context extends BaseContext>(
  apollo: ApolloServer<Context>,
  options?: {
    context?: (request: HonoRequest) => Promise<Context>;
  },
) => {
  if (apollo === undefined || apollo === null) {
    throw new TypeError("You must pass in an instance of `ApolloServer`.");
  }

  apollo.assertStarted("HonoApollo()");

  const defaultContext = () => Promise.resolve({} as Context);

  const contextFunction = options?.context ?? defaultContext;

  return async (c: HonoContext) => {
    const httpGraphQLResponse = await apollo.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        headers: httpHeadersToMap(c.req.headers),
        // body: await c.req.json(),
        body: await getBody(c.req),
        method: c.req.method,
        search: new URL(c.req.url).search,
      },

      context: () => contextFunction(c.req),
    });

    const { headers, body, status } = httpGraphQLResponse;

    for (const [headerKey, headerValue] of headers) {
      void c.res.headers.append(headerKey, headerValue);
    }

    if (body.kind === "complete")
      if (c.req.method === "POST") {
        const response = JSON.parse(body.string);
        return c.json(response, { status: status ?? 200 });
      } else {
        return c.html(body.string, { status: status ?? 200 });
      }
    else {
      return c.json(body, { status: status ?? 200 });
    }
  };
};
function getBody(req: HonoRequest): unknown {
  if (req.method === "POST") {
    return req.json();
  } else {
    return req.text();
  }
}
