import { faker } from "@faker-js/faker";
import { beforeEach } from "node:test";
import { afterEach, describe, expect, it, vi } from "vitest";

import User from "./User";

describe("Get a page", () => {
  it("should return the first page", () => {
    const users = new User();

    users.users = Array.from({ length: 15 }, (_, index) => {
      return {
        id: index.toString(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const page = users.getUsers(0);

    const ids = page.map((user) => user.id);

    expect(page.length).toBe(10);
    expect(ids).toEqual(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  });

  it("should return the second partial page", () => {
    const users = new User();

    users.users = Array.from({ length: 15 }, (_, index) => {
      return {
        id: index.toString(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const page = users.getUsers(1);

    const ids = page.map((user) => user.id);

    expect(page.length).toBe(5);
    expect(ids).toEqual(["10", "11", "12", "13", "14"]);
  });
});

describe("Get a user", () => {
  it("should return a user", () => {
    const users = new User();

    const user = {
      id: "1",
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.users = [user];

    const result = users.getUser("1");

    expect(result).toEqual(user);
  });

  it("should return null", () => {
    const users = new User();

    const result = users.getUser("1");

    expect(result).toBeNull();
  });

  it("should return a item in the list", () => {
    const users = new User();

    const user = {
      id: "1",
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.users = Array.from({ length: 10 }, () => {
      return {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    users.users.push(user);

    users.users.sort((a, b) => Math.random() - Math.random());

    const result = users.getUser("1");
    expect(result).toEqual(user);
  });
});

describe("Create a user", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create a user", () => {
    const users = new User();

    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const result = users.createUser(user);

    expect(result).toEqual({
      ...user,
      id: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    expect(users.users).toEqual([result]);
  });

  it("Should throw if the input is invalid", () => {
    const users = new User();

    const user = {
      email: "invalid-email",
      password: faker.internet.password(),
    };

    expect(() => users.createUser(user)).toThrow();
  });
});
