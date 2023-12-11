import { withoutNulls, arraysDiff } from "../src/utils/arrays";
import { expect, test } from "vitest";

test("withoutNulls", () => {
  const arr = [1, 2, "hello", null, undefined];
  expect(withoutNulls(arr)).toEqual([1, 2, "hello"]);
});

test("arraysDiff added", () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3, 4];
  expect(arraysDiff(arr1, arr2)).toEqual({
    added: [4],
    removed: [],
  });
});

test("arraysDiff removed", () => {
  const arr1 = [1, 2, 3, 4];
  const arr2 = [1, 2, 3];
  expect(arraysDiff(arr1, arr2)).toEqual({
    added: [],
    removed: [4],
  });
});
