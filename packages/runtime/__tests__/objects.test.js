import { test, expect } from "vitest";
import { objectsDiff } from "../src/utils/objects";

test("objectsDiff updated", () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 2, b: 2 };
  expect(objectsDiff(obj1, obj2)).toEqual({
    added: [],
    removed: [],
    updated: ["a"],
  });
});

test("objectsDiff added", () => {
  const obj1 = { a: 1 };
  const obj2 = { a: 1, b: 2 };
  expect(objectsDiff(obj1, obj2)).toEqual({
    added: ["b"],
    removed: [],
    updated: [],
  });
});

test("objectsDiff removed", () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 1 };
  expect(objectsDiff(obj1, obj2)).toEqual({
    added: [],
    removed: ["b"],
    updated: [],
  });
});
