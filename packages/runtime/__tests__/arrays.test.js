import { withoutNulls } from "../src/utils/arrays";
import { expect, test } from "vitest";

test("withoutNulls", () => {
  const arr = [1, 2, "hello", null, undefined];
  expect(withoutNulls(arr)).toEqual([1, 2, "hello"]);
});
