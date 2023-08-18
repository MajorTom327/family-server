import { Hono } from "hono";
import { afterEach, beforeEach } from "node:test";
import sendGraphqlRequest from "test/lib/sendGraphqlRequest";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Users } from "~/models";
import server from "~/server";

describe("Create a family", () => {
  let app: Hono;

  beforeAll(async () => {
    app = await server;
  });

  beforeEach(async () => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create a family", async () => {
    Users.setFamily = vi.fn();

    const result = await sendGraphqlRequest(app, {
      query: `
        mutation CreateFamily($familyInput: CreateFamilyInput!) {
          createFamily(familyInput: $familyInput) {
            id
            createdAt
            updatedAt
          }
        }
        `,
      variables: {
        familyInput: {
          ownerId: "1",
        },
      },
    });

    const json = await result.json();

    expect(result.status).toBe(200);
    expect(json.errors).toBeUndefined();

    expect(json.data.createFamily).toEqual({
      id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    expect(json.errors).toBeUndefined();
  });
});
