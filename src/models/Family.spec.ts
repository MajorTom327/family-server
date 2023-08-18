import { faker } from "@faker-js/faker";
import { afterEach } from "node:test";
import { beforeEach, describe, expect, it, vi } from "vitest";

import FamilyModel from "./Family";

describe("Create family", () => {
  let familyModel: FamilyModel;

  beforeEach(() => {
    vi.useFakeTimers();
    familyModel = new FamilyModel();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create a family", () => {
    const ownerId = faker.string.uuid();
    const family = familyModel.createFamily({
      ownerId,
    });

    expect(family).toEqual({
      id: expect.any(String),
      ownerId: ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it("Should throw if the input is invalid", () => {
    expect(() => {
      // @ts-expect-error
      familyModel.createFamily({});
    }).toThrow();
  });
});

describe("Get family", () => {
  let familyModel: FamilyModel;

  beforeEach(() => {
    vi.useFakeTimers();
    familyModel = new FamilyModel();

    familyModel.families = Array.from({ length: 10 }, () => {
      return {
        id: faker.string.uuid(),
        ownerId: faker.string.uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should get a family", () => {
    const ownerId = faker.string.uuid();
    const family = familyModel.createFamily({
      ownerId,
    });

    const result = familyModel.getFamily(family.id);

    expect(result).toEqual(family);
  });

  it("Should return null if the family does not exist", () => {
    const result = familyModel.getFamily("1");

    expect(result).toEqual(null);
  });
});

describe("Get families", () => {
  let familyModel: FamilyModel;

  beforeEach(() => {
    vi.useFakeTimers();
    familyModel = new FamilyModel();

    familyModel.families = Array.from({ length: 10 }, () => {
      return {
        id: faker.string.uuid(),
        ownerId: faker.string.uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should get a family", () => {
    const result = familyModel.getFamilies();

    expect(result).toEqual(familyModel.families.slice(0, 10));
  });

  it("should get a family in the second page", () => {
    const result = familyModel.getFamilies(1);

    expect(result).toEqual(familyModel.families.slice(10, 20));
  });
});
