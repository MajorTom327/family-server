import { faker } from "@faker-js/faker";
import { Hono } from "hono";
import { afterEach } from "node:test";
import sendGraphqlRequest from "test/lib/sendGraphqlRequest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Users } from "~/models";
import { IUser } from "~/models/User";
import server from "~/server";

describe("Create an user", () => {
  let app: Hono;

  beforeEach(async () => {
    app = await server;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create an user", async () => {
    const result = await sendGraphqlRequest(app, {
      query: `
          mutation {
            createUser(userInput: { email: "jconnor@sky.net", password: "password" }) {
              id
              email
              createdAt
              updatedAt
            }
          }
        `,
    });

    expect(result.status).toBe(200);

    const json = await result.json();

    expect(json.data.createUser).toEqual({
      id: expect.any(String),
      email: "jconnor@sky.net",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    expect(json.errors).toBeUndefined();

    const { createdAt, updatedAt } = json.data.createUser;

    expect(new Date(createdAt)).toEqual(new Date());
    expect(new Date(updatedAt)).toEqual(new Date());

    expect(new Date(createdAt)).toEqual(new Date(updatedAt));
  });
});

describe("Get an user", () => {
  let user: IUser;
  let app: Hono;

  beforeEach(async () => {
    vi.useFakeTimers();
    app = await server;
    user = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    Users.users = [user];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should get an user", async () => {
    const response = await sendGraphqlRequest(app, {
      query: `
        query getUser($id: ID!) {
          user(id: $id) {
            id
            email
            createdAt
            updatedAt
          }
        }`,
      variables: {
        id: user.id,
      },
    });

    expect(response.status).toBe(200);

    const json = await response.json();
    console.log(json);

    expect(json.data.user).toEqual({
      id: user.id,
      email: user.email,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("Should get an user with a wrong id", async () => {
    const response = await sendGraphqlRequest(app, {
      query: `
        query getUser($id: ID!) {
          user(id: $id) {
            id
            email
            createdAt
            updatedAt
          }
        }`,
      variables: {
        id: "wrong-id",
      },
    });

    expect(response.status).toBe(200);

    const json = await response.json();

    expect(json.data.user).toBeNull();
  });
});
