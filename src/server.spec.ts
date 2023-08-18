import { beforeEach, describe, expect, it } from "vitest";

import app from "./server";

describe("Server", () => {
  let server: any;

  beforeEach(async () => {
    server = await app;
  });
  it("should have a health endpoint", async () => {
    const res = await server.request("/health");

    expect(res.status).toBe(200);
  });
});
