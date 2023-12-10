import { test, expect } from "vitest";
import { h, hString, hFragment } from "../src/h";

test("h", () => {
  const el = h("div", { class: "class1" }, []);
  expect(el).toEqual({
    tag: "div",
    props: {
      class: "class1",
    },
    children: [],
    type: "element",
  });
});

test("hString", () => {
  const el = hString("hello");
  expect(el).toEqual({
    type: "text",
    value: "hello",
  });
});

test("hFragment", () => {
  const el = hFragment([h("div", {}, ["hello"]), h("p", {}, ["World"])]);
  expect(el).toEqual({
    type: "fragment",
    children: [
      {
        tag: "div",
        props: {},
        children: [
          {
            type: "text",
            value: "hello",
          },
        ],
        type: "element",
      },
      {
        tag: "p",
        props: {},
        children: [
          {
            type: "text",
            value: "World",
          },
        ],
        type: "element",
      },
    ],
  });
});

test("component1", () => {
  function MessageComponent(level, msg) {
    return h(
      "div",
      {
        class: `message message-${level}`,
      },
      [h("p", {}, [msg])]
    );
  }
  expect(MessageComponent("info", "hello")).toEqual({
    tag: "div",
    props: {
      class: "message message-info",
    },
    children: [
      {
        tag: "p",
        props: {},
        children: [
          {
            type: "text",
            value: "hello",
          },
        ],
        type: "element",
      },
    ],
    type: "element",
  });
});
