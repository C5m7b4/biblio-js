var version = "0.0.1";

function withoutNulls(arr) {
  return arr.filter((item) => item != null);
}

const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};
function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
}
function hString(str) {
  return {
    type: DOM_TYPES.TEXT,
    value: str,
  };
}
function hFragment(vNodes) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  };
}
function mapTextNodes(children) {
  return children.map((child) =>
    typeof child === "string" || typeof child === "number"
      ? hString(child)
      : child
  );
}

function lipsum(n) {
  const text = `Lorem ipsum dolor sit
    amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat.".`;
  return hFragment(Array(n).fill(h("p", {}, [text])));
}

console.log(`Version: ${version}`);

export { DOM_TYPES, h, hFragment, hString, lipsum, withoutNulls };

function MessageComponent(level, msg) {
  return h(
    "div",
    {
      class: `message message-${level}`,
    },
    [h("p", {}, [msg])]
  );
}
console.log(MessageComponent("info", "here is hte message"));
